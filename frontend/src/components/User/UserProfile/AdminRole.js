import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Axios from "axios";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import store from "../../../Store";
import MyProducts from "../../Admin/MyProducts";

export function AdminRole(props) {
    const [adminpproductsActive, setadminpproductsActive] = React.useState([]);
    const [deliveredproducts, setdeliveredproducts] = React.useState([]);
    const [product, setproduct] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
            setAdminProductsList(res.data[0]);
            store.getState().user = res.data;
        }).catch(function (error) { console.log(error); });
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("get products is ", res.data);
            console.log(localStorage.getItem('Token'));
            setAdminProductsList(res.data);
            if (localStorage.getItem('Token') === '') navigate("/");
        }).catch(function (error) { console.log(error); });
    }, []);



    const setAdminProductsList = (products) => {
        if (!userload.IsUser) {
            Axios.post('http://localhost:4000/post/SellerOrders', { "userId": localStorage.getItem("userId") }).then(res => {
                var prdcts = [];
                var deliverProducts = [];

                res.data.forEach(ite => {
                    if (ite.status === "Pending") prdcts.push(ite);
                    else deliverProducts.push(ite);
                });
                console.log('pendingggggggggggggggggggggggg',res.data,res.data.filter(i=> i.status==="Pending"));

                setdeliveredproducts(deliverProducts);
                setadminpproductsActive(prdcts);

                var filteredprdts = [];
                products.filter((ele) => ele.uploadedBy === localStorage.getItem("userId")).forEach(element => {
                    filteredprdts.push(element);
                });

                res.data.filter(ite => { return ite.productId === "p01"; });
            }).catch(error => { console.log(error) });
        }
    };

    const SellerOrderClicked = (params) => {
        navigate('/AdminDashboard', { state: params });
    };

    const userload = props.userload;
    const username = props.username;
    return (
        <>
            {!userload.IsUser && <>
                < Grid container maxWidth="xl" spacing={2}>
                    < Grid size="grow">
                        < p style={{ color: 'black' }}>Pending Orders</p>
                        {adminpproductsActive.length !== 0 && adminpproductsActive.map((index) => (<>
                            < div onClick={() => SellerOrderClicked(index)}>
                                < Grid >
                                    < Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                                        {index.username}

                                        {/* Product Details */}
                                        {index.products.map((item) => (
                                            <>
                                                {/* Product Card */}
                                                < Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                                                    {/* Product Info */}
                                                    < Grid container columns={4}>
                                                        {/* Product Name and Price */}
                                                        < Grid size={2}>
                                                            < p style={{ color: 'black' }}>{item.name}</p>
                                                        </ Grid >
                                                        {/* Product Price */}
                                                        < Grid size={2}>
                                                            < p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                                                        </ Grid >
                                                    </ Grid >
                                                </ Card >
                                            </>
                                        ))}

                                        {/* Payment Method and Total Amount */}
                                        < Grid container columns={4} spacing={4}>
                                            {/* Payment Method */}
                                            < Grid size={2}>
                                                {index.paymentMethod}
                                            </ Grid >
                                            {/* Total Amount */}
                                            < Grid size={2}>
                                                {index.totalAmount}
                                            </ Grid >
                                        </ Grid >
                                    </ Card >
                                </ Grid >
                            </ div >
                        </>
                        ))}

                        {/* No Pending Products Message */}
                        {adminpproductsActive.length === 0 && ("No Products")}

                        {/* Delivered Products Header */}
                        < p style={{ color: 'black' }}>Delivered Products</ p >

                        {/* Delivered Products List */}
                        {
                            deliveredproducts.length !== 0 && deliveredproducts.map((index) => (<>
                                {/* Order Card for Delivered Products */}
                                {
                                    /* Clickable Div */
                                    (<div onClick={() => SellerOrderClicked(index)}>
                                        {/* Card for Each Order */}
                                        {
                                            /* Card for Each Order */
                                            (<Card style={{
                                                margin: 'auto',
                                                marginBottom: "15px",
                                                marginTop: "15px"
                                            }}>
                                                {
                                                    /* Username */
                                                    (<>{index.username}
                                                        {
                                                            /* Product Details */
                                                            index.products.map((item) => (
                                                                <>
                                                                    {
                                                                        /* Product Card */
                                                                        (<Card sx={3} style={{
                                                                            width: '75%',
                                                                            margin: 'auto',
                                                                            marginBottom: "15px",
                                                                            marginTop: "15px"
                                                                        }}>
                                                                            {
                                                                                /* Product Info */
                                                                                (< Grid container columns={4} >
                                                                                    {
                                                                                        /* Product Name */
                                                                                        (< Grid size={2} >< p style={{ color: 'black' }}>{item.name}</ p ></ Grid >)
                                                                                    }
                                                                                    {
                                                                                        /* Product Price */
                                                                                        (< Grid size={2} >< p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</ p ></ Grid >)
                                                                                    }
                                                                                </Grid>
                                                                                )}
                                                                        </Card>
                                                                        )}
                                                                </>
                                                            ))
                                                        }
                                                    </>
                                                    )}
                                                {
                                                    /* Payment Method and Total Amount */
                                                    (< Grid container columns={4} spacing={4} >
                                                        {
                                                            /* Payment Method */
                                                            (< Grid size={2} >{index.paymentMethod}</ Grid >)
                                                        }
                                                        {
                                                            /* Total Amount */
                                                            (< Grid size={2} >{index.totalAmount}</ Grid >)
                                                        }
                                                    </Grid>
                                                    )}
                                            </Card>
                                            )}
                                    </div>
                                    )}
                            </>
                            ))}

                        {
                            /* No Delivered Products Message */
                            deliveredproducts.length === 0 && ("No Products")
                        }
                    </Grid>
                    <Grid size="grow">
                        <Box>Welcome, {userload.username}</Box>
                        <Typography>Your Products</Typography>
                        <Paper>
                            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 4, md: 5 }}>
                                {
                                    /* Filtering User's Uploaded Products */
                                    product
                                        .filter((ele) => ele.uploadedBy === localStorage.getItem("userId"))
                                        .map((index) => (
                                            <Grid size={{ xs: 1, sm: 2, md: 2 }} key={index.name}>
                                                <div onClick={() => {
                                                    console.log("clicked", index);
                                                    index.prdId = index.productId;
                                                    navigate('/productDetail', { state: index })
                                                }}>
                                                    <MyProducts name={index.name} src={index.images[0]} stock={index.stock} />
                                                </div>
                                            </Grid>
                                        ))
                                }
                            </Grid>

                            <Box>
                                <Button variant="contained" onClick={() => navigate('/Addproduct')}>
                                    Add product
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </>
            }
        </>
    )
}