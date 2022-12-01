import { apiGetFollowing } from '../../remote/social-media-api/users';
import { IUser } from '../../models/AllUsers';
import { useEffect, useState } from 'react';
import { List, ListItem } from '@mui/material';

interface followingProps {
  user: IUser;
}

const Following = (props: followingProps) => {
  const [followingList, setFollowingList] = useState([]);
  const { user } = props;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await apiGetFollowing();
        setFollowingList(result.payload);
      }
    };
    fetchData();
  }, [user]);

  if (followingList.length === 0) {
    return (
      <List>
        <ListItem>Not following anyone.</ListItem>
      </List>
    );
  }
  return (
    <List>
      {followingList.map((following: IUser) => {
        return <ListItem key={following.id}>{following.firstName}</ListItem>;
      })}
    </List>
  );
};

export default Following;
