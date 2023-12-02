const express = require('express');
const mysql = require('mysql');
const router = express.Router();


router.post('/sign-in', (req, res) => {
    const {username, password} = req.body;
    const db = req.db;

    //Ohenaba remind me to come back to hash passowrds later
    const query = `SELECT *
                   FROM users
                   WHERE username = ?
                     AND password = ?`;

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                // Store user information in the session
                req.session.user = {id: results[0].id, username: results[0].username};

                res.send('Sign-in successful');
            } else {
                res.send('Invalid username or password');
            }
        }
    });
});


//Seller Dashboard
router.get('/seller-dashboard', (req, res) => {
    // Check if the user is logged in
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}!`);
    } else {
        res.redirect('/sign-in'); // Redirect to the sign-in page if not logged in
    }
});

module.exports = router;