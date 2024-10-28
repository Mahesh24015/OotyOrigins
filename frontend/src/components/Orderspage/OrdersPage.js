import React, { useEffect, useState } from "react";
import NavBar from "../../Assets/NavBar";
import { Box, Typography,  Container, Divider } from "@mui/material";
import Axios from "axios";
import CartProduct from "../../components/CartPage/Cartproducts";


function OrdersPage() {
    const [profile, setProfile] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // Fetch user profile
        Axios.get('http://localhost:4000/user/profile', { params: { userId: localStorage.getItem("userId") } })
            .then(response => {setProfile(response.data); console.log(response)})
            .catch(error => console.log("Error fetching profile: ", error));

        // Fetch order items (cart items)
        Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") })
            .then(res => setOrderItems(res.data[0].products))
            .catch(error => console.log("Error fetching cart items: ", error));
    }, []);


    // Function to save the order in the database
    const saveOrderToDatabase = (products) => {
        const orderData = {
            userId: localStorage.getItem("userId"),
            products: products,
            orderId: Math.random().toString(36).substr(2, 9).toUpperCase(), // Generate Order ID
            // You can add more order details here if needed
        };

        Axios.post('http://localhost:4000/orders/create', orderData)
            .then(response => {
                setOrderId(orderData.orderId); // Set the order ID
                console.log("Order saved successfully: ", response.data);
            })
            .catch(error => console.log("Error saving order: ", error));
    };


    return (
        <>
            <NavBar />
            <Container maxWidth="md" >
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4">Buy Success</Typography>
                    <Typography variant="h6">Order ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ background: '#f5f5f5', p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h6">Customer Profile</Typography>
                    <Typography>Name: {profile.name}</Typography>
                    <Typography>Email: {profile.email}</Typography>
                    <Typography>Address: {profile.address}</Typography>
                </Box>

                {orderItems.map((item, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                        <CartProduct name={item.product.name} price={item.product.price} quantity={item.quantity} />
                    </Box>
                ))}
            </Container>
        </>
    );
}

export default OrdersPage;

