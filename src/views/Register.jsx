import React from 'react'
import { useNavigate } from 'react-router-dom';

const register = () => {
  const navigate = useNavigate();
    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("Form", first, last, email, password, repeatPassword, address);
        console.log(e);
        if (password !== repeatPassword) {
            alert("Passwords do not match!");
            return;
        }

        async function postData(){
            const response = await fetch('https://hw22-api-deployment.onrender.com/mechanics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: first,
                    last_name: last,
                    email: email,
                    password: password,
                    address: address,
                    salary: 50000
                })
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (response.ok) {
                alert("Registration successful  for " + data.first_name + " " + data.last_name);
                navigate('/');
            } else {
                alert("Registration failed: " + data.Exception);
            }
        }
        postData();
        



    }

    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [address, setAddress] = React.useState("");



  return (
    <div className='container'> 
        <div className='small-container'>
        <h1 className='text-center'>Register</h1>
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

            {/* Email input */}
            <div className="mb-2">
                <input type="email" 
                  className="form-control" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@email.com' required></input>
                <label className="form-label">Email Address</label>
            </div>

            {/* Password input */}
            <div className="mb-2">
                <input type="password" 
                  className="form-control" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password123' required></input>
                <label className="form-label">Password</label>
            </div>

            {/* Repeat Password input */}
            <div className="mb-2">
                <input type="password" 
                  className="form-control" 
                  id="repeatPassword" 
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder='password123' required></input>
                <label className="form-label">Repeat Password</label>
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

            {/* Checkbox input */}
            <div className="form-check d-flex justify-content-center mb-4">
              <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" required />
              <label className="form-check-label">
                I have read and agree to the terms
              </label>
            </div>

            {/* Submit button */}
            <button  type="submit" className="btn btn-primary">Submit</button>

            
        </form>
        </div>

    </div>
  )
}

export default register