const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    register: async (req, res) => {
        const { name, email, password, phone } = req.body;
        console.log("Received data:", { name, email, password, phone }); // Kiểm tra dữ liệu nhận vào

        try {
            // Kiểm tra nếu email đã tồn tại
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Lưu người dùng mới vào database
            const sql = 'INSERT INTO user (UserName, Email, Password, Phone) VALUES (?, ?, ?, ?)';
            db.query(sql, [name, email, hashedPassword, phone], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error saving user' });
                }
                res.status(201).json({ message: 'Registration successful' });
            });
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

};

module.exports = AuthController;
