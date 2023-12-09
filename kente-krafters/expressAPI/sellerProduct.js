const express = require('express');
const mysql = require('mysql');
const router = express.Router();


//View All Sellers Products
router.get('/sellers/:seller-id/products/:offset', async (req, res) => {
    try {
        const connection = req.db;
        const userProvidedOffset = parseInt(req.params.offset, 10) || 0;
        const seller_id = req.params.seller-id;
        const sql = 'SELECT * FROM seller WHERE seller_id = $1 ORDER BY date LIMIT 10 OFFSET $2';
        const result = await connection.query(sql, [seller_id, userProvidedOffset]);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Adding a new product
router.post('/sellers/:seller-id/products/', async (req, res) => {
    try {
        const connection = req.db;
        const seller_id = req.params.seller-id;
        const {product_name, yards, description, price, image_link} = req.body;
        const currentDatetime = new Date().toISOString();
        const sql = 'INSERT INTO Product(seller_id, product_name, yards, description, price, image_link, approval_status, date_created ) VALUES(?,?,?,?,?,?,?)';
        const result = await connection.query(sql, [product_name, yards, description, price, image_link, 'active', currentDatetime]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Updating product info
router.put('/updateProduct/:product_id/:seller_id', async (req, res) => {
    try {
      const connection = req.db;
      const { product_id, seller_id } = req.params;
      const { new_product_name, new_yards, new_description, new_price, new_image_link } = req.body;
      const sql = 'UPDATE Product SET product_name = ?, yards = ?, description = ?, price = ?, image_link = ? WHERE product_id = ? AND seller_id = ?';
  
      const results = await new Promise((resolve, reject) => {
        connection.query(
          sql,
          [new_product_name, new_yards, new_description, new_price, new_image_link, product_id, seller_id],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
  
      // Check if any rows were affected
      if (results.affectedRows === 0) {
        return res.status(404).send('Product not found');
      }
  
      res.status(200).send('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Internal Server Error');
    }
});

module.exports = router;