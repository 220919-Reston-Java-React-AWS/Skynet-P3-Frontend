import { apiGetFollowing } from '../../remote/social-media-api/users';
import { IUser } from '../../models/AllUsers';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';

const Following = () => {
  const [followingList, setFollowingList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await apiGetFollowing();
        setFollowingList(result.payload);
      }
    };
    fetchData();
  }, [user]);

  return (
    <ul>
      {followingList.map((following: IUser) => {
        return <li key={following.id}>{following.firstName}</li>;
      })}
    </ul>
  );
};

export default Following;
