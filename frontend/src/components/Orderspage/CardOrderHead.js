import Grid from '@mui/material/Grid2';

export function CardOrderhead(props) {
    const index = props.index;
    return (
        <div>
            <Grid container maxWidth="xl">
                    <Grid size="grow">
                      <Grid container>
                        <Grid size="grow"> <h3>Username</h3> </Grid>
                        <Grid size="grow"><p>{props.username}</p></Grid>
                      </Grid>
                    </Grid>
                    <Grid size="grow">
                      <Grid container>
                        <Grid size="grow"> <h3>Order ID</h3></Grid>
                        <Grid size="grow"><p>{props.orderId}</p></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
        </div>
    );
}