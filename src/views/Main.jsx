import React from 'react'

const main = () => {
    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("form: ", email, password);
        console.log(e);
        // curl -X 'POST' \
        //   'https://hw22-api-deployment.onrender.com/mechanics/login' \
        //   -H 'accept: application/json' \
        //   -H 'Content-Type: application/json' \
        //   -d '{
        //   "email": "bolts@gmail.com",
        //   "password": "securepassword"
        // }'
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
                alert("Login successful for " + data.first_name + " " + data.last_name);
            }
            else {
                alert("Login failed: " + data);
            }
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

export default main