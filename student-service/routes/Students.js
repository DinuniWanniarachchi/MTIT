const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getStudents);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             studentId: "S001"
 *             fullName: "Nimal Perera"
 *             email: "nimal@gmail.com"
 *             phone: "0771234567"
 *             department: "IT"
 *             roomNumber: "A101"
 *     responses:
 *       201:
 *         description: Student created successfully
 */
router.post("/", createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *       404:
 *         description: Student not found
 */
router.get("/:id", async (req, res) => {
  try {
    const Student = require("../models/Student");

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put("/:id", updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
router.delete("/:id", deleteStudent);

module.exports = router;