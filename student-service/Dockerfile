# ─── Student Service Dockerfile ───────────────────────────────
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the source code
COPY . .

# Expose the service port
EXPOSE 3001

# Start the service
CMD ["node", "server.js"]
