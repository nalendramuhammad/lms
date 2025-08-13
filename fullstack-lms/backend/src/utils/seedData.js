import mongoose from "mongoose";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import Job from "../models/Job.js";
import Testimonial from "../models/Testimonial.js";
import MarketingContent from "../models/MarketingContent.js";
import PricingPlan from "../models/PricingPlan.js";
import MarketingCampaign from "../models/MarketingCampaign.js";
import Promotion from "../models/Promotion.js";
import Certification from "../models/Certification.js";
import Enrollment from "../models/Enrollment.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected for seeding");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    // Create categories
    const categories = await Category.create([
      {
        name: "Programming",
        description: "Learn programming languages and software development",
        icon: "💻",
        color: "#3B82F6",
      },
      {
        name: "Design",
        description: "Master design principles and creative tools",
        icon: "🎨",
        color: "#EF4444",
      },
      {
        name: "Business",
        description: "Develop business and entrepreneurship skills",
        icon: "💼",
        color: "#10B981",
      },
      {
        name: "Marketing",
        description: "Learn digital marketing and growth strategies",
        icon: "📈",
        color: "#F59E0B",
      },
      {
        name: "Data Science",
        description: "Master data analysis and machine learning",
        icon: "📊",
        color: "#8B5CF6",
      },
      {
        name: "Mobile Development",
        description: "Build mobile applications for iOS and Android",
        icon: "📱",
        color: "#06B6D4",
      },
      {
        name: "Web Development",
        description: "Create modern web applications and websites",
        icon: "🌐",
        color: "#EC4899",
      },
      {
        name: "DevOps",
        description: "Learn deployment, CI/CD, and infrastructure",
        icon: "⚙️",
        color: "#F97316",
      },
    ]);

    console.log("✅ Categories seeded successfully");
    return categories;
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@lms.com",
      password: "admin123",
      role: "admin",
      bio: "System Administrator",
      phone: "+1234567890",
      status: "active",
      verified: true,
    });

    // Create instructor users
    const instructorUsers = await User.create([
      {
        name: "John Instructor",
        email: "instructor@lms.com",
        password: "instructor123",
        role: "instructor",
        bio: "Experienced Web Development Instructor with 8+ years of experience",
        phone: "+1234567891",
        status: "active",
        verified: true,
      },
      {
        name: "Sarah Designer",
        email: "sarah@lms.com",
        password: "sarah123",
        role: "instructor",
        bio: "UI/UX Designer and Creative Director",
        phone: "+1234567892",
        status: "active",
        verified: true,
      },
      {
        name: "Mike Data",
        email: "mike@lms.com",
        password: "mike123",
        role: "instructor",
        bio: "Data Scientist and Machine Learning Expert",
        phone: "+1234567893",
        status: "active",
        verified: true,
      },
      {
        name: "Lisa Business",
        email: "lisa@lms.com",
        password: "lisa123",
        role: "instructor",
        bio: "Business Strategy Consultant and Entrepreneur",
        phone: "+1234567894",
        status: "active",
        verified: true,
      },
    ]);

    // Create student user
    const studentUser = await User.create({
      name: "Alice Student",
      email: "student@lms.com",
      password: "student123",
      role: "student",
      bio: "Learning Web Development",
      phone: "+1234567895",
      status: "active",
      verified: true,
    });

    console.log("✅ Users seeded successfully");
    return { adminUser, instructorUsers, studentUser };
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

const seedJobs = async (creator) => {
  try {
    await Job.deleteMany({});

    const jobs = await Job.create([
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        companyLogo:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
        description:
          "We are looking for a talented Frontend Developer to join our team. You will be responsible for building user interfaces and implementing web applications.",
        location: "Jakarta, Indonesia",
        salaryText: "Rp 15.000.000 - 25.000.000",
        salaryMin: 15000000,
        salaryMax: 25000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "3-5 years",
        experienceMinYears: 3,
        experienceMaxYears: 5,
        tags: ["React", "Vue.js", "JavaScript"],
        postedDate: new Date("2024-01-15"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
      {
        title: "Backend Developer",
        company: "Digital Solutions",
        companyLogo:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        description:
          "Join our backend team to develop scalable APIs and microservices. Experience with Node.js, Python, or Java required.",
        location: "Bandung, Indonesia",
        salaryText: "Rp 20.000.000 - 35.000.000",
        salaryMin: 20000000,
        salaryMax: 35000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "5-7 years",
        experienceMinYears: 5,
        experienceMaxYears: 7,
        tags: ["Node.js", "Python", "Java"],
        postedDate: new Date("2024-01-12"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
      {
        title: "UI/UX Designer",
        company: "Creative Studio",
        companyLogo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        description:
          "Create beautiful and intuitive user experiences. We need someone who can design both web and mobile interfaces.",
        location: "Surabaya, Indonesia",
        salaryText: "Rp 12.000.000 - 20.000.000",
        salaryMin: 12000000,
        salaryMax: 20000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "2-4 years",
        experienceMinYears: 2,
        experienceMaxYears: 4,
        tags: ["Figma", "Adobe XD", "Sketch"],
        postedDate: new Date("2024-01-10"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
      {
        title: "DevOps Engineer",
        company: "Cloud Tech",
        companyLogo:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop",
        description:
          "Manage our cloud infrastructure and deployment pipelines. Experience with AWS, Docker, and Kubernetes required.",
        location: "Yogyakarta, Indonesia",
        salaryText: "Rp 25.000.000 - 40.000.000",
        salaryMin: 25000000,
        salaryMax: 40000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "4-6 years",
        experienceMinYears: 4,
        experienceMaxYears: 6,
        tags: ["AWS", "Docker", "Kubernetes"],
        postedDate: new Date("2024-01-08"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
      {
        title: "Data Scientist",
        company: "Analytics Pro",
        companyLogo:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=100&h=100&fit=crop",
        description:
          "Build machine learning models and analyze data to drive business decisions. Strong Python and statistics skills needed.",
        location: "Semarang, Indonesia",
        salaryText: "Rp 18.000.000 - 30.000.000",
        salaryMin: 18000000,
        salaryMax: 30000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "3-5 years",
        experienceMinYears: 3,
        experienceMaxYears: 5,
        tags: ["Python", "Machine Learning", "Statistics"],
        postedDate: new Date("2024-01-05"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
      {
        title: "Mobile Developer",
        company: "App Studio",
        companyLogo:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop",
        description:
          "Develop native and cross-platform mobile applications. Experience with React Native or Flutter preferred.",
        location: "Malang, Indonesia",
        salaryText: "Rp 15.000.000 - 25.000.000",
        salaryMin: 15000000,
        salaryMax: 25000000,
        salaryCurrency: "IDR",
        type: "full-time",
        experienceText: "2-4 years",
        experienceMinYears: 2,
        experienceMaxYears: 4,
        tags: ["React Native", "Flutter", "iOS", "Android"],
        postedDate: new Date("2024-01-03"),
        remote: false,
        applyUrl: "",
        status: "active",
        createdBy: creator?._id,
      },
    ]);

    console.log("✅ Jobs seeded successfully");
    return jobs;
  } catch (error) {
    console.error("❌ Error seeding jobs:", error);
  }
};

const seedCourses = async (instructors, categories) => {
  try {
    // Clear existing courses
    await Course.deleteMany({});

    const programmingCategory = categories.find(
      (cat) => cat.name === "Programming"
    );
    const designCategory = categories.find((cat) => cat.name === "Design");
    const businessCategory = categories.find((cat) => cat.name === "Business");
    const marketingCategory = categories.find(
      (cat) => cat.name === "Marketing"
    );
    const dataScienceCategory = categories.find(
      (cat) => cat.name === "Data Science"
    );
    const mobileCategory = categories.find(
      (cat) => cat.name === "Mobile Development"
    );
    const webDevCategory = categories.find(
      (cat) => cat.name === "Web Development"
    );
    const devOpsCategory = categories.find((cat) => cat.name === "DevOps");

    // Create sample courses
    const courses = await Course.create([
      {
        title: "Complete Web Development Bootcamp",
        description:
          "Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and become a full-stack developer. This comprehensive course covers everything you need to know about modern web development.",
        shortDescription: "Master web development with hands-on projects",
        instructor: instructors[0]._id,
        category: webDevCategory._id,
        price: 99.99,
        originalPrice: 199.99,
        isFree: false,
        level: "beginner",
        duration: 1200, // 20 hours in minutes
        tags: [
          "web development",
          "javascript",
          "react",
          "nodejs",
          "html",
          "css",
        ],
        requirements: [
          "Basic computer knowledge",
          "No programming experience required",
          "Willingness to learn and practice",
        ],
        learningOutcomes: [
          "Build responsive websites",
          "Create dynamic web applications",
          "Deploy applications to the web",
          "Understand modern web technologies",
        ],
        status: "published",
        isFeatured: true,
        rating: 4.5,
        numReviews: 1247,
        enrolledStudents: 15420,
        language: "English",
        certificate: true,
      },
      {
        title: "Advanced JavaScript Concepts",
        description:
          "Deep dive into advanced JavaScript concepts including closures, prototypes, async/await, and design patterns. Perfect for developers who want to master JavaScript.",
        shortDescription: "Master advanced JavaScript programming",
        instructor: instructors[0]._id,
        category: programmingCategory._id,
        price: 79.99,
        originalPrice: 149.99,
        isFree: false,
        level: "advanced",
        duration: 600, // 10 hours in minutes
        tags: [
          "javascript",
          "advanced",
          "programming",
          "es6",
          "closures",
          "async",
        ],
        requirements: [
          "Basic JavaScript knowledge",
          "Understanding of programming concepts",
          "Experience with web development",
        ],
        learningOutcomes: [
          "Master advanced JavaScript features",
          "Understand design patterns",
          "Write clean, maintainable code",
          "Optimize JavaScript performance",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.8,
        numReviews: 892,
        enrolledStudents: 5670,
        language: "English",
        certificate: true,
      },
      {
        title: "Free Introduction to Programming",
        description:
          "Perfect for beginners! Learn the basics of programming with Python. No prior experience needed. Start your coding journey today.",
        shortDescription: "Start your programming journey for free",
        instructor: instructors[0]._id,
        category: programmingCategory._id,
        price: 0,
        originalPrice: 49.99,
        isFree: true,
        level: "beginner",
        duration: 300, // 5 hours in minutes
        tags: ["python", "programming", "beginner", "free", "coding"],
        requirements: [
          "No programming experience required",
          "Basic computer skills",
          "Curiosity to learn",
        ],
        learningOutcomes: [
          "Understand programming fundamentals",
          "Write your first Python programs",
          "Solve basic programming problems",
          "Think like a programmer",
        ],
        status: "published",
        isFeatured: true,
        rating: 4.2,
        numReviews: 2156,
        enrolledStudents: 28940,
        language: "English",
        certificate: true,
      },
      {
        title: "UI/UX Design Masterclass",
        description:
          "Learn the principles of user interface and user experience design. Create beautiful, functional, and user-friendly designs that solve real problems.",
        shortDescription: "Master UI/UX design principles and tools",
        instructor: instructors[1]._id,
        category: designCategory._id,
        price: 89.99,
        originalPrice: 179.99,
        isFree: false,
        level: "intermediate",
        duration: 900, // 15 hours in minutes
        tags: [
          "ui design",
          "ux design",
          "figma",
          "prototyping",
          "user research",
        ],
        requirements: [
          "Basic computer skills",
          "Interest in design",
          "Creative mindset",
        ],
        learningOutcomes: [
          "Design user-friendly interfaces",
          "Conduct user research",
          "Create interactive prototypes",
          "Understand design principles",
        ],
        status: "published",
        isFeatured: true,
        rating: 4.7,
        numReviews: 743,
        enrolledStudents: 8230,
        language: "English",
        certificate: true,
      },
      {
        title: "Data Science Fundamentals",
        description:
          "Introduction to data science, statistics, and machine learning. Learn to analyze data and make data-driven decisions.",
        shortDescription: "Learn data science from scratch",
        instructor: instructors[2]._id,
        category: dataScienceCategory._id,
        price: 129.99,
        originalPrice: 249.99,
        isFree: false,
        level: "beginner",
        duration: 1500, // 25 hours in minutes
        tags: [
          "data science",
          "python",
          "statistics",
          "machine learning",
          "pandas",
        ],
        requirements: [
          "Basic mathematics",
          "No programming experience required",
          "Analytical thinking",
        ],
        learningOutcomes: [
          "Analyze data effectively",
          "Build machine learning models",
          "Visualize data insights",
          "Make data-driven decisions",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.6,
        numReviews: 456,
        enrolledStudents: 3450,
        language: "English",
        certificate: true,
      },
      {
        title: "React Native Mobile App Development",
        description:
          "Build cross-platform mobile applications using React Native. Learn to create apps for both iOS and Android with a single codebase.",
        shortDescription: "Create mobile apps with React Native",
        instructor: instructors[0]._id,
        category: mobileCategory._id,
        price: 69.99,
        originalPrice: 139.99,
        isFree: false,
        level: "intermediate",
        duration: 800, // 13.3 hours in minutes
        tags: [
          "react native",
          "mobile development",
          "javascript",
          "ios",
          "android",
        ],
        requirements: [
          "Basic JavaScript knowledge",
          "Understanding of React",
          "Mobile development interest",
        ],
        learningOutcomes: [
          "Build cross-platform mobile apps",
          "Understand mobile development concepts",
          "Deploy apps to app stores",
          "Handle mobile-specific features",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.4,
        numReviews: 321,
        enrolledStudents: 2340,
        language: "English",
        certificate: true,
      },
      {
        title: "Digital Marketing Strategy",
        description:
          "Learn comprehensive digital marketing strategies including SEO, social media, email marketing, and content marketing.",
        shortDescription: "Master digital marketing strategies",
        instructor: instructors[3]._id,
        category: marketingCategory._id,
        price: 59.99,
        originalPrice: 119.99,
        isFree: false,
        level: "beginner",
        duration: 600, // 10 hours in minutes
        tags: [
          "digital marketing",
          "seo",
          "social media",
          "email marketing",
          "content marketing",
        ],
        requirements: [
          "Basic computer skills",
          "Interest in marketing",
          "No prior experience needed",
        ],
        learningOutcomes: [
          "Create effective marketing campaigns",
          "Optimize for search engines",
          "Build social media presence",
          "Generate leads and sales",
        ],
        status: "published",
        isFeatured: true,
        rating: 4.3,
        numReviews: 567,
        enrolledStudents: 4560,
        language: "English",
        certificate: true,
      },
      {
        title: "Docker and Kubernetes for DevOps",
        description:
          "Learn containerization with Docker and orchestration with Kubernetes. Master modern DevOps practices and tools.",
        shortDescription: "Master containerization and orchestration",
        instructor: instructors[0]._id,
        category: devOpsCategory._id,
        price: 89.99,
        originalPrice: 169.99,
        isFree: false,
        level: "advanced",
        duration: 700, // 11.7 hours in minutes
        tags: ["docker", "kubernetes", "devops", "containers", "deployment"],
        requirements: [
          "Basic Linux knowledge",
          "Understanding of web applications",
          "Command line experience",
        ],
        learningOutcomes: [
          "Containerize applications with Docker",
          "Deploy with Kubernetes",
          "Implement CI/CD pipelines",
          "Manage infrastructure as code",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.9,
        numReviews: 234,
        enrolledStudents: 1890,
        language: "English",
        certificate: true,
      },
      {
        title: "Business Strategy and Entrepreneurship",
        description:
          "Learn how to start and grow a successful business. Understand business models, market analysis, and strategic planning.",
        shortDescription: "Build and grow successful businesses",
        instructor: instructors[3]._id,
        category: businessCategory._id,
        price: 79.99,
        originalPrice: 159.99,
        isFree: false,
        level: "intermediate",
        duration: 900, // 15 hours in minutes
        tags: [
          "business strategy",
          "entrepreneurship",
          "startup",
          "business model",
          "market analysis",
        ],
        requirements: [
          "Interest in business",
          "No prior business experience needed",
          "Willingness to learn",
        ],
        learningOutcomes: [
          "Develop business strategies",
          "Analyze market opportunities",
          "Create business plans",
          "Launch successful ventures",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.5,
        numReviews: 345,
        enrolledStudents: 2780,
        language: "English",
        certificate: true,
      },
      {
        title: "Free Python for Beginners",
        description:
          "Learn Python programming from scratch. Perfect for complete beginners who want to start their coding journey.",
        shortDescription: "Learn Python programming for free",
        instructor: instructors[2]._id,
        category: programmingCategory._id,
        price: 0,
        originalPrice: 39.99,
        isFree: true,
        level: "beginner",
        duration: 240, // 4 hours in minutes
        tags: ["python", "programming", "beginner", "free", "coding"],
        requirements: [
          "No programming experience required",
          "Basic computer skills",
          "Curiosity to learn",
        ],
        learningOutcomes: [
          "Write Python programs",
          "Understand programming logic",
          "Solve basic problems",
          "Continue learning advanced topics",
        ],
        status: "published",
        isFeatured: true,
        rating: 4.1,
        numReviews: 1890,
        enrolledStudents: 25670,
        language: "English",
        certificate: true,
      },
      {
        title: "Advanced React Patterns",
        description:
          "Master advanced React patterns, performance optimization, and best practices for building scalable applications.",
        shortDescription: "Advanced React development techniques",
        instructor: instructors[0]._id,
        category: webDevCategory._id,
        price: 94.99,
        originalPrice: 189.99,
        isFree: false,
        level: "advanced",
        duration: 750, // 12.5 hours in minutes
        tags: ["react", "javascript", "advanced", "performance", "patterns"],
        requirements: [
          "Strong JavaScript knowledge",
          "React basics understanding",
          "Web development experience",
        ],
        learningOutcomes: [
          "Optimize React performance",
          "Implement advanced patterns",
          "Build scalable applications",
          "Master React best practices",
        ],
        status: "published",
        isFeatured: false,
        rating: 4.7,
        numReviews: 234,
        enrolledStudents: 1560,
        language: "English",
        certificate: true,
      },
    ]);

    console.log("✅ Courses seeded successfully");
    return courses;
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
  }
};

const seedTestimonials = async (creator) => {
  try {
    await Testimonial.deleteMany({});

    const testimonials = await Testimonial.create([
      {
        name: "Sarah Johnson",
        title: "Frontend Developer",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
        content:
          "This course completely transformed my understanding of Vue.js. The practical examples and real-world projects helped me land my dream job as a frontend developer.",
        rating: 5,
        course: "Vue.js Masterclass",
        date: new Date("2024-01-15"),
        status: "active",
        featured: true,
        createdBy: creator?._id,
      },
      {
        name: "Michael Chen",
        title: "Data Scientist",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content:
          "The data analysis course was incredibly comprehensive. I learned everything from basic statistics to advanced machine learning techniques.",
        rating: 4,
        course: "Data Science Fundamentals",
        date: new Date("2024-01-10"),
        status: "active",
        featured: false,
        createdBy: creator?._id,
      },
      {
        name: "Emily Rodriguez",
        title: "UX Designer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        content:
          "The UX design course helped me understand user-centered design principles. The portfolio I built during the course got me multiple job offers.",
        rating: 5,
        course: "UX Design Principles",
        date: new Date("2024-01-08"),
        status: "active",
        featured: true,
        createdBy: creator?._id,
      },
      {
        name: "David Kim",
        title: "Backend Developer",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        content:
          "Excellent course on Node.js and Express. The instructor explained complex concepts in a way that was easy to understand and apply.",
        rating: 4,
        course: "Node.js Backend Development",
        date: new Date("2024-01-05"),
        status: "active",
        featured: false,
        createdBy: creator?._id,
      },
      {
        name: "Lisa Wang",
        title: "Product Manager",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        content:
          "The product management course provided practical insights that I use daily in my role. Highly recommended for anyone in product.",
        rating: 5,
        course: "Product Management Essentials",
        date: new Date("2024-01-03"),
        status: "active",
        featured: true,
        createdBy: creator?._id,
      },
      {
        name: "James Wilson",
        title: "DevOps Engineer",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        content:
          "Great introduction to DevOps practices. The hands-on labs with Docker and Kubernetes were particularly valuable.",
        rating: 4,
        course: "DevOps Fundamentals",
        date: new Date("2024-01-01"),
        status: "active",
        featured: false,
        createdBy: creator?._id,
      },
    ]);

    console.log("✅ Testimonials seeded successfully");
    return testimonials;
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
  }
};

const seedMarketingContent = async (creator) => {
  try {
    await MarketingContent.deleteMany({});

    const marketingContent = await MarketingContent.create([
      {
        title: "Vue.js Masterclass Promo",
        subtitle: "Learn Vue.js from scratch to advanced",
        thumbnail:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=200&fit=crop",
        type: "video",
        description:
          "Comprehensive Vue.js course covering fundamentals to advanced concepts. Perfect for developers looking to master modern frontend development.",
        campaign: "Q1 2024 Launch",
        status: "active",
        date: new Date("2024-01-15"),
        tags: ["vue.js", "frontend", "javascript"],
        createdBy: creator?._id,
      },
      {
        title: "Data Science Career Guide",
        subtitle: "Your path to becoming a data scientist",
        thumbnail:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
        type: "ebook",
        description:
          "Complete guide to starting your career in data science. Includes learning paths, tools, and real-world projects.",
        campaign: "Career Development",
        status: "draft",
        date: new Date("2024-01-10"),
        tags: ["data science", "career", "guide"],
        createdBy: creator?._id,
      },
      {
        title: "UX Design Workshop Series",
        subtitle: "Interactive design workshops",
        thumbnail:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
        type: "webinar",
        description:
          "Series of interactive workshops covering UX design principles, user research, and prototyping techniques.",
        campaign: "Design Month",
        status: "scheduled",
        date: new Date("2024-01-08"),
        tags: ["ux design", "workshop", "design"],
        createdBy: creator?._id,
      },
      {
        title: "DevOps Best Practices",
        subtitle: "Modern DevOps implementation",
        thumbnail:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        type: "article",
        description:
          "Comprehensive guide to implementing DevOps best practices in modern software development teams.",
        campaign: "Tech Insights",
        status: "active",
        date: new Date("2024-01-05"),
        tags: ["devops", "best practices", "automation"],
        createdBy: creator?._id,
      },
      {
        title: "Product Management Course",
        subtitle: "From idea to launch",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
        type: "course",
        description:
          "Complete product management course covering strategy, user research, and go-to-market planning.",
        campaign: "Product Excellence",
        status: "active",
        date: new Date("2024-01-03"),
        tags: ["product management", "strategy", "launch"],
        createdBy: creator?._id,
      },
      {
        title: "AI & Machine Learning Intro",
        subtitle: "Getting started with AI/ML",
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
        type: "video",
        description:
          "Introduction to artificial intelligence and machine learning concepts for beginners and intermediate learners.",
        campaign: "AI Revolution",
        status: "scheduled",
        date: new Date("2024-01-01"),
        tags: ["ai", "machine learning", "introduction"],
        createdBy: creator?._id,
      },
    ]);

    console.log("✅ Marketing content seeded successfully");
    return marketingContent;
  } catch (error) {
    console.error("❌ Error seeding marketing content:", error);
  }
};

const seedPricingPlans = async (creator) => {
  try {
    await PricingPlan.deleteMany({});
    const plans = await PricingPlan.create([
      {
        name: "Basic Plan",
        description: "Perfect for beginners",
        price: 29,
        currency: "USD",
        period: "month",
        features: ["5 courses", "Basic support", "Certificate"],
        subscribers: 1250,
        revenue: 36250,
        status: "active",
        featured: false,
        createdBy: creator?._id,
      },
      {
        name: "Pro Plan",
        description: "Best for professionals",
        price: 79,
        currency: "USD",
        period: "month",
        features: [
          "Unlimited courses",
          "Priority support",
          "Certificate",
          "Live sessions",
        ],
        subscribers: 890,
        revenue: 70310,
        status: "active",
        featured: true,
        createdBy: creator?._id,
      },
      {
        name: "Enterprise Plan",
        description: "For large organizations",
        price: 199,
        currency: "USD",
        period: "month",
        features: [
          "Everything in Pro",
          "Custom branding",
          "API access",
          "Dedicated support",
        ],
        subscribers: 156,
        revenue: 31044,
        status: "active",
        featured: false,
        createdBy: creator?._id,
      },
    ]);
    console.log("✅ Pricing plans seeded successfully");
    return plans;
  } catch (error) {
    console.error("❌ Error seeding pricing plans:", error);
  }
};

const seedMarketingCampaigns = async (creator) => {
  try {
    await MarketingCampaign.deleteMany({});
    const campaigns = await MarketingCampaign.create([
      {
        name: "Summer Sale Campaign",
        description: "Promote summer courses with special discounts",
        status: "active",
        budget: 5000,
        spent: 3200,
        clicks: 1250,
        impressions: 5000,
        conversions: 89,
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-08-31"),
        createdBy: creator?._id,
      },
      {
        name: "New Year Special",
        description: "New year resolution courses promotion",
        status: "paused",
        budget: 3000,
        spent: 1800,
        clicks: 890,
        impressions: 3500,
        conversions: 67,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
        createdBy: creator?._id,
      },
      {
        name: "Back to School",
        description: "Educational content for students",
        status: "completed",
        budget: 2500,
        spent: 2500,
        clicks: 2100,
        impressions: 8000,
        conversions: 145,
        startDate: new Date("2024-08-01"),
        endDate: new Date("2024-09-30"),
        createdBy: creator?._id,
      },
    ]);
    console.log("✅ Marketing campaigns seeded successfully");
    return campaigns;
  } catch (error) {
    console.error("❌ Error seeding marketing campaigns:", error);
  }
};

const seedPromotions = async (creator) => {
  try {
    await Promotion.deleteMany({});
    const promotions = await Promotion.create([
      {
        code: "SUMMER20",
        name: "Summer Sale",
        description: "20% off all summer courses",
        discount: 20,
        used: 156,
        limit: 500,
        revenue: 12500,
        validFrom: new Date("2024-06-01"),
        validUntil: new Date("2024-08-31"),
        status: "active",
        createdBy: creator?._id,
      },
      {
        code: "NEWYEAR30",
        name: "New Year Special",
        description: "30% off for new year resolutions",
        discount: 30,
        used: 89,
        limit: 200,
        revenue: 8900,
        validFrom: new Date("2024-01-01"),
        validUntil: new Date("2024-01-31"),
        status: "expired",
        createdBy: creator?._id,
      },
      {
        code: "STUDENT15",
        name: "Student Discount",
        description: "15% off for verified students",
        discount: 15,
        used: 234,
        limit: 1000,
        revenue: 15600,
        validFrom: new Date("2024-09-01"),
        validUntil: new Date("2024-12-31"),
        status: "active",
        createdBy: creator?._id,
      },
    ]);
    console.log("✅ Promotions seeded successfully");
    return promotions;
  } catch (error) {
    console.error("❌ Error seeding promotions:", error);
  }
};

const seedCertifications = async (creator) => {
  try {
    await Certification.deleteMany({});

    const certifications = await Certification.create([
      {
        name: "AWS Certified Solutions Architect",
        code: "SAA-C03",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
        provider: "Amazon Web Services",
        description:
          "Validate your expertise in designing distributed systems on AWS. Learn to design and deploy scalable, highly available, and fault-tolerant systems.",
        level: "associate",
        duration: "6 months",
        price: 299,
        status: "active",
        skills: ["aws", "cloud", "architecture"],
        createdBy: creator?._id,
      },
      {
        name: "Microsoft Azure Administrator",
        code: "AZ-104",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        provider: "Microsoft",
        description:
          "Learn to manage Azure subscriptions, secure identities, administer the infrastructure, configure virtual networking, and monitor resources.",
        level: "associate",
        duration: "4 months",
        price: 165,
        status: "active",
        skills: ["azure", "cloud", "administration"],
        createdBy: creator?._id,
      },
      {
        name: "Google Cloud Professional Data Engineer",
        code: "GCP-DE",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        provider: "Google Cloud",
        description:
          "Design data processing systems, build and operationalize data processing systems, and analyze data and derive insights.",
        level: "professional",
        duration: "8 months",
        price: 200,
        status: "active",
        skills: ["google cloud", "data engineering", "big data"],
        createdBy: creator?._id,
      },
      {
        name: "Cisco CCNA Routing and Switching",
        code: "CCNA-200-301",
        logo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop",
        provider: "Cisco",
        description:
          "Validate your knowledge and skills in network fundamentals, network access, IP connectivity, IP services, and security fundamentals.",
        level: "entry",
        duration: "3 months",
        price: 300,
        status: "active",
        skills: ["networking", "cisco", "routing"],
        createdBy: creator?._id,
      },
      {
        name: "CompTIA Security+",
        code: "SY0-601",
        logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop",
        provider: "CompTIA",
        description:
          "Validate baseline cybersecurity skills and knowledge. Learn to assess the security posture of an enterprise environment.",
        level: "entry",
        duration: "5 months",
        price: 370,
        status: "active",
        skills: ["security", "cybersecurity", "comptia"],
        createdBy: creator?._id,
      },
      {
        name: "PMP Project Management Professional",
        code: "PMP-2024",
        logo: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=100&h=100&fit=crop",
        provider: "PMI",
        description:
          "Validate your project management skills and knowledge. Learn to lead and direct cross-functional teams to deliver projects.",
        level: "professional",
        duration: "12 months",
        price: 555,
        status: "draft",
        skills: ["project management", "pmi", "leadership"],
        createdBy: creator?._id,
      },
      {
        name: "ITIL 4 Foundation",
        code: "ITIL-4-FND",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
        provider: "AXELOS",
        description:
          "Learn IT service management best practices. Understand how to create value for customers through IT services.",
        level: "foundation",
        duration: "2 months",
        price: 495,
        status: "active",
        skills: ["itil", "service management", "best practices"],
        createdBy: creator?._id,
      },
      {
        name: "Certified Scrum Master",
        code: "CSM-2024",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        provider: "Scrum Alliance",
        description:
          "Learn Scrum framework and become a servant leader for your team. Facilitate Scrum events and remove impediments.",
        level: "associate",
        duration: "3 months",
        price: 1295,
        status: "active",
        skills: ["scrum", "agile", "project management"],
        createdBy: creator?._id,
      },
    ]);

    console.log("✅ Certifications seeded successfully");
    return certifications;
  } catch (error) {
    console.error("❌ Error seeding certifications:", error);
  }
};

const seedEnrollments = async (students, courses) => {
  try {
    await Enrollment.deleteMany({});

    const enrollments = [];

    // Create enrollments for each student
    for (const student of students) {
      // Each student enrolls in 2-4 random courses
      const numEnrollments = Math.floor(Math.random() * 3) + 2;
      const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());

      for (let i = 0; i < numEnrollments && i < shuffledCourses.length; i++) {
        const course = shuffledCourses[i];
        const progress = Math.floor(Math.random() * 100);
        const status = progress === 100 ? "completed" : "active";

        enrollments.push({
          student: student._id,
          course: course._id,
          status,
          enrolledAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ), // Random date within last 30 days
          progress,
          completedAt: status === "completed" ? new Date() : null,
          payment: {
            amount: course.isFree ? 0 : course.price,
            currency: "IDR",
            status: "completed",
            paymentMethod: course.isFree ? null : "credit_card",
          },
          lastAccessedAt: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ), // Random date within last 7 days
        });
      }
    }

    await Enrollment.create(enrollments);
    console.log("✅ Enrollments seeded successfully");
    return enrollments;
  } catch (error) {
    console.error("❌ Error seeding enrollments:", error);
  }
};

const runSeed = async () => {
  try {
    await connectDB();

    console.log("🌱 Starting database seeding...");

    // Seed categories first
    const categories = await seedCategories();

    // Seed users
    const users = await seedUsers();

    // Seed courses with instructor IDs and category IDs
    let courses = [];
    if (users && users.instructorUsers && categories) {
      courses = await seedCourses(users.instructorUsers, categories);
    }

    // Seed jobs using admin as creator
    if (users && users.adminUser) {
      await seedJobs(users.adminUser);
      await seedTestimonials(users.adminUser);
      await seedMarketingContent(users.adminUser);
      await seedCertifications(users.adminUser);
      await seedPricingPlans(users.adminUser);
      await seedMarketingCampaigns(users.adminUser);
      await seedPromotions(users.adminUser);
    }

    // Seed enrollments
    if (users && users.studentUser && courses.length > 0) {
      await seedEnrollments([users.studentUser], courses);
    }

    console.log("✅ Database seeding completed successfully!");
    console.log("\n📊 Sample Data Created:");
    console.log(
      "- 8 Categories (Programming, Design, Business, Marketing, Data Science, Mobile Development, Web Development, DevOps)"
    );
    console.log("- 1 Admin user (admin@lms.com / admin123)");
    console.log(
      "- 4 Instructor users (instructor@lms.com, sarah@lms.com, mike@lms.com, lisa@lms.com)"
    );
    console.log("- 1 Student user (student@lms.com / student123)");
    console.log(
      "- 11 Sample courses (2 free, 9 paid) with various levels and categories"
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run the seed function
runSeed();
