import { Box, Button, Container, Grid, Link } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { IUser } from '../../models/AllUsers';
import socialClient from '../../remote/social-media-api/socialClient';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { apiGetUser } from '../../remote/social-media-api/auth.api';
import { apiNewFollow } from '../../remote/social-media-api/users';

const AllUsers = () => {
  const baseURL = '/users';

  const [users, setUsers] = useState(<></>);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    function newFollow(i: number) {
      apiNewFollow(i).then(() => {
        apiGetUser().then((response) => {
          setUser(response.payload);
        });
      });
    }

    function getAll(a: IUser[]) {
      const list = a.map((a) => {
        return (
          <Grid
            container
            item
            xs={12}
            md={6}
            lg={3}
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
              <Button onClick={() => newFollow(a.id)}>
                <AddCircleIcon></AddCircleIcon>
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
  }, [setUser]);

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
