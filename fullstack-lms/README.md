# 🚀 Fullstack LMS - Learning Management System

Fullstack Learning Management System dengan Vue.js frontend dan Node.js backend yang siap pakai dengan fitur lengkap.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Detailed Installation](#-detailed-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Development Guide](#-development-guide)

## ✨ Features

### 🎯 Core Features

- **User Authentication** - Login/Register dengan role-based access
- **Course Management** - CRUD operations untuk courses
- **User Management** - Admin, Instructor, dan Student roles
- **Category Management** - Organisasi course berdasarkan kategori
- **File Upload** - Support untuk course materials

### 🎨 Frontend Features

- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Beautiful gradients dan smooth animations
- **CMS Dashboard** - Admin panel yang user-friendly
- **Component-based** - Reusable Vue.js components
- **State Management** - Pinia store untuk data management

### 🛡️ Backend Features

- **JWT Authentication** - Secure token-based auth
- **Role-based Authorization** - Access control per user role
- **Rate Limiting** - Protection dari abuse
- **Input Validation** - Data sanitization
- **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

### Frontend

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Vite** - Build tool dan dev server
- **SCSS** - Advanced CSS preprocessing

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload handling

## 📋 Prerequisites

Sebelum memulai, pastikan laptop Anda sudah memiliki:

### **Required Software**

- **Node.js** (v16.0.0 atau lebih baru)
- **npm** (v8.0.0 atau lebih baru)
- **MongoDB** (v5.0 atau lebih baru)

### **How to Install Prerequisites**

#### **1. Install Node.js**

```bash
# Download dari https://nodejs.org/
# Atau gunakan package manager:

# macOS dengan Homebrew
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download installer dari https://nodejs.org/
```

#### **2. Install MongoDB**

```bash
# macOS dengan Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Windows
# Download dari https://www.mongodb.com/try/download/community
```

#### **3. Verify Installation**

```bash
# Check Node.js
node --version
npm --version

# Check MongoDB
mongod --version
```

## 🚀 Quick Start

Untuk developer yang sudah berpengalaman, berikut quick start:

```bash
# 1. Clone project
git clone <repository-url>
cd fullstack-lms

# 2. Install dependencies
npm run install:all

# 3. Setup environment
cd backend
cp env.example .env
# Edit .env file

# 4. Start MongoDB
brew services start mongodb-community  # macOS
# atau
sudo systemctl start mongod           # Linux

# 5. Run project
npm run dev
```

**Access URLs:**

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 📖 Detailed Installation

### **Step 1: Clone Project**

```bash
# Clone repository
git clone <repository-url>

# Masuk ke folder project
cd fullstack-lms

# Verify struktur folder
ls -la
# Should show: frontend/, backend/, package.json
```

### **Step 2: Install Dependencies**

```bash
# Install semua dependencies sekaligus (root, frontend, backend)
npm run install:all

# Atau install manual:
npm install                    # Root dependencies
cd frontend && npm install    # Frontend dependencies
cd ../backend && npm install  # Backend dependencies
cd ..                         # Back to root
```

### **Step 3: Environment Configuration**

```bash
# Setup backend environment
cd backend
cp env.example .env

# Edit file .env dengan text editor favorit
nano .env
# atau
code .env
# atau
vim .env
```

**Isi file `.env` dengan konfigurasi berikut:**

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lms_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Step 4: Start MongoDB**

```bash
# macOS dengan Homebrew
brew services start mongodb-community

# Linux dengan systemctl
sudo systemctl start mongod
sudo systemctl enable mongod

# Manual start
mongod --dbpath /data/db

# Verify MongoDB running
mongo --eval "db.runCommand('ping')"
# Should return: { "ok" : 1 }
```

### **Step 5: Seed Database (Optional)**

```bash
# Dari root folder
npm run seed

# Ini akan membuat sample data:
# - Users (admin, instructor, student)
# - Sample courses
# - Categories
# - Testimonials
```

## 🏃‍♂️ Running the Project

### **Option 1: Run Both Servers (Recommended)**

```bash
# Dari root folder
npm run dev

# Ini akan menjalankan:
# - Backend di port 5001
# - Frontend di port 5173
```

### **Option 2: Run Servers Separately**

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### **Option 3: Production Mode**

```bash
# Build frontend
npm run build

# Start backend production
npm start
```

### **Access Your Application**

- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:5001
- 📊 **API Health**: http://localhost:5001/api/health

## 📁 Project Structure

```
fullstack-lms/
├── 📁 frontend/                 # Vue.js Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 stores/         # Pinia state management
│   │   ├── 📁 router/         # Vue Router configuration
│   │   ├── 📁 styles/         # SCSS styling
│   │   └── 📁 utils/          # Utility functions
│   ├── 📁 public/             # Static assets
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
├── 📁 backend/                 # Node.js Backend
│   ├── 📁 src/
│   │   ├── 📁 config/         # Database & app config
│   │   ├── 📁 controllers/    # Route controllers
│   │   ├── 📁 middleware/     # Custom middleware
│   │   ├── 📁 models/         # Mongoose models
│   │   ├── 📁 routes/         # API routes
│   │   └── 📁 utils/          # Backend utilities
│   ├── 📁 uploads/            # File upload directory
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
├── package.json               # Root dependencies & scripts
└── README.md                  # This file
```

## 🔌 API Documentation

### **Authentication Endpoints**

```http
POST /api/auth/register     # Register new user
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user profile
PUT  /api/auth/me          # Update user profile
```

### **Course Endpoints**

```http
GET    /api/courses        # Get all courses
GET    /api/courses/:id    # Get single course
POST   /api/courses        # Create new course
PUT    /api/courses/:id    # Update course
DELETE /api/courses/:id    # Delete course
```

### **User Endpoints**

```http
GET    /api/users          # Get all users (admin only)
GET    /api/users/:id      # Get user by ID
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user (admin only)
```

### **Test API with Sample Data**

```bash
# Health check
curl http://localhost:5001/api/health

# Get courses
curl http://localhost:5001/api/courses

# Login test
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lms.com","password":"admin123"}'
```

## 🔐 Default Login Credentials

Setelah menjalankan `npm run seed`, Anda bisa login dengan:

| Role           | Email              | Password      | Access Level                |
| -------------- | ------------------ | ------------- | --------------------------- |
| **Admin**      | admin@lms.com      | admin123      | Full access to all features |
| **Instructor** | instructor@lms.com | instructor123 | Course management           |
| **Student**    | student@lms.com    | student123    | View and enroll courses     |

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### **1. Port Already in Use**

```bash
# Check what's using the port
lsof -i :5001
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or change port in .env file
PORT=5002
```

#### **2. MongoDB Connection Error**

```bash
# Check MongoDB status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux

# Restart MongoDB
brew services restart mongodb-community  # macOS
sudo systemctl restart mongod           # Linux

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

#### **3. Dependencies Installation Error**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Or use install:all script
npm run install:all
```

#### **4. Frontend Build Error**

```bash
# Clear frontend cache
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..

# Rebuild
npm run build
```

#### **5. Backend API Error**

```bash
# Check backend logs
cd backend
npm run dev

# Test database connection
npm run seed
```

### **Error Messages & Solutions**

| Error                       | Solution                             |
| --------------------------- | ------------------------------------ |
| `ECONNREFUSED`              | Start MongoDB service                |
| `EADDRINUSE`                | Change port or kill existing process |
| `MODULE_NOT_FOUND`          | Run `npm run install:all`            |
| `JWT_SECRET missing`        | Set JWT_SECRET in .env file          |
| `MongoDB connection failed` | Check MongoDB service status         |

## 🛠️ Development Guide

### **Available Scripts**

```bash
# Development
npm run dev                    # Run both servers
npm run dev:frontend          # Frontend only
npm run dev:backend           # Backend only

# Production
npm run build                 # Build frontend
npm run start                 # Start backend

# Database
npm run seed                  # Seed sample data

# Installation
npm run install:all          # Install all dependencies
```

### **Adding New Features**

1. **Backend**: Add routes in `backend/src/routes/`
2. **Frontend**: Add pages in `frontend/src/pages/`
3. **Database**: Add models in `backend/src/models/`
4. **Styling**: Add SCSS in `frontend/src/styles/`

### **Code Style**

- **Backend**: ES6+ syntax, async/await
- **Frontend**: Vue 3 Composition API
- **Database**: Mongoose schemas
- **Styling**: SCSS with BEM methodology

## 🚀 Deployment

### **Frontend Build**

```bash
npm run build
# Output: frontend/dist/
```

### **Backend Production**

```bash
cd backend
NODE_ENV=production npm start
```

### **Environment Variables for Production**

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_db
JWT_SECRET=your-production-secret-key
CORS_ORIGIN=https://yourdomain.com
```

## 📞 Support & Community

### **Getting Help**

1. **Check this README** - Most issues are covered here
2. **Check logs** - Backend and frontend console logs
3. **Verify prerequisites** - Node.js, MongoDB versions
4. **Restart services** - MongoDB and application servers

### **Common Solutions**

- **Can't access frontend**: Check if `npm run dev:frontend` is running
- **API errors**: Check if `npm run dev:backend` is running
- **Database errors**: Verify MongoDB is running
- **Port conflicts**: Change ports in .env file

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All contributors who helped build this LMS

---

**Happy Coding! 🎉**

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi tim development.
