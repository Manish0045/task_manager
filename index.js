require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '16kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/task'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
})