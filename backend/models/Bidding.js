const mongoose = require('mongoose')

const biddingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const bidding = mongoose.model("Bidding", biddingSchema)
bidding.createIndexes
module.exports = bidding