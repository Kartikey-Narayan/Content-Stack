# Use the official Node.js 23 Alpine image as a lightweight base image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application using npm
CMD ["npm", "start"]