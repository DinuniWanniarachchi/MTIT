import { useEffect, useState } from "react";
import api, { studentApi } from "../api/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    roomNumber: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await studentApi.get("/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Fetch students error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      studentId: "",
      fullName: "",
      email: "",
      phone: "",
      department: "",
      roomNumber: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await studentApi.put(`/api/students/${editingId}`, form);
      } else {
        await studentApi.post("/api/students", form);
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      console.error("Student save error:", error);
      alert(error.response?.data?.error || error.response?.data?.message || "Failed to save student");
    }
  };

  const handleEdit = (item) => {
    setForm({
      studentId: item.studentId || "",
      fullName: item.fullName || "",
      email: item.email || "",
      phone: item.phone || "",
      department: item.department || "",
      roomNumber: item.roomNumber || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await studentApi.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Delete student error:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div>
      <h1>Students</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} required />
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} />

        <div className="button-group">
          <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
          {editingId && (
            <button type="button" onClick={resetForm}>Cancel</button>
          )}
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Room Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr key={item._id}>
              <td>{item.studentId}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.department}</td>
              <td>{item.roomNumber}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}