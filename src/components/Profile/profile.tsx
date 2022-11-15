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
                                <h4 style={{ textAlign: 'center' }} id="profile-header">
                                   Name
                                </h4>
                            <div style={{ textAlign: 'center' }}>
                            {info.firstName} {info.lastName}
                            </div>
                            </Grid>
                            <Grid item>
                                <h4 style={{ textAlign: 'center' }} id="profile-header">
                                    Username
                                </h4>
                                <div style={{ textAlign: 'center' }}>
                                {info.username}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container id="bio-container" justifyContent="center" direction="column" alignItems="center">
                            <Grid item>
                            <h4 style={{ textAlign: 'center' }} id="profile-header">
                                    Bio
                                </h4>
                                <div>
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
            </Grid>
        </>
        
    );
}

export default Profile;