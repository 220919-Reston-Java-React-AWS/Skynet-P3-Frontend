import { Box, Button, Container, Grid, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUser } from '../../models/AllUsers';
import socialClient from '../../remote/social-media-api/socialClient';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link as RouterLink } from 'react-router-dom';

const AllUsers = () => {
  const baseURL = '/users';
  const baseURL1 = '/users/follow';

  const [users, setUsers] = useState(<></>);
  // const { user } = useContext(UserContext);
  function newFollow(i: number) {
    socialClient.put(`${baseURL1}`, { userId: i }).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

  useEffect(() => {
    function getAll(a: IUser[]) {
      const list = a.map((a) => {
        return (
          <Grid
            container
            item
            xs={6}
            md={3}
            spacing={1}
            justifyContent='space-evenly'
            direction='column'
            alignItems='center'
            key={a.id}
          >
            <Grid item id='mini-profile-box'>
              <img src={a.pic} alt={a.username} />
            </Grid>
            <Grid item>
              {a.firstName} {a.lastName}
            </Grid>
            <Grid item>{a.username}PokemonLover123</Grid>
            <Grid item id='bio'>
              {a.about}Test bio: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Grid>
            <Grid item>
              <Button>
                <AddCircleIcon onClick={() => newFollow(a.id)}></AddCircleIcon>
              </Button>
            </Grid>
          </Grid>
        );
      });
      return list;
    }
    socialClient.get(`${baseURL}`).then((response) => {
      console.log(response);
      setUsers(
        <Container maxWidth={false} sx={{ p: 4 }}>
          <Grid container spacing={1}>
            {getAll(response.data)}
          </Grid>
        </Container>
      );
    });
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <h1 id='profile-page' style={{ textAlign: 'center' }}>
        All Users
      </h1>
      {users}
      <div style={{ textAlign: 'center' }}>
        <Link component={RouterLink} to={'/'}>
          Back to your post feed
        </Link>
      </div>
    </Box>
  );
};

export default AllUsers;
