Task Manager Frontend
A modern Task Management Web Application built using React.js. The application allows users to securely register, log in, and manage their tasks through an intuitive dashboard.
Live Demo
Frontend Deployment:
https://task-manager-iota-azure.vercel.app
Features
User Registration
User Login
JWT Authentication
Protected Routes
Create Tasks
View Tasks
Edit Tasks
Delete Tasks
Toggle Task Status
Responsive Dashboard UI
Backend API Integration
Tech Stack
Frontend
React.js
React Router DOM
Axios
CSS
Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication
Project Structure
src/
├── components/
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── routes/
│   └── PrivateRoute.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
Installation
Clone Repository
git clone https://github.com/AflahMuhammed/task_manager.git
Navigate to Project
cd task_manager
Install Dependencies
npm install
Run Development Server
npm run dev
Application will start on:
http://localhost:5173
Backend Configuration
Update the backend API URL in:
src/services/api.js
Example:
baseURL: "https://task-manager-backend-wlp2.onrender.com/api"
Screenshots
Login Page
Add screenshot here.
Registration Page
Add screenshot here.
Dashboard
Add screenshot here.
Task Management
Add screenshot here.
Learning Outcomes
This project helped in understanding:
React Fundamentals
React Hooks
React Router
Axios API Integration
Authentication Flow
Protected Routes
State Management
Frontend Deployment using Vercel
Frontend and Backend Integration
Author
Muhammed Aflah
Model Engineering College, Kerala
License
This project was developed as part of a MERN Stack Internship Assignment.
