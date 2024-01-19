import { useSelector, useDispatch } from "react-redux";
import { createuser } from './SignupSlice'
import HomeScreen from "../home/Home";
// import "./signup.css"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import group from "../../../public/assets/group1.png";
import group2 from "../../../public/assets/group2.png"
import { useEffect } from "react";



export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupUserState = useSelector((state) => state.signupUserState);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (signupUserState.SignupStatus === "success") {
      console.log("Success SIGNUP")
      navigate('/home');
    }
  }, [signupUserState.SignupStatus, navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      ...formData
    }
    dispatch(createuser(user));
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
          <Container maxWidth={false} sx={{ backgroundImage: `url(${group})`, backgroundRepeat: "no-repeat", backgroundPosition: "0 0" }}>

            <Box sx={{borderRadius:"100px 100px 100px 300px", boxShadow: "0 0 10px 5px rgba(0,0,0,0.3)",  height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${group2})`, backgroundRepeat: "no-repeat", backgroundPosition: "75rem 17rem" }}>
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
              <form onSubmit={handleSubmit}  >
                <Box>
                  <Typography  variant="h4" sx={{color:"#3A3674", fontWeight:"bold",fontFamily: 'Jost'}}>Bookley</Typography>
                  <Box>
                    <Typography variant="h5" sx={{fontFamily: 'Jost'}}>Create a new account</Typography>
                    <Box sx={{ my: 3 }}>
                      <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Name" variant="outlined" name="name" value={formData.name}
                        onChange={(e) => handleChange(e)}
                        required />
                    </Box>
                    <Box sx={{ my: 3 }}>
                      <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Email Address" variant="outlined" name="email" value={formData.email}
                        onChange={(e) => handleChange(e)}
                        type="email"
                        required />
                    </Box>
                    <Box sx={{ my: 3 }}>
                      <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Password" variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                        required
                        type="password"
                      />
                    </Box>
                    <Box sx={{ display: "inline-block" }}>
                      <Box>
                        <Button  type="submit" variant="contained">SIGNUP</Button>
                      </Box>
                      <Box sx={{ my: 2 }}>
                        <Button variant="outlined" component={RouterLink} to={"/login"}>ALREADY HAVE AN ACCOUNT</Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </form>
            </Box>
          </Container>
  )
}
