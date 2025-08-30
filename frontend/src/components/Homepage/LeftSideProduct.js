import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export function LeftSideProduct() {

    const [pageLoaded, setPageLoaded] = useState(false);
    const [product, setproduct] = useState([]);



    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("products calls ", res.data);
            setPageLoaded(true);
            return product;
        }).catch(function (error) {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <Card sx={{
                width: '450px', height: '450px', margin: 'auto',
                backgroundColor: '#f9f9f9',
                border: '2px solid gold',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }} >
                {pageLoaded?<React.Fragment>
                    <CardContent>
                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[5].name}</Typography>
                        <CardMedia
                            component="img"
                            height="250"
                            image={'http://localhost:4000/images/' + product[5].images[0]}
                            alt="Product Image"
                        />

                    </CardContent>
                    <CardContent >
                        <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
                            The wooden carved elephant is a symbol of intricate tribal artistry.</Typography>
                    </CardContent>
                </React.Fragment>:'loading'}
            </Card>
            <Card
                sx={{
                    width: '450px', height: '450px', margin: 'auto', fontWeight: 'bold', padding: '20px', backgroundColor: '#f9f9f9',
                    border: '1px solid black',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}>

                <Typography variant="h5" component="h2" sx={{ marginBottom: '35px' }}>
                    Details of Product:
                </Typography>
                <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                    <strong>Material:</strong> Crafted from high-quality, sustainably sourced wood.
                </Typography>
                <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                    <strong>Craftsmanship:</strong> Each elephant is hand-carved by skilled artisans, using age-old techniques passed down through generations.
                </Typography>
                <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                    <strong>Design:</strong> The intricate patterns often depict tribal motifs that reflect the rich heritage of the artisans' communities.
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Size and Finish:</strong> Available in various sizes, with a smooth, polished finish that enhances the natural beauty of the wood.
                </Typography>
            </Card>
        </div>
    );
}
