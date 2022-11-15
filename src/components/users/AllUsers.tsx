import {Container, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import { IUser } from "../../models/AllUsers";
import socialClient from "../../remote/social-media-api/socialClient";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const baseURL = "/users";
    const  [users, setUsers] = useState(<></>);

    function getAll(a:IUser[]) {
   
        const list = a.map((a) => {
        return(
            <Grid container item justifyContent="center" direction="column" alignItems="center" id="mini-box" key={a.id}>
                <Grid item id="mini-profile-box">
                    <img src={a.pic} />
                </Grid>
                <Grid item>
                    {a.firstName} {a.lastName}
                </Grid>
                <Grid item>
                    {a.username}
                </Grid>
                <Grid item>
                    {a.about}
                </Grid>
            </Grid>
        )})
        return (list);
    };

    useEffect(() => {
        socialClient.get(`${baseURL}`)
        .then((response) => {
           console.log(response);
           setUsers(
                <Grid container spacing={4} justifyContent={"center"}>
                {getAll(response.data)}
                </Grid>
           )
        })
    }, []);

    return (
        <>
        <h1 id="profile-page" style={{ textAlign: 'center' }}>All Users</h1>
        <Container>
        {users}
        </Container>
        <div style={{ textAlign: 'center' }}>
        <Link to={'/'}>Back to your post feed</Link>
        </div>
        </>    
    );
};

export default AllUsers