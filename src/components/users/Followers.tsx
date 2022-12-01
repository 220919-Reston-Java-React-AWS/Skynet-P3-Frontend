import { apiGetFollowers } from '../../remote/social-media-api/users';
import { IUser } from '../../models/AllUsers';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';
import { List, ListItem } from '@mui/material';

const Following = () => {
  const [followersList, setFollowersList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await apiGetFollowers();
        setFollowersList(result.payload);
      }
    };
    fetchData();
  }, [user]);

  if (followersList.length === 0) {
    return (
      <List>
        <ListItem>No followers huh? Sad.</ListItem>
      </List>
    );
  }
  return (
    <List>
      {followersList.map((followers: IUser) => {
        return <ListItem key={followers.id}>{followers.firstName}</ListItem>;
      })}
    </List>
  );
};

export default Following;
