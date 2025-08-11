const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Import the db module

require('dotenv').config();
console.log('ENV TEST:', process.env.PGDATABASE, process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ GET all projects
app.get('/projects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ POST a new project
app.post('/projects', async (req, res) => {
  const { name, description, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  try {
    const { rows } = await db.query(
      'INSERT INTO projects (name, description, status) VALUES ($1, $2, $3) RETURNING *',
      [name, description || '', status || 'active']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



