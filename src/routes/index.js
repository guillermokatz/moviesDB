var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movies DB' });
});
router.get('/info', function(req, res, next) {
  res.render('info', { title: 'Información de Movies DB' });
});

module.exports = router;
