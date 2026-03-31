import { useEffect, useState } from "react";
import api from "../api/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    blockName: "",
    floor: "",
    capacity: "",
    occupiedBeds: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRooms = async () => {
    const res = await api.get("/api/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      roomNumber: "",
      blockName: "",
      floor: "",
      capacity: "",
      occupiedBeds: "",
      status: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      floor: Number(form.floor),
      capacity: Number(form.capacity),
      occupiedBeds: Number(form.occupiedBeds),
    };

    if (editingId) {
      await api.put(`/api/rooms/${editingId}`, payload);
    } else {
      await api.post("/api/rooms", payload);
    }

    resetForm();
    fetchRooms();
  };

  const handleEdit = (item) => {
    setForm({
      roomNumber: item.roomNumber || "",
      blockName: item.blockName || "",
      floor: item.floor || "",
      capacity: item.capacity || "",
      occupiedBeds: item.occupiedBeds || "",
      status: item.status || "",
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/rooms/${id}`);
    fetchRooms();
  };

  return (
    <div>
      <h1>Rooms</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="roomNumber" placeholder="Room Number" value={form.roomNumber} onChange={handleChange} required />
        <input name="blockName" placeholder="Block Name" value={form.blockName} onChange={handleChange} />
        <input name="floor" placeholder="Floor" value={form.floor} onChange={handleChange} type="number" />
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} type="number" />
        <input name="occupiedBeds" placeholder="Occupied Beds" value={form.occupiedBeds} onChange={handleChange} type="number" />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add Room"}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Block</th>
            <th>Floor</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((item) => (
            <tr key={item._id}>
              <td>{item.roomNumber}</td>
              <td>{item.blockName}</td>
              <td>{item.floor}</td>
              <td>{item.capacity}</td>
              <td>{item.occupiedBeds}</td>
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