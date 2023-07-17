const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const connectToMongo = require('./db')

connectToMongo();
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})