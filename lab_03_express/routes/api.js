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

    connection.query(`
        INSERT INTO messages (firstname, lastname, email, message)
        VALUES (?, ?, ?, ?);
    `, [firstname, lastname, email, message]);
});

module.exports = router;
