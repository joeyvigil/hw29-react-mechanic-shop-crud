import React from 'react'
import { useState } from 'react';

const main = () => {
    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("form submitted");
        console.log(email);
        console.log(password);
    }
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");





  return (
    <div className='container'> 
        <div className='small-container'>
        <br /><h1 className='text-center'>Welcome</h1>
        <form onSubmit={(e)=> formSubmit(e)}>
            {/* Email input */}
            <div className="form-outline mb-4">
                <input type="email" 
                  className="form-control" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@email.com' required></input>
                <label className="form-label">Email address</label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
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