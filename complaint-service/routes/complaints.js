const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

// CREATE validation
const complaintCreateValidation = [
  body("complaintId")
    .notEmpty()
    .withMessage("Complaint ID is required"),

  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "In Progress", "Resolved", "Rejected"])
    .withMessage("Status must be Pending, In Progress, Resolved, or Rejected")
];

// UPDATE validation
const complaintUpdateValidation = [
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "In Progress", "Resolved", "Rejected"])
    .withMessage("Status must be Pending, In Progress, Resolved, or Rejected")
];

/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get all complaints
 *     responses:
 *       200:
 *         description: List of complaints
 */
router.get("/", getComplaints);

/**
 * @swagger
 * /api/complaints/{id}:
 *   get:
 *     summary: Get complaint by MongoDB ID
 */
router.get("/:id", getComplaintById);

/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create a complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             complaintId: "C002"
 *             studentId: "S001"
 *             title: "Broken Fan"
 *             description: "Fan is not working"
 *             status: "Pending"
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *       400:
 *         description: Validation error or duplicate complaint ID
 */
router.post("/", complaintCreateValidation, createComplaint);

/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update a complaint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Complaint ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             studentId: "S001"
 *             title: "Broken Fan"
 *             description: "Fan is repaired now"
 *             status: "Resolved"
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Complaint not found
 */
router.put("/:id", complaintUpdateValidation, updateComplaint);

/**
 * @swagger
 * /api/complaints/{id}:
 *   delete:
 *     summary: Delete a complaint
 */
router.delete("/:id", deleteComplaint);

module.exports = router;