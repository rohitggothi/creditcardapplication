// backend/controllers/cardController.js
const db = require('../config/db');

// Function to handle card application
const applyCard = async (req, res) => {
    const { userId, cardType, cardDetails } = req.body;

    try {
        // Logic to handle card application
        await db.promise().query(
            'INSERT INTO cards (user_id, card_type, card_details) VALUES (?, ?, ?)',
            [userId, cardType, cardDetails]
        );

        res.status(201).json({ message: 'Card application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to retrieve all cards
const getAllCards = async (req, res) => {
    try {
        const [cards] = await db.promise().query('SELECT * FROM cards WHERE user_id = ?', [req.user.id]);
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    applyCard,
    getAllCards,
};
