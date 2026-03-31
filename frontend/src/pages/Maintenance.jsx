import { useEffect, useState } from "react";
import api from "../api/api";

export default function Maintenance() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    taskId: "",
    roomNumber: "",
    description: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get("/api/maintenance");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      taskId: "",
      roomNumber: "",
      description: "",
      status: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/api/maintenance/${editingId}`, form);
    } else {
      await api.post("/api/maintenance", form);
    }

    resetForm();
    fetchTasks();
  };

  const handleEdit = (item) => {
    setForm({
      taskId: item.taskId || "",
      roomNumber: item.roomNumber || "",
      description: item.description || "",
      status: item.status || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/maintenance/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h1>Maintenance</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="taskId" placeholder="Task ID" value={form.taskId} onChange={handleChange} />
        <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add Task"}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Room Number</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <tr key={item._id}>
              <td>{item.taskId}</td>
              <td>{item.roomNumber}</td>
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