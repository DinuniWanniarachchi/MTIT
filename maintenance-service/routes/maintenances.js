const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/maintenanceController");

const Maintenance = require("../models/Maintenance");

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get all maintenance tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Create a maintenance task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             taskId: "T001"
 *             roomNumber: "A101"
 *             description: "Fix fan issue"
 *             status: "Pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/", createTask);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   get:
 *     summary: Get a maintenance task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Maintenance MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", async (req, res) => {
  try {
    const task = await Maintenance.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/maintenance/{id}:
 *   put:
 *     summary: Update a maintenance task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "Completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /api/maintenance/{id}:
 *   delete:
 *     summary: Delete a maintenance task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/:id", deleteTask);

module.exports = router;