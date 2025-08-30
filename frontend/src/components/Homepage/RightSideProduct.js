import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export function RightSideProduct() {

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
    return (<>
    {pageLoaded?<>
        <Card sx={{
            width: '450px', height: '450px', margin: 'auto', fontWeight: 'bold', padding: '20px', backgroundColor: '#f9f9f9',
            border: '1px solid black',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}>

            <Typography variant="h5" component="h2" sx={{ marginBottom: '35px' }}>
                Details of Product:
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                <strong>Material:</strong> Made from natural clay and glazed for durability and aesthetic appeal.
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                <strong>Craftsmanship:</strong> Each piece is handcrafted by tribal artisans, showcasing traditional techniques and artistry.
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                <strong>Design:</strong> Features unique patterns and colors that reflect the cultural heritage of the artisans' community.
            </Typography>
            <Typography variant="body1" component="p">
                <strong>Functionality:</strong> Perfect for serving food, displaying decor, or as a collectible art piece.
            </Typography>
        </Card>


        <Card sx={{
            width: '450px', height: '450px', margin: 'auto',
            backgroundColor: '#f9f9f9',
            border: '2px solid gold',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
        }}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[4].name}</Typography>
                    <CardMedia
                        component="img"
                        height="250"
                        image={'http://localhost:4000/images/' + product[4].images[0]}
                        alt="Product Image"
                    />
                </CardContent>
                <CardContent>
                    <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
                        The tribal pottery set embodies traditional craftsmanship.</Typography>
                </CardContent>
            </React.Fragment>
        </Card></>:'loading'}
                            </>
    )
}