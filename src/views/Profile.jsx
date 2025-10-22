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
      <div className='row'>
      <div className='col text-center me-2'> 
      {profile ? (
        <div className="profile-details">
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>Salary: ${profile.salary}</p>
          <button className='btn btn-primary' onClick={() => navigate('/update')}>Update Profile</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      </div>
        <div className='col text-center me-2'>
          <img
            src={`https://avatar.iran.liara.run/username?username=${profile?.first_name || 'John'}+${profile?.last_name || 'Doe'}`}
            alt="Profile Avatar"
          />
        </div>
      </div>
    </div>
  )
}

export default profile