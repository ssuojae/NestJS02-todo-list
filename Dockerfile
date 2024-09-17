# Step 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the NestJS application
RUN npm run build

# Step 2: Production Stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy the build files and node_modules from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port that the app will run on
EXPOSE 3000

# Command to start the app
CMD ["node", "dist/main"]