require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const SERVICES = {
  student: process.env.STUDENT_SERVICE_URL || "http://localhost:3001",
  room: process.env.ROOM_SERVICE_URL || "http://localhost:3002",
  visitor: process.env.VISITOR_SERVICE_URL || "http://localhost:3003",
  complaint: process.env.COMPLAINT_SERVICE_URL || "http://localhost:3004",
  maintenance: process.env.MAINTENANCE_SERVICE_URL || "http://localhost:3005",
};

app.use((req, res, next) => {
  console.log(`[GATEWAY] ${req.method} ${req.originalUrl}`);
  next();
});

const mountService = (basePath, target, serviceName) => {
  app.use(
    basePath,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      timeout: 30000,
      proxyTimeout: 30000,
      pathRewrite: (path) => `${basePath}${path === "/" ? "" : path}`,
      on: {
        proxyReq: (proxyReq, req) => {
          console.log(
            `[GATEWAY] ${serviceName} -> ${target}${basePath}${req.url === "/" ? "" : req.url}`
          );
        },
        error: (err, req, res) => {
          console.error(`[GATEWAY] ${serviceName} proxy error:`, err.message);
          if (!res.headersSent) {
            res.status(503).json({
              success: false,
              message: `${serviceName} is unavailable`,
              error: err.message,
            });
          }
        },
      },
    })
  );
};

mountService("/api/students", SERVICES.student, "Student Service");
mountService("/api/rooms", SERVICES.room, "Room Service");
mountService("/api/visitors", SERVICES.visitor, "Visitor Service");
mountService("/api/complaints", SERVICES.complaint, "Complaint Service");
mountService("/api/maintenance", SERVICES.maintenance, "Maintenance Service");

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Gateway Running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "API Gateway",
    port: PORT,
    status: "Running",
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});