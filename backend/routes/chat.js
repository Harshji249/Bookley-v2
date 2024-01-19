const express = require('express')
const router = express.Router()
// const ChatModel = require('../models/Message')
const User = require('../models/User')

const { conversationModel, ChatModel } = require("../models/Message");
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');

const data = Array.from({length:100}, (_,index)=>({id: index+1, name:`Item${index+1}`}));
router.post('/createchat', fetchuser, async (req, res) => {
  try {
    console.log(req.body)
    const { sender, receiver, text } = req.body;
    const errors = [];


    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const checkIfChat = await conversationModel.findOne({
      members: { $all: [sender, receiver] },
    });

    const createMessage = new ChatModel({
      sender: sender,
      receiver: receiver,
      text: text,
    });

    const messageId = await createMessage.save();

    if (checkIfChat) {
      await conversationModel.findByIdAndUpdate(checkIfChat._id, {
        $push: {
          messages: messageId._id,
        },
      });
      return res.send(messageId);
    } else {
      const createConversation = new conversationModel({
        members: [sender, receiver],
        messages: [messageId._id],
      });
      const result = await createConversation.save();
      res.send(messageId);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
})

router.post('/message', fetchuser, async (req, res) => {
  try {
    const senderId = req.body.sender;
    const receiverId = req.body.receiver;

    const conversation = await conversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      console.error("Conversation not found");
      return res.status(400).json({ message: "Conversation not found" });
    }

    const chatMessages = await ChatModel.find({
      _id: { $in: conversation.messages },
    }).sort({ createdAt: 1 });

    res.status(200).json(chatMessages);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/search', fetchuser, async (req, res) => {
  const search = req.body.search;
  const messages = req.body.messages;

  const filteredData = messages?.filter((msg) => {
    return search?.toLowerCase() === " "
      ? msg
      : msg.text.toLowerCase().includes(search)
  })
  res.json(filteredData);
})

router.post('/messages',fetchuser, async(req,res)=>{
    const senderId = req.body.sender;
    try{
      const conversations = await ChatModel.find({
      sender: senderId
      })
      res.send({ status: 200,conversations})
    }
    catch(err){
      console.log(err);
    }
})

router.get('/getUserById', fetchuser, async (req, res) => {
  try {
      const {userId} = req.query
      const finalUser =  await User.findById(userId)
      // console.log('PROD',finalUser)
      res.send({ status: 200,finalUser })
  } catch (err) {
      console.error(err.message)
      res.status(500).send("Internal server error occured")
  }
})

// router.get('/pagination', (req,res)=>{
//   try{

//     const {data,page=1 , pageSize=10}= req.query;
//     if(!data || !Array.isArray(data)){
//       throw new Error("DATA ARRAY NOT PROVIDED")
//     }
//     console.log("MESSAGES FROM PAGE",data);
//     const start = (page-1)*pageSize;
//     const end = page*pageSize;
//     const newData = data.slice(start, end);
  
//     res.json({
//       data: newData,
//       currentPage: parseInt(page),
//       totalPage : Math.ceil(data.length/pageSize)
//     })
//   }
//   catch(err){
//     console.log(err);
//   }
// })
module.exports = router
