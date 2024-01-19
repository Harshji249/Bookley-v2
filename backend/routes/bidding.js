const express = require('express')
const router = express.Router()
const Bidding = require('../models/Bidding')
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');

const destinationPath = path.join(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// const JWT_SECRET = "secretjwtstring"
const upload = multer({ storage: storage });


router.post('/createbid', fetchuser, upload.single('file'), async (req, res) => {
    try {

        const { name, category, price } = req.body
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const bidding = new Bidding({
            name,
            category,
            price,
            file: file.filename,
            user: req.user.id,
        });


        const savedBidding = await bidding.save();
        res.json(savedBidding);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error occurred');
    }
})

router.get('/fetchallbid', fetchuser, async (req, res) => {
    try {
        const bidding = await Bidding.find({ user: { $ne: req.user.id } });      
        res.send({ status: 200, bidding })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.get('/mybids', fetchuser, async (req, res) => {
    try {
        const bidding = await Bidding.find({ user: req.user.id });
        res.send({ status: 200, bidding })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

router.put('/updatebid/:id', fetchuser, async(req,res)=>{
    const {name, category,price} = req.body;
    console.log('Received update request:', { id: req.params.id, name, category, price });
    const newProduct ={};
    if (name){newProduct.name = name};
    if (category){newProduct.category = category};
    if (price){newProduct.price = price};


    let bidding = await Bidding.findById(req.params.id);
    if(!bidding){res.status(404).send("Not Found")};

    // if(bidding.user.toString() !== req.user.id){
    //     return res.status(401).send("Not Allowed");
    // }

    bidding = await Bidding.findByIdAndUpdate(req.params.id,{$set:newProduct}, {new:true})
    res.json({bidding});
})

module.exports = router
