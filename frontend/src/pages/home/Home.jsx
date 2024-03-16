import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./HomeSlice";
import "./home.css"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Container, Typography, Box, TextField, Card, Button, Tooltip, Snackbar, Alert, Table, TableRow } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import Navbar from "../navbar/Navbar";
import Chat from "../chat/Chat"
import { useState } from "react";
import axios from "axios";

function Home() {
  const [chat, setChat] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const vertical = "top"
  const horizontal = "right"
  const loginUserState = useSelector((state) => state.loginUserState);
  const productsState = useSelector((state) => state.productsState);
  const navigate = useNavigate();
  const products = productsState?.products[0]?.products;
  const [receiver, setReciever] = useState('');
  const [receiverName, setRecieverName] = useState('');
  const [bookName, setBookName] = useState('');
  const [sender, setSender] = useState('');
  const [snackopen, setSnackopen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log("productsState", products)
  }, [productsState])
  useEffect(() => {

    dispatch(fetchAllProducts());
    setSnackopen(true);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authtoken")
    navigate("/")
  }
  const handleClose = () => {
    setSnackopen(false);
  }

  const handleChatClick = async (product) => {
    // console.log("UPLOADED BY", product?.user)
    const res = await axios.get(`https://bookley-v2.onrender.com/api/product/getUserById?userId=${product?.user}`, {
      headers: {
        'auth-token': localStorage.getItem('authtoken')
      }
    })
    console.log("Name of reciever", res)
    setRecieverName(res.data?.finalUser?.name)
    setBookName(product?.name)
    setReciever(product?.user);
    setSender(loginUserState?.userDetails[0]?.user?._id);
    setChat(true)
  }

  // console.log("All products", products);
  console.log("LOGGED IN USER", loginUserState);
  console.log("LOGGED IN USER ID", loginUserState?.userDetails[0]?.user?._id);
const toggleButton = () =>{
  setChat(!chat)
}
  // console.log("LOCAL TRAGE", localStorage.getItem("authtoken"))
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <>
      {chat ? <Chat toggleButton={toggleButton} bookName={bookName}  receiver={receiver} receiverName={receiverName} /> :

        <Container maxWidth={false} sx={{ bgcolor: "#C3BFF4", overflow: "hidden" }}>
          <Navbar setSearch={setSearch} />
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={snackopen} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ fontFamily: "Jost", width: '100%' }}>
              Loggged In successfully
            </Alert>
          </Snackbar>
          <Box sx={{ display: "flex", borderRadius: 2, alignItems: "center", justifyContent: "space-around", mt: 3, pt: 2, backgroundColor: "#FBF7F3" }}>
            <Typography className="hover-underline-animation" component={RouterLink} to={"/home"} sx={{
              fontFamily: 'Jost',
              p: 2, textDecoration: "none", cursor: "pointer", color: "black", "&:hover": {
                color: "gray",
              },
            }}>Home</Typography>
            <Typography className="hover-underline-animation" component={RouterLink} to={"/team"} sx={{
              fontFamily: 'Jost',
              p: 2, textDecoration: "none", cursor: "pointer", color: "black", "&:hover": {
                color: "gray",
              },
            }}>About Us</Typography>
            <Typography className="hover-underline-animation" component={RouterLink} to={"/mybooks"} sx={{
              fontFamily: 'Jost', p: 2, textDecoration: "none", cursor: "pointer", color: "black", "&:hover": {
                color: "gray",
              },
            }}>My Books</Typography>
            <Typography className="hover-underline-animation" component={RouterLink} to={"/addproduct"} sx={{
              fontFamily: 'Jost', p: 2, textDecoration: "none", cursor: "pointer", color: "black", "&:hover": {
                color: "gray",
              },
            }}>Sell A Book</Typography>

<Typography className="hover-underline-animation" component={RouterLink} to={"/bidding"} sx={{
              fontFamily: 'Jost', p: 2, textDecoration: "none", cursor: "pointer", color: "black", "&:hover": {
                color: "gray",
              },
            }}>Bidding</Typography>

          </Box>
          <Box sx={{ mt: 2, backgroundColor: "#FBF7F3", borderRadius: 2 }}>
            <img
              src="/assets/group13.png" alt="" />
            <Box>
              <Typography sx={{ fontFamily: "Jost", fontSize: "128px", mt: "-80px", color: "#3A3674", fontWeight: "bold" }}>Bookley</Typography>
            </Box>
          </Box>
          <Card sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", height: "100px", width: "280px" }}>
              <MonetizationOnOutlinedIcon />
              <Box sx={{ mx: 2 }}>
                <Typography sx={{ fontFamily: "Jost", fontSize: "20px", color: "#3A3674", fontWeight: 'bold' }}>AFFORDABLE PRICE</Typography>
                <Typography sx={{ fontFamily: "Jost", fontSize: "14px" }}>Discounted Rates</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", height: "100px", width: "280px" }}>
              <EmojiEventsOutlinedIcon />
              <Box sx={{ mx: 2 }}>
                <Typography sx={{ fontFamily: "Jost", fontSize: "20px", color: "#3A3674", fontWeight: 'bold' }}>24 HOURS RETURN</Typography>
                <Typography sx={{ fontFamily: "Jost", fontSize: "14px" }}>100% money-back guarantee</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", height: "100px", width: "280px" }}>
              <CreditCardOutlinedIcon />
              <Box sx={{ mx: 2 }}>
                <Typography sx={{ fontFamily: "Jost", fontSize: "20px", color: "#3A3674", fontWeight: 'bold' }}>SECURE PAYMENT</Typography>
                <Typography sx={{ fontFamily: "Jost", fontSize: "14px" }}>Your money is safe</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", height: "100px", width: "280px" }}>
              <HeadphonesOutlinedIcon />
              <Box sx={{ mx: 2 }}>
                <Typography sx={{ fontFamily: "Jost", fontSize: "20px", color: "#3A3674", fontWeight: 'bold' }}>SUPPORT 24*7</Typography>
                <Typography sx={{ fontFamily: "Jost", fontSize: "14px" }}>Live contact/message</Typography>
              </Box>
            </Box>
          </Card>

          <Typography sx={{ fontSize: "40px", my: 2, color: "#403C74", fontFamily: 'Jost' }}>
            For You
          </Typography>
          <Box sx={{ borderRadius: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', bgcolor: "#FBF7F3", pt: 3, pb: 1 }}>
            {products?.filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search)
            })?.map((product, i) => {
              return (
                <>
                  <Card className="box" key={product?.id}>
                    <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                    <Tooltip title={product.name}>
                      <Typography sx={{ fontFamily: 'Jost', fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                    </Tooltip>
                    <Tooltip title={product.price}>
                      <Typography sx={{ fontFamily: 'Jost ', fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                    </Tooltip>
                    <Button variant="contained" sx={{ fontFamily: "Jost", width: "250px" }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                  </Card>
                </>
              )
            })}
          </Box>
          {products?.some((product) => product.category === "self help") ? (
            <>
              <Typography sx={{ fontSize: "40px", my: 2, color: "#403C74" }}>Self Help</Typography>
              <Box>
                {products?.map((product, i) => {
                  if (product.category.toLowerCase() === "self help") {
                    return (
                      <Card className="box" key={product?.id}>
                        <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                        <Tooltip title={product.name}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                        </Tooltip>
                        <Tooltip title={product.price}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                        </Tooltip>
                        <Button variant="contained" sx={{ width: "250px", fontFamily: "Jost", }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                      </Card>
                    )
                  }
                }
                )
                }
              </Box>
            </>
          ) : ""}
          {/* <Box > */}
          {products?.some((product) => product.category.toLowerCase() === "finance") ? (
            <>
              <Typography sx={{ fontSize: "40px", my: 2, color: "#403C74", fontFamily: "Jost" }}>Finance</Typography>
              <Box sx={{ borderRadius: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', bgcolor: "#FBF7F3", pt: 3, pb: 1 }}>
                {products?.map((product, i) => {
                  if (product.category.toLowerCase() === "finance") {
                    return (
                      <Card className="box" key={product?.id}>
                        <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                        <Tooltip title={product.name}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                        </Tooltip>
                        <Tooltip title={product.price}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                        </Tooltip>
                        <Button variant="contained" sx={{ fontFamily: "Jost", width: "250px" }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                      </Card>
                    )
                  }
                }
                )
                }
              </Box>
            </>
          ) : ""}
          {/* </Box> */}



          {products?.some((product) => product.category.toLowerCase() === "story") ? (
            <>
              <Typography sx={{ fontSize: "40px", my: 2, color: "#403C74", fontFamily: "Jost" }}>Story</Typography>
              <Box sx={{ borderRadius: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', bgcolor: "#FBF7F3", pt: 3, pb: 1 }}>
                {products?.map((product, i) => {
                  if (product.category.toLowerCase() === "story") {
                    return (
                      <Card className="box" key={product?.id}>
                        <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                        <Tooltip title={product.name}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                        </Tooltip>
                        <Tooltip title={product.price}>
                          <Typography sx={{ fontFamily: "Jost", fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                        </Tooltip>
                        <Button variant="contained" sx={{ fontFamily: "Jost", width: "250px" }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                      </Card>
                    )
                  }
                }
                )
                }
              </Box>
            </>
          ) : ""}
          {/* </Box> */}
          {/* <Button component={RouterLink} to={"/chat"} variant="contained" sx={{ height: "300px" }}>chat</Button> */}
          <Typography sx={{fontSize:"24px",my:3 ,fontFamily:"Jost"}}>2023  ©Bookley.  ALL Rights Reserved.</Typography>




          {/* <Box sx={{ borderRadius: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', bgcolor: "#FBF7F3", pt: 3, pb: 1 }}> */}
            {products?.filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search)
            })?.map((product, i) => {
              return (
                <>

                <Table>
                  <TableRow sx={{display:"flex", alignItems:"center", justifyContent:"space-between", my:2}}>
                  <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                  <Tooltip title={product.name}>
                      <Typography sx={{ fontFamily: 'Jost', fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                    </Tooltip>
                    <Tooltip title={product.price}>
                      <Typography sx={{ fontFamily: 'Jost ', fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                    </Tooltip>
                    <Button variant="contained" sx={{ fontFamily: "Jost", width: "250px" }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                  </TableRow>
                  {/* <TableRow>
                  <Typography>Test</Typography>
                  </TableRow>
                  <TableRow>
                  <Typography>Test</Typography>
                  </TableRow> <TableRow>
                  <Typography>Test</Typography>
                  </TableRow> <TableRow>
                  <Typography>Test</Typography>
                  </TableRow> */}
                </Table>
                  {/* <Card className="box" key={product?.id}>
                    <img style={{ height: "180px", width: "200px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)" }} src={`http://localhost:3000/${product.file}`} alt="" />
                    <Tooltip title={product.name}>
                      <Typography sx={{ fontFamily: 'Jost', fontSize: "24px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{product.name}</Typography>
                    </Tooltip>
                    <Tooltip title={product.price}>
                      <Typography sx={{ fontFamily: 'Jost ', fontSize: "18px", color: "green" }}>Rs.{product.price}</Typography>
                    </Tooltip>
                    <Button variant="contained" sx={{ fontFamily: "Jost", width: "250px" }} onClick={() => handleChatClick(product)} >Chat Now</Button>
                  </Card> */}
                </>
              )
            })}
          {/* </Box> */}
        </Container>
      }
    </>
  )
}

export default Home