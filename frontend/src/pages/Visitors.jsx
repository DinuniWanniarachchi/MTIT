import { useEffect, useState } from "react";
import api from "../api/api";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    visitorId: "",
    name: "",
    contact: "",
    studentId: "",
    purpose: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchVisitors = async () => {
    const res = await api.get("/api/visitors");
    setVisitors(res.data);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      visitorId: "",
      name: "",
      contact: "",
      studentId: "",
      purpose: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/api/visitors/${editingId}`, form);
    } else {
      await api.post("/api/visitors", form);
    }

    resetForm();
    fetchVisitors();
  };

  const handleEdit = (item) => {
    setForm({
      visitorId: item.visitorId || "",
      name: item.name || "",
      contact: item.contact || "",
      studentId: item.studentId || "",
      purpose: item.purpose || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/visitors/${id}`);
    fetchVisitors();
  };

  return (
    <div>
      <h1>Visitors</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="visitorId" placeholder="Visitor ID" value={form.visitorId} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
        <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add Visitor"}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Visitor ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Student ID</th>
            <th>Purpose</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((item) => (
            <tr key={item._id}>
              <td>{item.visitorId}</td>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.studentId}</td>
              <td>{item.purpose}</td>
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