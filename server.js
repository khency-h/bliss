// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const moviesRouter = require('./controllers/movies');
const usersRouter = require('./controllers/users');

// Initialize the Express App
const app = express();

// Configure Settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Database Connection + Error/Success + Define Callback Functions 
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('An error occurred with MongoDB: ' + err.message));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));

// Mount Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// custom middleware to inspect session store - for development purpose
// app.use((req, res, next) => {
//     console.log(req.session)
//     next();
// });

app.use((req, res, next) => {
    if(req.session.userId) {
        res.locals.user = req.session.userId
    } else {
        res.locals.user = null
    }
    next();
});

// authentication middleware
function isAuthenticated(req, res, next) {
    if(!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Mount Routes
// Homepage Route
app.get('/', (req, res) => res.render('home.ejs'));

// Must run after other middleware
app.use(usersRouter);
app.use(isAuthenticated, moviesRouter);

// Tell the app to listen on dedicated port
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
