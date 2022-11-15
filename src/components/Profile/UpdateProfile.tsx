import { Box, Grid, TextField, Button } from "@mui/material"
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import socialClient from "../../remote/social-media-api/socialClient";

const UpdateProfile = () => {

    const { user, setUser } = useContext(UserContext);
    const baseURL = '/profile/update';
    const navigate = useNavigate();

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const info = new FormData(e.currentTarget);
        socialClient.patch(`${baseURL}`, {
            username: info.get('username'),
            img: info.get('pic'),
            about: info.get('about')
        })
        .then((response) => {
            console.log(response);
            window.sessionStorage.setItem('userData', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/profile');
        });
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} id="update-profile">
             <h1 style={{ textAlign: 'center' }} id="profile-page" >
                Update Profile
            </h1>
            <Grid container spacing={2} id="update-profile" >
              <Grid item xs={6}>
                <TextField
                  defaultValue={user?.username}
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                defaultValue={user?.about}
                  required
                  fullWidth
                  id="about"
                  label="About"
                  name="about"
                  autoComplete="about"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={user?.pic}
                  required
                  fullWidth
                  id="pic"
                  label="Image Link"
                  name="pic"
                  autoComplete="pic"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="warning"
            >
              Submit
            </Button>
            </Box>
    )

}
export default UpdateProfile;

function then(arg0: (response: any) => void) {
    throw new Error("Function not implemented.");
}
