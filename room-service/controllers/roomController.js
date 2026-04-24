const Room = require("../models/Room");

// GET all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      data: rooms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// ✅ GET room by ID (NEW - moved from route)
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// CREATE room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const saved = await room.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE room
exports.updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE room
exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};