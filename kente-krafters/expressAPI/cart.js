const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//Adding a product to cart
router.post('/product/add-to-cart/:productid/:cartid', async (req, res) => {
    const connection = req.body;
    try {
    } catch (error) {

    }
});

//Removing a product from the cart
router.post('/product/remove-from-cart/:productid/:cartid', async (req, res) => {
    const connection = req.body;
    try {
    } catch (error) {
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
    try {
    } catch (error) {
    }
});

module.exports = router;