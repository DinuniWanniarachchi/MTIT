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

// Validation rules
const studentValidation = [
  body("studentId").notEmpty().withMessage("Student ID is required"),

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
    .withMessage("Invalid phone number format"),

  body("department")
    .notEmpty()
    .withMessage("Department is required"),

  body("roomNumber")
    .notEmpty()
    .withMessage("Room number is required")
];

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management API
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/", getStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
router.get("/:id", getStudentById);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - fullName
 *               - email
 *               - phone
 *               - department
 *               - roomNumber
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: STU001
 *               fullName:
 *                 type: string
 *                 example: Dinuni Wanniarachchi
 *               email:
 *                 type: string
 *                 example: dinuni@gmail.com
 *               phone:
 *                 type: string
 *                 example: 0771234567
 *               department:
 *                 type: string
 *                 example: IT
 *               roomNumber:
 *                 type: string
 *                 example: R101
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", studentValidation, createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - fullName
 *               - email
 *               - phone
 *               - department
 *               - roomNumber
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: STU001
 *               fullName:
 *                 type: string
 *                 example: Dinuni Wanniarachchi
 *               email:
 *                 type: string
 *                 example: dinuni@gmail.com
 *               phone:
 *                 type: string
 *                 example: +94771234567
 *               department:
 *                 type: string
 *                 example: IT
 *               roomNumber:
 *                 type: string
 *                 example: R102
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Student not found
 */
router.put("/:id", studentValidation, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", deleteStudent);

module.exports = router;