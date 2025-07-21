# Use Node.js 20 Alpine for security and small size
FROM node:20-alpine

# Install additional tools for better development experience
RUN apk add --no-cache git bash

# Create app directory and set up non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Create app directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy app source (this will be overridden by volume in development)
COPY --chown=nodejs:nodejs . .

# Expose the port the app runs on
EXPOSE 8080

# Default command for development
CMD ["npm", "run", "dev"]