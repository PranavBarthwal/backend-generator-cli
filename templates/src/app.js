// src/app.js

const express = require("express");
const constants = require("./constants");

const app = express();

// Basic route to display message
app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Project Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f9;
            color: #333;
            padding: 20px;
        }
        h1 {
            color: #ff4500;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2rem;
            margin: 10px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 1.2rem;
        }
        li {
            margin: 10px 0;
        }
        a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        img {
            width: 100px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 40px;
            font-size: 1rem;
            color: #666;
        }
        .footer img {
            width: 80px;
            border-radius: 50%;
        }
        .footer a {
            color: #007bff;
        }
        .clock {
            font-size: 1.5rem;
            margin: 20px 0;
        }
        .highlight {
            color: #666;
            font-size: 1rem;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" alt="npm logo">
    <h1>Backend Project Template</h1>
    <p>Server is running smoothly!</p>
    <div class="clock" id="clock"></div>

    <p class="highlight">Checkout the GitHub Repository and npm Package</p>
    <ul>
        <li><a href="${constants.GITHUB_REPO}" target="_blank">GitHub Repository</a></li> 
        <li>|</li>
        <li><a href="${constants.NPM_PACKAGE}" target="_blank">npm Package</a></li>
    </ul>
    
    <div class="footer">
        <p>Made with <span style="color: #e25555;">&#10084;</span> by Pranav Barthwal</p>
        <img src="https://res.cloudinary.com/dsvxaty8u/image/upload/v1721986398/Portfolio%20Assets/Untitled_design_epwegs.png" alt="Pranav Barthwal">
        <p>
            <a href="https://github.com/PranavBarthwal" target="_blank">Follow me on GitHub</a> | 
            <a href="https://x.com/pranavbarthwal_" target="_blank">Follow me on X</a>
        </p>
    </div>

    <script>
        let startTime = new Date();
        
        function updateClock() {
            const now = new Date();
            const elapsed = new Date(now - startTime);
            const hours = String(elapsed.getUTCHours()).padStart(2, '0');
            const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
            const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
            const uptime = \`Server Uptime: \${hours}:\${minutes}:\${seconds}\`;
            document.getElementById('clock').textContent = uptime;
        }

        setInterval(updateClock, 1000);
        updateClock(); // Initial call to display clock immediately
    </script>
</body>
</html>
    `);
});

module.exports = app;

