const express = require("express");
const router = express.Router();

const {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

router.get("/", getComplaints);
router.post("/", createComplaint);
router.put("/:id", updateComplaint);
router.delete("/:id", deleteComplaint);

module.exports = router;