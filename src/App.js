import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPlaces from "./places/pages/AllPlaces";
import AllUsers from "./users/pages/AllUsers";
import NavBar from './shared/components/NavBar'
import UserPlaces from './places/pages/UserPlaces'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<AllPlaces/>} />
        <Route path="/users" element={<AllUsers/>} />
        <Route path="/:uid/places" element={<UserPlaces/>} />
      </Routes>
    </div>
  );
}

export default App;
