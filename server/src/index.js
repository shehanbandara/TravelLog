const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const logs = require('./api/logs');
const middlewares = require('./middlewares');

const app = express();

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({
    origin: process.env.CORSORIGIN
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use('/api/logs', logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1600;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});