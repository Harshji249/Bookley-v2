"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './login/LoginSlice'
import HomeReducer from './home/HomeSlice'
import LoginScreen from './login/LoginScreen'


const store = configureStore({
  reducer: {
    loginUserState: LoginReducer,
    productsState: HomeReducer,
  }
})

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Provider store={store}>
        <LoginScreen userDetails={userDetails} setUserDetails={setUserDetails} />
      </Provider>
    </>
  )
}
