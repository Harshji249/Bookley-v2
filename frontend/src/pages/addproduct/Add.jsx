import React, { useState } from 'react';
import { addproduct } from './AddSlice'
import { useSelector, useDispatch } from "react-redux";
import HomeScreen from "../home/Home";
import { Box, Typography, TextField, Button, Input, Container, Snackbar, Alert } from "@mui/material";
import Navbar from '../navbar/Navbar';
import group from "../../../public/assets/group1.png"
import group2 from "../../../public/assets/group2.png"
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Add = () => {
    const [image, setImage] = useState(null);
    const [snackopen, setSnackopen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addproductState = useSelector((state) => state.addproductState)
    const vertical = "top"
    const horizontal = "right"
    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     console.log("selected file",file)
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setImage(imageUrl);
    //     }
    // };

    const handleClose = () => {
        setSnackopen(false);
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log("selected file", file);
        if (file) {
            setImage(file);
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData1 = new FormData()
        formData1.append('file', image)
        formData1.append('name', formData.name)
        formData1.append('category', formData.category)
        formData1.append('price', formData.price)
        // formData1.append('name', formData.name)

        // const product = {
        //     ...formData,
        //     image
        // }
        dispatch(addproduct(formData1));
        setFormData({
            name: '',
            category: '',
            price: '',
        });
        setImage(null)
        setSnackopen(true);
        const timer = setTimeout(() => {
            navigate("/home")
        }, 2000);
        return () => clearTimeout(timer);

    }

    console.log("TOKEN", localStorage.getItem("authtoken"))


    return (

        <>
            <Container maxWidth={false} sx={{ backgroundImage: `url(${group})`, backgroundRepeat: "no-repeat", backgroundPosition: "0 0" , overflowX:"hidden" }}>
                <Box  sx={{ height:"100vh",width:"100vw",backgroundImage: `url(${group2})`, backgroundRepeat: "no-repeat", backgroundPosition: "75rem 14rem",}}>

                    {/* <Navbar /> */}
                    <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer", position: "absolute", top: "8rem", left: "15rem" }} />
                    <Snackbar anchorOrigin={{ vertical, horizontal }} open={snackopen} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ fontFamily: "Jost", width: '100%' }}>
                            Book uploaded successfully
                        </Alert>
                    </Snackbar>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Box sx={{ my: 15, ml: 25 }}>
                            <Typography variant='h2' sx={{ fontFamily: "Jost", }} >Become A Seller</Typography>
                            <Box >
                                <form onSubmit={handleSubmit} >
                                    <Box sx={{ my: 2 }}>
                                        <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Name of the book" variant="outlined" name="name"
                                            value={formData.name}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </Box>
                                    <Box sx={{ my: 2 }}>

                                        <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Category of the book" variant="outlined" name="category"
                                            value={formData.category}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </Box>
                                    <Box sx={{ my: 2 }}>

                                        <TextField autoComplete='off' sx={{ width: 300 }} id="outlined-basic" label="Price" variant="outlined" name="price"
                                            value={formData.price}
                                            onChange={(e) => handleChange(e)}
                                            required />
                                    </Box>
                                    <Box sx={{ my: 2 }}>
                                        <div class="grid w-full max-w-xs items-center gap-1.5">
                                            <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Picture</label>
                                            <input name="file"
                                                onChange={handleImageChange} id="picture" type="file" class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                                        </div>
                                    </Box>
                                    <Button type="submit" variant="contained" sx={{ fontFamily: "Jost", my: 3, mr: 15, width: "10rem", height: "2rem" }}>ADD BOOK</Button>
                                </form>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Box >
                                <img
                                    src="/assets/coldlake.png" alt="" style={{ height: "350px" }} />
                            </Box>
                            <Box sx={{ position: "relative", top: "100px", right: "100px" }}>
                                <img
                                    src="/assets/novel2.png" alt="" style={{ height: "350px" }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>


    );
};

export default Add;
