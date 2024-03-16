import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "https://bookley-v2.onrender.com/api/bidding/mybids";

const initialState = {
    products: [],
    fetchStatus: "",
    fetchError: ""
};

export const fetchMyProducts = createAsyncThunk(
    "bidding/mybids",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(baseURL, {
                headers: {
                    'auth-token': localStorage.getItem('authtoken')
                }
            });
            console.log(response.data)
            return response.data.bidding            ;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateBids = createSlice({
    name: "mybids",
    initialState,
    reducers: {
        updateBids: (state, action) => {
            state.products = action.payload;
            state.fetchStatus = "success";
            state.fetchError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProducts.pending, (state, action) => {
                state.fetchStatus = "pending";
                state.fetchError = "";
            })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                state.products = action?.payload                // Update this line
                state.fetchStatus = "success";
                state.fetchError = "";
            })
            .addCase(fetchMyProducts.rejected, (state, action) => {
                state.fetchStatus = "rejected";
                state.fetchError = action.payload;
            });
    },
});

export const { updateBids: updateBidsAction } = updateBids.actions;
export const selectMyBids = (state) => state.mybids.products;

export default updateBids.reducer;