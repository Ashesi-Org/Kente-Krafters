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



//RemoveItemFrom Cart
router.post('/remove-from-cart', async (req, res) => {
    const connection = req.db;
    try {
        const { product_id } = req.body;
        if (!product_id) {
            throw new Error('Product ID is missing in the request body.');
        }

        const sql = 'DELETE FROM CartProduct WHERE product_id=$1';
        const result = await connection.query(sql, [product_id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Product not found in the cart.' });
        } else {
            res.json({ success: true, message: 'Product successfully removed from the cart.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Clearing out a cart
router.post('/clear-cart', async (req, res) => {
    const connection = req.db;
    try {
        const { cart_id } = req.body;
        if (!cart_id) {
            throw new Error('Product ID is missing in the request body.');
        }
        const sql = 'DELETE FROM CartProduct WHERE cart_id=$1';
        const result = await connection.query(sql, [cart_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Product not found in the cart.' });
        } else {
            res.json({ success: true, message: 'Product successfully removed from the cart.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/checkout/cart-id', async (req, res) => {
    const connection = req.db;
    let cartTotal = 0;
    //Retrive users payment info
    const cartId = req.params['cart-id'];
    const resultMap = {};
    const sql = `
        SELECT Product.product_id, Product.price * CartProduct.quantity AS TotalPrice, Seller.momo_number AS SellerMomo
        FROM CartProduct
                 JOIN Product ON CartProduct.product_id = Product.product_id
                 JOIN Seller ON Product.seller_id = Seller.seller_id
        WHERE CartProduct.cart_id = ?
    `;
    connection.query(sql, [cartId], (error, results, fields) => {
        if (error) {
            console.error('Error executing the query: ' + error.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Iterate through the query results and populate the map
        results.forEach((row) => {
            const productId = row.product_id;
            const totalPrice = row.TotalPrice;
            const sellerMomo = row.SellerMomo;

            // Initialize the inner dictionary if the product ID is not in the resultMap
            if (!resultMap.hasOwnProperty(productId)) {
                resultMap[productId] = {};
            }
            // Populating the inner dictionary with seller momo number and totalPrice
            resultMap[productId][sellerMomo] = totalPrice;
        });
        Object.values(resultMap).forEach((product) => {
            Object.values(product).forEach((totalPrice) => {
                cartTotal += totalPrice;
            });
        });
        // Respond with the map
        res.json({resultMap, cartTotal});


        //Call Order API route once payment to woven Africa is complete
    });
});
module.exports = router;