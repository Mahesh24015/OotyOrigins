import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Axios from "axios";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import store from "../../../Store";
import { ProductCardUserRole } from "./UserRole/ProductCardUserRole";
import { ProductAccordionUserRole } from "./UserRole/ProductAccordionUserRole";
import { UserHeroCard } from "./UserRole/UserHeroCard";

export function UserRole(props) {
    const [UserPrdIds, setUserPrdIds] = React.useState([]);
    const [user, setuser] = React.useState(props.user);
    const navigate = useNavigate();

    React.useEffect(() => {
        Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
            setUserProductList(res.data[0]);
            store.getState().user = res.data;
            setuser(res.data[0]);
        }).catch(function (error) { console.log(error); });
    }, []);

    const userload = props.userload;
    const username = props.username;

    const handleEditClick = () => {
        navigate('/editprofile');
    };

    const setUserProductList = (userdetails) => {
        Axios.post('http://localhost:4000/post/userOrders', { "userId": localStorage.getItem("userId") }).then(res => {
            setUserPrdIds(res.data.filter(r => r.userId === userdetails.userId).reverse());
        }).catch(function (error) { console.log(error); });
    };

    return (
        <div>
            {userload.IsUser && <>
                <div style={{ height: '100px' }} ></div>
                <div className="boxx" style={{ padding: '20px', borderRadius: '10px' }}>
                    <UserHeroCard user={user} username={username} handleEditClick={handleEditClick} />
                </div>
                <Grid container maxWidth="xl" spacing={2}>
                    <Grid size="grow">
                        <p style={{ color: 'black', fontWeight: 'bold', fontSize: '25px' }}>Receive Orders</p>
                        {/* JSON.stringify(UserPrdIds) */}

                        {UserPrdIds.filter(i => i.status !== "Delivered").map((index) => (
                            <ProductAccordionUserRole index={index} />
                        ))}
                        {UserPrdIds.filter(i => i.status !== "Delivered").length === 0 && "No Products"}
                        <p style={{ color: 'black', fontWeight: 'bold', fontSize: '25px' }}>Delivered Products</p>
                        {UserPrdIds.filter(i => i.status === "Delivered").length !== 0 && UserPrdIds.filter(i => i.status === "Delivered").map((index) => (
                            <ProductAccordionUserRole index={index} />
                        ))}

                        {UserPrdIds.filter(i => i.status === "Delivered").length === 0 && "No Products"}

                    </ Grid>
                </ Grid>
            </>
            }
        </div>
    );
}