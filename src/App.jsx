import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Stations from "./pages/Stations/Stations";
import Navbar from "./components/Navbar";
import RoutePage from "./pages/RoutePage/RoutePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:city/stations" element={<Stations />} />
        <Route path="/:city/stations/:stationId" element={<Stations />} />
        <Route path="/:city/route/:from/:to" element={<RoutePage />} />
        <Route path="/:city/route" element={<RoutePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
