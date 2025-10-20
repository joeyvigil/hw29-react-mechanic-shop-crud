import React from 'react'

const main = () => {
  return (
    <div className='container'> 
        <div className='small-container'>
        <br /><h1>Sign in</h1>
        <form onSubmit={(e)=> formSubmit(e)}>
            {/* Email input */}
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" className="form-control" />
                <label className="form-label">Email address</label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>



            {/* Submit button */}
            <button  type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

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