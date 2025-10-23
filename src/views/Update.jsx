import React from 'react'
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

  const formSubmit = (e) =>{
    e.preventDefault();
    console.log("Form", first, last, address);
    console.log(e);
    // curl -X 'PUT' \
    //   'https://hw22-api-deployment.onrender.com/mechanics/7' \
    //   -H 'accept: application/json' \
    //   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNTE5ODQsImlhdCI6MTc2MTE0ODM4NCwic3ViIjoiNyJ9.mg2b0SF7LNfHpUTAt9WsADid4RKkBnISbsihEhuqUcg' \
    //   -H 'Content-Type: application/json' \
    //   -d '{
    //   "address": "456 Elm St, Springfield, IL 62701",
    //   "email": "bolts@gmail.com",
    //   "first_name": "Jane",
    //   "last_name": "Smith",
    //   "password": "securepassword",
    //   "salary": 55000
    // }'
    async function postData(){
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
            const updatedProfile = await response.json();
            alert("Profile updated successfully!");
            navigate('/profile');
        } else {
            console.error("Failed to update profile");
        }
    }
    postData();
  }
  return (
    <div className='container'>
      <div className='row'>
      <div className='col-12 col-xxl-6'> 
      <div className='small-container'>
        <h1 className='text-center'>Update Profile</h1>
        
      {profile ? (
        <form onSubmit={(e)=> formSubmit(e)}>

            {/* First Name input */}
            <div className="mb-2">
                <input type="text" 
                  className="form-control" 
                  id="first" 
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder='John' required></input>
                <label className="form-label">First Name</label>
            </div>

            {/* Last Name input */}
            <div className="mb-2">
                <input type="text" 
                  className="form-control" 
                  id="last" 
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  placeholder='Doe' required></input>
                <label className="form-label">Last Name</label>
            </div>


            {/* Address input */}
            <div className="mb-2">
                <input type="text" 
                  className="form-control" 
                  id="address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='123 Mulholland Drive, Los Angeles, CA' required></input>
                <label className="form-label">Address</label>
            </div>

            {/* Submit button */}
            <button  type="submit" className="btn btn-primary">Submit</button>

            
        </form>
      ) : (
        <p>Loading profile...</p>
      )}
      </div>
</div>
        <div className='col-12 col-xxl-6'>
          <div className='text-center me-2' style={{margin: '20px'}}>
          <img 
            src={`https://eu.ui-avatars.com/api/?name=${profile?.first_name || 'John'}+${profile?.last_name || 'Doe'}&size=250&background=random&rounded=true&bold=true&color=ffffff`}
            alt={`Avatar`}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update