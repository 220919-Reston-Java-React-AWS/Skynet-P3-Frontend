import { Button, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../models/AllUsers";
import socialClient from "../../remote/social-media-api/socialClient";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const AllUsers = () => {
  const baseURL = "/users";
  const baseURL1 = "/users/follow";

  const [users, setUsers] = useState(<></>);
  // const { user } = useContext(UserContext);
  function newFollow(id: number) {
    socialClient.post(`${baseURL1}`, { id: { id } }).then((response) => {
      console.log(response.data);
    });
  };

  function getAll(a: IUser[]) {
    const list = a.map((a) => {
      return (
        <Grid
          container
          item
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
              <AddCircleIcon onClick={() => newFollow(a.id)}></AddCircleIcon>
            </Button>
          </Grid>
        </Grid>
      );
    });
    return list;
  }

  useEffect(() => {
    socialClient.get(`${baseURL}`).then((response) => {
      console.log(response);
      setUsers(
          <Grid container direction="row" spacing={8}>
            {getAll(response.data)}
          </Grid>
      );
    });
  }, []);

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
