import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "http://localhost:3000/api/product/addproduct";
// const authToken = localStorage.getItem('authtoken');

const initialState = {
    productDetails: [],
    productStatus: "",
    productError: ""

}

export const addproduct = createAsyncThunk("product/addproduct", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL,user, {
            headers: {
                'auth-token': localStorage.getItem('authtoken')
            }
        });
        return response?.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
});
const AddSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {},
    extraReducers: {
        [addproduct.pending]: (state, action) => {
            return {
                ...state,
                productStatus: "pending",
                productError: ""

            }
        },
        [addproduct.fulfilled]: (state, action) => {
            return {
                ...state,
                productDetails: [action.payload, ...state.productDetails],
                productStatus: "success",
                productError: ""

            }
        },
        [addproduct.rejected]: (state, action) => {
            return {
                ...state,
                productStatus: "rejected",
                productError: action.payload

            }
        },
    }
})

export default AddSlice.reducer;
