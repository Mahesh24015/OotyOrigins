import NavBar from "../../Assets/NavBar/NavBar";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, CardMedia, Grid2, Typography, Grid, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import explorecategories from '../../components/Explorecategories/Explorecategories.css'
import item_product_1 from '../../Assets/images/item_product_1.png'
import item_product_2 from '../../Assets/images/item_product_2.png'
import item_product_3 from '../../Assets/images/item_product_3.png'
import item_product_4 from '../../Assets/images/item_product_4.png'
import item_product_5 from '../../Assets/images/item_product_5.png'
import item_product_6 from '../../Assets/images/item_product_6.png'
import item_product_7 from '../../Assets/images/item_product_7.png'
import item_product_8 from '../../Assets/images/item_product_8.png'
import item_product_9 from '../../Assets/images/item_product_9.png'
import item_product_10 from '../../Assets/images/item_product_10.png'
import scroll1 from '../../Assets/images/scroll1.png'
import scroll2 from '../../Assets/images/scroll2.png'
import scroll3 from '../../Assets/images/scroll3.png'
import scroll4 from '../../Assets/images/scroll4.png'
import scroll5 from '../../Assets/images/scroll5.png'
import scroll6 from '../../Assets/images/scroll6.png'
import scroll7 from '../../Assets/images/scroll7.png'
import './HomePage.css';
import choose from '../../Assets/images/choose.png'
import { Categories } from "./Categories";
import { LeftSideProduct, WoodCarvedElephant } from "./LeftSideProduct";
import { RightSideProduct } from "./RightSideProduct";



function HomePage() {

    const [categories, setcategories] = useState([]);
    const [product, setproduct] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data);
            console.log("categories calls ", res.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);


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
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="HeroSection">

                <div className="header">
                    <div class="bg-image"></div>
                    <div className="header-container">
                        <Box class="text" sx={{ color: 'white', mb: 3.5, mt: 3.5 }}>Ooty Origins</Box>
                        <Box sx={{ color: 'white', fontWeight: 'bold' }}>
                            <h3>Experience the rich heritage and culture of Ooty through our tribal crafts and products.</h3>
                        </Box>
                    </div>

                </div>
            </div>
            <Container sx={{ padding: '.5% 0 0 0' }}>
                <h2 className="shop" style={{ textAlign: 'left' }}>Shop by Category</h2>
                <hr className="solid" />
            </Container>
            <div>
                <ul >
                    <Categories categories={categories}></Categories>
                </ul>


                <Box
                    sx={{
                        background: 'rgb(0, 0, 0)',
                        padding: '30px',
                        marginTop: '50px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgb(0, 0, 0)',
                    }}
                >
                    <Typography variant="h2" color='red' align="center" gutterBottom>
                        <b>Ooty Stories</b>
                    </Typography>
                    <div style={{ height: "5px" }} ></div>
                    <div className="slider-container">
                        <section id="image-carousel" aria-label="Beautiful Images">
                            <Splide
                                options={{
                                    type: 'loop',
                                    autoplay: true,
                                    interval: 2500,
                                    pauseOnHover: false,
                                    pagination: true,

                                }}
                            >
                                <SplideSlide>
                                    <img src={scroll1} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll2} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll3} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll4} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll5} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll6} style={{ width: "100%" }} />
                                </SplideSlide>
                                <SplideSlide>
                                    <img src={scroll7} style={{ width: "100%" }} />
                                </SplideSlide>
                            </Splide>
                        </section>
                    </div>
                </Box>


                <Container sx={{ padding: '20px 0' }}>
                    <Box
                        sx={{
                            background: 'rgb(255, 255, 255)',
                            padding: '30px',
                            marginTop: '50px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgb(235, 224, 224)',
                        }}
                    >
                        <Typography variant="h4" color='black' align="center" gutterBottom>
                            <b>About Ooty Origins</b>
                        </Typography>
                        <Typography variant="h6" align="center">
                            <span class="bold-black">OotyOrigins.com</span> is an ecommerce platform that empowers the tribal communities  of Ooty, India, by connecting them directly with customers and tourists. We pride ourselves on delivering factory-fresh products from Ooty.Enjoy the unique and authentic taste and experience every product.
                        </Typography>
                    </Box>
                </Container>


                <Container sx={{ padding: '5px 0' }}>
                    <Box
                        sx={{
                            background: 'rgb(61, 8, 8)',
                            padding: '30px',
                            marginTop: '100px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgb(71, 15, 15)',
                            width: '100%',
                            height: '450px',
                        }}
                    >
                        <p className="steps"><h2>Steps-To-Order</h2></p>
                        <img src={choose} style={{ padding: '14px', width: "80%" }} />
                    </Box>
                </Container>

                <div style={{ height: "80px" }} ></div>
                {
                    pageLoaded && (
                        <Grid2 container spacing={2} sx={{ width: '100%' }} >
                            <LeftSideProduct>

                            </LeftSideProduct>

                            <RightSideProduct>
                                
                            </RightSideProduct>

                        </Grid2>
                    )
                }

            </div>

        </>
    )
}


export default HomePage;