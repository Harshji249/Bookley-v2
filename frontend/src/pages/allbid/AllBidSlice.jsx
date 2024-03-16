import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const baseURL = "https://bookley-v2.onrender.com/api/bidding/fetchallbid";


const initialState = {
    products: [],
    fetchStatus: "",
    fetchError: ""

}

export const fetchAllProducts = createAsyncThunk("bidding/fetchallbid", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(baseURL, {
            headers: {
                'auth-token': localStorage.getItem('authtoken')
            }
        })
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})
const AllBidSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllProducts.pending]: (state, action) => {
            return {
                ...state,
                fetchStatus: "pending",
                fetchError: ""

            }
        },
        [fetchAllProducts.fulfilled]: (state, action) => {
            return {
                ...state,
                products: [action.payload, ...state.products],
                fetchStatus: "success",
                fetchError: ""

            }
        },
        [fetchAllProducts.rejected]: (state, action) => {
            return {
                ...state,
                fetchStatus: "rejected",
                fetchError: action.payload

            }
        },
    }
})

export default AllBidSlice.reducer;
