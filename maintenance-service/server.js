const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const maintenanceRoutes = require("./routes/maintenances");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Maintenance Service Running"));

app.use("/api/maintenance", maintenanceRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Maintenance Service running on port ${PORT}`));