import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socialClient from "../../remote/social-media-api/socialClient";

const Profile = () => {

    const [profile, setProfile] = useState(<div></div>)
    const baseURL = '/profile';
    
    useEffect(() => {
        
        socialClient.get(`${baseURL}`)
            .then((response) => {
                console.log(response.data);
                let info = response.data
                setProfile(
                    <div>
                    <p style={{ textAlign: 'center' }}>
                        {info.firstName} {info.lastName}
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        {info.username}
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        {info.about}
                    </p>
                    <div style={{ textAlign: 'center' }}>
                        <img src={info.pic} />
                    </div>
                    </div>
                )
    });
}, []);
    
    
    
    return (
        <main>
            <h1 style={{ textAlign: 'center' }}>Profile</h1>
            <Link to={'/'}>Back to posts</Link>
            {profile}
        </main>
        
    );
}

export default Profile;