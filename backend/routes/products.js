const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "secretjwtstring"
const destinationPath = path.join(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.get('/fetchallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: { $ne: req.user.id } });
      
        res.send({ status: 200, products })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.get('/myproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        // res.json(products)
        res.send({ status: 200, products })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})
router.get('/getUserById', fetchuser, async (req, res) => {
    try {
        const {userId} = req.query
        const finalUser =  await User.findById(userId)
        console.log('PROD',finalUser)
        res.send({ status: 200,finalUser })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.post('/addproduct', fetchuser, upload.single('file'), async (req, res) => {
    try {

        const { name, category, price } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const product = new Product({
            name,
            category,
            price,
            file: file.filename,
            user: req.user.id,
        });

        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error occurred');
    }
});

router.put('/updateproduct/:id', fetchuser, async(req,res)=>{
    const {name, category,price} = req.body;
    console.log('Received update request:', { id: req.params.id, name, category, price });
    const newProduct ={};
    if (name){newProduct.name = name};
    if (category){newProduct.category = category};
    if (price){newProduct.price = price};


    let product = await Product.findById(req.params.id);
    if(!product){res.status(404).send("Not Found")};

    if(product.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    product = await Product.findByIdAndUpdate(req.params.id,{$set:newProduct}, {new:true})
    res.json({product});
})

module.exports = router
