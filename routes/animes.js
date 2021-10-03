const express = require('express')
const router = express.Router()
const Anime = require('../models/anime')


// all animes route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const animes = await Anime.find({})
    res.render('animes/index', { 
      animes : animes,
      searchOptions : req.query })
  } catch {
    res.redirect('/')
  }
  res.render('animes/index')
})

// new anime route
router.get('/new', (req, res) => {
  res.render('animes/new', { anime : new Anime() })
})


router.post('/', async (req, res) => {
  const anime = new Anime({
    name: req.body.name
  })
  try {
    const newAnime = await anime.save()
    res.redirect('animes')
  } catch {
      res.render('animes/new', {
      anime : anime,
      errorMessage: 'Error adding Anime'
      })
  }
  // anime.save((err, newAnime) => {
  //   if (err) {
  //     res.render('animes/new', {
  //       anime : anime,
  //       errorMessage: 'Error adding Anime'
  //     })
  //   } else {
  //     res.redirect('animes')
  //   }
  // })
})

module.exports = router