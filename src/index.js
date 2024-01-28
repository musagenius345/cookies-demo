// Import required modules
import express from 'express';
import cookieParser from 'cookie-parser'

// Create an Express app
const app = express();

// Middleware to parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Dummy user data (for demonstration purposes)
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' },
];

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check credentials (dummy check, replace with actual authentication logic)
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Set a cookie to indicate the user is authenticated
    res.cookie('user_id', user.id, { httpOnly: true });
    res.send(`Welcome, ${username}!`);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Route to check if a user is authenticated
app.get('/profile', (req, res) => {
  // Retrieve the user ID from the cookie
  const userId = req.cookies.user_id;

  if (userId) {
    // Find the user based on the ID (dummy check)
    const user = users.find((u) => u.id === parseInt(userId));

    if (user) {
      res.send(`Welcome back, ${user.username}!`);
    } else {
      res.status(401).send('User not found');
    }
  } else {
    res.status(401).send('Not authenticated');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
