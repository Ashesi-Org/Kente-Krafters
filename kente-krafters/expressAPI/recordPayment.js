const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//Record payment details
router.post('/record-payment', async (req, res) => {
    try{
    const connection = req.db;
    const {payment_id, payment_provider, seller_email, customer_email, transaction_amount, transaction_datetime, payer_number} = req.body;
    const sql = 'INSERT INTO Payment(payment_id, payment_provider, seller_email, customer_email, transaction_amount, transaction_datetime, payer_number) VALUES(?,?,?,?,?,?,?)';
    const result = await connection.query(sql, [payment_id, payment_provider, seller_email, customer_email, transaction_amount, transaction_datetime, payer_number]);
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
  }
});