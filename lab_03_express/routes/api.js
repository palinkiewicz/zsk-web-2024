const express = require("express");
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab_03_express',
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected with the database!");
});

router.post('/contact-messages', (req, res) => {
    const {firstname, lastname, email, message} = req.body;

    connection.query(
        `INSERT INTO messages (firstname, lastname, email, message) VALUES (?, ?, ?, ?)`,
        [firstname, lastname, email, message]
    );

    res.json({ok: 'ok'});
});

router.get('/contact-messages', (req, res) => {
    connection.query('SELECT * FROM messages', (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/contact-messages/:id', (req, res) => {
    const messageId = req.params.id;

    connection.query(
        'SELECT * FROM messages WHERE id = ?',
        [messageId],
        (error, results) => {
            if (error) {
                console.error('Database error:', error);
                res.status(500).json({ error: 'Database error' });
            } else {
                if (results.length === 0) res.send('<h1>404 Not Found</h1>');
                else res.json(results);
            }
        }
    );
});

module.exports = router;
