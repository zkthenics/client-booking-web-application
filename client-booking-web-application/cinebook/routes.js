const express = require('express');
const router = express.Router();

const movies = require('./data/movies.json');
const times = require('./data/times.json');
const showings = require('./data/showings.json');

// Home Page
router.get('/', (req, res) => {

    // Add showtimes to each movie
    const moviesWithTimes = movies.map(movie => {
        return {
            ...movie,
            showtimes: times.filter(time => time.movieId === movie.id)
        };
    });

    res.render('home', {
        movies: moviesWithTimes
    });
});


// Seat Selection Page
router.get('/seats', (req, res) => {

    const showingId = parseInt(req.query.showingId);

    const showing = showings.find(s => s.id === showingId);

    if (!showing) {
        return res.send("Showing not found");
    }

    res.render('seats', {
        showing
    });

});


// Confirmation Page
router.get('/confirmation', (req, res) => {

    const seats = req.query.seats || "";
    const total = req.query.total || "£0.00";

    res.render('confirmation', {
        seats,
        total
    });

});

module.exports = router;