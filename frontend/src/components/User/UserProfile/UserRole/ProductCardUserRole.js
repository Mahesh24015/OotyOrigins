import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";


export function ProductCardUserRole(props) {
    const item = props.item
    return (
        <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
            <Grid container columns={4}>
                <Grid size={2}> <p style={{ color: 'black' }}>{item.name}</p> </Grid>
                <Grid size={2}> <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p> </Grid>
            </Grid>
            <h5>Collect {item.name} at {item.uploaderAddress && item.uploaderAddress.street}</h5>
        </Card>
    );
}