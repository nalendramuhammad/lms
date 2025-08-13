# LMS Backend API

Backend API untuk Learning Management System (LMS) menggunakan Node.js, Express.js, dan MongoDB.

## 🚀 Fitur

- **Authentication & Authorization**: JWT-based authentication dengan role-based access
- **User Management**: CRUD operations untuk users (student, instructor, admin)
- **Course Management**: Lengkap dengan filtering, searching, dan pagination
- **File Upload**: Support untuk upload gambar dan dokumen
- **Security**: Rate limiting, CORS, helmet, dan error handling
- **Database**: MongoDB dengan Mongoose ODM

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- MongoDB (local atau cloud)
- npm atau yarn

## 🛠️ Installation

1. **Clone repository dan masuk ke folder backend**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp env.example .env
```

4. **Edit file .env sesuai konfigurasi Anda**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms_db
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

5. **Start MongoDB** (jika menggunakan local)

```bash
# macOS dengan Homebrew
brew services start mongodb-community

# atau manual
mongod
```

6. **Run development server**

```bash
npm run dev
```

## 📚 API Endpoints

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

### Users

- `GET /api/users` - Get semua users (admin only)

### Health Check

- `GET /api/health` - Health check endpoint

## 🔧 Scripts

```bash
# Development
npm run dev

# Production
npm start

# Test
npm test
```

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/instructor/admin),
  avatar: String,
  bio: String,
  phone: String,
  isActive: Boolean,
  preferences: Object
}
```

### Course Model

```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  instructor: ObjectId (ref: User),
  category: ObjectId (ref: Category),
  price: Number,
  isFree: Boolean,
  level: String (beginner/intermediate/advanced),
  status: String (draft/published/archived),
  lessons: [ObjectId],
  tags: [String],
  rating: Number,
  enrolledStudents: Number
}
```

## 🔐 Authentication

API menggunakan JWT (JSON Web Tokens) untuk authentication. Token harus disertakan di header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **student**: Akses terbatas, hanya bisa enroll dan view courses
- **instructor**: Bisa create, update, delete courses sendiri
- **admin**: Akses penuh ke semua fitur

## 🛡️ Security Features

- **Rate Limiting**: Mencegah abuse dengan membatasi request per IP
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Validasi input menggunakan Mongoose
- **Error Handling**: Centralized error handling
- **Password Hashing**: Menggunakan bcryptjs

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── users.js
│   │   └── ...
│   ├── utils/
│   └── server.js
├── uploads/
├── package.json
├── env.example
└── README.md
```

## 🚀 Deployment

### Environment Variables untuk Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_db
JWT_SECRET=your-production-secret-key
CORS_ORIGIN=https://yourdomain.com
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.
