const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: String,
  blockName: String,
  floor: Number,
  capacity: Number,
  occupiedBeds: Number,
  status: String
});

module.exports = mongoose.model("Room", RoomSchema);