const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name :{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    ownership:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const product = mongoose.model("Product", productSchema)
product.createIndexes
module.exports = product