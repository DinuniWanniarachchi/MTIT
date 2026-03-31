const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  department: String,
  roomNumber: String
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);