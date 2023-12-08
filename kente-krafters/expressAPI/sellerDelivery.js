const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//Seller sets order to DHL delivery in process
router.post('/record-delivery-dhl', async (req, res) => {
    const connection = req.db;
    const {order_id, tracking_number, customs_declaration, delivery_time_window} = req.body;
    const sellerInsertQuery = 'INSERT INTO Shipment (order_id, delivery_status) VALUES (?,?)';
    const sellerInsertParams = [order_id, 'in-transit'];

    connection.query(sellerInsertQuery, sellerInsertParams, (err, results) => {
        if (err) {
            return connection.rollback(() => {
                res.status(500).json({error: 'Error inserting into Shipment table'});
            });
        }
        const shippmentId = results.insertId;
        const dhlInsertQuery = 'INSERT INTO DHLShipment (shippment_id, tracking_number, customs_declaration, delivery_time_window) VALUES (?,?,?,?)';
        const dhlInsertParams = [shippmentId, tracking_number, customs_declaration, delivery_time_window];
        connection.query(dhlInsertQuery, dhlInsertParams, (err) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({error: 'Error inserting into customer table'});
                });
            } else {
                res.status(201).send('Delivery registered successfully');
            }
        });
    });
});

//Collect Payment
router.post('/claim-payment', async(req, res) =>{
    //check if good is delivered if so, trigger payment from escrow account
    //
});
