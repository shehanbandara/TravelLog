const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const middlewares = require('./middlewares');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1600;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});