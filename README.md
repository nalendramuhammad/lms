# 🎓 Learning Management System (LMS)

Fullstack Learning Management System dengan Vue.js frontend dan Node.js backend.

## 📁 Project Structure

```
lms/
├── fullstack-lms/     # Main project folder
│   ├── frontend/      # Vue.js Frontend
│   ├── backend/       # Node.js Backend
│   └── package.json   # Root package.json
├── .git/              # Git repository
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🚀 Quick Start

### **1. Masuk ke project folder**

```bash
cd fullstack-lms
```

### **2. Install dependencies**

```bash
npm run install:all
```

### **3. Setup environment**

```bash
cd backend
cp env.example .env
```

### **4. Start MongoDB**

```bash
# macOS dengan Homebrew
brew services start mongodb-community
```

### **5. Seed database**

```bash
npm run seed
```

### **6. Run development servers**

```bash
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001

## 🔐 Login Credentials

```
Admin: admin@lms.com / admin123
Instructor: instructor@lms.com / instructor123
Student: student@lms.com / student123
```

## 📚 Documentation

- **Setup Guide**: `fullstack-lms/SETUP_GUIDE.md`
- **Backend Docs**: `fullstack-lms/backend/README.md`
- **Frontend Docs**: `fullstack-lms/frontend/README.md`

## 🛠️ Available Scripts

```bash
# Dari folder fullstack-lms/
npm run dev                    # Run both frontend & backend
npm run dev:frontend          # Run frontend only
npm run dev:backend           # Run backend only
npm run build                 # Build frontend
npm run seed                  # Seed database
npm run install:all          # Install all dependencies
```

## 🎯 Features

### **Frontend (Vue.js)**

- ✅ Authentication system
- ✅ Dashboard dengan course listing
- ✅ Course detail pages
- ✅ Search & filter functionality
- ✅ Responsive design
- ✅ State management dengan Pinia

### **Backend (Node.js)**

- ✅ JWT Authentication
- ✅ RESTful API
- ✅ MongoDB integration
- ✅ Role-based authorization
- ✅ File upload support
- ✅ Security features

### **Database (MongoDB)**

- ✅ User management
- ✅ Course management
- ✅ Category management
- ✅ Sample data included

## 🚀 Next Steps

1. **Test semua fitur** yang sudah dibuat
2. **Implementasi fitur tambahan**:
   - User registration
   - Course enrollment
   - Payment integration
   - Video streaming
3. **Deployment** ke production
4. **Testing** (unit, integration, e2e)

## 📞 Support

Untuk bantuan atau pertanyaan, silakan cek dokumentasi di folder `fullstack-lms/`.

---

**Happy Coding! 🚀**
