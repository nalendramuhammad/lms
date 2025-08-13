# 🚀 LMS Backend Setup Guide

Setup lengkap untuk backend LMS menggunakan Node.js + Express.js + MongoDB.

## ✅ Setup yang Sudah Berhasil

### 1. Struktur Project

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          ✅ MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              ✅ JWT authentication
│   │   ├── errorHandler.js      ✅ Error handling
│   │   └── rateLimiter.js       ✅ Rate limiting
│   ├── models/
│   │   ├── User.js              ✅ User model dengan roles
│   │   └── Course.js            ✅ Course model
│   ├── routes/
│   │   ├── auth.js              ✅ Authentication routes
│   │   ├── courses.js           ✅ Course CRUD
│   │   ├── users.js             ✅ User management
│   │   └── [other routes]       ✅ Placeholder routes
│   └── server.js                ✅ Main server file
├── uploads/                     ✅ File upload directory
├── package.json                 ✅ Dependencies & scripts
├── .env                         ✅ Environment variables
├── .gitignore                   ✅ Git ignore rules
└── README.md                    ✅ Documentation
```

### 2. Dependencies yang Terinstall

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "express-rate-limit": "^7.1.5"
}
```

### 3. Environment Variables (.env)

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lms_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## 🛠️ Cara Menjalankan

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment

```bash
cp env.example .env
# Edit .env sesuai kebutuhan
```

### 3. Start MongoDB

```bash
# macOS dengan Homebrew
brew services start mongodb-community

# Atau manual
mongod
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test API

```bash
# Health check
curl http://localhost:5001/api/health

# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📚 API Endpoints yang Tersedia

### Authentication

- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `POST /api/auth/logout` - Logout

### Courses

- `GET /api/courses` - Get semua courses (dengan filtering)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (instructor/admin)
- `PUT /api/courses/:id` - Update course (instructor/admin)
- `DELETE /api/courses/:id` - Delete course (instructor/admin)

### Health Check

- `GET /api/health` - Health check endpoint

## 🔐 Authentication Flow

1. **Register**: User mendaftar dengan email dan password
2. **Login**: User login dan mendapat JWT token
3. **Protected Routes**: Gunakan token di header `Authorization: Bearer <token>`
4. **Role-based Access**:
   - `student`: Akses terbatas
   - `instructor`: Bisa manage courses
   - `admin`: Akses penuh

## 🗄️ Database Models

### User Model

- `name`, `email`, `password` (hashed)
- `role`: student/instructor/admin
- `avatar`, `bio`, `phone`
- `preferences`: notification settings

### Course Model

- `title`, `slug`, `description`
- `instructor`, `category`, `price`
- `level`: beginner/intermediate/advanced
- `status`: draft/published/archived
- `lessons`, `tags`, `rating`

## 🛡️ Security Features

- ✅ **JWT Authentication** dengan bcrypt password hashing
- ✅ **Role-based Authorization** (student/instructor/admin)
- ✅ **Rate Limiting** untuk mencegah abuse
- ✅ **CORS Configuration** untuk frontend integration
- ✅ **Helmet Security Headers**
- ✅ **Input Validation** dengan Mongoose
- ✅ **Error Handling** yang konsisten
- ✅ **File Upload** support dengan Multer

## 🔄 Next Steps

### 1. Implementasi Model Lainnya

- [ ] Category Model
- [ ] Lesson Model
- [ ] Enrollment Model
- [ ] Badge Model
- [ ] Certificate Model
- [ ] Testimonial Model
- [ ] Job Model

### 2. Advanced Features

- [ ] File upload untuk course materials
- [ ] Real-time notifications dengan Socket.io
- [ ] Email notifications
- [ ] Payment integration
- [ ] Video streaming
- [ ] Progress tracking

### 3. Testing

- [ ] Unit tests dengan Jest
- [ ] Integration tests
- [ ] API documentation dengan Swagger

### 4. Deployment

- [ ] Docker configuration
- [ ] CI/CD pipeline
- [ ] Production environment setup

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Cek port yang digunakan
lsof -i :5001

# Kill process
kill -9 <PID>

# Atau ubah port di .env
PORT=5002
```

### MongoDB Connection Error

```bash
# Cek MongoDB status
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community
```

### JWT Secret Error

```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📞 Support

Jika ada masalah atau pertanyaan, silakan buat issue di repository atau hubungi developer.
