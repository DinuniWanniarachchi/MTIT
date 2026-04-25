const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  deleteVisitor
} = require("../controllers/visitorController");

// Visitor validation rules
const visitorValidation = [
  body("visitorId")
    .notEmpty()
    .withMessage("Visitor ID is required"),

  body("name")
    .notEmpty()
    .withMessage("Visitor name is required")
    .isLength({ min: 3 })
    .withMessage("Visitor name must be at least 3 characters"),

  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .matches(/^(?:\+94|0)?7\d{8}$/)
    .withMessage("Invalid contact number format. Use 0771234567 or +94771234567"),

  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required"),

  body("purpose")
    .notEmpty()
    .withMessage("Purpose is required")
    .isLength({ min: 3 })
    .withMessage("Purpose must be at least 3 characters")
];

/**
 * @swagger
 * /api/visitors:
 *   get:
 *     summary: Get all visitors
 *     responses:
 *       200:
 *         description: List of visitors
 */
router.get("/", getVisitors);

/**
 * @swagger
 * /api/visitors/{id}:
 *   get:
 *     summary: Get a visitor by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor fetched successfully
 *       404:
 *         description: Visitor not found
 */
router.get("/:id", getVisitorById);

/**
 * @swagger
 * /api/visitors:
 *   post:
 *     summary: Create a visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             visitorId: "V001"
 *             name: "John Silva"
 *             contact: "0771234567"
 *             studentId: "S001"
 *             purpose: "Meeting"
 *     responses:
 *       201:
 *         description: Visitor created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", visitorValidation, createVisitor);

/**
 * @swagger
 * /api/visitors/{id}:
 *   put:
 *     summary: Update a visitor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor MongoDB ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             visitorId: "V001"
 *             name: "John Silva"
 *             contact: "0771234567"
 *             studentId: "S001"
 *             purpose: "Emergency visit"
 *     responses:
 *       200:
 *         description: Visitor updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Visitor not found
 */
router.put("/:id", visitorValidation, updateVisitor);

/**
 * @swagger
 * /api/visitors/{id}:
 *   delete:
 *     summary: Delete a visitor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor deleted successfully
 *       404:
 *         description: Visitor not found
 */
router.delete("/:id", deleteVisitor);

module.exports = router;