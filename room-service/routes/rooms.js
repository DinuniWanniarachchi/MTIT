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

// ✅ Validation rules
const roomValidation = [
  body("roomNumber")
    .notEmpty()
    .withMessage("Room number is required"),

  body("blockName")
    .notEmpty()
    .withMessage("Block name is required"),

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
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 */
router.get("/:id", getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 */
router.post("/", roomValidation, createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 */
router.put("/:id", roomValidation, updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 */
router.delete("/:id", deleteRoom);

module.exports = router;