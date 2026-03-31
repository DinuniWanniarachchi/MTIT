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
    try {
      const res = await api.get("/api/maintenance");
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch maintenance error:", error);
    }
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

    try {
      if (editingId) {
        await api.put(`/api/maintenance/${editingId}`, form);
      } else {
        await api.post("/api/maintenance", form);
      }

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Save maintenance error:", error);
      alert(error.response?.data?.error || error.response?.data?.message || "Failed to save task");
    }
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
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/api/maintenance/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Delete maintenance error:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Maintenance</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="taskId" placeholder="Task ID" value={form.taskId} onChange={handleChange} />
        <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />

        <div className="button-group">
          <button type="submit">{editingId ? "Update Task" : "Add Task"}</button>
          {editingId && (
            <button type="button" onClick={resetForm}>Cancel</button>
          )}
        </div>
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