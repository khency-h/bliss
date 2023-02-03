const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

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