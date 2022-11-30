import { Button, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../models/AllUsers";
import socialClient from "../../remote/social-media-api/socialClient";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const AllUsers = () => {
  const baseURL = "/users";
  const baseURL1 = "/users/follow";
  const baseURL2 = "users/following";

  const [users, setUsers] = useState(<></>);
  // const { user } = useContext(UserContext);
  function follow(i: number) {
    socialClient.put(`${baseURL1}`, { userId: i }).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

  function allUsers() {
    socialClient.get(`${baseURL}`).then((response) => {
      console.log(response);
       return response.data;
    });
  }

  function allFollowing() {
    socialClient.get(`${baseURL2}`).then((response) => {
      console.log(response);
      return response.data;
    });
  }

  useEffect(() => {
    let a;
    let b;
    socialClient.get(`${baseURL}`).then((response) => {
      a = response.data;
    });
    socialClient.get(`${baseURL2}`).then((response) => {
      b = response.data
    })
     setUsers(
               <Container maxWidth={false}>
                 <Grid container spacing={1}>
                 {getAll(a, b)}
               </Grid>
               </Container>
           );
   }, []);

  function getAll(a: IUser[], fwl: IUser[]) {
    const list = a.map((a) => {
      if (fwl.includes(a)) {
        return (
          <Grid
            container
            item
            xs={3}
            spacing={1}
            justifyContent="space-evenly"
            direction="column"
            alignItems="center"
            key={a.id}
          >
            <Grid item id="mini-profile-box">
              <img src={a.pic} />
            </Grid>
            <Grid item>
              {a.firstName} {a.lastName}
            </Grid>
            <Grid item>{a.username}PokemonLover123</Grid>
            <Grid item id="bio">
              {a.about}Test bio: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Grid>
            <Grid item>
              <Button>
                <RemoveCircleIcon
                  onClick={() => follow(a.id)}
                ></RemoveCircleIcon>
              </Button>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid
            container
            item
            xs={3}
            spacing={1}
            justifyContent="space-evenly"
            direction="column"
            alignItems="center"
            key={a.id}
          >
            <Grid item id="mini-profile-box">
              <img src={a.pic} />
            </Grid>
            <Grid item>
              {a.firstName} {a.lastName}
            </Grid>
            <Grid item>{a.username}PokemonLover123</Grid>
            <Grid item id="bio">
              {a.about}Test bio: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Grid>
            <Grid item>
              <Button>
                <AddCircleIcon onClick={() => follow(a.id)}></AddCircleIcon>
              </Button>
            </Grid>
          </Grid>
        );
      }
    });
    return list;
  }

  // function getAll(a: IUser[]) {
  //   const list = a.map((a) => {
  //       return (
  //         <Grid
  //           container
  //           item
  //           xs={3}
  //           spacing={1}
  //           justifyContent="space-evenly"
  //           direction="column"
  //           alignItems="center"
  //           key={a.id}
  //         >
  //           <Grid item id="mini-profile-box">
  //             <img src={a.pic} />
  //           </Grid>
  //           <Grid item>
  //             {a.firstName} {a.lastName}
  //           </Grid>
  //           <Grid item>{a.username}PokemonLover123</Grid>
  //           <Grid item id="bio">
  //             {a.about}Test bio: Lorem ipsum dolor sit amet, consectetur
  //             adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  //             dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
  //             exercitation ullamco laboris nisi ut aliquip ex ea commodo
  //             consequat.
  //           </Grid>
  //           <Grid item>
  //             <Button>
  //               <RemoveCircleIcon
  //                 onClick={() => follow(a.id)}
  //               ></RemoveCircleIcon>
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       );
  //   });
  //   return list;
  // }

  // useEffect(() => {
  //   socialClient.get(`${baseURL}`).then((response) => {
  //     console.log(response);
  //     setUsers(
  //         <Container maxWidth={false}>
  //           <Grid container spacing={1}>
  //           {getAll(response.data)}
  //         </Grid>
  //         </Container>
  //     );
  //   });
  // }, []);

  
  

  return (
    <>
      <h1 id="profile-page" style={{ textAlign: "center" }}>
        All Users
      </h1>
      {users}
      <div style={{ textAlign: "center" }}>
        <Link to={"/"}>Back to your post feed</Link>
      </div>
    </>
  );
};

export default AllUsers;
