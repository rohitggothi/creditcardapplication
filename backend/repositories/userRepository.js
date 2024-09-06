const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'credit_card_app',
});

const promisePool = pool.promise();

const createUser = async (username, email, password) => {
    const [result] = await promisePool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
    return result;
};

module.exports = {
    createUser,
};
