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
                const res = await axios.post('https://bookley-v2.onrender.com/api/chat/messages', payload, {
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
            } catch (error) {
                console.log("ERROR", error);
            }
        };
            fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [userId]);

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