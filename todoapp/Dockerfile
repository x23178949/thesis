# Stage 1: Build the React (Vite) app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and .env for build
COPY . .

# Build the Vite app (VITE_ envs read here)
RUN npm run build

# Stage 2: Serve the app with `serve`
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install `serve` globally
RUN npm install -g serve

# Copy production build from builder stage
COPY --from=builder /app/dist /app/dist

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "80"]
