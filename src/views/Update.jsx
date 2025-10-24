import React from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [profile, setProfile] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [address, setAddress] = React.useState("");

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
          setFirst(data.first_name);
          setLast(data.last_name);
          setAddress(data.address);
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

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form", first, last, address);
    console.log(e);

    async function postData() {
      const response = await fetch(`https://hw22-api-deployment.onrender.com/mechanics/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          address: address,
          password: '',
          email: profile.email,
          salary: profile.salary
        })
      });
      
      if (response.ok) {
        // const updatedProfile = await response.json();
        alert("Profile updated successfully!");
        navigate('/profile');
      } else {
        console.error("Failed to update profile");
      }
    }
    postData();
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-xxl-6'>
          <div className='small-container'>
            <h1 className='text-center'>Update Profile</h1>
            
            {profile ? (
              <form onSubmit={(e) => formSubmit(e)}>
                {/* First Name input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="first" 
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    placeholder='John' 
                    required
                  />
                  <label className="form-label">First Name</label>
                </div>

                {/* Last Name input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="last" 
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    placeholder='Doe' 
                    required
                  />
                  <label className="form-label">Last Name</label>
                </div>

                {/* Address input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='123 Mulholland Drive, Los Angeles, CA' 
                    required
                  />
                  <label className="form-label">Address</label>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            ) : (
              <p>Loading profile or Missing Token...</p>
            )}
          </div>
        </div>
        
        <div className='col-12 col-xxl-6'>
          <div className='text-center me-2' style={{ margin: '20px' }}>
            <img 
              src={`https://avatar.iran.liara.run/public/boy?username=${profile?.first_name || 'John'}+${profile?.last_name || 'Doe'}`} 
              alt="Profile Avatar" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;