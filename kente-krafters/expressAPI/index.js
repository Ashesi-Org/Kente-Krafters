const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

//Comment here
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WovenAfrica',
    port: 3306, // Your MySQL server port (default is 3306)
  });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


app.get('/registerSeller', (req, res) =>{
  const sql = 'SELECT * FROM User'
  //res.send("Here are all our sellers")
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    // Send the results as JSON
    res.json(results);
  });
});

//Regitser a New Seller
app.post('/registerSeller', (req, res) => {
  const { username, email, password } = req.body;

  // Perform validation and hashing of the password before saving to the database

  const sql = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = ["A", "A", "A", "A", "A", "seller", "active"]
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Registration failed' });
    } else {
      console.log('Registration successful');
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

