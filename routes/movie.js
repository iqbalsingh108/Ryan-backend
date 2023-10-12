// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
console.log("hello my api");
// Create a new movie
router.post('/addmovies', async (req, res) => {
  try {
    const { name, duration, rating } = req.body;
    const movie = await Movie.create({ name, duration, rating });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the movie' , error : error.message });
  }
});

// Read all movies
router.get('/allmovies', async (req, res) => {
    
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

// Update a movie by ID
router.put('/updatemovie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const [updated] = await Movie.update(req.body, {
      where: { id: movieId },
    });
    if (updated) {
      res.status(200).json({ message: 'Movie updated successfully' });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the movie',error });
  }
});

// Delete a movie by ID
router.delete('/delete/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const deleted = await Movie.destroy({
      where: { id: movieId },
    });
    console.log(deleted,"deleteddeleted")
    // if (deleted) {
      res.status(200).json({message:"movie deleted"});
    // } else {
    //   res.status(404).json({ error: 'Movie not found' });
    // }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the movie' });
  }
})



// routes/movies.js
router.get('/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
  
    try {
      const movies = await Movie.findAndCountAll({
        offset,
        limit: pageSize,
      });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies' });
    }
  });
  

  router.get('/movies', async (req, res) => {

   
    const { name, rating, sort } = req.query;
    const filterOptions = {};
    if (name) filterOptions.name = name;
    if (rating) filterOptions.rating = rating;
  
    try {
      const order = sort === 'name' ? [['name', 'ASC']] : sort === 'rating' ? [['rating', 'ASC']] : [];
      const movies = await Movie.findAll({ where: filterOptions, order });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies' });
    }
  });
  

module.exports = router;
