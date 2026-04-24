const express = require("express");
const router = express.Router();

const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Room MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room fetched successfully
 *       404:
 *         description: Room not found
 */
router.get("/:id", getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             roomNumber: "A101"
 *             blockName: "Block A"
 *             floor: 1
 *             capacity: 4
 *             occupiedBeds: 2
 *             status: "Available"
 *     responses:
 *       201:
 *         description: Room created successfully
 */
router.post("/", createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Room ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: "Occupied"
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       404:
 *         description: Room not found
 */
router.put("/:id", updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Room ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
router.delete("/:id", deleteRoom);

module.exports = router;