const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  const room = new Room(req.body);
  const saved = await room.save();
  res.json(saved);
};

exports.updateRoom = async (req, res) => {
  const updated = await Room.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted" });
};