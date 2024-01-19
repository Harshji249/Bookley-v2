const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const axios = require('axios')

const JWT_SECRET = "secretjwtstring"

//Create a User using : POST "/api/auth/createuser" 
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let checkUser = await User.findOne({ email: req.body.email });

        if (checkUser) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const { name, email, password } = req.body;
        const secPass = await bcrypt.hash(password, salt)
        let user = new User({ name: name, email: email, password: secPass });
        user = await user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

        // const r = await axios.put(
        //     'https://api.chatengine.io/users/',
        //     {email: email,username : name , secret : password},
        //     {headers : {"private-key" :"24adddb8-aed4-4a94-902d-9bb0d17e1045"}}
        // )
        // return res.status(r.status).json(r.data)
        // const r = await axios.put(
        //     'https://api.chatengine.io/users/',
        //     { email: email, username: name, secret: password },
        //     { headers: { "private-key": "24adddb8-aed4-4a94-902d-9bb0d17e1045" } }
        // );

        // const responseData = {
        //     authToken: authToken,
        //     chatEngineResponse: {
        //         status: r.status,
        //         data: r.data
        //     }
        // };

        // res.json(responseData);
        // 24adddb8-aed4-4a94-902d-9bb0d17e1045
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})

//Authenticate a User using : POST "/api/auth/login" 
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Loggin with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken,user })


    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")

    }
})

router.get('/getalluser', async (req, res) => {
    try {
        const user = await User.find();
        // res.json(products)
        res.send({ status: 200, user })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")
    }
})
//Get loggedin User details using : POST "/api/auth/getuser" 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const id = req.user.id;
        const user = await User.findById(id).select('-password')
        res.send(user);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error occured")

    }
})


module.exports = router