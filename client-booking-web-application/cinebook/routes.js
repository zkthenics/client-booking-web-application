const express = require('express');
const router = express.Router();
const dataService = require('./dataService');

// Main Page
router.get('/', function(req, res) {
  const allMovies = dataService.getAllMovies();
  const allTimes = dataService.getAllTimes();
  
  res.render('home', { 
    movies: allMovies, 
    times: allTimes,
    selectedMovie: null, 
    matchedShowtimes: []
  });
});

router.get('/movie/:movieId', function(req, res) {
  const movieIdNum = Number(req.params.movieId);
  
  const allMovies = dataService.getAllMovies();
  const allTimes = dataService.getAllTimes();

  const foundMovie = allMovies.find(function(movie) {
    return movie.id === movieIdNum;
  });

  if (!foundMovie) {
    return res.status(404).send('Movie not found');
  }

  if (foundMovie.rating === 'U') {
    foundMovie.badgeColor = 'bg-success';
  } else if (foundMovie.rating === 'PG') {
    foundMovie.badgeColor = 'bg-info text-dark';
  } else if (foundMovie.rating === '12A') {
    foundMovie.badgeColor = 'bg-warning text-dark';
  } else if (foundMovie.rating === '15') {
    foundMovie.badgeColor = 'bg-danger';
  } else {
    foundMovie.badgeColor = 'bg-secondary';
  }

  const filteredTimes = allTimes.filter(function(timeRow) {
    return Number(timeRow.movieId) === movieIdNum;
  });

  res.render('home', { 
    movies: allMovies, 
    times: allTimes,
    selectedMovie: foundMovie, 
    matchedShowtimes: filteredTimes 
  }); 
});

router.get('/time/:timeId', function(req, res) {
  const timeIdNum = Number(req.params.timeId);

  const allTimes = dataService.getAllTimes();
  const allMovies = dataService.getAllMovies();
  const allShowings = dataService.getAllShowings(); 

  const foundTimeSlot = allTimes.find(function(t) {
    return Number(t.id) === timeIdNum;
  });

  if (!foundTimeSlot) {
    return res.status(404).send('Time slot not found');
  }

  const foundMovie = allMovies.find(function(m) {
    return m.id === Number(foundTimeSlot.movieId);
  });

  const foundLayout = allShowings.find(function(s) {
    return s.id === Number(foundTimeSlot.showingId);
  });

  res.render('seats', {
    movie: foundMovie,
    timeSlot: foundTimeSlot,
    layout: foundLayout
  });
});

router.post('/confirm', function(req, res) {
  const timeIdNum = Number(req.body.timeId);
  const userSeats = req.body.selectedSeats; 
  const nameInput = req.body.customerName;
  const emailInput = req.body.customerEmail;

  const allTimes = dataService.getAllTimes();
  const allMovies = dataService.getAllMovies();

  const foundTimeSlot = allTimes.find(function(t) { return Number(t.id) === timeIdNum; });
  const foundMovie = allMovies.find(function(m) { return m.id === Number(foundTimeSlot.movieId); });

  let cleanSeatsList = [];
  if (Array.isArray(userSeats)) {
    cleanSeatsList = userSeats;
  } else if (userSeats) {
    cleanSeatsList = [userSeats];
  }

  const codeGen = Math.floor(1000 + Math.random() * 9000);
  const refCode = 'CIN-' + codeGen;

  res.render('confirmation', {
    bookingReference: refCode,
    movie: foundMovie,
    timeSlot: foundTimeSlot,
    seats: cleanSeatsList,
    customerName: nameInput,
    customerEmail: emailInput
  });
});

router.use(function(req, res) {
  res.status(404).send('Page Not Found');
});

module.exports = router;
