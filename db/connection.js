const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'CCG_DATABASE'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;