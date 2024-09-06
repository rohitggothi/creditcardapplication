const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Adjust the path to your database configuration

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, // Ensure this is set in your .env file
            { expiresIn: '1h' }
        );

        res.json({
            token,
            message: 'Logged in successfully',
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

// Get user information
const getUserInfo = async (req, res) => {
    const userId = req.user.id; // Extract user ID from JWT payload

    try {
        // Fetch user information from the database
        const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in getUserInfo:', error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
};
