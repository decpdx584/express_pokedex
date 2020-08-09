var express = require('express');
var router = express.Router();
const db = require('../models')


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
  // TODO: Get form data and add a new record to DB
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

module.exports = router;
