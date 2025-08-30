import React, { useEffect, useState } from "react";
import NavBar from "../../Assets/NavBar/NavBar";
import { Box, Typography, Container, Divider, Card } from "@mui/material";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2'
import { OrdersCard } from "./OrdersCard";


function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [UserPrdIds, setUserPrdIds] = React.useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      await setUserProductList();
      setOrderId(location.state.orderId);
      setLoading(false);
    })();
  }, []);

  const setUserProductList = () => {
    Axios.post('http://localhost:4000/post/userOrders', { "userId": localStorage.getItem("userId") }).then(res => {
      setUserPrdIds(res.data.filter(i => i.orderId == location.state.orderId)
        .filter(i => i.userId === localStorage.getItem("userId"))
      );
    }).catch(function (error) { console.log(error); });
  };

  return (
    <><NavBar />
      {loading ? 'Order Loading . . . ' : 
        <Container maxWidth="md" >
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4">Buy Success</Typography>
            <Typography variant="h6">Order ID: {orderId}</Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          {UserPrdIds.length > 0 && UserPrdIds.map((order) => (
            <>
              <Grid key={order.orderId}>
                <OrdersCard index={order} ></OrdersCard>
              </Grid>
            </>
          ))}
        </Container>
      }


    </>
  );
}

export default OrdersPage;