const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    // Hàm tìm người dùng theo email
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

    // Hàm đăng nhập
    login: (email, password, callback) => {
        const sql = 'SELECT * FROM user WHERE Email = ?';
        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.error("Error in login query:", err); // Thêm log lỗi truy vấn
                return callback(err, null);
            }
            if (results.length === 0) {
                console.log("User not found with email:", email); // Log nếu không tìm thấy người dùng
                return callback(new Error('User not found'), null);
            }

            const user = results[0];

            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.Password);
            if (!isMatch) {
                console.log("Password does not match for user:", email); // Log nếu mật khẩu không khớp
                return callback(new Error('Invalid password'), null);
            }

            console.log("Login successful for user:", email); // Log nếu đăng nhập thành công
            return callback(null, user);
        });
    }
};

module.exports = User;
