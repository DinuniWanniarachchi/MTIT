const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const maintenanceRoutes = require("./routes/maintenances");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => res.send("Maintenance Service Running"));

// Routes
app.use("/api/maintenance", maintenanceRoutes);

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Maintenance Service running on port ${PORT}`);
});