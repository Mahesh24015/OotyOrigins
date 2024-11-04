import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Assets/NavBar";
import { Button, Card, Paper } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Axios from "axios";
import './admin.css';

function AdminDashboard() {
    const [totalAmount, settotalAmount] = React.useState(0);
    const [value,setvalue] = React.useState({});
    const location = useLocation();

    const navigate = useNavigate();
    
    const prdcts = location.state.products;
    React.useEffect(() => {
        var total = 0;
        for (var i = 0; i < prdcts.length; i++) {
            console.log(total, prdcts[i].price * prdcts[i].quantity)
            total += (prdcts[i].price * prdcts[i].quantity);
        }
        settotalAmount(total);
        setvalue(location.state);
    console.log(value=={},"ksjhdksajhdkasjhd",value)
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <h1>Admin Dashboard Page</h1>
                <Grid container   alignItems="center">

                    <Paper alignItems="center" justify="center">
                        <Grid container spacing={2} columns={12} >
                            <Grid size={6}>
                                <h2>Username</h2>
                            </Grid>
                            <Grid size={6}>
                                <h2>{value!={} && value.username}</h2>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columns={12} >
                            <Grid size={6}>
                                <h2>Order Id</h2>

                            </Grid>
                            <Grid size={6}>
                                <h2>{value!={} && value.orderId}</h2>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columns={12} >
                            <Grid size={6}>
                                <h2>status</h2>

                            </Grid>
                            <Grid size={6}>
                                <h2>{value!={} && value.status}</h2>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columns={12} >
                            <Grid size={6}>
                                <h2>Products</h2>

                            </Grid>
                            <Grid size={6}>
                                {value.products && value.products.map((item, index) => (
                                    <p style={{color:'black'}}>{item.name} {item.price} X {item.quantity} = {item.price * item.quantity}</p>
                                ))}
                            </Grid>
                        </Grid>
                        <h2>Total Amount</h2>
                        {totalAmount}
                        <br></br>
                        {value!={} && value.status=="Pending" && 
                        <Button variant="contained" className="buttonDeliver"  onClick={()=>{
                            console.log("clicked on delivered");
                            Axios.post("http://localhost:4000/post/DeliverProducts",value).then(res=>{
                                console.log("res is ",res);
                                setvalue(res.data);
                            })
                        }} >Deliver Product</Button>}
                        {value!={} && value.status!="Pending" && "Delivered Succesfully"}
                        <Button onClick={()=>{navigate('/UserProfile')}}>Back</Button>
                    </Paper>
                    
                </Grid>
            </div>
        </>
    )

}

export default AdminDashboard;