# Use an official Node.js runtime as a base image
FROM node:22.3.0-alpine

# Set the working directory
WORKDIR /app

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

# Copy the source code and build the app
COPY . .

RUN pnpm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["pnpm", "start:prod"]
