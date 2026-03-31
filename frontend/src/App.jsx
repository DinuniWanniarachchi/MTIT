import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Visitors from "./pages/Visitors";
import Complaints from "./pages/Complaints";
import Maintenance from "./pages/Maintenance";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
      </div>
    </>
  );
}