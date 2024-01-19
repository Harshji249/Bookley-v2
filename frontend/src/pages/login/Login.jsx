import { useSelector, useDispatch } from "react-redux";
import { login } from './LoginSlice'
// import "./login.css"
// import { useNavigate } from "react-router-dom";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeScreen from "../home/Home";
import { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import image from "../../../public/assets/BOOKLEY.png"
import group from "../../../public/assets/group1.png"
import group2 from "../../../public/assets/group2.png"
import group3 from "../../../public/assets/group3.png"
import { useEffect } from "react";

export default function Login({ userDetails, setUserDetails }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loginUserState = useSelector((state) => state.loginUserState);
  const loginUserState = useSelector((state) => state.loginUserState);
  // console.log("STATE", loginUserState?.userDetails[0]?.authToken)
  // console.log("STATE", loginUserState)

  useEffect(() => {
    if (loginUserState.loginStatus === "success") {
      console.log("Success login")
      const token = loginUserState?.userDetails[0]?.authToken;

      localStorage.setItem("authtoken", token)
      navigate('/home');

    }
  }, [loginUserState.loginStatus, navigate]);
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const submitData = async (e) => {
    e.preventDefault();

    // localStorage.setItem("TEST", "hello")
    const user = {
      ...userDetails
    }
    dispatch(login(user));

    setUserDetails({
      email: "",
      password: "",
    });

  };


  return (
    <>
      <Container maxWidth={false} sx={{ backgroundImage: `url(${group})`, backgroundRepeat: "no-repeat", backgroundPosition: "0 0" }}>

        <Box sx={{borderRadius:"100px 100px 100px 300px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)", height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${group2})`, backgroundRepeat: "no-repeat", backgroundPosition: "75rem 17rem" }}>
          <Box sx={{ display: "flex" }}>
            <Box >
              <img
                src="/assets/coldlake.png" alt="" style={{ height: "400px" }} />
            </Box>
            <Box sx={{ position: "relative", top: "100px", right: "100px" }}>
              <img
                src="/assets/novel2.png" alt="" style={{ height: "400px" }} />
            </Box>
          </Box>
          <form onSubmit={submitData}>
            <Box>
              <Typography variant="h4" sx={{color:"#3A3674", fontWeight:"bold",fontFamily: 'Jost'}}>Bookley</Typography>
              <Box>
                <Typography variant="h5" sx={{fontFamily: 'Jost'}}>Login to your account</Typography>
                <Box sx={{ my: 3 }}>
                  <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Email Address" variant="outlined" name="email"
                    value={userDetails.email}
                    onChange={(e) => handleChange(e)}
                    required />
                </Box>
                <Box sx={{ my: 3 }}>
                  <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Password" variant="outlined" name="password"
                    value={userDetails.password}
                    onChange={(e) => handleChange(e)}
                    required
                    type="password" />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{mr:8}}>
                    <Button type="submit" variant="contained">LOGIN</Button>
                    {/* <button style={}> Login </button> */}
                  </Box>
                  <Box>
                    <Button variant="outlined" component={RouterLink} to={"/signup"}>
                      Create Account
                    </Button>
                    {/* <Button variant="outlined" component={RouterLink} to={"/signup"}>CREATE ACCOUNT</Button> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>


    </>
  )
}
