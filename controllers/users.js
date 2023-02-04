const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Sign Up Users

// provide signup form
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

// handle form submission
router.post('/signup', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    User.create(req.body, (err, newUser) => {
        res.redirect('/movies');
    });
});

// Login Users

// provide login form
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// handle form submission
router.post('/login', (req, res) => {
    // 1) look up the user using their email
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        // if the user does NOT exist, we redirect to login page
        if(!foundUser) {
            return res.redirect('/login');
        }
        // if the user exists, we compare password to determine a match
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password)

        // if the password does NOT match, we redirect to login page
        if(!isMatched) {
            return res.redirect('/login');
        }

        // if the password matches we redirect to the movies index page
        res.redirect('/movies');
    });
});

// Logout Users


module.exports = router;