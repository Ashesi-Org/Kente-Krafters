const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//Route for viewing orders
router.get('/customer/merchant-order/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const customer_email = req.body;
        const sql = 'SELECT Orders.*, MerchantProductOrder.* FROM Orders JOIN MerchantProductOrder ON Orders.payment_id = MerchantProductOrder.payment_id WHERE Orders.customer_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [customer_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Getting stole product orders
router.get('/customer/stole-order/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const customer_email = req.body;
        const sql = 'SELECT Orders.*, StoleProductOrder.* FROM Orders JOIN StoleProductOrder ON Orders.payment_id = StoleProductOrder.payment_id WHERE Orders.customer_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [customer_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Getting custom product orders
router.get('/customer/customfabric-order/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const customer_email = req.body;
        const sql = 'SELECT Orders.*, CustomFabricOrderDetails.* FROM Orders JOIN CustomFabricOrderDetails ON Orders.payment_id = CustomFabricOrderDetails.payment_id WHERE Orders.customer_email = $1 ORDER BY Orders.date_created LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [customer_email, userProvidedOffset]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Placing an order for a product
router.post('/customer/order', async (req, res) => {
    try {
        const connection = req.db;
        const {
            payment_id,
            customer_email,
            country,
            postal_code,
            delivery_address,
            delivery_method,
            total_price
        } = req.body;
        const sql = 'INSERT INTO Orders(payment_id, customer_email, country, postal_code, delivery_address, delivery_method, total_price) VALUES(?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [ payment_id,
            customer_email,
            country,
            postal_code,
            delivery_address,
            delivery_method,
            total_price]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Setting an order for a particular merchant's product
router.post('customer/merchant-order', async (req, res) => {
    try {
        const connection = req.db;
        const {
            payment_id,
            product_id,
            product_total,
            quantity,
            seller_fulfilled,
            delivery_status,
            tracking_id,
            order_status
        } = req.body;
        const sql = 'INSERT INTO MerchantProductOrder(payment_id,product_id, product_total,quantity, seller_fulfilled, delivery_status, tracking_id, order_status) VALUES(?,?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [payment_id,product_id, product_total,quantity, seller_fulfilled, delivery_status, tracking_id, order_status]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Setting order for a particular stole
router.post('customer/stole-order', async (req, res) => {
    try {
        const connection = req.db;
        const {
            payment_id,
            quantity,
            color,
            logo_link,
            final_design_link,
            delivery_status,
            tracking_id,
            order_status
        } = req.body;
        const sql = 'INSERT INTO StoleProductOrder(payment_id, quantity, color, logo_link, final_design_link, delivery_status, tracking_id, order_status) VALUES(?,?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [payment_id,
            quantity,
            color,
            logo_link,
            final_design_link,
            delivery_status,
            tracking_id,
            order_status]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Setting order details for custom-fabric
router.post('customer/customfabric-order', async (req, res) => {
    try {
        const connection = req.db;
        const {
            payment_id,
            product_total,
            final_design_link,
            yards,
            delivery_status,
            tracking_id,
            order_status
        } = req.body;
        const sql = 'INSERT INTO CustomFabricOrderDetails(payment_id,product_total,final_design_link, yards, delivery_status, tracking_id, order_status) VALUES(?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [payment_id,product_total,final_design_link, yards, delivery_status,
            tracking_id,
            order_status]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
//Removing a product
module.exports = router;