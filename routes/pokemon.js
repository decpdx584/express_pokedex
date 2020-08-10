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
      let pokemonURL = `httsps://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(pokemonURL);
      // console.log(response.data)
      let details = response.data;
      res.render('show', { pokeData: details });
    }
  } catch (err) {
    res.render('err');
  }
});

module.exports = router;
