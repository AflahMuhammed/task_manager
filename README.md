# 📋 Task Manager Frontend

A modern Task Management Web Application built using **React.js**. The application allows users to securely register, log in, and manage their tasks through an intuitive dashboard.

---

## 🚀 Live Demo

**Frontend Deployment:**  
🔗 [task-manager-iota-azure.vercel.app](https://task-manager-iota-azure.vercel.app)

---

## ✨ Features

### User Management
- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Protected Routes

### Task Management
- ✅ Create Tasks
- ✅ View Tasks
- ✅ Edit Tasks
- ✅ Delete Tasks
- ✅ Toggle Task Status

### UI/UX
- ✅ Responsive Dashboard
- ✅ Intuitive Interface
- ✅ Backend API Integration

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router DOM** - Client-side Routing
- **Axios** - HTTP Client
- **CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB Atlas** - Database
- **JWT** - Authentication

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI Components
├── context/
│   └── AuthContext.jsx  # Authentication Context
├── pages/
│   ├── Login.jsx        # Login Page
│   ├── Register.jsx     # Registration Page
│   └── Dashboard.jsx    # Main Dashboard
├── routes/
│   └── PrivateRoute.jsx # Protected Routes
├── services/
│   └── api.js          # API Configuration
├── App.jsx             # Main App Component
└── main.jsx            # Entry Point
```

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/AflahMuhammed/task_manager.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Application will start on: **http://localhost:5173**

### 4. Backend Configuration
Update the backend API URL in `src/services/api.js`:

```javascript
baseURL: "https://task-manager-backend-wlp2.onrender.com/api"
```

---

## 📚 Learning Outcomes

This project helped in understanding:

- ✓ React Fundamentals & Best Practices
- ✓ React Hooks (useState, useEffect, useContext)
- ✓ React Router for Client-side Navigation
- ✓ Axios for API Integration
- ✓ Authentication Flow & JWT Tokens
- ✓ Protected Routes Implementation
- ✓ State Management Patterns
- ✓ Frontend Deployment using Vercel
- ✓ Frontend and Backend Integration

---

## 👨‍💻 Author

**Muhammed Aflah**  
Model Engineering College, Kerala

---

## 📄 License

This project was developed as part of a **MERN Stack Internship Assignment**.
