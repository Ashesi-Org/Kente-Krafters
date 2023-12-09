const express = require('express');
const mysql = require('mysql');
const router = express.Router();


router.get('/signout', (req, res) => {
    const connection = req.db;
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      // Disconnect from the database
      connection.end((dbErr) => {
        if (dbErr) {
          console.error('Error disconnecting from database:', dbErr);
          return res.status(500).send('Internal Server Error');
        }
  
        // Redirect to the home page or login page after signing out
        res.redirect('/');
      });
    });
  });
  module.exports = router;