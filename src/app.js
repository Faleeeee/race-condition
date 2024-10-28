const express = require('express');
const initRoutes = require('./routes/index');
const app = express();

app.use(express.json());

initRoutes(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
