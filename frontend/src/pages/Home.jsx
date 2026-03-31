import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Smart Hostel Management System</h1>
      <p>Select a module.</p>

      <div className="grid">
        <Link className="card" to="/students">Student Management</Link>
        <Link className="card" to="/rooms">Room Management</Link>
        <Link className="card" to="/visitors">Visitor Management</Link>
        <Link className="card" to="/complaints">Complaint Management</Link>
        <Link className="card" to="/maintenance">Maintenance Management</Link>
      </div>
    </div>
  );
}