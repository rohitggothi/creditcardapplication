// backend/routes/paymentRoutes.js
const express = require('express');
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have this middleware for protected routes

const router = express.Router();

// Route to process a payment
router.post('/process', authMiddleware, processPayment);

// Route to get payment status
router.get('/status/:paymentId', authMiddleware, getPaymentStatus);

module.exports = router;
