import { Button, TextField } from "@mui/material"
import Grid from "@mui/material/Grid2"
import Axios from "axios";
import React from "react";
export function NavLogin(props) {
    const [Username, setUsername] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const submitLogin = () => {
        if (Username && Password) {
            console.log("vls are not empty");
            Axios.post('http://localhost:4000/login', { username: Username, password: Password }).then(res => {
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", res.data, res);
                const data = res.data;
                localStorage.setItem('Token', data.jwtToken);
                props.setToken(data.jwtToken);
                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', res.data.userId);
                props.store.getState().userId = data.userId;
                const user = {// Implement a function to generate a unique user ID
                    username: props.formData.username,
                    email: props.formData.email,
                    password: props.formData.password, // Implement a function to hash the password
                    address: {
                        street: props.formData.street,
                        city: props.formData.city,
                        state: props.formData.state,
                        zipcode: props.formData.zipcode,
                    },
                    phone: props.formData.phone,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                user.username = data.username;
                props.setsnackMessage("Log in Succesfull!");
                props.handleClicksnack();

                // window.location.reload();
            }).catch(function (error) {
                console.log(error);
                props.setsnackMessage("Login Failed! Try Again");
                props.handleClicksnack();
            })
        }
        else {
            console.log("vals are empty");
            props.setsnackMessage("Please Enter All The Details !");
            props.handleClicksnack();
        }
    };
    return (<>
        <form className="form">
            <Grid container sx={{ width: '100%' }} justifyContent="center">
                <Grid item >
                    <TextField required sx={{ margin: 'auto', display: 'block', width: '100%', padding: '5px' }} onChange={(event) => { props.setUsername(event.target.value) }} label="Username" variant="outlined" />
                    <TextField type='password' required sx={{ margin: 'auto', display: 'block', width: '100%', padding: '5px' }} onChange={(event) => { props.setPassword(event.target.value) }} label="Password" variant="outlined" />
                </Grid>
            </Grid>
            <Button className='button-89' sx={{ margin: 'auto', display: 'block' }} onClick={submitLogin} variant="contained" style={{ backgroundColor: '#616161' }}>
                Log In
            </Button>
        </form></>
    )
}