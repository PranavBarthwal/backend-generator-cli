#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SNIPPET_PATH = path.join(__dirname, 'snippets'); // Folder containing predefined snippets
const DESTINATION_PATH = process.cwd(); // User's working directory

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
      console.log('\nProject structure created successfully!'
        + '\n\nFollow the steps to get started:'
        + '\n1. cd <your_project_directory>'
        + '\n2. npm install'
        + '\n3. npm run start'
        + '\n\nHappy coding!\n'
      );
    } catch (err) {
      console.error('Error while generating project structure:', err);
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
        console.error(`Error: Snippet "${snippetName}" does not exist.`);
        return;
      }

      // Define the path where the new snippet file will be created in the working directory
      const newSnippetFilePath = path.join(DESTINATION_PATH, `${snippetName}.js`);

      // Copy the snippet file content to the new file in the working directory
      fs.copySync(snippetFile, newSnippetFilePath);

      console.log(`\nSnippet "${snippetName}" has been successfully created as "${snippetName}.js" in your current directory!\n`);
    } catch (err) {
      console.error('Error while generating snippet file:', err);
    }
  });

program.parse(process.argv);
