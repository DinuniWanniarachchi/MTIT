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
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required"),

  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^(?:\+94|0)?7\d{8}$/)
    .withMessage("Invalid phone number format. Use 0771234567 or +94771234567"),

  body("department")
    .notEmpty()
    .withMessage("Department is required"),

  body("roomNumber")
    .notEmpty()
    .withMessage("Room number is required")
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
 */
router.get("/:id", getStudentById);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create student
 */
router.post("/", studentValidation, createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 */
router.put("/:id", studentValidation, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 */
router.delete("/:id", deleteStudent);

module.exports = router;