const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//creating a new cart
router.post('/create-cart', async (req, res) => {
    const connection = req.db;
    try {
        const {cart_id, customer_id} = req.body;
        const sql = 'INSERT INTO Cart(cart_id, customer_id) VALUES(?,?)';
        const result = await connection.query(sql, [cart_id, customer_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Adding a product to cart
router.post('/add-to-cart', async (req, res) => {
    const connection = req.db;
    try {
        const {cart_id, product_id, quantity} = req.body;
        const sql = 'INSERT INTO CartProduct(cart_id, product_id, quantity) VALUES(?,?,?)';
        const result = await connection.query(sql, [cart_id, product_id, quantity]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Removing a product from the cart
router.post('/remove-from-cart', async (req, res) => {
    const connection = req.db;
    try {
        const {cart_id, product_id, quantity} = req.body;
        const sql = 'DELETE FROM table WHERE cart_id = ? AND product_id = ?';
        const result = await connection.query(sql, [cart_id, product_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Clearing out a cart
router.post('/clear-cart/:cart-id/', async (req, res) => {
    const connection = req.body;
    try {
    } catch (error) {
    }
});


//Checking out a cart
router.post('/checkout/:cart-id/', async (req, res) => {
    const connection = req.body;
    //For all the products in the cart retrieve seller momo number
    //For all the products in the cart retrieve seller 
    //Calculate total
    //Retreive payment method
    //Retreive card number
    //Retreive pin?
    //Acknowledge Payment
    try {
    } catch (error) {
    }
});

module.exports = router;