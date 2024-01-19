
import Navbar from "../navbar/Navbar";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./AllBidSlice";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Typography, Box, TextField, Card, Button, Tooltip, Snackbar, Alert } from "@mui/material";

export default function AllBid() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const allbidState = useSelector((state) => state.allbidState);
    const allbids = allbidState?.products[0]?.bidding;

    useEffect(() => { console.log("ALLLBIDS",allbidState) }, [allbidState])
    useEffect(() => {
        dispatch(fetchAllProducts());
        // setSnackopen(true);
    }, [])
    return (
        <>
            <Container maxWidth={false}>
                <Navbar setSearch={setSearch}/>
                <ArrowBackIcon onClick={() => navigate(-1)} sx={{cursor:"pointer", position:"absolute", top:"8rem", left:"15rem"}}/>
                <Box sx={{my:3, display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Button sx={{ fontFamily: "Jost", mx:10 }} variant="contained" component={RouterLink} to={"/mybidding" }>My Biddings</Button>
                <Button sx={{ fontFamily: "Jost", mx:10 }} variant="contained" component={RouterLink} to={"/createbid"}>Start A Bidding</Button>
                </Box>
                <Typography sx={{display : allbids?.length === 0 ? "block":"none", fontSize:"30px", fontFamily:"Jost",mt:10 }}>No Bids Available</Typography>
                <Box sx={{ borderRadius: 2, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', pt: 3, pb: 1 }}>

                    {allbids?.filter((product) => {
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
                                </Card>
                            </>
                        )
                    })}
                    {/* </Slider> */}
                </Box>
            </Container>
        </>
    )
}