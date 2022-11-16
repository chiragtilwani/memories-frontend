import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react'

import "./App.css";
import AllPlaces from "./places/pages/AllPlaces";
import AllUsers from "./users/pages/AllUsers";
import NavBar from './shared/components/NavBar'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlaces from './places/pages/UpdatePlaces'
import Login from './users/pages/Login'
import Signup from './users/pages/Signup'
import Profile from './users/pages/Profile'

let logoutTimer
function App() {
  const [place, setPlace] = useState()
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [expirationDate, setExpirationDate] = useState()
  function setPlaceToUpdate(place) {
    setPlace(place)
  }


  const login = useCallback((uid, token, ExpiresDate) => {
    setToken(token)
    setUserId(uid)
    const tokenExpirationTime = ExpiresDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setExpirationDate(tokenExpirationTime)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationTime.toISOString() }))
  }, [])

  const logout = useCallback(() => {
    setExpirationDate(null)
    setToken(null)
    setUserId(null)
    window.location.reload()
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, expirationDate, logout])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return (
    <div className="App">
      <NavBar logout={logout} />
      <Routes>
        <Route path="/" element={<AllPlaces setPlaceToUpdate={setPlaceToUpdate} />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/:uid/places" element={<UserPlaces setPlaceToUpdate={setPlaceToUpdate} />} />
        <Route path="/add-place" element={<NewPlace />} />
        <Route path="/:pid/update-place" element={<UpdatePlaces place={place} />} />
        <Route path='/login' element={<Login login={login} />} />
        <Route path='/signup' element={<Signup login={login} />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;