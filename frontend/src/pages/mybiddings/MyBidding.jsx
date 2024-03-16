import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { fetchMyProducts, updateBidsAction } from "./MyBiddingSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { fetchAllProducts } from "./AllBidSlice";
import { useEffect } from "react";
import { Container, Typography, Box, TextField, Card, Button, Tooltip, Snackbar, Alert } from "@mui/material";

export default function MyBidding() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const host = "https://bookley-v2.onrender.com";
    const mybidState = useSelector((state) => state.mybidState);
    const mybids = mybidState?.products;


    useEffect(() => {
        dispatch(fetchMyProducts());
    }, []);
    useEffect(() => {
        console.log("MYBIDSTATE",mybids)
    }, [mybidState]);

    return (
        <>
            <Container>
                <Navbar />
                <ArrowBackIcon onClick={() => navigate(-1)} sx={{cursor:"pointer", position:"absolute", top:"8rem", left:"15rem"}}/>
                <Box sx={{my:3}}></Box>
            </Container>
        </>
    )
}