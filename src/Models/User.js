const db = require('../config/db');

const User = {
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.query(sql, [email], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result[0]);
        })
    }
}

module.exports = User;