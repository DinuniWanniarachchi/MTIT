const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const roomRoutes = require("./routes/rooms");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Root route
app.get("/", (req, res) => {
  res.send("Room Service Running");
});

// Room routes
app.use("/api/rooms", roomRoutes);

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Room Service running on port ${PORT}`);
});