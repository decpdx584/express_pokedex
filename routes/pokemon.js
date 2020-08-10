const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const foundPokemons = await db.pokemon.findAll();
    res.render('favorites', {
      pokemon: foundPokemons
    });
  } catch (err) {
    res.render('err');
  }
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    res.redirect('/pokemon');
  } catch (err) {
    res.render('err');
  }
});

// GET /pokemon/:name
router.get('/:name', async (req, res) => {
  try {
    if (req.params && req.params.name) {
      const pokemonURL = `httsps://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(pokemonURL);
      let pokeInfo = result.data;
      res.render('show', {pokeData: pokeInfo});
    }
  } catch (err) {
    res.render('err');
  }
});

module.exports = router;