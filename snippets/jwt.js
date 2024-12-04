
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000; 

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Example: Simple user validation
    if (username === "user" && password === "password") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

// Protected route
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: "Access granted", user: decoded });
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
