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
router.get('/movies', (req, res) => {
    Movie.find({}, (err, movies) => {
        res.render('index.ejs', { movies });
    });
});

// New
router.get('/movies/new', (req, res) => {
    res.render('new.ejs');
});

// Delete
router.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/movies');
    });
});

// Update

// Create
router.post('/movies', (req, res) => {
    Movie.create(req.body, (err, createdMovie) => {
        res.redirect('/movies');
    });
});

// Edit

// Show
router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, (err, foundMovie) => {
        res.render('show.ejs', { movie: foundMovie });
    });
});

module.exports = router;