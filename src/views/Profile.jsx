import React from 'react'
import { useNavigate } from 'react-router-dom';


const Profile = () => {
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

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    // curl -X 'DELETE' \
    // 'https://hw22-api-deployment.onrender.com/mechanics/7' \
    // -H 'accept: application/json' \
    // -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNzQ0MzUsImlhdCI6MTc2MTE3MDgzNSwic3ViIjoiMTMifQ.hM2ftSwh40ZsCFYFaXxLdkXuQUUeLkhJq_f2jXRw_Eo'
    async function deleteProfile(){
        const response = await fetch(`https://hw22-api-deployment.onrender.com/mechanics/${profile.id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.ok) {
            alert("Profile deleted successfully.");
            localStorage.removeItem('token');
            navigate('/');
        } else {
            alert("Failed to delete profile.");
        }
    }
    if (confirmDelete) {
      deleteProfile();
    }
  }

  return (
    <div className='container'>
      <div className='row'>
      <div className='col text-center me-2'> 
        
      {profile ? (
        <>
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>Salary: ${profile.salary}</p>
          <button className='btn btn-primary me-2' onClick={() => navigate('/update')}>Update Profile</button>
          <button className='btn btn-danger me-2' onClick={(e) => handleDelete(e)}>Delete</button>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
      </div>
        <div className='col text-center me-2'>
          <img 
            src={`https://eu.ui-avatars.com/api/?name=${profile?.first_name || 'John'}+${profile?.last_name || 'Doe'}&size=250&background=random&rounded=true&bold=true&color=ffffff`}
            alt={`Avatar`}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile