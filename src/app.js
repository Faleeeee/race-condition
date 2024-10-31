const express = require('express');
const initRoutes = require('./routes/index');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
initRoutes(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
