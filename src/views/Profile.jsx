import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (token) {
      async function fetchProfile() {
        const response = await fetch(
          'https://hw22-api-deployment.onrender.com/mechanics/profile',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
          console.log('Fetched profile:', data);
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
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    );

    async function deleteProfile() {
      const response = await fetch(
        `https://hw22-api-deployment.onrender.com/mechanics/${profile.id}`,
        {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (response.ok) {
        alert('Profile deleted successfully.');
        localStorage.removeItem('token');
        navigate('/');
      } else {
        alert('Failed to delete profile.');
      }
    }

    if (confirmDelete) {
      deleteProfile();
    }
  };

  return (
    <div className="container">
      <div className="row">
        
        <div className="col text-center me-2">
          <div className="small-container">
            {profile ? (
              <>
                <h1>
                  {profile.first_name} {profile.last_name}
                </h1>
                <p>Email: {profile.email}</p>
                <p>Address: {profile.address}</p>
                <p>Salary: ${profile.salary}</p>
                <button className="btn btn-primary me-2" onClick={() => navigate('/update')} > Update Profile </button>
                <button className="btn btn-danger me-2" > Delete </button>
              </>
            ) : (
              <p>Loading profile or Missing Token...</p>
            )}
          </div>
        </div>

        <div className="col text-center me-2">
          <div style={{ margin: '20px' }}>
            <img
              src={`https://avatar.iran.liara.run/public/boy?username=${
                profile?.first_name || 'John'
              }+${profile?.last_name || 'Doe'}`}
              alt="Profile Avatar"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;