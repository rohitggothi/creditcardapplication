const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate JWT

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user info route (requires authentication)
router.get('/userinfo', authenticateToken, getUserInfo);

module.exports = router;
