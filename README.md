<img src="https://github.com/user-attachments/assets/1226438f-19e0-46e4-beff-5483e429ee69" width=200>

# Backend Generator CLI
> 🎉 **Now supporting code snippet generation!** 🚀

![npm](https://img.shields.io/npm/dt/backend-generator-cli?color=brightgreen&label=Total%20Downloads&style=for-the-badge) ![npm](https://img.shields.io/npm/dw/backend-generator-cli?color=blue&label=Weekly%20Downloads&style=for-the-badge)

**Backend Generator CLI** is a simple yet powerful command-line tool that helps you quickly scaffold a well-structured backend project. With built-in best practices and customizable code snippets, this tool is designed to streamline your development workflow and help you focus on what matters: building your application.

## Key Features

- **Instant Backend Setup**: Generate a clean, well-organized backend project structure with a single command.
- **Best Practices Built-in**: The generated project follows industry-standard best practices for scalable backend development.
- **Custom Code Snippets**: Insert predefined code snippets such as API error handling, file uploading, and more using simple CLI commands.
- **Modular and Extensible**: The tool allows you to customize and expand the project structure to meet your specific needs.

## Installation

To install the CLI globally, use `npm`:

```bash
npm install -g backend-generator-cli
```

After installation, you will have access to two main commands: `create-project` to generate the backend structure and `generate-snippet` to inject code snippets.

## Available Snippets

- **`async-ops-handler`**: Handles async operations with proper error handling.
- **`custom-api-error`**: Standardizes API error responses for your app.
- **`custom-api-response`**: Standardizes successful API responses.
- **`multer-file-upload`**: Sets up file upload handling using `multer`.

## Commands

### 1. `create-project`
Generate a new backend project with a pre-configured folder structure:

```bash
run create-project
```

This command will create a new backend project structure in your current directory. Here's what the generated structure looks like:

```
.
├── src/
│   ├── controllers/      # Controllers for handling requests and responses
│   ├── db/               # Database connection and configuration
│   ├── middlewares/      # Middlewares for handling validation and request processing
│   ├── models/           # Data models (e.g., Mongoose models, SQL models)
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions and helpers
│   ├── app.js            # Main app setup and configuration
│   ├── constants.js      # Application-wide constants
│   └── index.js          # Entry point of the backend server
├── .env.sample           # Sample environment configuration
├── .gitignore            # Git ignore file for version control
├── .prettierignore       # Prettier ignore file
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Documentation
```

This structure is clean, easy to navigate, and ready to be extended with your own business logic and data models.

### 2. `generate-snippet <snippet-name>`

Generate and inject predefined code snippets into your project. Snippets are placed in individual files in your current working directory. 

Example:

```bash
run generate-snippet multer-file-upload
```

This command will create a new file `multer-file-upload.js` in the current working directory, containing a pre-configured snippet for handling file uploads using `multer`.

### Available Snippets

1. **`async-ops-handler.js`**:
   Handles asynchronous operations with error handling.

   **Code Snippet**:
   ```js
    const asyncHandler = (requestHandler) => {
        return (req, res, next) => {
            Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
        }
    }

    export { asyncHandler }
   ```

2. **`custom-api-error.js`**:
   Standardizes error responses for your API.

   **Code Snippet**:
   ```js
   class ApiError extends Error{
        constructor(
            statusCode,
            message= "Something went wrong",
            errors=[],
            stack=""
        ){
            super(message);
            this.statusCode = statusCode;
            this.message = message;
            this.data = null;
            this.errors = errors;
            
            if(stack){
                this.stack = stack;
            }else{
                Error.captureStackTrace(this, this.constructor);
            }
        }
    }

    export { ApiError }
   ```

3. **`custom-api-response.js`**:
   Standardizes successful API responses.

   **Code Snippet**:
   ```js
    class ApiResponse{
        constructor(statusCode, message="success", data){
            this.statusCode = statusCode;
            this.message = message;
            this.data = data;
            this.success = statusCode < 400;
        }
    }

    export {ApiResponse}
   ```

4. **`multer-file-upload.js`**:
   Sets up a file upload service using `multer`.

   **Code Snippet**:
   ```js
   import multer from "multer";

    const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/temp');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
    });

    export const upload = multer({ storage });

   ```


## Full User Journey Example

Here’s a complete example of a user journey, from project setup to injecting code snippets into the project.

### Step 1: Install the CLI Globally

First, install the tool using npm:

```bash
npm install -g backend-generator-cli
```

### Step 2: Create a New Backend Project

Navigate to your desired directory and run the following command to generate the project structure:

```bash
run create-project
```

This will create a new backend project with the following structure:

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
└── README.md
```

### Step 3: Move to the `src/utils` Directory

Change your working directory to the `src/utils` folder:

```bash
cd src
cd utils
```

You are now inside the `utils` folder where you will generate the file upload handler snippet.

### Step 4: Add a Snippet to Handle File Uploads

Next, add a `multer` file upload handler by running the following command:

```bash
run generate-snippet multer-file-upload
```

This command will create a new file called `multer-file-upload.js` in the `src/utils` directory, which is now your current working directory. The content of this file will look like this:

```js
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
```

### Step 5: Use the Snippet in Your Project

Now that the file upload handler has been generated in the `utils` folder, you can import and use it in your application. For instance, in `src/routes/uploadRoute.js`:

```js
import express from 'express';
import { upload } from '../utils/multer-file-upload';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

export default router;
```

Make sure that your main `app.js` or `index.js` includes this route:

```js
import express from 'express';
import uploadRoute from './routes/uploadRoute';

const app = express();

app.use('/api', uploadRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Step 6: Continue Building

Continue building your application by adding your business logic, routes, controllers, and any other necessary components. Feel free to generate additional snippets like `custom-api-error` and `async-ops-handler` as needed.

This flow demonstrates how you can set up your backend project structure and utilize the code snippets generated by `backend-generator-cli` to accelerate your development.


## Future Enhancements

- Add more predefined snippets for common backend use cases.
- Add ability to generate code snippets using AI.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
<br>

<div align="center">
  <p>Made with ❤️ by Pranav Barthwal</p>
  <img src="https://avatars.githubusercontent.com/u/110532770?v=4" width="150" style="border-radius: 50%;" alt="Pranav Barthwal" />
  <p>
    <a href="https://github.com/PranavBarthwal" target="_blank">Follow me on GitHub</a> |
    <a href="https://twitter.com/pranavbarthwal_" target="_blank">Follow me on X</a>
  </p>
</div>
