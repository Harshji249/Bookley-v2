import { useSelector, useDispatch } from "react-redux";
// import { fetchAllProducts } from "./HomeSlice";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import "./navbar.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from "react";
import { Container, Typography, Box, TextField, Card, Button } from "@mui/material";

function Navbar({ setSearch }) {
  const navigate = useNavigate();
  // const [search,setSearch]= useState("");
  const handleLogout = () => {
    localStorage.removeItem("authtoken")
    navigate("/")
    window.location.reload();
  }
  return (
    <>
      <Container >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",mt:2 }}>
          <Typography component={RouterLink} to={'/home'} sx={{fontFamily:"Jost",textDecoration:"none",color:"#3A3674", fontWeight:"bold", fontSize:"32px", cursor:"pointer"}}>Bookley</Typography>
          <TextField onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Search for anything" variant="outlined" sx={{ fontFamily:"Jost",bgcolor:"white",width: "600px",boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)", borderRadius:2 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <Button sx={{ fontFamily:"Jost",width:"9em"}} variant="contained" onClick={handleLogout}>Log Out</Button>
          </Box>
        </Box>
      </Container>
            
    </>
  )
}

export default Navbar