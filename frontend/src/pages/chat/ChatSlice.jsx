// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  activeUsers: [], // Initialize activeUsers as an empty array
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setSocket, setActiveUsers } = socketSlice.actions;
export const selectSocket = (state) => state.socket.socket;
export const selectActiveUsers = (state) => state.socket.activeUsers; // Add selector for activeUsers

export default socketSlice.reducer;