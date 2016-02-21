var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'Bldr | home' });
});

router.get('/about', function (req, res) {
  res.render('about', { title: 'Bldr | about' });
});

router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Bldr | contact' });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Bldr | login' });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Bldr | register' });
});

router.post('/signup', function (req, res) {
  console.log(req.body);
  console.log(req.body.email);
  res.json(req.body);
});

module.exports = router;
