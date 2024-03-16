const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const connectToMongo = require('./db')

require('dotenv').config()

connectToMongo();
const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/images'));
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/product', require('./routes/products'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/bidding', require('./routes/bidding'));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})