#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'templates');
const DESTINATION_PATH = process.cwd();

program
  .version('1.0.0')
  .description('CLI tool to generate a backend project template')
  .action(() => {
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

program.parse(process.argv);
