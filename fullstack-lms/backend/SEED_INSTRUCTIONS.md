# Database Seed Instructions

## Overview

This seed script will populate your MongoDB database with comprehensive sample data for the LMS CMS courses page.

## What's Included

### 📊 Categories (8)

- Programming 💻
- Design 🎨
- Business 💼
- Marketing 📈
- Data Science 📊
- Mobile Development 📱
- Web Development 🌐
- DevOps ⚙️

### 👥 Users (6)

- **Admin**: admin@lms.com / admin123
- **Instructors**:
  - instructor@lms.com / instructor123
  - sarah@lms.com / sarah123
  - mike@lms.com / mike123
  - lisa@lms.com / lisa123
- **Student**: student@lms.com / student123

### 📚 Courses (11)

- **2 Free Courses**: Python for Beginners, Introduction to Programming
- **9 Paid Courses**: Various levels (beginner, intermediate, advanced)
- **Featured Courses**: Web Development Bootcamp, UI/UX Design, Digital Marketing
- **Realistic Data**: Ratings, reviews, enrollment numbers, durations

## How to Run

### Prerequisites

1. Make sure MongoDB is running
2. Set up your `.env` file with `MONGODB_URI`
3. Install dependencies: `npm install`

### Run Seed Script

```bash
# Option 1: Using npm script
npm run seed

# Option 2: Direct execution
node src/utils/seedData.js

# Option 3: Using the wrapper script
node seed.js
```

### Expected Output

```
🌱 Starting database seeding...
✅ MongoDB Connected for seeding
✅ Categories seeded successfully
✅ Users seeded successfully
✅ Courses seeded successfully
✅ Database seeding completed successfully!

📊 Sample Data Created:
- 8 Categories (Programming, Design, Business, Marketing, Data Science, Mobile Development, Web Development, DevOps)
- 1 Admin user (admin@lms.com / admin123)
- 4 Instructor users (instructor@lms.com, sarah@lms.com, mike@lms.com, lisa@lms.com)
- 1 Student user (student@lms.com / student123)
- 11 Sample courses (2 free, 9 paid) with various levels and categories
```

## Access Your CMS

After seeding, you can access your CMS at:

- **URL**: http://localhost:5173/cms/courses
- **Login**: Use any of the credentials above

## Course Details

### Free Courses

1. **Free Introduction to Programming** - Python basics for beginners
2. **Free Python for Beginners** - Complete Python introduction

### Featured Paid Courses

1. **Complete Web Development Bootcamp** - Full-stack development
2. **UI/UX Design Masterclass** - Design principles and tools
3. **Digital Marketing Strategy** - Comprehensive marketing

### Advanced Courses

1. **Advanced JavaScript Concepts** - Deep dive into JS
2. **Advanced React Patterns** - React optimization
3. **Docker and Kubernetes for DevOps** - Containerization

### Specialized Courses

1. **Data Science Fundamentals** - ML and analytics
2. **React Native Mobile App Development** - Cross-platform apps
3. **Business Strategy and Entrepreneurship** - Business development

## Data Features

### Realistic Course Data

- ✅ Varied pricing ($0 - $129.99)
- ✅ Different difficulty levels
- ✅ Realistic ratings (4.1 - 4.9)
- ✅ Enrollment numbers (1,560 - 28,940 students)
- ✅ Review counts (234 - 2,156 reviews)
- ✅ Course durations (4-25 hours)
- ✅ Comprehensive tags and requirements
- ✅ Learning outcomes for each course

### Instructor Diversity

- ✅ 4 different instructors with unique specialties
- ✅ Realistic bios and experience levels
- ✅ Different teaching styles and expertise

### Category Coverage

- ✅ 8 different categories covering major tech fields
- ✅ Color-coded categories with icons
- ✅ Balanced course distribution across categories

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check if MongoDB is running
   - Verify your `MONGODB_URI` in `.env`

2. **Permission Errors**

   - Make sure you have write permissions to the database

3. **Duplicate Key Errors**
   - The script will clear existing data before seeding
   - If issues persist, manually clear your collections

### Reset Database

If you need to start fresh:

```bash
# Clear all collections
mongo your_database_name --eval "db.dropDatabase()"

# Then run seed again
npm run seed
```

## Next Steps

After seeding:

1. Start your backend server: `npm run dev`
2. Start your frontend: `cd ../frontend && npm run dev`
3. Login to CMS and explore the courses
4. Test filtering, searching, and course management features

Enjoy your populated LMS database! 🎉
