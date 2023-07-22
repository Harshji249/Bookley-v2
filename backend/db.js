const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/bookleyDB"

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true });
}

module.exports = connectToMongo;