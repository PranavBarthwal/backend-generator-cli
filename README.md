<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# Backend Generator CLI

A simple and efficient CLI tool to generate a structured backend project template quickly.

## Features

- **Instant Setup**: Generates a complete backend project structure with a single command.
- **Best Practices**: Follows clean architecture and best practices for backend development.
- **Customizable**: Modify and expand the generated project to suit your specific needs.

## Installation

To get started, install the CLI globally using `npm`:

```bash
npm install -g backend-generator-cli
```

## Usage

Generate your backend project structure by running:

```bash
backend-gen
```

This will create the following project structure in your current directory:

```
.
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── constants.js
│   └── index.js
├── .env.sample
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
└── Readme.md

```

## Example

After running `backend-gen`, your project will be set up and ready for customization. Here's an example directory structure:

```
my-backend-project
my-backend-project
├── src/
│   ├── controllers/     # Business logic for each resource (e.g., users, products)
│   ├── db/              # Database connection and configurations
│   ├── middlewares/     # Middlewares for request processing and validation
│   ├── models/          # Data models, e.g., MongoDB schemas or SQL models
│   ├── routes/          # API routes and endpoints
│   ├── utils/           # Utility functions and helpers
│   ├── app.js           # Main app configuration
│   ├── constants.js     # Constants used across the app
│   └── index.js         # Entry point to the backend
├── .env.sample          # Sample environment configuration
├── .gitignore           # Ignored files in git
├── .prettierignore      # Ignored files for Prettier
├── .prettierrc          # Prettier configuration file
├── package.json         # Node.js project dependencies and scripts
└── README.md            # Project documentation

```

Now you can start developing by adding your logic to the respective directories.


## License

This project is licensed under the MIT License.

