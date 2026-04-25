const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/maintenanceController");

// Validation rules
const maintenanceValidation = [
  body("taskId")
    .notEmpty()
    .withMessage("Task ID is required"),

  body("roomNumber")
    .notEmpty()
    .withMessage("Room number is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be Pending, In Progress, or Completed")
];

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
 *       400:
 *         description: Validation error
 */
router.post("/", maintenanceValidation, createTask);

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
 *             taskId: "T001"
 *             roomNumber: "A101"
 *             description: "Fix fan issue"
 *             status: "Completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 */
router.put("/:id", maintenanceValidation, updateTask);

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