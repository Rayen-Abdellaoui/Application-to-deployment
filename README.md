# WorkShopWise – Dockerized

This repository contains a **dockerized version** of my old project **WorkShopWise**.  
The goal is to make the application easy to run, test, and deploy using **Docker** and **Docker Compose**.

---

## 📌 Project Overview

**WorkShopWise** is a Proposing a novel Web Platform for Simultaneous Workshop Session Booking considering Scalability Challenges using React Js, Express and MongoDB.  

In this version, the app is fully containerized:
- **Dockerfile** → builds the application image  
- **docker-compose.yml** → manages multi-service setup (backend, frontend, database)

---

## ⚙️ Requirements

Make sure you have installed:
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## 🚀 Running the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rayen-Abdellaoui/Application-to-deployment.git
   cd Application-to-deployment
   ```
2. **Build and start the containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the app**

- Backend API: http://localhost:5000

- Frontend: http://localhost:3000

##🛠️ Project Structure.
- `Dockerfile` 
- ``docker-compose.yml`` 
- ``backend/``          → Backend source code
- ``frontend/``         → Frontend source code
- ``README.md``
