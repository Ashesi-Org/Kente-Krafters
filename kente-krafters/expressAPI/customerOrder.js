const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//User Views All Orders
//Route for viewing orders
router.get('/customer/merchant-product-orders/:offset', async (req, res) => {
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
router.get('/customer/stole-product-orders/:offset', async (req, res) => {
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
router.get('/customer/customfabric-product-orders/:offset', async (req, res) => {
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
router.post('/order', async (req, res) => {
    try {
        const connection = req.db;
        const {
            cart_id,
            customer_id,
            seller_id,
            payment_id,
            country,
            postal_code,
            delivery_address,
            delivery_method_id,
            quantity,
            product_id,
            unit_price,
            total_price
        } = req.body;
        const currentDatetime = new Date().toISOString();
        const sql = 'INSERT INTO ProductOrder(cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, order_status, quantity, product_id, unit_price, total_price) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, 'pending', quantity, product_id, unit_price, total_price]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Placing an order for a stole
router.post('/order/stole', async (req, res) => {
    const connection = req.db;
    const {
        cart_id,
        customer_id,
        seller_id,
        payment_id,
        country,
        postal_code,
        delivery_address,
        delivery_method_id,
        quantity, product_id, unit_price, total_price,
        color, width, height, logo_link, final_design_link
    } = req.body;
    const OrderInsertQuery = 'INSERT INTO ProductOrder(cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, order_status, quantity, product_id, unit_price, total_price) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    const OrderInsertParams = [cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, 'pending', quantity, product_id, unit_price, total_price];
    connection.query(OrderInsertQuery, OrderInsertParams, (err, orderResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into user table'});
            });
        }
        const OrderId = orderResults.insertId;
        const stoleOrderInsertQuery = 'INSERT INTO StoleOrderDetails(order_id, color, width, height, logo_link, final_design_link) VALUES (?, ?, ?,?,?,?)';
        const stoleOrderInsertParams = [OrderId, color, width, height, logo_link, final_design_link];
        connection.query(stoleOrderInsertQuery, stoleOrderInsertParams, (err) => {
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

//Placing an order for a custom fabric
router.post('/order/custom-fabric', async (req, res) => {
    const connection = req.db;
    const {
        cart_id,
        customer_id,
        seller_id,
        payment_id,
        country,
        postal_code,
        delivery_address,
        delivery_method_id,
        quantity, product_id, unit_price, total_price,
        texture, final_design_link, width, height
    } = req.body;
    const OrderInsertQuery = 'INSERT INTO ProductOrder(cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, order_status, quantity, product_id, unit_price, total_price) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    const OrderInsertParams = [cart_id, customer_id, seller_id, payment_id, country, postal_code, delivery_address, delivery_method_id, 'pending', quantity, product_id, unit_price, total_price];
    connection.query(OrderInsertQuery, OrderInsertParams, (err, orderResults) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into order table'});
            });
        }
        const OrderId = orderResults.insertId;
        const CustomFabricOrderInsertQuery = 'INSERT INTO CustomFabricOrderDetails(order_id, texture, final_design_link, width, height) VALUES (?, ?, ?,?,?)';
        const CustomFabricOrderInsertParams = [OrderId, texture, final_design_link, width, height];
        connection.query(CustomFabricOrderInsertQuery, CustomFabricOrderInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into custom fabric table'});
                });
            } else {
                res.status(201).send('Fabric order placed successfully');
            }
        });
    });
});


//Removing a product
module.exports = router;