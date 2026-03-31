const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/Students");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Student Service Running");
});

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Student Service running on port ${PORT}`);
});