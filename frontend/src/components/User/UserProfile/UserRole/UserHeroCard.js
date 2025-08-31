import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export function UserHeroCard(props) {
    const user = props.user;
    const username = props.username;
    const handleEditClick = props.handleEditClick;
    return (
        <>
            < Grid container maxWidth="xl" spacing={2} size="grow">
                <Grid size="grow">
                    <Typography variant="h1" gutterBottom style={{ color: "brown" }}>Hi, {username}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" style={{ color: "black", fontWeight: "bold", fontSize: '22px' }}><b>Phone</b>: {user ? user.phone : " "}</Typography>
                    </Box>
                </Grid>
                <Grid size="grow">
                    <Typography variant="h6" style={{ color: "black", fontWeight: "bold", fontSize: '22px' }} gutterBottom sx={{ mt: 3 }}>Address</Typography>
                    < Grid container spacing={6}>
                        {['Street', 'City', 'State', 'Zipcode'].map((label, index) => (
                            < Grid item xs={1} sm={12} key={index}>
                                < Paper className="address-field">
                                    < Typography variant="body2" gutterBottom>{label}</Typography>
                                    < Typography>{user ? user.address[label.toLowerCase()] : ""}</Typography>
                                </ Paper >
                            </ Grid >
                        ))}
                    </ Grid >
                </Grid>
            </ Grid>
            < Button variant="contained" sx={{ backgroundColor: '#b2102f', color: 'white', '&:hover': { backgroundColor: 'darkwhite' } }} onClick={handleEditClick}>
                Edit Profile
            </ Button >
        </>
    )
}