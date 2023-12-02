const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const signInRouter = require('./sign_in');
const registerRouter = require('./register');
const cartRouter = require('./cart');
const customerProductRouter = require('./customerProduct');
const customerOrderRouter = require('./customerOrder');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WovenAfrica',
    port: 3306, // Your MySQL server port (default is 3306)
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);

});


//Security and JSON Parsing
app.use(bodyParser.json());
app.use(cors());


//Sending database connection to all routes
app.use((req, res, next) => {
    req.db = connection;
    next();
});


// Use express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


// Routers for different parts of application
app.use(signInRouter);
app.use(registerRouter);
app.use(cartRouter);
app.use(customerProductRouter);
app.use(customerOrderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
