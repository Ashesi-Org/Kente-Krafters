const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//Merchant get's to view all their orders based on status
router.get('/merchant-order/:status/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const order_status = req.params.status;
        const seller_email = req.body;
        const sql = 'SELECT Orders.*, MerchantProductOrder.* FROM Orders JOIN MerchantProductOrder ON Orders.payment_id = MerchantProductOrder.payment_id WHERE Orders.seller_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [seller_email, order_status, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Woven gets to see their stole order based on status
router.get('/stole-order/:status/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const order_status = req.params.status;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const admin_email = req.body;
        const sql = 'SELECT Orders.*, StoleProductOrder.* FROM Orders JOIN StoleProductOrder ON Orders.payment_id = StoleProductOrder.payment_id WHERE Orders.admin_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [admin_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Woven gets to see their stole order based on status
router.get('/kente-order/:status/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const order_status = req.params.status;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const admin_email = req.body;
        const sql = 'SELECT Orders.*, CustomFabricOrderDetails.* FROM Orders JOIN CustomFabricOrderDetails ON Orders.payment_id = CustomFabricOrderDetails.payment_id WHERE Orders.admin_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [admin_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
