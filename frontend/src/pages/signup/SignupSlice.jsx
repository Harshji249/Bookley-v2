import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "http://localhost:3000/api/auth";

const initialState = {
    userDetails: [],
    SignupStatus: "",
    SignupError: ""

}

export const createuser = createAsyncThunk("auth/createuser", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(baseURL + "/createuser", user)
        return response?.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})
const SignupSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {},
    extraReducers: {
        [createuser.pending]: (state, action) => {
            return {
                ...state,
                SignupStatus: "pending",
                SignupError: ""

            }
        },
        [createuser.fulfilled]: (state, action) => {
            return {
                ...state,
                userDetails: [action.payload, ...state.userDetails],
                SignupStatus: "success",
                SignupError: ""

            }
        },
        [createuser.rejected]: (state, action) => {
            return {
                ...state,
                SignupStatus: "rejected",
                SignupError: action.payload

            }
        },
    }
})

export default SignupSlice.reducer;
