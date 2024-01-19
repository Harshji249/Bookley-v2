import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box, Typography, TextField, Button, Divider, Card, Container } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import image from "../../../public/assets/BOOKLEY.png"
import group from "../../../public/assets/group1.png"
import group2 from "../../../public/assets/group2.png"
import group3 from "../../../public/assets/group3.png"

export default function Landing() {
    return (
        <>
        <Container maxWidth={false} sx={{backgroundImage:`url(${group})`,backgroundRepeat:"no-repeat", backgroundPosition: "0 0"}}>
            <Typography variant="h3" sx={{fontFamily:"Jost",color:"#3A3674", fontWeight:"bold"}}>BOOKLEY</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", borderRadius: "100px 300px 100px 300px", mt: 5,   boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)", p:5,backgroundImage:`url(${group2})`,backgroundRepeat:"no-repeat", backgroundPosition: "75rem 0" }}>
                <Box sx={{ mt: 3 }}>
                    <Typography sx={{fontFamily:"Jost",fontSize:"40px"}}>One Bookstore,</Typography>
                    <Typography sx={{fontFamily:"Jost",fontSize:"40px"}}> Infinite Possibilities</Typography>
                    <Box >
                        <Box>
                            <Button sx={{fontFamily:"Jost", width: "150px", my: 1, borderRadius: 2 }} variant="contained" component={RouterLink} to={"/signup"} >SIGNUP</Button>
                        </Box>
                        <Box>
                            <Button sx={{fontFamily:"Jost", width: "150px", my: 1, borderRadius: 2 }} variant="contained" component={RouterLink} to={"/login"}>LOGIN</Button>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", position: "relative", left: "100px" }}>
                        <Box >
                            <img
                                src="/assets/coldlake.png" alt="" style={{ height: "400px" }} />
                        </Box>
                        <Box sx={{ position: "relative", top: "100px", right: "100px" }}>
                            <img
                                src="/assets/novel2.png" alt="" style={{ height: "400px" }} />
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Divider sx={{ mt: 10 }} />
            <Box sx={{ my: "50px", height:"100px",backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundPosition:"center" ,backgroundSize: "600px 100px" }}>
                <Typography variant="h5" sx={{fontFamily: 'Jost'}}>Come for a Book,</Typography>
                <Typography variant="h5" sx={{fontFamily: 'Jost'}}>Stay for the Experience</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", my: 3,backgroundImage:`url(${group3})`,backgroundRepeat:"no-repeat", backgroundPosition: "center",backgroundSize: "100% 90%" }}>
                <Card className="box" sx={{ maxWidth: "250px", py: 3, px: 2,cursor:"pointer" }}>
                    <img src="/assets/security.png" alt="" />
                    <Typography sx={{fontFamily: 'Jost'}}>Bookley's robust security shields your passwords and payments, ensuring a safe and secure book-buying experience</Typography>
                </Card>
                <Card className="box" sx={{ maxWidth: "250px", py: 2, px: 2, cursor:"pointer"  }}>
                    <img src="/assets/hammer.png" alt="" />
                    <Typography sx={{fontFamily: 'Jost'}}>Bookley's advanced security safeguards your bidding process, guaranteeing a secure and trustworthy auction experience.</Typography>
                </Card>
                <Card className="box" sx={{ maxWidth: "250px", py: 2, px: 2 , cursor:"pointer" }}>
                    <img src="/assets/chat.png" alt="" />
                    <Typography sx={{fontFamily: 'Jost'}}>Bookley's buyer-seller chat system ensures private, secure communication, fostering trust in your book transactions.</Typography>
                </Card>
            </Box>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Box>
                    <Typography variant="h4" sx={{fontFamily: 'Jost'}}>One Bookstore,</Typography>
                    <Typography variant="h4" sx={{fontFamily: 'Jost'}}>Infinite Possibilities</Typography>
                    <Button variant="contained" component={RouterLink} to={"/login"} sx={{ width: "120px", my: 1, borderRadius: 5 }}>SIGN IN</Button>
                </Box>
                <Box sx={{ display: "flex",position: "relative", left: "150px" }}>
                    <Box >
                        <img
                            src="/assets/coldlake.png" alt=""  style={{ height: "400px" }} />
                    </Box>
                    <Box sx={{ position: "relative", top: "100px", right: "100px" }}>
                        <img
                            src="/assets/novel2.png" alt=""  style={{ height: "400px" }} />
                    </Box>
                </Box>
            </Box>

            <Card sx={{p:10, my:15, backgroundImage:`url(${group}) `,backgroundRepeat:"no-repeat", backgroundPosition: "0 0"}}>
                <Typography sx={{fontFamily: 'Jost'}} variant="h4">Why Bookley?</Typography>
                <Typography sx={{fontSize:"20px", mt:6,fontFamily: 'Jost'}}>At Bookley, we're passionate about books, and we believe in connecting readers with the books they love, all while prioritizing their security and enhancing their shopping experience. We specialize in second-hand books, offering a wide variety of titles, genres, and editions at affordable prices. What sets us apart is our unwavering commitment to the security of our users and the introduction of innovative chatting and bidding systems that elevate your book-buying journey to new heights.</Typography>
            </Card>
            <Box>
            <Typography sx={{fontFamily:"Jost",my:2}} variant="h4">REACH OUT TO US</Typography>
            <TextField sx={{ width: 400 }} id="outlined-basic" label="you're email@gmail.com" variant="outlined" />
            <Typography sx={{fontFamily:"Jost",my:2}}>2023  ©Bookley.  ALL Rights Reserved.</Typography>
            </Box>
            </Container>
        </>
    )
}