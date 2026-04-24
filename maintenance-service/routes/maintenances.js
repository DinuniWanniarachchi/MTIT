const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById, // ✅ NEW
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/maintenanceController");

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
 * /api/maintenance/{id}:
 *   get:
 *     summary: Get maintenance task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", getTaskById);

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
 *   put:
 *     summary: Update a maintenance task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Task ID
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
 *       404:
 *         description: Task not found
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
 *         description: MongoDB Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", deleteTask);

module.exports = router;