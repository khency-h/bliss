const express = require('express');
const router = express.Router();
const data = require('../data');
const Movie = require('../models/movie');

// Seed Route - for development purposes only 
router.get('/movies/seed', (req, res) => {
    // This option will reset database and recreate movies
        Movie.deleteMany({}, (err, results) => {
            Movie.create(data, (err, movies) => {
                res.redirect('/movies');
            });
        });
    
        // Uncomment this option to keep creating duplicates 
        // Movie.create(data, (err, movies) => {
        //     res.redirect('/movies');
        // });
});

// INDUCES

// Index

// New
router.get('/movies/new', (req, res) => {
    res.render('new.ejs');
});

// Delete

// Update

// Create
router.post('/movies', (req, res) => {
    Movie.create(req.body, (err, createdMovie) => {
        res.send(createdMovie);
    });
});

// Edit

// Show

module.exports = router;