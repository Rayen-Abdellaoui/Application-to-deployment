FROM node:16-alpine

WORKDIR /app/backend

# Copy package.json and package-lock.json (if present) first
COPY package*.json ./

# Install dependencies (including express)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port and start the application
EXPOSE 5555
CMD ["npm", "run", "start"]
