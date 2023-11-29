const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 5000;


//Setting up connection to database
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


//Security and JSON Parsing
app.use(bodyParser.json());
app.use(cors()); 


app.get('/select-all', (req, res) => {
  // SQL query to select all records from a table
  const sql = 'SELECT * FROM WovenAdmin';

  // Execute the query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});





//Resgistering an Administrator
app.post('/registerAdmin', (req, res) => {
  const {first_name, last_name, country, email, user_passwordhash, admin_tel_no, admin_role, address, DOB, sex}= req.body;
  const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
  const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'admin', 'active'];

      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error inserting admin into user table' });
          });
        }
        const userId = userResults.insertId;
        const adminInsertQuery = 'INSERT INTO WovenAdmin(user_id, admin_tel_no, admin_role, address, DOB, sex) VALUES (?,?,?,?,?,?)';
        const adminInsertParams = [userId, admin_tel_no, admin_role, address, DOB, sex];

        connection.query(adminInsertQuery, adminInsertParams, (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: 'Error inserting into admin table' });
            });
          }else{
            res.status(201).send('Admin registered successfully');
          }
          });
        });
      });
    

//Registering a Customer
app.post('/registerCustomer', (req, res) => {
  // Extract user and seller data
  const {first_name, last_name, country, email, user_passwordhash}= req.body;
      const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
      const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'customer', 'active'];

      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error inserting into user table' });
          });
        }

        // Use the inserted user id for the student insert
        const userId = userResults.insertId;
        const customerInsertQuery = 'INSERT INTO Customer(user_id) VALUES (?)';
        const customerInsertParams = [userId];

        // Insert into the student table without specifying the id column
        connection.query(customerInsertQuery, customerInsertParams, (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: 'Error inserting into customer table' });
            });
          }
          else{
            res.status(201).send('Customer registered successfully');
          }
          });
        });
      });
  
  


//Registering a seller
app.post('/registerSeller', (req, res) => {
  // Extract user and seller data
  const { first_name, last_name, country, email, user_passwordhash, ghana_region, seller_tel_no, momo_number, address, DOB, sex} = req.body;

      const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
      const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'seller', 'active'];
      
      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error inserting into user table' });
          });
        }

        // Use the inserted user id for the student insert
        const userId = userResults.insertId;
        const sellerInsertQuery = 'INSERT INTO Seller (userId, ghana_region, seller_tel_no, momo_number, address, DOB, sex) VALUES (?, ?, ?, ?, ?, ?)';
        const sellerInsertParams = [userId, ghana_region, seller_tel_no, momo_number, address, DOB, sex];

        // Insert into the student table without specifying the id column
        connection.query(sellerInsertQuery, sellerInsertParams, (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: userId });
            });
          }
          else{
            res.status(201).send('Seller registered successfully');
          }
          });
        });
      });


      
// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

