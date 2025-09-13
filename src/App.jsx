import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Stations from "./pages/Stations/Stations";
import Navbar from "./components/Navbar";
import RoutePage from "./pages/RoutePage/RoutePage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:city/stations" element={<Stations />} />
          <Route path="/:city/stations/:stationId" element={<Stations />} />
          <Route path="/:city/route/:from/:to" element={<RoutePage />} />
          <Route path="/:city/route" element={<RoutePage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
