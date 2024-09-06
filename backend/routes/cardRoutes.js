// backend/routes/cardRoutes.js
const express = require('express');
const { applyCard, getAllCards } = require('../controllers/cardController'); // Correctly import functions
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', authMiddleware, applyCard); // Ensure `applyCard` is defined
router.get('/', authMiddleware, getAllCards);     // Ensure `getAllCards` is defined

module.exports = router;
