const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

// Student validation rules
const studentValidation = [
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^(?:\+94|0)?7\d{8}$/)
    .withMessage("Invalid phone number format. Use 0771234567 or +94771234567")
];

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
router.get("/:id", getStudentById);

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
 *       400:
 *         description: Invalid phone number
 */
router.post("/", studentValidation, createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student MongoDB ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Nimal Perera Updated"
 *             phone: "0779876543"
 *             department: "IT"
 *             roomNumber: "A102"
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid phone number
 *       404:
 *         description: Student not found
 */
router.put("/:id", studentValidation, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", deleteStudent);

module.exports = router;