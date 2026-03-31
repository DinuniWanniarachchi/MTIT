const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  taskId: String,
  roomNumber: String,
  description: String,
  status: String
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);