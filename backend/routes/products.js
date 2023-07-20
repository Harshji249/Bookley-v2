const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "secretjwtstring"

router.get('/fetchallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: { $ne: req.user.id } });
        res.json(products)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.post('addproduct', fetchuser, [
    body('name', 'Name must be atleast 3 characters').isLength({ min: 3 }),
    body('category', 'This field is required').exists(),
    body('ownership', 'This field is required').exists(),
    body('desc', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, category, ownership, desc } = req.body;
        const product = new Product({ name, category, ownership, desc, user: req.user.id })
        const savedProduct = await product.save()
        res.json(savedProduct)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

module.exports = router
