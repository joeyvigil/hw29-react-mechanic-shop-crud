import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Main from './views/main.jsx'
import Profile from './views/profile.jsx'
import Update from './views/update.jsx'
import Register from './views/Register.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <>
        <div className='mynavbar'>
        <div className='container'>
        <nav className="navbar">


          <div className="navbar-brand">
            <img src="/images/react.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> React Mechanic Shop
          </div>
          <button className="btn btn-outline-success" onClick={() => navigate('/') }> Login</button>

          

        </nav>
        </div>
        </div>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/update' element={<Update/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>

    </>
  )
}

export default App
