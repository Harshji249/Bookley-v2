import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import "./team.css"
import { Container, Typography, Box, TextField, Card, Button, } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import group from "../../../public/assets/group1.png"
// import group from "../../../public/assets/group1.png"
import group2 from "../../../public/assets/group2.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Team() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const loginUserState = useSelector((state) => state.loginUserState);
    const productsState = useSelector((state) => state.productsState);
    const navigate = useNavigate();
    return (
        <>
            <Container maxWidth={false} >
                <Navbar setSearch={setSearch} />
                <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer", position: "absolute", top: "8rem", left: "15rem" }} />
                <Box sx={{ my: 3 }}>
                    <Typography sx={{ fontSize: "48px", fontFamily: "Jost" }}>
                        Meet Our Team
                    </Typography>

                </Box>
                <Box >
                    <div class="cardm" style={{ left: "30rem", top: "17rem" }}>
                        <div class="card">
                            <img src="/assets/harsh.png" alt="" style={{ height: "200px", position: "relative" }} />
                            <div>
                                <div class="main">Harsh Sharma</div>
                                <div class="mainsub">Lead/FullStack Developer</div>
                            </div>
                        </div>
                        <div class="card2">
                            <div class="upper">
                                <div class="humidity">
                                    <div class="humiditytext">2+ Years of Experience</div>
                                </div>
                            </div>
                            <div class="lower">
                                <div class="aqi">

                                    <div class="aqitext">in web development</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cardm" style={{ right: "5rem", top: "17rem" }}>
                        <div class="card">
                            <img src="/assets/shagufta.png" alt="" style={{ height: "200px", position: "relative", }} />
                            <div>
                                <div class="main">Shagufta</div>
                                <div class="mainsub">UI/UX Developer</div>
                            </div>
                        </div>
                        <div class="card2">
                            <div class="upper">
                                <div class="humidity">
                                    <div class="humiditytext">1 Year of Experience</div>
                                </div>
                            </div>
                            <div class="lower">
                                <div class="aqi">

                                    <div class="aqitext">in UI/UX Development</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="cardm" style={{ left: "30rem", bottom: "3rem" }}>
                        <div class="card">
                            <img src="/assets/dikshit.png" alt="" style={{ height: "200px", position: "relative", }} />
                            <div>
                                <div class="main">Dikshit Kumar</div>
                                <div class="mainsub">Frontend Developer</div>
                            </div>
                        </div>
                        <div class="card2">
                            <div class="upper">
                                <div class="humidity">
                                    <div class="humiditytext">1 Year of Experience</div>
                                </div>
                            </div>
                            <div class="lower">
                                <div class="aqi">

                                    <div class="aqitext">in Frontend Development</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cardm" style={{ right: "5rem", bottom: "3rem" }}>
                        <div class="card">
                            <img src="/assets/srishti.png" alt="" style={{ height: "200px", position: "relative", }} />
                            <div>
                                <div class="main">Srishti Saxena</div>
                                <div class="mainsub">Frontend Developer</div>
                            </div>
                        </div>
                        <div class="card2">
                            <div class="upper">
                                <div class="humidity">
                                    <div class="humiditytext">1 Year of Experience</div>
                                </div>
                            </div>
                            <div class="lower">
                                <div class="aqi">

                                    <div class="aqitext">in Frontend Development</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Container>



        </>
    )
}