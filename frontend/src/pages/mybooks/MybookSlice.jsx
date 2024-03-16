import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "https://bookley-v2.onrender.com/api/product/myproducts";

const initialState = {
  products: [],
  fetchStatus: "",
  fetchError: ""
};

export const fetchMyProducts = createAsyncThunk(
  "product/myproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL, {
        headers: {
          'auth-token': localStorage.getItem('authtoken')
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBooks = createSlice({
    name: "mybook",
    initialState,
    reducers: {
      updateBooks: (state, action) => {
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
            state.products = action.payload.products; // Update this line
            state.fetchStatus = "success";
            state.fetchError = "";
          })
          .addCase(fetchMyProducts.rejected, (state, action) => {
            state.fetchStatus = "rejected";
            state.fetchError = action.payload;
          });
      },
  });
  
  export const { updateBooks: updateBooksAction } = updateBooks.actions;
  export const selectMyBooks = (state) => state.mybook.products;
  
  export default updateBooks.reducer;