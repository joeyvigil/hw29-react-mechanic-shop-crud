import React, { use, useEffect } from 'react'

const login = () => {
    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("form: ", email, password);
        console.log(e);

        async function postData(){
            const response = await fetch('https://hw22-api-deployment.onrender.com/mechanics/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            console.log("Response data:", data);
            if (response.ok) {
                alert("message: " + data.message);
                localStorage.setItem('token', data.token);
                console.log("Token stored in localStorage: ", data.token);
                window.location.reload();
            }
            else {
                alert("Login failed: " + data.message);
            }
        }
        postData();

    }


    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");


  return (
    <div className='container'> 
        <div className='small-container'>
        <h1 className='text-center'>Welcome</h1>
        <form onSubmit={(e)=> formSubmit(e)}>
            {/* Email input */}
            <div className="mb-2">
                <input type="email" 
                  className="form-control" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@email.com' required></input>
                <label className="form-label">Email address</label>
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



            {/* Submit button */}
            <button  type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

            {/* Register buttons */}
            <div className="text-center">
                <p>Not a member? <a href="/register">Register</a></p>
            </div>

        </form>
        </div>

    </div>
  )
}

export default login