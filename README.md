# Task Management Application
contact: vxk68030@ucmo.edu

A full-stack task management application built with React, Node.js, and PostgreSQL, containerized with Docker.

## Features
- User Authentication (Register/Login)
- Task Management (CRUD operations)
- Secure password hashing
- JWT-based authentication
- Containerized deployment using Docker

## Tech Stack
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker

## Prerequisites
- Docker and Docker Compose installed
- Git

## Quick Start Guide

1. Clone the repository
```bash
git clone https://github.com/AstroChimp7/task-management-submission.git
cd task-management-submission
```

2. Set up environmental variables 
```bash
# Copy all environment files
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```
3. Database setup though Docker
   ```bash
   docker-compose up -d postgres
   ```
   
4. Start application using Docker
```bash
docker-compose up --build
```

5. Access the application at:
  .Frontend: http://localhost:3001
  .Backend API: http://localhost:3000/api
  .PostgreSQL: localhost:5433

## Salary expectation
- 1600/month (20hrs per week)
- 3200/month (40hrs per week)

## Video Demonstration
-[Video Link](https://drive.google.com/file/d/1OJWglcipAJHwa6PvXpxf4DlYIwi9RwWz/view?usp=drive_link)




