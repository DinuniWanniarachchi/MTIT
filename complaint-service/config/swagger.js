const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Complaint Service API",
      version: "1.0.0",
      description: "API for managing hostel complaints",
    },
    servers: [
      {
        url: "http://localhost:3004",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;