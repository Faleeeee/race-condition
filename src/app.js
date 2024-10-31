const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes/index');
const morgan = require('morgan');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('sanitized-body', (req, res) => {
    const body = { ...req.body };
    if (body.password) {
        body.password = '******';
    }
    return JSON.stringify(body);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :sanitized-body - :req[content-length]'));

initRoutes(app);

const PORT = 3000;

const listener = app.listen(PORT, () => {
    console.log('Server is running on the port ' + listener.address().port);
});

module.exports = app;
