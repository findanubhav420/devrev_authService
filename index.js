require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

const {router} = require('./src/routes/authRoute');

app.use(cors());
app.use(express.json());

app.use(router);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.get('/', (req, res) => res.send('Authentication server is running!'));


const PORT = 4000;

app.listen(PORT, () => console.log('Authentication server stored on port ' + PORT));