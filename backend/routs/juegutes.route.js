const express = require('express');
const router = express.Router();
const gameController = require('../controllers/juguete.controller');
const {model} = require("mongoose");
const {Router} = require("express");



// LLEGA CON RUTA /API/GAMES
router.get('/paged/:page/:size' , gameController.getAll);

router.get('/game/:id' , gameController.getOne);

router.get('/categorias' , gameController.getCategorias);

router.post('/' , gameController.addGame);

router.patch('/:id' , gameController.updateGame);

router.delete('/:id' , gameController.deleteGame);

router.get('/gameByName/:name' , gameController.getByName)




module.exports = router;