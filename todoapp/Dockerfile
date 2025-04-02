# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and .env
COPY . .

# Build the app (Vite reads from .env during this)
RUN npm run build

# Stage 2: Serve the app using a static server
FROM node:18-alpine

WORKDIR /app

# Install lightweight HTTP server
RUN npm install -g serve

# Copy built app from previous stage
COPY --from=builder /app/dist ./dist

# Expose the frontend port
EXPOSE 5173

# Serve the app
CMD ["serve", "-s", "dist", "-l", "5173"]
