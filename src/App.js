import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPlaces from "./places/pages/AllPlaces";
import AllUsers from "./users/pages/AllUsers";
import NavBar from './shared/components/NavBar'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlaces from './places/pages/UpdatePlaces'
import { PlaceProvider } from './context/PlaceContext'
import { UserProvider } from './context/UserContext'
import Login from './users/pages/Login'
import Signup from './users/pages/Signup'
import Profile from './users/pages/Profile'
import { useState,  useEffect } from 'react'

function App() {
  const [place, setPlace] = useState()
  function setPlaceToUpdate(place) {
    setPlace(place)
  }

  
  function login(uid, token,ExpiresDate) {
    const tokenExpirationTime =ExpiresDate || new Date(new Date().getTime()+1000*60*60)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token,expiration:tokenExpirationTime.toISOString() }))
  }
  function logout() {
    localStorage.removeItem('userData')
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.tokenExpirationTime)>new Date()) {
      login(storedData.userId, storedData.token,storedData.expiration)
    }
  }, [])
  return (
    <div className="App">
      <PlaceProvider>
        <UserProvider>
          <NavBar   logout={logout}/>
          <Routes>
            <Route path="/" element={<AllPlaces setPlaceToUpdate={setPlaceToUpdate} />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/:uid/places" element={<UserPlaces setPlaceToUpdate={setPlaceToUpdate} />} />
            <Route path="/add-place" element={<NewPlace />} />
            <Route path="/:pid/update-place" element={<UpdatePlaces place={place} />} />
            <Route path='/login' element={<Login login={login}/>} />
            <Route path='/signup' element={<Signup login={login}/>} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </UserProvider>
      </PlaceProvider>
    </div>
  );
}

export default App;