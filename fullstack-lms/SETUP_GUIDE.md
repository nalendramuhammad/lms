# 🚀 Fullstack LMS Setup Guide

Panduan lengkap untuk setup dan menjalankan project Fullstack LMS dengan Vue.js frontend dan Node.js backend.

## 📁 Struktur Project

```
fullstack-lms/
├── frontend/          # Vue.js Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.vue
│   │   │   ├── Dashboard.vue
│   │   │   ├── CourseDetail.vue
│   │   │   └── Home.vue
│   │   ├── stores/
│   │   │   ├── auth.js
│   │   │   └── courses.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── router/
│   │   ├── styles/
│   │   └── main.js
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── uploads/
│   ├── package.json
│   └── README.md
└── package.json       # Root package.json
```

## 🛠️ Installation & Setup

### **Step 1: Prerequisites**

```bash
# Pastikan sudah terinstall:
# - Node.js (v16+)
# - MongoDB
# - npm atau yarn
```

### **Step 2: Clone dan Setup**

```bash
# Masuk ke folder project
cd fullstack-lms

# Install semua dependencies
npm run install:all
```

### **Step 3: Setup Environment**

```bash
# Setup backend environment
cd backend
cp env.example .env
# Edit .env sesuai kebutuhan
```

### **Step 4: Start MongoDB**

```bash
# macOS dengan Homebrew
brew services start mongodb-community

# Atau manual
mongod
```

### **Step 5: Seed Database**

```bash
# Dari root folder
npm run seed
```

## 🚀 Development

### **Run Kedua Server (Frontend + Backend)**

```bash
# Dari root folder
npm run dev
```

### **Run Frontend Saja**

```bash
npm run dev:frontend
```

### **Run Backend Saja**

```bash
npm run dev:backend
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/api/health

## 🔐 Login Credentials

```
Admin: admin@lms.com / admin123
Instructor: instructor@lms.com / instructor123
Student: student@lms.com / student123
```

## 📱 Frontend Features

### **Pages yang Tersedia**

1. **Home** (`/`) - Landing page
2. **Login** (`/login`) - Authentication page
3. **CMS Pages** (`/cms/*`) - Admin pages
   - **Browse Courses** (`/cms/courses`) - Course management
   - **Free Courses** (`/cms/free-courses`) - Free course management
   - **Search Jobs** (`/cms/search-jobs`) - Job search management
   - **Badges** (`/cms/badges`) - Badge management
   - **Testimonials** (`/cms/testimonials`) - Testimonial management
   - **Marketing Content** (`/cms/marketing`) - Marketing content
   - **Learning Categories** (`/cms/categories`) - Category management
   - **Certifications** (`/cms/certifications`) - Certification management

### **Authentication Flow**

1. User mengakses `/login`
2. Masukkan credentials
3. Setelah login berhasil, redirect ke `/cms/courses`
4. CMS menampilkan courses dan management tools
5. Gunakan sidebar untuk navigasi ke halaman CMS lainnya

### **State Management**

- **Pinia Stores**:
  - `auth.js` - Authentication state
  - `courses.js` - Course data management

### **API Integration**

- **Axios** untuk HTTP requests
- **Interceptors** untuk token management
- **Error handling** otomatis

## 🗄️ Backend Features

### **API Endpoints**

- **Authentication**: `/api/auth/*`
- **Courses**: `/api/courses/*`
- **Users**: `/api/users/*`
- **Health Check**: `/api/health`

### **Database Collections**

- `users` - User data
- `courses` - Course data
- `categories` - Category data

### **Security Features**

- JWT Authentication
- Role-based Authorization
- Password Hashing
- Rate Limiting
- CORS Configuration

## 🔧 Scripts

```bash
# Development
npm run dev                    # Run both frontend & backend
npm run dev:frontend          # Run frontend only
npm run dev:backend           # Run backend only

# Production
npm run build                 # Build frontend
npm run start                 # Start backend

# Database
npm run seed                  # Seed sample data

# Installation
npm run install:all          # Install all dependencies
```

## 📊 Sample Data

### **Users**

- **Admin**: Full access to all features
- **Instructor**: Can create and manage courses
- **Student**: Can view and enroll in courses

### **Courses**

- **Complete Web Development Bootcamp** ($99.99)
- **Advanced JavaScript Concepts** ($79.99)
- **Free Introduction to Programming** (Free)

### **Categories**

- Programming
- Design
- Business
- Marketing

## 🎨 UI/UX Features

### **Responsive Design**

- Mobile-first approach
- Grid layouts
- Flexible components

### **Modern Styling**

- SCSS for styling
- CSS Grid & Flexbox
- Smooth animations
- Beautiful gradients

### **User Experience**

- Loading states
- Error handling
- Form validation
- Smooth navigation

## 🔍 Testing

### **Frontend Testing**

```bash
# Test login
1. Buka http://localhost:5173/login
2. Masukkan credentials
3. Cek redirect ke dashboard

# Test course listing
1. Buka dashboard
2. Cek courses ditampilkan
3. Test search dan filter
4. Klik course untuk detail
```

### **Backend Testing**

```bash
# Test API endpoints
curl http://localhost:5001/api/health
curl http://localhost:5001/api/courses
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lms.com","password":"admin123"}'
```

## 🚀 Deployment

### **Frontend Build**

```bash
npm run build
# Output di frontend/dist/
```

### **Backend Production**

```bash
cd backend
npm start
```

### **Environment Variables**

```env
# Production
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://yourdomain.com
```

## 🐛 Troubleshooting

### **Port Already in Use**

```bash
# Cek port yang digunakan
lsof -i :5001
lsof -i :5173

# Kill process
kill -9 <PID>
```

### **MongoDB Connection Error**

```bash
# Cek MongoDB status
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community
```

### **Frontend Build Error**

```bash
# Clear cache
rm -rf frontend/node_modules
cd frontend && npm install
```

### **Backend API Error**

```bash
# Check logs
cd backend && npm run dev

# Test database connection
cd backend && npm run seed
```

## 📞 Support

Untuk bantuan atau pertanyaan:

1. Cek dokumentasi di folder masing-masing
2. Pastikan semua dependencies terinstall
3. Cek environment variables
4. Restart servers jika perlu

## 🎯 Next Steps

1. **Implementasi fitur tambahan**:
   - User registration
   - Course enrollment
   - Payment integration
   - Video streaming

2. **Testing**:
   - Unit tests
   - Integration tests
   - E2E tests

3. **Deployment**:
   - Setup production environment
   - Configure CI/CD
   - Setup monitoring

4. **Security**:
   - Input validation
   - Rate limiting
   - SSL certificates
   - Regular backups
