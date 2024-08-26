// src/app.js

const express = require('express');
const constants = require('./constants');

const app = express();

// Basic route to display message
app.get('/', (req, res) => {
    res.send(`
        <h1>Backend Project Template</h1>
        <p>Server is running!</p>
        <p>Check out the repository and npm package:</p>
        <ul>
            <li><a href="${constants.GITHUB_REPO}">GitHub Repository</a></li>
            <li><a href="${constants.NPM_PACKAGE}">npm Package</a></li>
        </ul>
    `);
});

module.exports = app;
