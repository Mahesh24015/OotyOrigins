import { Accordion, AccordionDetails, AccordionSummary, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductCardUserRole } from "./ProductCardUserRole";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export function ProductAccordionUserRole(props) {
    const index = props.index;
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Grid size="grow"> <h3>Order ID</h3></Grid>
                <Grid size="grow"><p>{index.orderId}</p></Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid key={index.orderId}> {/* Added key prop for list items */}
                    <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                        {index.products.map((item) => (
                            <ProductCardUserRole item={item} />
                        ))}
                        <Grid container columns={4} spacing={4}>
                            <Grid size={2}> {index.paymentMethod} </Grid>
                            <Grid size={2}> {index.totalAmount} </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}