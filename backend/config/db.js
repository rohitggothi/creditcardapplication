const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rokie123',
    database: 'credit_card_app',
});

module.exports = pool;
