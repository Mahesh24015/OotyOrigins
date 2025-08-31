import React, { useEffect } from "react";
import NavBar from "../../../Assets/NavBar/NavBar";
import Axios from 'axios';
import { Box, Container, Paper, Typography, Button, Card } from "@mui/material";
import store from '../../../Store';
import './UserProfile.css'
import { UserRole } from "./UserRole";
import { AdminRole } from "./AdminRole";

function Userprofile() {
  const [username, setusername] = React.useState("");
  const [user, setuser] = React.useState(null);
  const [userload, setuserload] = React.useState("");


  React.useEffect(() => {
    Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
      setusername(localStorage.getItem("username"));
      setuserload(res.data[0]);
      store.getState().user = res.data;
      setuser(res.data[0]);
    }).catch(function (error) { console.log(error); });
  }, []);


  

  return (<>
    <NavBar />
    <Container maxWidth="xl">
      {userload.IsUser && <UserRole userload={userload} username={username} user={user} /> }
      {!userload.IsUser && <AdminRole userload={userload} username={username} user={user} /> }
    </Container>
  </>
  );
}

const styles = {
  inputBox: {
    padding: 2,
    borderRadius: 2,
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
  },
  sectionTitle: {
    marginTop: 2,
    marginBottom: 1,
    color: "#555",
  },
};

export default Userprofile;