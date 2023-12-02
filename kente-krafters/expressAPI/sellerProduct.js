const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//User Views All Sellers Products
router.get('/seller/:id/products/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const seller_id = req.params.id;
        const sql = 'SELECT * FROM seller WHERE seller_id = $1 ORDER BY date LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [seller_id, userProvidedOffset]);


        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Adding a new product
router.post('/seller/:id/products/', async (req, res) => {
    try {
        const connection = req.db;
        const seller_id = req.params.id;
        const {product_name, yards, price, image_link} = req.body;
        const currentDatetime = new Date().toISOString();
        const sql = 'INSERT INTO Product(seller_id, product_name, yards, price, image_link, approval_status, date_created ) VALUES(?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [product_name, yards, price, image_link, 'active', currentDatetime]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Removing a product


module.exports = router;