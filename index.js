const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Utility: Basic input validation
function validateUserInput({ name, email, age }) {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Name is required and must be a non-empty string.';
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return 'A valid email address is required.';
  }
  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return 'Age must be a number between 0 and 120.';
  }
  return null;
}

// GET /users - Fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:id - Fetch user by ID
app.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /users - Create a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  const validationError = validateUserInput({ name, email, age });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), email.trim().toLowerCase(), age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /users/:id - Update a user
app.put('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, age } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }

  const validationError = validateUserInput({ name, email, age });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name.trim(), email.trim().toLowerCase(), age, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format.' });
  }

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
