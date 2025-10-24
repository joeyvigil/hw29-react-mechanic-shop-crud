import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './views/Login.jsx'
import Profile from './views/Profile.jsx'
import Update from './views/Update.jsx'
import Register from './views/Register.jsx'

import './App.css'

function App() {
  const [profileInfo, setProfileInfo] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      async function fetchProfile() {
        const response = await fetch(
          'https://hw22-api-deployment.onrender.com/mechanics/profile',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          }
        )
        const data = await response.json()
        if (response.ok) {
          setProfileInfo(data)
          console.log('Fetched profile:', data)
        } else {
          setProfileInfo(null)
          localStorage.removeItem('token')
        }
      }
      fetchProfile()
    } else {
      setProfileInfo(null)
    }
  }, [token, navigate])

  return (
    <>
      <div className="mynavbar">
        <div className="container">
          <nav className="navbar">
            
            <div className="navbar-brand">
              <img src="react.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
              React Mechanic Shop
            </div>

            <div className="d-flex">
              {token ? (
                <>
                  <h4 className="me-4"> Hello <span className="highlight">{profileInfo?.first_name}</span></h4>
                  <a className="me-4" href="/profile">profile</a>
                  <a className="me-4" href="/update">update</a>
                  <button className="btn"onClick={() => { localStorage.removeItem('token'); navigate('/')}} > Logout </button>
                </>
              ) : (
                <button className="btn" onClick={() => navigate('/')}> Login </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
