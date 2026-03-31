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