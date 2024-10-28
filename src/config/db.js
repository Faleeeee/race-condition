const mysql = require('mysql');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'football'
    }
);

db.connect((err) => {
    if (err) throw err;
    console.log('Connect to Mysql database');
});

module.exports = db;