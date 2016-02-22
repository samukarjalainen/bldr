var express = require('express');
var router = express.Router();
var auth = require('./auth.js');


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

router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.get('/register', function (req, res) {
  res.render('register', { title: 'Bldr | register' });
});

router.get('/profile', auth.authenticate, function (req, res) {
  res.render('profile', { title: 'Bldr | profile'});
});

router.post('/signup', auth.register);

module.exports = router;
