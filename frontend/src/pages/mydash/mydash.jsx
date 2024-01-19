import { Container, Box, Card, Typography } from "@mui/material";
// import Navbar from "../navbar/Navbar";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

export default function Mydash({totalBooks}) {
    return (
        <>
            <Container>
                {/* <Navbar /> */}
                <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',my:3}}>
                    <Card sx={{ height: "150px", width: "320px", display: "flex", alignItems: "center",justifyContent:"space-around" }}>
                        <MenuBookRoundedIcon sx={{bgcolor:"#E5F8FC",p:2, borderRadius:10,color: "#37BDF6", fontSize: "76px" }} />
                        <Box>
                            <Typography sx={{fontFamily:"Jost", fontSize: "32px" }}>Total Books</Typography>
                            <Typography sx={{ fontFamily:"Jost",fontSize: "32px", color: "#37BDF6" }}>{totalBooks}</Typography>
                        </Box>
                    </Card>

                    <Card sx={{ height: "150px", width: "320px", display: "flex", alignItems: "center",justifyContent:"space-around" }}>
                        <SellRoundedIcon sx={{ bgcolor:"#FFEEEA",p:2, borderRadius:10,color: "#FF0303", fontSize: "76px" }} />
                        <Box>
                            <Typography sx={{fontFamily:"Jost", fontSize: "32px" }}>Books Sold</Typography>
                            <Typography sx={{fontFamily:"Jost", fontSize: "32px", color: "#FF0303" }}>N/A</Typography>
                        </Box>
                    </Card>

                    <Card sx={{ height: "150px", width: "320px", display: "flex", alignItems: "center",justifyContent:"space-around" }}>
                        <AttachMoneyRoundedIcon sx={{bgcolor:"#CCE6D7",p:2, borderRadius:10, color: "#2FCC63", fontSize: "76px" }} />
                        <Box>
                            <Typography sx={{fontFamily:"Jost", fontSize: "32px" }}>Total Revenue</Typography>
                            <Typography sx={{fontFamily:"Jost", fontSize: "32px", color: "#2FCC63" }}>N/A</Typography>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </>
    )
}