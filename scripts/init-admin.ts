#!/usr/bin/env node
import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/auth";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "mohamedelyazid@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Elyazid23";

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(`✓ Admin user already exists: ${adminEmail}`);
      return;
    }

    // Hash the password
    const passwordHash = await hashPassword(adminPassword);

    // Create the admin user
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        passwordHash,
      },
    });

    console.log(`✓ Admin user created successfully!`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  ID: ${admin.id}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
