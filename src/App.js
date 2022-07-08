import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPlaces from "./places/pages/AllPlaces";
import AllUsers from "./users/pages/AllUsers";
import NavBar from './shared/components/NavBar'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import {PlaceProvider} from './context/PlaceContext'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        
        <Route path="/" element={<AllPlaces/>} />
        <Route path="/users" element={<AllUsers/>} />
        <Route path="/:uid/places" element={<UserPlaces/>} />
        <Route path="/add-place" element={<PlaceProvider><NewPlace/></PlaceProvider>} />
        
      </Routes>
    </div>
  );
}

export default App;
