const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// SIGNUP USERS

// provide signup form
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

// handle form submission
router.post('/signup', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    User.create(req.body, (err, newUser) => {
        req.session.userId = newUser._id;
        res.redirect('/movies');
    });
});

// LOGIN USERS

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
        // create a new session for the authenticated user - they are now logged in
        req.session.userId = foundUser._id;

        // if the password matches we redirect to the movies index page
        res.redirect('/movies');
    });
});

// LOGOUT USERS
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
});


module.exports = router;