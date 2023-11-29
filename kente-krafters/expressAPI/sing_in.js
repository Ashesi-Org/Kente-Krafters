const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
  connectionLimit: 10,
});

// Use body-parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static files (if any)
app.use(express.static('public'));

// Define your sign-in route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check if the user exists
  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length > 0) {
        // User found, send a success response
        res.status(200).json({ message: 'Sign-in successful' });
      } else {
        // User not found, send an error response
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
