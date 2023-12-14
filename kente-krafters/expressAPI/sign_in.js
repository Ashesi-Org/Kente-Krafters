const express = require('express');
const mysql = require('mysql');
const router = express.Router();


router.post('/sign-in/:role', (req, res) => {
    const {email, user_password} = req.body;
    const user_type = req.params.role;
    const db = req.db;
    const query = `SELECT *
                   FROM WovenUsers
                   WHERE email = $1,
                     AND user_password = $2 AND user_type = $3`;
    db.query(query, [email, user_password, user_type], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0){
                res.send(true);
            } else {
                res.send(false);
                console.log("Invalid Username or password")
            }
        }
    });
});

module.exports = router;