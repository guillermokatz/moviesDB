var express = require('express');
var router = express.Router();

// const db = require('../database/models');

const moviesController = require('../controllers/moviesController')

// router.get('/test', async (req,res)=>{
//   let test = await db.Actor_Movie.findAll();
//   res.send(test)
// });
router.get('/', moviesController.list);
router.get('/recommended', moviesController.rating);
router.get('/new', moviesController.new);
router.post('/results', moviesController.searchResults);
router.get('/:id', moviesController.detail);



module.exports = router;
