const express = require('express');
const router = express.Router();
const data = require('../data');
const Movie = require('../models/movie');
const cloudinary = require('cloudinary').v2;

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
router.put('/movies/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, (err, updatedMovie) => {
        res.redirect(`/movies/${req.params.id}`);
    });
});

// router.put('/movies/:id/rent', (req, res) => {
//     const qty = req.query.qty;
//     Movie.findByIdAndUpdate(req.params.id, { qty: qty }, (err, foundMovie) => {
//         res.redirect(`/movies/${foundMovie._id}`);
//     });
// });

// Create
router.post('/movies', (req, res) => {
    const movieImg = req.files.movieImg;
    movieImg.mv(`./uploads/${movieImg.name}`);

    cloudinary.uploader.upload(`./uploads/${movieImg.name}`, (err, result) => {
        req.body.movieImg = result.secure_url;
        Movie.create(req.body, (err, createdMovie) => {
            res.redirect('/movies');
        });
    });
});

// Edit
router.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id, (err, foundMovie) => {
        res.render('edit.ejs', { movie: foundMovie});
    });
});

// Show
router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, (err, foundMovie) => {
        res.render('show.ejs', { movie: foundMovie });
    });
});

module.exports = router;