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

const mountDocs = (gatewayPath, target, serviceName) => {
  app.use(
    gatewayPath,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      timeout: 30000,
      proxyTimeout: 30000,
      pathRewrite: {
        [`^${gatewayPath}`]: "/api-docs",
      },
      on: {
        proxyReq: (proxyReq) => {
          console.log(`[GATEWAY] ${serviceName} Swagger -> ${target}/api-docs`);
        },
        error: (err, req, res) => {
          console.error(`[GATEWAY] ${serviceName} Swagger proxy error:`, err.message);
          if (!res.headersSent) {
            res.status(503).json({
              success: false,
              message: `${serviceName} Swagger is unavailable`,
              error: err.message,
            });
          }
        },
      },
    })
  );
};

// API routes
mountService("/api/students", SERVICES.student, "Student Service");
mountService("/api/rooms", SERVICES.room, "Room Service");
mountService("/api/visitors", SERVICES.visitor, "Visitor Service");
mountService("/api/complaints", SERVICES.complaint, "Complaint Service");
mountService("/api/maintenance", SERVICES.maintenance, "Maintenance Service");

// Swagger routes through gateway
mountDocs("/api/students/docs", SERVICES.student, "Student Service");
mountDocs("/api/rooms/docs", SERVICES.room, "Room Service");
mountDocs("/api/visitors/docs", SERVICES.visitor, "Visitor Service");
mountDocs("/api/complaints/docs", SERVICES.complaint, "Complaint Service");
mountDocs("/api/maintenance/docs", SERVICES.maintenance, "Maintenance Service");

// Home page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Gateway</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; background: #f4f6f8; }
          h1 { color: #1e293b; }
          ul { line-height: 2; }
          a { text-decoration: none; color: #2563eb; }
        </style>
      </head>
      <body>
        <h1>Smart Hostel Management System - API Gateway</h1>

        <h2>API Endpoints</h2>
        <ul>
          <li><a href="/api/students" target="_blank">Students API</a></li>
          <li><a href="/api/rooms" target="_blank">Rooms API</a></li>
          <li><a href="/api/visitors" target="_blank">Visitors API</a></li>
          <li><a href="/api/complaints" target="_blank">Complaints API</a></li>
          <li><a href="/api/maintenance" target="_blank">Maintenance API</a></li>
        </ul>

        <h2>Swagger Documentation</h2>
        <ul>
          <li><a href="/api/students/docs" target="_blank">Student Swagger</a></li>
          <li><a href="/api/rooms/docs" target="_blank">Room Swagger</a></li>
          <li><a href="/api/visitors/docs" target="_blank">Visitor Swagger</a></li>
          <li><a href="/api/complaints/docs" target="_blank">Complaint Swagger</a></li>
          <li><a href="/api/maintenance/docs" target="_blank">Maintenance Swagger</a></li>
        </ul>
      </body>
    </html>
  `);
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