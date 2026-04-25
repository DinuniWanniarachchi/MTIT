const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

// Validation rules
const roomValidation = [
  body("roomNumber").notEmpty().withMessage("Room number is required"),
  body("blockName").notEmpty().withMessage("Block name is required"),

  body("floor")
    .notEmpty()
    .withMessage("Floor is required")
    .isInt({ min: 0 })
    .withMessage("Floor must be a valid number"),

  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("occupiedBeds")
    .notEmpty()
    .withMessage("Occupied beds is required")
    .isInt({ min: 0 })
    .withMessage("Occupied beds must be 0 or more"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Available", "Occupied", "Maintenance"])
    .withMessage("Status must be Available, Occupied, or Maintenance")
];

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management API
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of rooms
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Room ID
 *     responses:
 *       200:
 *         description: Room found
 *       404:
 *         description: Room not found
 */
router.get("/:id", getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - blockName
 *               - floor
 *               - capacity
 *               - occupiedBeds
 *               - status
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: R101
 *               blockName:
 *                 type: string
 *                 example: Block A
 *               floor:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 4
 *               occupiedBeds:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
 *                 example: Available
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", roomValidation, createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomNumber
 *               - blockName
 *               - floor
 *               - capacity
 *               - occupiedBeds
 *               - status
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: R101
 *               blockName:
 *                 type: string
 *                 example: Block A
 *               floor:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 4
 *               occupiedBeds:
 *                 type: integer
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [Available, Occupied, Maintenance]
 *                 example: Occupied
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Room not found
 */
router.put("/:id", roomValidation, updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
router.delete("/:id", deleteRoom);

module.exports = router;