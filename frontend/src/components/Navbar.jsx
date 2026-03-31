import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Hostel System</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/visitors">Visitors</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/maintenance">Maintenance</Link>
      </div>
    </nav>
  );
}