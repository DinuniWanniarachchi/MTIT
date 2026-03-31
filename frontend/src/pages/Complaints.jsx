import { useEffect, useState } from "react";
import api from "../api/api";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    complaintId: "",
    studentId: "",
    title: "",
    description: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchComplaints = async () => {
    const res = await api.get("/api/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      complaintId: "",
      studentId: "",
      title: "",
      description: "",
      status: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/api/complaints/${editingId}`, form);
    } else {
      await api.post("/api/complaints", form);
    }

    resetForm();
    fetchComplaints();
  };

  const handleEdit = (item) => {
    setForm({
      complaintId: item.complaintId || "",
      studentId: item.studentId || "",
      title: item.title || "",
      description: item.description || "",
      status: item.status || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/complaints/${id}`);
    fetchComplaints();
  };

  return (
    <div>
      <h1>Complaints</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="complaintId" placeholder="Complaint ID" value={form.complaintId} onChange={handleChange} />
        <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add Complaint"}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Student ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item._id}>
              <td>{item.complaintId}</td>
              <td>{item.studentId}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
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