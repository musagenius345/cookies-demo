
// Import required modules
const express = require('express');
const cookieParser = require('cookie-parser');

// Create an Express app
const app = express();

// Middleware to parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  // Set a cookie named 'user_id' with a value of '123'
  res.cookie('user_id', '123', { maxAge: 3600000, httpOnly: true });
  res.send('Cookie set successfully!');
});

// Route to retrieve the cookie
app.get('/get-cookie', (req, res) => {
  // Retrieve the 'user_id' cookie
  const userId = req.cookies.user_id;
  res.send(`User ID from cookie: ${userId || 'Not set'}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
