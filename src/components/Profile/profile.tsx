import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socialClient from "../../remote/social-media-api/socialClient";

const Profile = () => {

    const [profile, setProfile] = useState(<></>)
    const baseURL = '/profile';
    
    useEffect(() => {
        
        socialClient.get(`${baseURL}`)
            .then((response) => {
                console.log(response.data);
                let info = response.data
                setProfile(
                    <Container maxWidth='xl'>
                         <Grid container justifyContent="center" direction="column" alignItems="center">
                            <Grid item id="profile-box">
                                <img src={info.pic} id="profile-pic"/>
                            </Grid>
                        </Grid>
                         <Grid container justifyContent="space-evenly" 
                        direction="row"
                        alignItems="center"
                        spacing={12}
                        >
                            <Grid item>
                                <h1 style={{ textAlign: 'center' }} id="profile-header">
                                   Name
                                </h1>
                            <div id="info" style={{ textAlign: 'center' }}>
                            {info.firstName} {info.lastName}
                            </div>
                            </Grid>
                            <Grid item>
                                <h1 style={{ textAlign: 'center' }} id="profile-header">
                                    Username
                                </h1>
                                <div id="info" style={{ textAlign: 'center' }}>
                                {info.username}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container id="bio-container" justifyContent="center" direction="column" alignItems="center">
                            <Grid item>
                            <h1 style={{ textAlign: 'center' }} id="profile-header">
                                    Bio
                                </h1>
                                <div id="info" style={{ textAlign: 'center' }} >
                                {info.about}
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                       
                )
    });
}, []);
    
    
    
    return (
        <>
            <h1 style={{ textAlign: 'center' }} id="profile-page">Profile Page</h1>
            {profile}
            <Grid container justifyContent={'flex-end'} alignItems="center" direction="column">
            <Grid item>
            <Link to={'/'}>Back to posts</Link>
            </Grid>
            <Grid item>
            <Link to={'/update'}>Update Profile</Link>
            </Grid>
            <Grid item>
            <Link to={'/users'}>See all users</Link>
            </Grid>
            </Grid>
        </>
        
    );
}

export default Profile;