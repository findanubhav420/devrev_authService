require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();

const {router} = require('./src/routes/authRoute');

app.use(cors());
app.use(express.json());

app.use(router);
app.get('/', (req, res) => res.send('Authentication server is running!'));

const PORT = 4000;

app.listen(PORT, () => console.log('Authentication server stored on port ' + PORT));