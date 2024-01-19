import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from '../src/pages/login/LoginSlice'
import SignupReducer from '../src/pages/signup/SignupSlice'
import HomeReducer from '../src/pages/home/HomeSlice'
import AddReducer from '../src/pages/addproduct/AddSlice'
import bidReducer from '../src/pages/bidding/BiddingSlice.jsx'
import AllBidReducer from '../src/pages/allbid/AllBidSlice.jsx'
import MybookReducer from '../src/pages/mybooks/MybookSlice.jsx'
import MybidReducer from '../src/pages/mybiddings/MyBiddingSlice.jsx'
import socketReducer from '../src/pages/chat/ChatSlice.jsx'
import App from './App.jsx'
import './index.css'


const store = configureStore({
  reducer: {
    loginUserState: LoginReducer,
    signupUserState: SignupReducer,
    productsState: HomeReducer,
    addproductState: AddReducer,
    mybookState: MybookReducer,
    socket: socketReducer,
    bidState : bidReducer,
    allbidState : AllBidReducer,
    mybidState:MybidReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>
)
