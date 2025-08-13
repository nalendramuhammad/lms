#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🌱 Starting database seeding...");
console.log("📁 Running seed script from:", __dirname);

try {
  // Run the seed data script
  execSync("node src/utils/seedData.js", {
    cwd: __dirname,
    stdio: "inherit",
  });

  console.log("✅ Database seeding completed successfully!");
  console.log("\n🎉 Your LMS database is now populated with sample data!");
  console.log("\n📋 Login Credentials:");
  console.log("👨‍💼 Admin: admin@lms.com / admin123");
  console.log("👨‍🏫 Instructor: instructor@lms.com / instructor123");
  console.log("👨‍🎓 Student: student@lms.com / student123");
  console.log("\n🌐 Access your CMS at: http://localhost:5173/cms/courses");
} catch (error) {
  console.error("❌ Seeding failed:", error.message);
  process.exit(1);
}
