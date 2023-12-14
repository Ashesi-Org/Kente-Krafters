const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//Registering the admin
router.post('/registerAdmin', (req, res) => {
    const connection = req.db;
    const {
        email,
        first_name,
        last_name,
        country,
        user_password,
        admin_tel_no,
        address,
        DOB,
        sex
    } = req.body;
    const userInsertQuery = 'INSERT INTO WovenUsers(email, first_name, last_name, country, user_password, user_role) VALUES (?,?,?,?,?,?)';
    const userInsertParams = [email, first_name, last_name, country, user_password, 'admin'];
    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }
        const adminInsertQuery = 'INSERT INTO WovenAdmin(email, admin_tel_no, address, dob, sex) VALUES (?,?,?,?,?)';
        const adminInsertParams = [email, admin_tel_no, address, DOB, sex];
        connection.query(adminInsertQuery, adminInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into admin table'});
                });
            } else {
                res.status(201).send('admin registered successfully');
            }
        });
    });    
});

//Registering a seller
router.post('/registerSeller', (req, res) => {
    const connection = req.db;
    const {
        email,
        first_name,
        last_name,
        country,
        user_password,
        ghana_region,
        seller_tel_no,
        momo_number,
        address,
        dob,
        sex
    } = req.body;
    const userInsertQuery = 'INSERT INTO WovenUsers(email, first_name, last_name, country, user_password, user_role) VALUES (?,?,?,?,?,?)';
    const userInsertParams = [email, first_name, last_name, country, user_password, 'seller'];
    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }
        const sellerInsertQuery = 'INSERT INTO Seller(email, ghana_region, seller_tel_no, momo_number, address, dob, sex) VALUES (?,?,?,?,?,?,?)';
        const sellerInsertParams = [email, ghana_region,
            seller_tel_no,
            momo_number,
            address,
            dob,
            sex];

        connection.query(sellerInsertQuery, sellerInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into seller table'});
                });
            } else {
                res.status(201).send('seller registered successfully');
            }
        });
    });    
});

router.post('/registerCustomer', (req, res) => {
    const connection = req.db;
    const {
        email,
        first_name,
        last_name,
        country,
        user_password
    } = req.body;
    const userInsertQuery = 'INSERT INTO WovenUsers(email, first_name, last_name, country, user_password, user_role) VALUES (?,?,?,?,?,?)';
    const userInsertParams = [email, first_name, last_name, country, user_password, 'customer'];
    connection.query(userInsertQuery, userInsertParams, (err, userResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }
        const customerInsertQuery = 'INSERT INTO Customer(email) VALUES (?)';
        const customerInsertParams = [email, ghana_region];

        connection.query(customerInsertQuery, customerInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into customer table'});
                });
            } else {
                res.status(201).send('customer registered successfully');
            }
        });
    });    
});

module.exports = router;