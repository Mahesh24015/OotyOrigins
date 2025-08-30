import { Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { OrderCardItem } from "./OrderCardItem";
import { CardOrderhead } from "./CardOrderHead";

export function OrdersCard(props)
{
    const index = props.index;
    
    return (
            <div>
                <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                  
                  <CardOrderhead username={index.username} orderId={index.orderId}></CardOrderhead>

                  {index.products.map((item) => (
                    <OrderCardItem item={item}></OrderCardItem>
                  ))}

                  <Grid container columns={4} spacing={4}>
                    <Grid size={2}> {index.paymentMethod} </Grid>
                    <Grid size={2}> {index.totalAmount} </Grid>
                  </Grid>
                </Card>
            </div>
    )
}