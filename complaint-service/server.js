require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");
const complaintRoutes = require("./routes/complaints");

console.log("🚀 THIS IS MY COMPLAINT SERVICE FILE");
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("Complaint Service Running");
});

const PORT = process.env.PORT || 3004;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Complaint Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
}

startServer();