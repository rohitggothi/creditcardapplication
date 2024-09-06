const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const logger = require('./config/logger');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3001' })); // Enable CORS for frontend origin
app.use(bodyParser.json());
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg) } }));

// Log each request received
app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/payments', paymentRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});

const PORT = process.env.PORT || 3001; // Ensure this matches your frontend request
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
