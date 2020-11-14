var express = require('express');
var router = express.Router();
const validator = require('../middlewares/routes/validator');

// const db = require('../database/models');

const actorsController = require('../controllers/actorsController')

// router.get('/test', async (req,res)=>{
//   let test = await db.Actor_Movie.findAll();
//   res.send(test)
// });
router.get('/', actorsController.list);
router.get('/recommended', actorsController.rating);

router.get('/create', actorsController.create);

router.post('/create', validator.createActor, actorsController.processCreate);

router.post('/results', actorsController.searchResults);

router.get('/create_act', actorsController.createAct);
router.post('/create_act', actorsController.processCreateAct);

router.get('/detail/:id', actorsController.detail);

router.get('/edit/:id', actorsController.edit);
router.put('/edit/:id', validator.createActor, actorsController.processEdit);

router.delete('/delete/:id', actorsController.delete);



module.exports = router;
