const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const DB_PATH = path.join(__dirname, '..', 'femmeflex.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Initialize tables
function initTables() {
  // Enquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      selected_plan TEXT NOT NULL,
      plan_price TEXT,
      plan_duration TEXT,
      plan_location TEXT,
      notes TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // BMI records table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bmi_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      height_cm REAL NOT NULL,
      weight_kg REAL NOT NULL,
      bmi_value REAL NOT NULL,
      category TEXT NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_enquiries_client_name ON enquiries(client_name);
    CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
    CREATE INDEX IF NOT EXISTS idx_bmi_client_name ON bmi_records(client_name);
    CREATE INDEX IF NOT EXISTS idx_bmi_created_at ON bmi_records(created_at);
  `);
}

initTables();

// ===== ENQUIRY API ENDPOINTS =====

// Create new enquiry
app.post('/api/enquiries', (req, res) => {
  try {
    const {
      client_name,
      phone,
      email,
      selected_plan,
      plan_price,
      plan_duration,
      plan_location,
      notes,
      status = 'new'
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO enquiries (
        client_name, phone, email, selected_plan, plan_price,
        plan_duration, plan_location, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      client_name,
      phone,
      email || null,
      selected_plan,
      plan_price || null,
      plan_duration || null,
      plan_location || null,
      notes || null,
      status
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'Enquiry created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all enquiries
app.get('/api/enquiries', (req, res) => {
  try {
    const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get enquiry by ID
app.get('/api/enquiries/:id', (req, res) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search enquiries by client name
app.get('/api/enquiries/search/:name', (req, res) => {
  try {
    const enquiries = db.prepare(
      'SELECT * FROM enquiries WHERE client_name LIKE ? ORDER BY created_at DESC'
    ).all(`%${req.params.name}%`);
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enquiry status
app.patch('/api/enquiries/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const stmt = db.prepare(`
      UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    const result = stmt.run(status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enquiry
app.delete('/api/enquiries/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== BMI RECORDS API ENDPOINTS =====

// Create new BMI record
app.post('/api/bmi', (req, res) => {
  try {
    const {
      client_name,
      height_cm,
      weight_kg,
      bmi_value,
      category,
      notes
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO bmi_records (
        client_name, height_cm, weight_kg, bmi_value, category, notes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      client_name,
      height_cm,
      weight_kg,
      bmi_value,
      category,
      notes || null
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'BMI record created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all BMI records
app.get('/api/bmi', (req, res) => {
  try {
    const records = db.prepare('SELECT * FROM bmi_records ORDER BY created_at DESC').all();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get BMI record by ID
app.get('/api/bmi/:id', (req, res) => {
  try {
    const record = db.prepare('SELECT * FROM bmi_records WHERE id = ?').get(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'BMI record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search BMI records by client name
app.get('/api/bmi/search/:name', (req, res) => {
  try {
    const records = db.prepare(
      'SELECT * FROM bmi_records WHERE client_name LIKE ? ORDER BY created_at DESC'
    ).all(`%${req.params.name}%`);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest BMI record for a client
app.get('/api/bmi/client/:name/latest', (req, res) => {
  try {
    const record = db.prepare(`
      SELECT * FROM bmi_records 
      WHERE client_name = ? 
      ORDER BY created_at DESC 
      LIMIT 1
    `).get(req.params.name);

    if (!record) {
      return res.status(404).json({ error: 'No BMI records found for this client' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete BMI record
app.delete('/api/bmi/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM bmi_records WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'BMI record not found' });
    }
    res.json({ message: 'BMI record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', database: 'connected' });
});

app.listen(PORT, () => {
  console.log(`FemmeFlex Server running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});
