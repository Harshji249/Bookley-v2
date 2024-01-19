import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "http://localhost:3000/api/auth";

const initialState = {
    userDetails: [],
    loginStatus: "",
    loginError: ""

}

export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL + "/login", user)
        return response?.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})
const LoginSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            return {
                ...state,
                loginStatus: "pending",
                loginError: ""

            }
        },
        [login.fulfilled]: (state, action) => {
            
            return {
                ...state,
                userDetails: [action.payload, ...state.userDetails],
                loginStatus: "success",
                loginError: ""

            }
        },
        [login.rejected]: (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload

            }
        },
    }
})

export default LoginSlice.reducer;
