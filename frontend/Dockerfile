# Step 1: Build React app
FROM node:16-alpine AS build

WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build  # Ensure the build process works

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build output to Nginx's web directory
COPY --from=build /app/frontend/dist /usr/share/nginx/html

ENV VITE_API_URL=${VITE_API_URL}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
