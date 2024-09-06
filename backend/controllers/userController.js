// src/controllers/userController.js
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Adjust path as necessary

const getUserInfo = async (req, res) => {
    try {
        // Verify and decode the token
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch user data from the database
        const [rows] = await db.query('SELECT id, username, email FROM Register WHERE id = ?', [userId]);
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

module.exports = { getUserInfo };
