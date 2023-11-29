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
//Creating Pool for transaction
const pool = mysql.createPool(connection);


//Security and JSON Parsing
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

//Resgistering an Administrator
app.post('/registerAdmin', (req, res) => {
  // Extract user and seller data
  const {first_name, last_name, country, email, user_passwordhash, admin_tel_no, admin_role, address, DOB, sex}= req.body;

  // Start the transaction
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: 'Error starting the transaction' });
      }

      // Insert into the user table without specifying the id column
      const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
      const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'admin', 'active'];

      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: 'Error inserting into user table' });
          });
        }

        // Use the inserted user id for the student insert
        const userId = userResults.insertId;
        const adminInsertQuery = 'INSERT INTO Customer(user_id) VALUES (?)';
        const adminInsertParams = [userId, admin_tel_no, admin_role, address, DOB, sex];

        // Insert into the student table without specifying the id column
        connection.query(adminInsertQuery, adminInsertParams, (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: 'Error inserting into admin table' });
            });
          }

          // Commit the transaction if both inserts were successful
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: 'Error committing the transaction' });
              });
            }

            // Release the connection back to the pool
            connection.release();

            res.json({ success: true, message: 'Transaction completed successfully' });
          });
        });
      });
    });
  });
});


//Registering a Customer
app.post('/registerCustomer', (req, res) => {
  // Extract user and seller data
  const {first_name, last_name, country, email, user_passwordhash}= req.body;

  // Start the transaction
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: 'Error starting the transaction' });
      }

      // Insert into the user table without specifying the id column
      const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
      const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'customer', 'active'];

      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
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
              connection.release();
              res.status(500).json({ error: 'Error inserting into customer table' });
            });
          }

          // Commit the transaction if both inserts were successful
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: 'Error committing the transaction' });
              });
            }

            // Release the connection back to the pool
            connection.release();

            res.json({ success: true, message: 'Transaction completed successfully' });
          });
        });
      });
    });
  });
});




//Registering a seller
app.post('/registerSeller', (req, res) => {
  // Extract user and seller data
  const { first_name, last_name, country, email, user_passwordhash, ghana_region, seller_tel_no, momo_number, address, DOB, sex}= req.body;

  // Start the transaction
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: 'Error starting the transaction' });
      }

      // Insert into the user table without specifying the id column
      const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
      const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'seller', 'active'];

      connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: 'Error inserting into user table' });
          });
        }

        // Use the inserted user id for the student insert
        const userId = userResults.insertId;
        const sellerInsertQuery = 'INSERT INTO Seller (user_id, ghana_region, seller_tel_no, momo_number, address, DOB, sex) VALUES (?, ?, ?, ?, ?, ?)';
        const sellerInsertParams = [userId, ghana_region, seller_tel_no, momo_number, address, DOB, sex];

        // Insert into the student table without specifying the id column
        connection.query(sellerInsertQuery, sellerInsertParams, (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: 'Error inserting into seller table' });
            });
          }

          // Commit the transaction if both inserts were successful
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: 'Error committing the transaction' });
              });
            }

            // Releasing the connection back to the pool
            connection.release();

            res.json({ success: true, message: 'Transaction completed successfully' });
          });
        });
      });
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

