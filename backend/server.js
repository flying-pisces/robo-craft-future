/**
 * SQLite Backend Server for SSH Robotics
 * This Express.js server provides REST API endpoints for SQLite database operations
 * Run this server alongside your frontend for SQLite database support
 */

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DB_PATH || 'ssh-robotics.db';

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || ['http://localhost:8080', 'https://sshrobotics.com', 'https://www.sshrobotics.com'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Initialize SQLite database
let db;

function initializeDatabase() {
  try {
    db = new Database(DB_PATH);
    
    // Enable foreign keys and WAL mode for better performance
    db.exec('PRAGMA foreign_keys = ON');
    db.exec('PRAGMA journal_mode = WAL');
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '../src/database/sqlite/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
    
    console.log(`SQLite database initialized at: ${DB_PATH}`);
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    process.exit(1);
  }
}

// Generate UUID-like ID
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    database: 'sqlite',
    timestamp: new Date().toISOString()
  });
});

// Contact Submissions endpoints
app.post('/api/contact-submissions', (req, res) => {
  try {
    const { first_name, last_name, email, company, project_type, project_description } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !email || !project_type || !project_description) {
      return res.status(400).json({ 
        error: 'Missing required fields: first_name, last_name, email, project_type, project_description' 
      });
    }
    
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (id, first_name, last_name, email, company, project_type, project_description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const id = generateId();
    const result = stmt.run(id, first_name, last_name, email, company || null, project_type, project_description);
    
    // Get the inserted record
    const getStmt = db.prepare('SELECT * FROM contact_submissions WHERE id = ?');
    const insertedRecord = getStmt.get(id);
    
    res.status(201).json(insertedRecord);
  } catch (error) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ error: 'Failed to create contact submission' });
  }
});

app.get('/api/contact-submissions', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    const submissions = stmt.all();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Service Inquiries endpoints
app.post('/api/service-inquiries', (req, res) => {
  try {
    const { service_type, email, name, message } = req.body;
    
    // Validate required fields
    if (!service_type || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: service_type, email' 
      });
    }
    
    // Validate service_type
    if (!['robotics', 'automation', 'electronics'].includes(service_type)) {
      return res.status(400).json({ 
        error: 'Invalid service_type. Must be: robotics, automation, or electronics' 
      });
    }
    
    const stmt = db.prepare(`
      INSERT INTO service_inquiries (id, service_type, email, name, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const id = generateId();
    const result = stmt.run(id, service_type, email, name || null, message || null);
    
    // Get the inserted record
    const getStmt = db.prepare('SELECT * FROM service_inquiries WHERE id = ?');
    const insertedRecord = getStmt.get(id);
    
    res.status(201).json(insertedRecord);
  } catch (error) {
    console.error('Error creating service inquiry:', error);
    res.status(500).json({ error: 'Failed to create service inquiry' });
  }
});

app.get('/api/service-inquiries', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM service_inquiries ORDER BY created_at DESC');
    const inquiries = stmt.all();
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching service inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch service inquiries' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize database and start server
initializeDatabase();

app.listen(PORT, () => {
  console.log(`SQLite backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});