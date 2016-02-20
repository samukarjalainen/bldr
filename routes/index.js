var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Bldr | home' });
});

router.get('/about', function (req, res) {
  res.render('about', { title: 'Bldr | about' });
});

router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Bldr | contact' });
});

module.exports = router;
