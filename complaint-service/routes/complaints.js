const express = require("express");
const router = express.Router();

const {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

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
 * /api/complaints:
 *   post:
 *     summary: Create a complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             complaintId: "C001"
 *             studentId: "S001"
 *             title: "Broken Light"
 *             description: "Light not working"
 *             status: "Pending"
 *     responses:
 *       201:
 *         description: Complaint created successfully
 */
router.post("/", createComplaint);

/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update a complaint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "Resolved"
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 */
router.put("/:id", updateComplaint);

/**
 * @swagger
 * /api/complaints/{id}:
 *   delete:
 *     summary: Delete a complaint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 */
router.delete("/:id", deleteComplaint);

module.exports = router;