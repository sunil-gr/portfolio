import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero.js';
import About from '../models/About.js';
import Service from '../models/Service.js';
import AdminUser from '../models/AdminUser.js';
import { DEFAULT_HERO, DEFAULT_ABOUT, DEFAULT_SERVICES } from './defaults.js';

dotenv.config();

/**
 * Seed script to initialize database with default data
 * Usage: node src/utils/seedDatabase.js [adminUsername] [adminEmail] [adminPassword]
 */
const seedDatabase = async () => {
  try {
    // Connect to database
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('\n📦 Seeding database...\n');

    // Seed Hero
    console.log('Seeding Hero data...');
    let hero = await Hero.findOne();
    if (hero) {
      console.log('  → Hero data already exists, skipping...');
    } else {
      hero = await Hero.create(DEFAULT_HERO);
      console.log('  ✓ Hero data created successfully');
    }

    // Seed About
    console.log('Seeding About data...');
    let about = await About.findOne();
    if (about) {
      console.log('  → About data already exists, skipping...');
    } else {
      about = await About.create(DEFAULT_ABOUT);
      console.log('  ✓ About data created successfully');
    }

    // Seed Services
    console.log('Seeding Services data...');
    let service = await Service.findOne();
    if (service) {
      console.log('  → Services data already exists, skipping...');
    } else {
      service = await Service.create(DEFAULT_SERVICES);
      console.log('  ✓ Services data created successfully');
    }

    // Create Admin User (optional)
    const adminUsername = process.argv[2] || 'admin';
    const adminEmail = process.argv[3] || 'admin@example.com';
    const adminPassword = process.argv[4] || 'admin123';

    console.log('\nCreating Admin User...');
    const adminExists = await AdminUser.findOne({
      $or: [{ username: adminUsername }, { email: adminEmail }],
    });

    if (adminExists) {
      console.log('  → Admin user already exists, skipping...');
    } else {
      const admin = await AdminUser.create({
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
      });
      console.log('  ✓ Admin user created successfully');
      console.log(`     Username: ${admin.username}`);
      console.log(`     Email: ${admin.email}`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();

