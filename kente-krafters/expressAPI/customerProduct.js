const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//User Views All MarketPlace Products
router.get('/products/rows/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const sql = 'SELECT * FROM Product ORDER BY date LIMIT 10 OFFSET $1';
        const result = await connection.query(sql, [userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//User Views All Stole Designs
router.get('/stoles/rows/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const sql = 'SELECT * FROM StoleProduct ORDER BY date LIMIT 10 OFFSET $1';
        const result = await connection.query(sql, [userProvidedOffset]);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//User Gets Fabric Templates
router.get('/customfabrics/rows/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const sql = 'SELECT * FROM CustomFabricProduct ORDER BY date LIMIT 10 OFFSET $1';
        const result = await connection.query(sql, [userProvidedOffset]);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//User views a single product
router.get('/product/:id', (req, res) => {
    const connection = req.db;
    const productId = req.params.id;
    const sql = 'SELECT * FROM Product WHERE product_id = ?';
    connection.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                res.json(result[0]); // Assuming the query returns one student
            } else {
                res.status(404).send('Product not found');
            }
        }
    });
});

//Fetch the stoles
router.get('/stoles/:id', (req, res) => {
    const connection = req.db;
    const stoleId = req.params.id;
    // SQL query to fetch a student by ID
    const sql = 'SELECT * FROM StoleProduct WHERE stole_product_id = ?';

    connection.query(sql, [stoleId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).send('Product not found');
            }
        }
    });
});


//Fetch the fabric
router.get('/customfabric/:id', (req, res) => {
    const connection = req.db;
    const customFabricId = req.params.id;
    const sql = 'SELECT * FROM CustomFabricProduct WHERE custom_fabric_product_id = ?';

    connection.query(sql, [customFabricId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).send('Product not found');
            }
        }
    });
});

//View Seller by product
router.get('/seller/:id/products/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const seller_email = req.params.id;
        const sql = 'SELECT * FROM Product WHERE seller_email = $1 ORDER BY date LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [seller_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


module.exports = router;