// ChatComponent.jsx (React frontend)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import React, { useRef } from 'react';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import './chat.css'
// import moment from 'moment';
import io from 'socket.io-client';
import { setSocket } from './ChatSlice';
import moment from 'moment';
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import decodeToken from '../../Services';
import { Button } from 'react-chat-engine-advanced';


const socketServer = 'http://localhost:3005';

const ChatComponent = ({ toggleButton, receiver, receiverName, bookName }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayData, setDisplayData] = useState([]);
  const scroll = useRef();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const loginUserState = useSelector((state) => state.loginUserState);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(loginUserState?.userDetails[0]?.user?._id);

  useEffect(() => {
    console.log("RES NAME", receiverName)
  }, [receiverName])
  useEffect(() => {
    decodeToken()
      .then((result) => {

        const userId = result?.deCodedToken?.payload?.user.id;
        setUserId(userId);
        recieveMessages(userId)

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => { console.log(loginUserState) }, [loginUserState])
  const recieveMessages = async (id) => {
    const payload = {
      sender: id,
      receiver: receiver
    }
    try {
      const res = await axios.post('https://bookley-v2.onrender.com/api/chat/message', payload, {
        headers: {
          'auth-token': localStorage.getItem('authtoken')
        }
      })
      const allMessages = res?.data?.map((items) => {
        return items
      })

      setMessages(res.data);
    }
    catch (error) {
      console.log("ERROS", error)
    }
  }

  const handleSendMessage = async () => {
    const payload = {
      receiver: receiver,
      sender: userId,
      text: message,
      socketId: socket?.socket?.id,
    }
    try {
      await axios.post('https://bookley-v2.onrender.com/api/chat/createchat', payload, {
        headers: {
          'auth-token': localStorage.getItem('authtoken')
        }
      });
      socket?.socket?.emit("sendMessage", payload);
      console.log(payload)
      setMessages([...messages, payload])
      setMessage('')
      // console.log("PAYLOAD", payload)
    }
    catch (error) {
      console.error('Error sending message:', error);
    }

  }


  useEffect(() => {
    socket?.socket?.on("receiveNewMessage", (res) => {
      setMessages([...messages, res])
    });
  }, [socket, messages]);



  useEffect(() => {
    let newSocket;
    if (userId) {
      // console.log("USER ID", user)
      newSocket = io(socketServer, {
        query: {
          userId: userId,
        },
      });
      dispatch(setSocket(newSocket));
    }

    if (newSocket) {
      return () => {
        console.log("Disconnecting Socket");
        newSocket.disconnect();
      };
    }
  }, [dispatch, userId, socketServer]);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSearch = async () => {
    try {
      const response = await axios.post('https://bookley-v2.onrender.com/api/chat/search', {
        search,
        messages
      }, {
        headers: {
          'auth-token': localStorage.getItem('authtoken')
        }
      });

      setMessages(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>

      <Container>
        {/* <Navbar  /> */}
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Search for anything" variant="outlined" sx={{ fontFamily: "Jost", bgcolor: "white", width: "600px", boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)", borderRadius: 2 }} />
        <Button onClick={handleSearch}>Search</Button>

        {/* <input type="number"
        valaue /> */}
        <ArrowBackIcon onClick={() => toggleButton()} sx={{ cursor: "pointer", position: "absolute", top: "8rem", left: "15rem" }} />
        <Typography sx={{ fontFamily: "Jost", fontSize: "48px", mt: 2 }}>Bookley Chat Window</Typography>
        <Typography sx={{ fontSize: "24px", fontFamily: "Jost", color: "#3A3674" }}>Chatting with : {receiverName}</Typography>
        <Typography sx={{ fontSize: "24px", fontFamily: "Jost", color: "#37BDF6" }}>Regarding : {bookName} </Typography>
        <Box sx={{ bgcolor: "#E8E7F5", maxWidth: "955px", margin: "auto", height: "40vh", padding: "33px", overflowY: "auto", mb: "23px", mt: 2, borderRadius: 10 }}>



          {messages?.map((msg, i) => {
            const formattedTime = moment(msg?.updatedAt).format("h:mm A");
            console.log("msg timing", msg)
            // console.log("Messages", messages)
            return (
              <div ref={scroll} style={{ height: "34%" }} >
                <Box key={i}
                  sx={{ bgcolor: userId === msg.sender ? "#37BDF6" : "#3A3674", width: "24%", padding: "12px", margin: "17px 12px", borderRadius: "20px", float: userId === msg.sender ? "right" : "left", clear: "both", color: "white", fontFamily: "Jost" }}
                >
                  {msg.text}
                </Box>
                <Box key={i}
                  sx={{ borderRadius: "20px", float: userId === msg.sender ? "right" : "left", clear: "both", color: "black", fontFamily: "Jost" }}>{formattedTime}</Box>

              </div>
            )
          })}

        </Box>
        <Box className="send">
          <Box className="sendContainer">
            <TextField
              sx={{
                bgcolor: "#E8E7F5",
                width: "100%",
              }} value={message}

              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              InputProps={{
                endAdornment: (<>
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleSendMessage()}>
                      <HandshakeRoundedIcon sx={{ color: "#3A3674" }} />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleSendMessage()}>
                      <SendIcon sx={{ color: "#3A3674" }} />
                    </IconButton>
                  </InputAdornment>
                </>
                ),
              }} />
          </Box>

        </Box>
      </Container>



    </>
  );
};

export default ChatComponent;

