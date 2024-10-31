const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM user WHERE Email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) {
                    console.error("Error in findByEmail:", err); // Thêm log để kiểm tra
                    reject(err);
                } else {
                    console.log("findByEmail results:", results[0]); // Kiểm tra kết quả tìm kiếm
                    resolve(results[0] || null);
                }
            });
        });
    },

    // Hàm tạo người dùng mới
    create: (name, email, password, phone, callback) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {  // Hash password
            if (err) {
                console.error("Error hashing password:", err); // Thêm log cho lỗi hash
                return callback(err, null);
            }

            const sql = 'INSERT INTO user (UserName, Email, Password, Phone) VALUES (?, ?, ?, ?)';
            db.query(sql, [name, email, hashedPassword, phone], (err, result) => {
                if (err) {
                    console.error("Error inserting user:", err); // Log lỗi khi chèn
                    callback(err, null);
                } else {
                    console.log("User created successfully:", result); // Log khi thành công
                    callback(null, { message: 'Registration successful' });
                }
            });
        });
    },

    // Hàm đăng nhập với so sánh mật khẩu đã mã hóa
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE Email = ?', [email], async (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(new Error('Database error'));
                }

                const user = results[0];
                if (!user) {
                    return reject(new Error('Invalid email or password'));
                }

                // So sánh mật khẩu đã mã hóa
                const isMatch = await bcrypt.compare(password, user.Password);
                if (!isMatch) {
                    return reject(new Error('Invalid email or password'));
                }

                resolve(user); // Trả về người dùng đã đăng nhập thành công
            });
        });
    }
};

module.exports = User;
