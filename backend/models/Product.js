const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    // sold:{
    //     type:Boolean,
    //     default: false
    // }
})

const product = mongoose.model("Product", productSchema)
product.createIndexes
module.exports = product