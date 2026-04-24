const express = require("express");
const router = express.Router();

const {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

const Complaint = require("../models/Complaint");

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
 *     summary: Get complaint by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Complaint ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint found successfully
 *       404:
 *         description: Complaint not found
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
 *   get:
 *     summary: Get a complaint by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint fetched successfully
 *       404:
 *         description: Complaint not found
 */
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json(complaint);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
 *             status: "Resolved"
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 *       404:
 *         description: Complaint not found
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
 *         description: MongoDB Complaint ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 *       404:
 *         description: Complaint not found
 */
router.delete("/:id", deleteComplaint);

module.exports = router;