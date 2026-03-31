const Student = require("../models/Student");

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ error: error.message });
  }
};

// CREATE student
exports.createStudent = async (req, res) => {
  try {
    console.log("Student create body:", req.body);

    const student = new Student(req.body);
    const saved = await student.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ error: error.message });
  }
};