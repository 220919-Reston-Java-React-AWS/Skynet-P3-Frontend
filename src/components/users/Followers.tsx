import { apiGetFollowers } from '../../remote/social-media-api/users';
import { IUser } from '../../models/AllUsers';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';

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

  return (
    <ul>
      {followersList.map((followers: IUser) => {
        return <li key={followers.id}>{followers.firstName}</li>;
      })}
    </ul>
  );
};

export default Following;
