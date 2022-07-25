import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPlaces from "./places/pages/AllPlaces";
import AllUsers from "./users/pages/AllUsers";
import NavBar from './shared/components/NavBar'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlaces from './places/pages/UpdatePlaces'
import { PlaceProvider } from './context/PlaceContext'

function App() {
  return (
    <div className="App">
      <NavBar />
      <PlaceProvider>
        <Routes>

          <Route path="/" element={<AllPlaces />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/:uid/places" element={<UserPlaces />} />
          <Route path="/add-place" element={<NewPlace />} />
          <Route path="/:pid/update-place" element={<UpdatePlaces />} />
        </Routes>
      </PlaceProvider>
    </div>
  );
}

export default App;
