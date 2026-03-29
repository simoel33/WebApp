#!/bin/bash
# Simple admin initialization script

# Change to project directory
cd /Users/simo/Documents/datasync-pro-landing

# Create admin user directly in the database using SQLite
# This is a fallback method that doesn't require the API
node -e "
const sqlite3 = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

try {
  const db = new sqlite3('file:./prisma/dev.db');
  
  // Generate password hash
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('Elyazid23', salt);
  
  // Create admin user
  const id = crypto.randomUUID();
  db.exec('INSERT INTO Admin (id, email, passwordHash) VALUES (?, ?, ?)', [id, 'mohamedelyazid@gmail.com', passwordHash]);
  
  console.log('✓ Admin user created successfully!');
  console.log('  Email: mohamedelyazid@gmail.com');
  console.log('  ID: ' + id);
  
  db.close();
} catch (error) {
  console.error('Error: ' + error.message);
  process.exit(1);
}
"
