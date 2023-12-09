const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Viewing All Admins
router.get('/select-all-admin', (req, res) => {
    const connection = req.db;
    const sql = 'SELECT * FROM WovenAdmin';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            // Send the results as JSON
            res.json(results);
        }
    });
});


//Registering the admin
router.post('/registerAdmin', (req, res) => {
    const connection = req.db;
    const {
        first_name,
        last_name,
        country,
        email,
        user_passwordhash,
        admin_tel_no,
        admin_role,
        address,
        DOB,
        sex
    } = req.body;
    const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
    const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'admin', 'active'];

    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting admin into user table'});
            });
        }
        const userId = userResults.insertId;
        const adminInsertQuery = 'INSERT INTO WovenAdmin(user_id, admin_tel_no, admin_role, address, DOB, sex) VALUES (?,?,?,?,?,?)';
        const adminInsertParams = [userId, admin_tel_no, admin_role, address, DOB, sex];

        connection.query(adminInsertQuery, adminInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into admin table'});
                });
            } else {
                res.status(201).send('Admin registered successfully');
            }
        });
    });
});


//Registering a Customer
router.post('/registerCustomer', (req, res) => {
    const connection = req.db;
    const {first_name, last_name, country, email, user_passwordhash} = req.body;
    const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
    const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'customer', 'active'];

    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }
        const userId = userResults.insertId;
        const customerInsertQuery = 'INSERT INTO Customer(user_id) VALUES (?)';
        const customerInsertParams = [userId];
        connection.query(customerInsertQuery, customerInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into customer table'});
                });
            } else {
                res.status(201).send('Customer registered successfully');
            }
        });
    });
});


//Registering a seller
router.post('/registerSeller', (req, res) => {
    const connection = req.db;
    const {
        first_name,
        last_name,
        country,
        email,
        user_passwordhash,
        ghana_region,
        seller_tel_no,
        momo_number,
        address,
        DOB,
        sex
    } = req.body;

    const userInsertQuery = 'INSERT INTO User (first_name, last_name, country, email, user_passwordhash, user_role, user_status) VALUES (?, ?,?,?,?,?,?)';
    const userInsertParams = [first_name, last_name, country, email, user_passwordhash, 'seller', 'active'];

    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }

        const userId = userResults.insertId;
        const sellerInsertQuery = 'INSERT INTO Seller (userId, ghana_region, seller_tel_no, momo_number, address, DOB, sex) VALUES (?, ?, ?, ?, ?, ?)';
        const sellerInsertParams = [userId, ghana_region, seller_tel_no, momo_number, address, DOB, sex];

        connection.query(sellerInsertQuery, sellerInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: userId});
                });
            } else {
                res.status(201).send('Seller registered successfully');
            }
        });
    });
});

module.exports = router;