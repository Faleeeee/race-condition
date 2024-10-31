const AuthService = require('../Models/User');

const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await AuthService.login(email, password);
            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = AuthController;
