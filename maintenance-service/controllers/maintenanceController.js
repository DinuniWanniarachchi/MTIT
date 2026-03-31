const Maintenance = require("../models/Maintenance");

exports.getTasks = async (req, res) => {
  const tasks = await Maintenance.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Maintenance(req.body);
  const saved = await task.save();
  res.json(saved);
};

exports.updateTask = async (req, res) => {
  const updated = await Maintenance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};