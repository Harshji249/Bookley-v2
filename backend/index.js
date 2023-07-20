const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const connectToMongo = require('./db')

connectToMongo();
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/product',require('./routes/products'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})