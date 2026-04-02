require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

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

// Swagger UI for API Gateway
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
        proxyReq: () => {
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Read Root
 *     responses:
 *       200:
 *         description: Gateway home page
 */
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Gateway</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; background: #f4f6f8; }
          h1 { color: #1e293b; }
          h2 { color: #334155; margin-top: 30px; }
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

        <h2>Swagger Documentation Through Gateway</h2>
        <ul>
          <li><a href="/api/students/docs" target="_blank">Student Swagger</a></li>
          <li><a href="/api/rooms/docs" target="_blank">Room Swagger</a></li>
          <li><a href="/api/visitors/docs" target="_blank">Visitor Swagger</a></li>
          <li><a href="/api/complaints/docs" target="_blank">Complaint Swagger</a></li>
          <li><a href="/api/maintenance/docs" target="_blank">Maintenance Swagger</a></li>
        </ul>

        <h2>API Gateway Swagger</h2>
        <ul>
          <li><a href="/api-docs" target="_blank">Gateway Swagger UI</a></li>
        </ul>
      </body>
    </html>
  `);
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Gateway health check
 *     responses:
 *       200:
 *         description: Gateway running successfully
 */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "API Gateway",
    port: PORT,
    status: "Running",
  });
});

/**
 * @swagger
 * /gateway/students:
 *   get:
 *     summary: Get all students through API Gateway
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */
app.get("/gateway/students", (req, res) => {
  res.redirect("/api/students");
});

/**
 * @swagger
 * /gateway/students:
 *   post:
 *     summary: Create student through API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *           example:
 *             studentId: "S001"
 *             fullName: "Nimal Perera"
 *             email: "nimal@gmail.com"
 *             phone: "0771234567"
 *             department: "IT"
 *             roomNumber: "A101"
 *     responses:
 *       200:
 *         description: Student created successfully
 */
app.post("/gateway/students", (req, res) => {
  res.redirect(307, "/api/students");
});

/**
 * @swagger
 * /gateway/students/{student_id}:
 *   get:
 *     summary: Get student through API Gateway
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched successfully
 */
app.get("/gateway/students/:student_id", (req, res) => {
  res.redirect(`/api/students/${req.params.student_id}`);
});

/**
 * @swagger
 * /gateway/students/{student_id}:
 *   put:
 *     summary: Update student through API Gateway
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *           example:
 *             fullName: "Updated Student"
 *             email: "updated@gmail.com"
 *             phone: "0770000000"
 *             department: "SE"
 *             roomNumber: "B202"
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
app.put("/gateway/students/:student_id", (req, res) => {
  res.redirect(307, `/api/students/${req.params.student_id}`);
});

/**
 * @swagger
 * /gateway/students/{student_id}:
 *   delete:
 *     summary: Delete student through API Gateway
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
app.delete("/gateway/students/:student_id", (req, res) => {
  res.redirect(307, `/api/students/${req.params.student_id}`);
});

/**
 * @swagger
 * /gateway/rooms:
 *   get:
 *     summary: Get all rooms through API Gateway
 *     responses:
 *       200:
 *         description: Rooms fetched successfully
 */
app.get("/gateway/rooms", (req, res) => {
  res.redirect("/api/rooms");
});

/**
 * @swagger
 * /gateway/rooms:
 *   post:
 *     summary: Create room through API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *               blockName:
 *                 type: string
 *               floor:
 *                 type: integer
 *               capacity:
 *                 type: integer
 *               occupiedBeds:
 *                 type: integer
 *               status:
 *                 type: string
 *           example:
 *             roomNumber: "A101"
 *             blockName: "Block A"
 *             floor: 1
 *             capacity: 4
 *             occupiedBeds: 2
 *             status: "Available"
 *     responses:
 *       200:
 *         description: Room created successfully
 */
app.post("/gateway/rooms", (req, res) => {
  res.redirect(307, "/api/rooms");
});

/**
 * @swagger
 * /gateway/rooms/{room_id}:
 *   get:
 *     summary: Get room through API Gateway
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room fetched successfully
 */
app.get("/gateway/rooms/:room_id", (req, res) => {
  res.redirect(`/api/rooms/${req.params.room_id}`);
});

/**
 * @swagger
 * /gateway/rooms/{room_id}:
 *   put:
 *     summary: Update room through API Gateway
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockName:
 *                 type: string
 *               floor:
 *                 type: integer
 *               capacity:
 *                 type: integer
 *               occupiedBeds:
 *                 type: integer
 *               status:
 *                 type: string
 *           example:
 *             occupiedBeds: 4
 *             status: "Occupied"
 *     responses:
 *       200:
 *         description: Room updated successfully
 */
app.put("/gateway/rooms/:room_id", (req, res) => {
  res.redirect(307, `/api/rooms/${req.params.room_id}`);
});

/**
 * @swagger
 * /gateway/rooms/{room_id}:
 *   delete:
 *     summary: Delete room through API Gateway
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room deleted successfully
 */
app.delete("/gateway/rooms/:room_id", (req, res) => {
  res.redirect(307, `/api/rooms/${req.params.room_id}`);
});

/**
 * @swagger
 * /gateway/visitors:
 *   get:
 *     summary: Get all visitors through API Gateway
 *     responses:
 *       200:
 *         description: Visitors fetched successfully
 */
app.get("/gateway/visitors", (req, res) => {
  res.redirect("/api/visitors");
});

/**
 * @swagger
 * /gateway/visitors:
 *   post:
 *     summary: Create visitor through API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorId:
 *                 type: string
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *               studentId:
 *                 type: string
 *               purpose:
 *                 type: string
 *           example:
 *             visitorId: "V001"
 *             name: "John Silva"
 *             contact: "0771234567"
 *             studentId: "S001"
 *             purpose: "Meeting"
 *     responses:
 *       200:
 *         description: Visitor created successfully
 */
app.post("/gateway/visitors", (req, res) => {
  res.redirect(307, "/api/visitors");
});

/**
 * @swagger
 * /gateway/visitors/{visitor_id}:
 *   get:
 *     summary: Get visitor through API Gateway
 *     parameters:
 *       - in: path
 *         name: visitor_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor fetched successfully
 */
app.get("/gateway/visitors/:visitor_id", (req, res) => {
  res.redirect(`/api/visitors/${req.params.visitor_id}`);
});

/**
 * @swagger
 * /gateway/visitors/{visitor_id}:
 *   put:
 *     summary: Update visitor through API Gateway
 *     parameters:
 *       - in: path
 *         name: visitor_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *               purpose:
 *                 type: string
 *           example:
 *             name: "Updated Visitor"
 *             contact: "0711111111"
 *             purpose: "Emergency visit"
 *     responses:
 *       200:
 *         description: Visitor updated successfully
 */
app.put("/gateway/visitors/:visitor_id", (req, res) => {
  res.redirect(307, `/api/visitors/${req.params.visitor_id}`);
});

/**
 * @swagger
 * /gateway/visitors/{visitor_id}:
 *   delete:
 *     summary: Delete visitor through API Gateway
 *     parameters:
 *       - in: path
 *         name: visitor_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitor deleted successfully
 */
app.delete("/gateway/visitors/:visitor_id", (req, res) => {
  res.redirect(307, `/api/visitors/${req.params.visitor_id}`);
});

/**
 * @swagger
 * /gateway/complaints:
 *   get:
 *     summary: Get all complaints through API Gateway
 *     responses:
 *       200:
 *         description: Complaints fetched successfully
 */
app.get("/gateway/complaints", (req, res) => {
  res.redirect("/api/complaints");
});

/**
 * @swagger
 * /gateway/complaints:
 *   post:
 *     summary: Create complaint through API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaintId:
 *                 type: string
 *               studentId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *           example:
 *             complaintId: "C001"
 *             studentId: "S001"
 *             title: "Broken Light"
 *             description: "Light not working"
 *             status: "Pending"
 *     responses:
 *       200:
 *         description: Complaint created successfully
 */
app.post("/gateway/complaints", (req, res) => {
  res.redirect(307, "/api/complaints");
});

/**
 * @swagger
 * /gateway/complaints/{complaint_id}:
 *   get:
 *     summary: Get complaint through API Gateway
 *     parameters:
 *       - in: path
 *         name: complaint_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint fetched successfully
 */
app.get("/gateway/complaints/:complaint_id", (req, res) => {
  res.redirect(`/api/complaints/${req.params.complaint_id}`);
});

/**
 * @swagger
 * /gateway/complaints/{complaint_id}:
 *   put:
 *     summary: Update complaint through API Gateway
 *     parameters:
 *       - in: path
 *         name: complaint_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *           example:
 *             status: "Resolved"
 *             description: "Issue fixed"
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 */
app.put("/gateway/complaints/:complaint_id", (req, res) => {
  res.redirect(307, `/api/complaints/${req.params.complaint_id}`);
});

/**
 * @swagger
 * /gateway/complaints/{complaint_id}:
 *   delete:
 *     summary: Delete complaint through API Gateway
 *     parameters:
 *       - in: path
 *         name: complaint_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 */
app.delete("/gateway/complaints/:complaint_id", (req, res) => {
  res.redirect(307, `/api/complaints/${req.params.complaint_id}`);
});

/**
 * @swagger
 * /gateway/maintenance:
 *   get:
 *     summary: Get all maintenance tasks through API Gateway
 *     responses:
 *       200:
 *         description: Maintenance tasks fetched successfully
 */
app.get("/gateway/maintenance", (req, res) => {
  res.redirect("/api/maintenance");
});

/**
 * @swagger
 * /gateway/maintenance:
 *   post:
 *     summary: Create maintenance task through API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               roomNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *           example:
 *             taskId: "T001"
 *             roomNumber: "A101"
 *             description: "Fix fan issue"
 *             status: "Pending"
 *     responses:
 *       200:
 *         description: Maintenance task created successfully
 */
app.post("/gateway/maintenance", (req, res) => {
  res.redirect(307, "/api/maintenance");
});

/**
 * @swagger
 * /gateway/maintenance/{task_id}:
 *   get:
 *     summary: Get maintenance task through API Gateway
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Maintenance task fetched successfully
 */
app.get("/gateway/maintenance/:task_id", (req, res) => {
  res.redirect(`/api/maintenance/${req.params.task_id}`);
});

/**
 * @swagger
 * /gateway/maintenance/{task_id}:
 *   put:
 *     summary: Update maintenance task through API Gateway
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *           example:
 *             status: "Completed"
 *             description: "Fan repaired"
 *     responses:
 *       200:
 *         description: Maintenance task updated successfully
 */
app.put("/gateway/maintenance/:task_id", (req, res) => {
  res.redirect(307, `/api/maintenance/${req.params.task_id}`);
});

/**
 * @swagger
 * /gateway/maintenance/{task_id}:
 *   delete:
 *     summary: Delete maintenance task through API Gateway
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Maintenance task deleted successfully
 */
app.delete("/gateway/maintenance/:task_id", (req, res) => {
  res.redirect(307, `/api/maintenance/${req.params.task_id}`);
});

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

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});