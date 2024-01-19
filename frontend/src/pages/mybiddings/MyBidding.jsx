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
    const host = "http://localhost:3000";
    const mybidState = useSelector((state) => state.mybidState);
    const mybids = mybidState?.products;


    useEffect(() => {
        dispatch(fetchMyProducts());
    }, []);
    useEffect(() => {
        console.log("MYBIDSTATE",mybids)
    }, [mybidState]);

    // const editBid = async (id, name, category, price) => {
    //     try {
    //         const response = await axios.put(`${host}/api/bidding/updatebid/${id}`, { name, category, price }, {
    //             headers: {
    //                 'auth-token': localStorage.getItem('authtoken')
    //             }
    //         });

    //         console.log(response.data);

    //         let newBids = JSON.parse(JSON.stringify(mybids))
    //         for (let index = 0; index < newBids.length; index++) {
    //             const element = newBids[index];
    //             if (element._id === id) {
    //                 newBids[index].name = name;
    //                 newBids[index].category = category;
    //                 newBids[index].price = price;
    //                 break;
    //             }
    //         }
    //         console.log('Before dispatch:', newBids);
    //         dispatch(updateBidsAction(newBids));
    //         console.log('After dispatch:', mybidState?.products);


    //     } catch (error) {
    //         console.error('Error editing book:', error.message);
    //     }
    // };
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