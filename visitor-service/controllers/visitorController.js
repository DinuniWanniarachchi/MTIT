const Visitor = require("../models/Visitor");

// GET all visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();

    res.status(200).json({
      success: true,
      data: visitors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      data: visitor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// CREATE visitor
exports.createVisitor = async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    const saved = await visitor.save();

    res.status(201).json({
      success: true,
      message: "Visitor created successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE visitor
exports.updateVisitor = async (req, res) => {
  try {
    const updated = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE visitor
exports.deleteVisitor = async (req, res) => {
  try {
    const deleted = await Visitor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};