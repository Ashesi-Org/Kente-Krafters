const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const signInRouter = require('./sign_in');
const signOutRouter = require('./sign_out');
const registerRouter = require('./register');
const cartRouter = require('./cart');
const customerProductRouter = require('./customerProduct');
const customerOrderRouter = require('./customerOrder');
const textileTemplateRouter = require('./customizeFabric');

//Comment here
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

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


// Set the view engine to EJS
app.set('view engine', 'ejs');

//Security and JSON Parsing
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


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

app.get('/customizeFabricView', (req, res) => {
    res.render('customizeFabricView', { /* any data you want to pass to the template */ });
});

app.get('/CustomizeStoleView', (req, res) => {
    res.sendFile(__dirname + '/stoleCustomizer.html');
});


// Routers for different parts of application
app.use(signInRouter);
app.use(signOutRouter);
app.use(registerRouter);
app.use(cartRouter);
app.use(customerProductRouter);
app.use(customerOrderRouter);
app.use(textileTemplateRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
