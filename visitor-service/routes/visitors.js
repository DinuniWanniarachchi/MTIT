const express = require("express");
const router = express.Router();

const {
  getVisitors,
  createVisitor,
  updateVisitor,
  deleteVisitor
} = require("../controllers/visitorController");

const Visitor = require("../models/Visitor");

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
 */
router.post("/", createVisitor);

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
router.get("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json(visitor);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/visitors/{id}:
 *   put:
 *     summary: Update a visitor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             purpose: "Emergency visit"
 *     responses:
 *       200:
 *         description: Visitor updated successfully
 */
router.put("/:id", updateVisitor);

/**
 * @swagger
 * /api/visitors/{id}:
 *   delete:
 *     summary: Delete a visitor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor deleted successfully
 */
router.delete("/:id", deleteVisitor);

module.exports = router;