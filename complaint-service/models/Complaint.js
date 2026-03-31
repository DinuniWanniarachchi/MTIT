const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaintId: String,
  studentId: String,
  title: String,
  description: String,
  status: String
});

module.exports = mongoose.model("Complaint", ComplaintSchema);