const Visitor = require("../models/Visitor");

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createVisitor = async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    const saved = await visitor.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const updated = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const deleted = await Visitor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json({ message: "Visitor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};