const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory users
let users = [];

// Serve your main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exp13.html'));
});

// Register endpoint
app.post('/register', (req, res) => {
  const { fullname, phone, email, gender, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).send('Email already exists');
  }
  users.push({ fullname, phone, email, gender, password });
  res.status(200).send('Registration successful!');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
