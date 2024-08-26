// src/index.js

const app = require('./app');
const { PORT } = require('./constants');

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`GitHub Repository: ${require('./constants').GITHUB_REPO}`);
    console.log(`npm Package: ${require('./constants').NPM_PACKAGE}`);
});
