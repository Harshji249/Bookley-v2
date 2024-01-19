import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


export default function Messages() {
    const loginUserState = useSelector((state) => state.loginUserState);

    const [userId, setUserId] = useState(loginUserState?.userDetails[0]?.user?._id);

    console.log(userId)
    const [uniqueReceiverIds, setUniqueReceiverIds] = useState([]);
    const [msgdata, setmsgData] = useState([]);
    const isMounted = useRef(true);
//   const [userId, setUserId] = useState(loginUserState?.userDetails[0]?.user?._id);
   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    sender: userId
                }
                console.log("Inside fetchData - payload:", payload);
                const res = await axios.post('http://localhost:3000/api/chat/messages', payload, {
                    headers: {
                        'auth-token': localStorage.getItem('authtoken')
                    }
                });

                if (isMounted.current) {
                    setmsgData(res?.data?.conversations);
                    // console.log("ALL IDS", msgdata);
                    const allReceiverIds = res?.data?.conversations?.map(item => item.receiver);
                    const uniqueIds = Array.from(new Set(allReceiverIds));
                    setUniqueReceiverIds(uniqueIds);
                }
                // setmsgData(res?.data?.conversations);
                // const allReceiverIds = msgdata.map(item => item.receiver);
                // const uniqueIds = Array.from(new Set(allReceiverIds));
                // setUniqueReceiverIds(uniqueIds);
            } catch (error) {
                console.log("ERROR", error);
            }
        };
            fetchData();
        return () => {
            isMounted.current = false; // Set isMounted to false when the component is unmounted
        };
    }, [userId]);




    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios.get(`http://localhost:3000/api/chat/getUserById?userId=64b7fb6cf69f3c75489a7ff3`, {
    //             headers: {
    //                 'auth-token': localStorage.getItem('authtoken')
    //             }
    //         })
    //         console.log("Name of reciever", res)
    //         setRecieverName(res.data?.finalUser?.name)
    //     };

    //     fetchData(); // Call the async function immediately

    // }, []);

    return (
        <>
            {
                uniqueReceiverIds.map((item) => {
                    return (
                        <>
                            <Typography>
                                {item}
                            </Typography>
                        </>
                    )
                })
            }
        </>
    )
}