const db = require('../config/db');

const AuthService = {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE Email = ?', [email], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(new Error('Database error'));
                }

                const user = results[0];
                if (!user || password !== user.Password) {
                    return reject(new Error('Invalid email or password'));
                }

                resolve(user); // Successfully found and authenticated user
            });
        });
    }
};

module.exports = AuthService;
