var express = require('express');
var router = express.Router();

// const db = require('../database/models');

const actorsController = require('../controllers/actorsController')

// router.get('/test', async (req,res)=>{
//   let test = await db.Actor_Movie.findAll();
//   res.send(test)
// });
router.get('/', actorsController.list);
router.get('/recommended', actorsController.rating);
// router.get('/newAct', actorsController.newAct);

router.post('/results', actorsController.searchResults);
router.get('/:id', actorsController.detail);



module.exports = router;
