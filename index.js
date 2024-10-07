#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';
import packages from './snippets-packages.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {exec} from 'node:child_process'; 
import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';
import ora from 'ora'; // Import the ora package
import inquirer from 'inquirer'; // Import the inquirer package

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SNIPPET_PATH = path.join(__dirname, 'snippets'); // Folder containing predefined snippets
const DESTINATION_PATH = process.cwd(); // User's working directory


async function getApiKey() {
  const CONFIG_PATH = path.join(__dirname, 'config.json'); // Define path to save the API key

  let apiKey = '';

  // Check if the API key is already saved in the config file
  if (fs.existsSync(CONFIG_PATH)) {
    const config = fs.readFileSync(CONFIG_PATH, 'utf-8');
    apiKey = JSON.parse(config).apiKey;
  }

  // If no API key is found, prompt the user for it
  if (!apiKey) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your Gemini API key:',
        validate: (input) => (input ? true : 'API key is required!'),
      },
    ]);

    apiKey = answers.apiKey;

    // Save the API key in the config file for future use
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ apiKey }));
  }

  return apiKey;
}



program
  .version('1.0.0')
  .description('CLI tool to generate a backend project template and use code snippets');

// Command to create backend project structure
program
  .command('create-project')
  .description('Generate the backend project structure')
  .action(() => {
    const TEMPLATE_PATH = path.join(__dirname, 'templates');

    try {
      // Copy the template files to the destination path
      fs.copySync(TEMPLATE_PATH, DESTINATION_PATH);
      console.log(
        chalk.green('\nProject structure created successfully!') +
        chalk.blue('\n\nFollow the steps to get started:') +
        chalk.yellow('\n1. cd <your_project_directory>') +
        chalk.yellow('\n2. npm install') +
        chalk.yellow('\n3. npm run start') +
        chalk.cyan('\n\nHappy coding!\n')
      );
    } catch (err) {
      console.error(chalk.red('Error while generating project structure:'), err);
    }
  });

// Command to generate a snippet in a new file
program
  .command('generate-snippet <snippetName>')
  .description('Generate a code snippet in a new file')
  .action((snippetName) => {
    try {
      // Check if the snippet exists in the snippets folder
      const snippetFile = path.join(SNIPPET_PATH, `${snippetName}.js`);

      if (!fs.existsSync(snippetFile)) {
        console.error(chalk.red(`Error: Snippet "${snippetName}" does not exist.`));
        return;
      }

     
      // Define the path where the new snippet file will be created in the working directory
      const newSnippetFilePath = path.join(DESTINATION_PATH, `${snippetName}.js`);

      // Copy the snippet file content to the new file in the working directory
      fs.copySync(snippetFile, newSnippetFilePath);
      console.log(chalk.yellow("Installing all the required packages for the snippet..."))
      console.log(chalk.green(`\nSnippet "${snippetName}" has been successfully created as "${snippetName}.js" in your current directory!\n`));
    } catch (err) {
      console.error(chalk.red('Error while generating snippet file:'), err);
    }
  });

// Command to generate code using Google's Generative AI
program
  .command('generate-ai-snippet <snippetName>')
  .description('Generate a code snippet using Google\'s Generative AI')
  .action(async (snippetName) => {
    

    try {
      // Prompt the user for an API key
      const apiKey = await getApiKey();

      const spinner = ora({
        text: `Generating code snippet for ${snippetName}...`,
        color: 'cyan',
      }).start(); // Start the spinner

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prompt the model to generate a code snippet
      const prompt = `You are an expert MERN stack developer specializing in Backend Development using Node.js and Express.js. Generate a javascript code snippet in module js syntax for ${snippetName}. Return only the code snippet strictly adhering to the requirements without unnecessary wrapper text.`;

      const result = await model.generateContent(prompt);

      // Stop the spinner when the result is generated
      spinner.succeed('Code snippet generated successfully!');

      // Display the generated code in a styled manner
      const generatedCode = result.response.text();

      console.log(chalk.blueBright(`\nGenerated Code Snippet for ${snippetName}: \n`));
      console.log(chalk.magentaBright(generatedCode));
      console.log(chalk.yellowBright(`\nThe code snippet is generated successfully and may require some modifications to fit your use case.\n`));
    } catch (error) {
      // Stop the spinner with an error
      spinner.fail('Error generating content');
      console.error(chalk.red('Error generating content:'), error.message || error);
    }
  });

program.parse(process.argv);

