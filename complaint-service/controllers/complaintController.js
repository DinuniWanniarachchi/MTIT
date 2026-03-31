const Complaint = require("../models/Complaint");

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const saved = await complaint.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};