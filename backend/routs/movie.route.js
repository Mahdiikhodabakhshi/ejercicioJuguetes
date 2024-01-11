const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie.controller');


//aqui llegamos con ruta /api/movies
router.post('/',movieCtrl.addMovie);

router.get('/', movieCtrl.getMovies)

router.get('/movie/:id' ,movieCtrl.getMovie);

router.patch('/:id' , movieCtrl.updateMovie);

router.delete('/:id' ,movieCtrl.deleteMovie);

router.get('/genres' , movieCtrl.getGenres);

router.get('/searchName/:title' , movieCtrl.getMovieByName);




module.exports = router;