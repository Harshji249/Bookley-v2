import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./HomeSlice";
import { useEffect } from "react";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productsState = useSelector((state) =>state.productsState)
    useEffect(()=>{
        dispatch(fetchAllProducts())
        console.log("All products",productsState.products)
    },dispatch)
    return (
        <>
        <h1>Logged in</h1>
        </>
    )
}