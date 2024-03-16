import { useSelector, useDispatch } from "react-redux";
import { fetchMyProducts, updateBooksAction } from "./MybookSlice";
import './mybooks.css';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, Card, Button, Modal, Tooltip, Snackbar,Alert } from "@mui/material";
import Navbar from "../navbar/Navbar";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Mydash from "../mydash/mydash";


export default function Mybook() {

    const dispatch = useDispatch();
    const host = "https://bookley-v2.onrender.com";
    const [snackopen, setSnackopen] = useState(false);
    const [search, setSearch] = useState("");
    const loginUserState = useSelector((state) => state.loginUserState);
    const mybookState = useSelector((state) => state.mybookState);
    const productsState = useSelector((state) => state.productsState);
    const navigate = useNavigate();
    const mybooks = mybookState?.products;
    const vertical = "top"
    const horizontal = "right"

    useEffect(() => {
        dispatch(fetchMyProducts());
    }, []);
    const handleCloseSnack = () => {
        setSnackopen(false);
    }


    const editBook = async (id, name, category, price) => {
        try {
            const response = await axios.put(`${host}/api/product/updateproduct/${id}`, { name, category, price }, {
                headers: {
                    'auth-token': localStorage.getItem('authtoken')
                }
            });

            console.log(response.data);

            let newBooks = JSON.parse(JSON.stringify(mybooks))
            for (let index = 0; index < newBooks.length; index++) {
                const element = newBooks[index];
                if (element._id === id) {
                    newBooks[index].name = name;
                    newBooks[index].category = category;
                    newBooks[index].price = price;
                    break;
                }
            }
            console.log('Before dispatch:', newBooks);
            dispatch(updateBooksAction(newBooks));
            console.log('After dispatch:', mybookState?.products);


        } catch (error) {
            console.error('Error editing book:', error.message);
        }
    };


    const [formData, setFormData] = useState({
        id: '',
        ename: '',
        ecategory: '',
        eprice: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const updateBook = (book) => {
        setOpen(true)
        setFormData({ id: book._id, ename: book.name, ecategory: book.category, eprice: book.price })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        editBook(formData.id, formData.ename, formData.ecategory, formData.eprice)
        setOpen(false)
        setSnackopen(true);

    }
    console.log("MY BOOKS", mybooks.length)
    return (
        <>
            <Container maxWidth={false}>
                <Navbar setSearch={setSearch} />
                <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer", float:"left", position:"relative", left:"60px", top:"30px"}} />
                <Snackbar anchorOrigin={{ vertical, horizontal }} open={snackopen} autoHideDuration={3000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="success" sx={{fontFamily:"Jost", width: '100%' }}>
                        Book Edited Successfully
                    </Alert>
                </Snackbar>
                <Mydash totalBooks={mybooks.length}/>
                <Typography sx={{ fontSize: "48px", my: 3, fontFamily: "Jost" }}>My Books</Typography>
                <Box sx={{ pt: 3, pb: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                    {mybooks?.filter((product) => {
                        return search.toLowerCase() === ""
                            ? product
                            : product.name.toLowerCase().includes(search)
                    })?.map((book) => {
                        return (
                            <>
                            <Card sx={{height:"288px", width:"191px", p:2, my:2}}>
                            <img style={{ height: "189px", width: "118px" }} src={`http://localhost:3000/${book.file}`} alt="" />
                            <Tooltip title={book?.name}>
                            <Typography sx={{fontSize:"20px", fontFamily:"Jost",textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                            {book?.name}
                            </Typography>
                            </Tooltip>
                            <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-around",mt:2 }}>
                            <Typography sx={{fontSize:"16px", fontFamily:"Jost", color:"#2FCC63"}}>
                            Rs.{book?.price}
                            </Typography>
                            <Box sx={{display:"flex", alignItems:"center" }}>
                                <Tooltip title="Edit">
                            <EditRoundedIcon onClick={() => updateBook(book)} sx={{mx:1, color:"#02B8DA", cursor:"pointer"}}/>
                                </Tooltip>
                                <Tooltip title="Delete">
                            <DeleteRoundedIcon sx={{mx:1, color:"#FF0303", cursor:"pointer"}}/>
                                </Tooltip>
                            </Box>
                            </Box>
                            </Card>
                            </>
                        )
                    })}
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit} >
                            <Box sx={{ my: 2 }}>
                                <TextField sx={{ width: 300 }} id="outlined-basic" label="Name of the book" variant="outlined" name="ename"
                                    value={formData.ename}
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </Box>
                            <Box sx={{ my: 2 }}>

                                <TextField sx={{ width: 300 }} id="outlined-basic" label="Category of the book" variant="outlined" name="ecategory"
                                    value={formData.ecategory}
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </Box>
                            <Box sx={{ my: 2 }}>

                                <TextField sx={{ width: 300 }} id="outlined-basic" label="Price" variant="outlined" name="eprice"
                                    value={formData.eprice}
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </Box>
                            <Button type="submit" variant="contained" sx={{ fontFamily: "Jost", my: 3, mr: 15, width: "10rem", height: "2rem" }}>EDIT BOOK</Button>
                        </form>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}