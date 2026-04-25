const Student = require("../models/Student");
const { validationResult } = require("express-validator");

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error("Get student by ID error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// CREATE student
exports.createStudent = async (req, res) => {
  try {
    console.log("Student create body:", req.body);

    // ✅ VALIDATION CHECK
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const student = new Student(req.body);
    const saved = await student.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: saved
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    // ✅ VALIDATION CHECK
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};