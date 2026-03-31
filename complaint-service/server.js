const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const connectDB = require("./config/db");
const complaintRoutes = require("./routes/complaints");

console.log("🚀 THIS IS MY COMPLAINT SERVICE FILE");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/complaints", complaintRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Complaint Service Running");
});

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () =>
  console.log(`Complaint Service running on port ${PORT}`)
);