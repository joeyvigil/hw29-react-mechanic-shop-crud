import React from 'react'
import { useNavigate } from 'react-router-dom';


const profile = () => {
  const [profile, setProfile] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (token) {
      async function fetchProfile() {
        const response = await fetch('https://hw22-api-deployment.onrender.com/mechanics/profile', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
          console.log("Fetched profile:", data);
        } else {
          setProfile(null);
          localStorage.removeItem('token');
        }
      }
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [token, navigate]);

  return (
    <div className='container'>
      {profile ? (
        <div className="profile-details">
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>Salary: ${profile.salary}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}

export default profile