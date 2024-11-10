# Step 1: Build the frontend using Node.js
FROM node:22.3.0-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install frontend dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend source code
COPY . .

# Copy the .env.development file (make sure this is in your project root)
COPY .env.development .env

# Build the frontend project using Vite
RUN pnpm build

# Step 2: Serve the built frontend using Nginx
FROM nginx:alpine

# Copy the built files from the build image to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx.conf file from the local context into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 so that Nginx can serve the static files
EXPOSE 80

# Run Nginx to serve the static files
CMD ["nginx", "-g", "daemon off;"]
