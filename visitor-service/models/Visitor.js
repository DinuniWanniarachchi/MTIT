const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  visitorId: String,
  name: String,
  contact: String,
  studentId: String,
  purpose: String
});

module.exports = mongoose.model("Visitor", VisitorSchema);