var express = require('express');
var router = express.Router();
var auth = require('./auth.js');


router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function (req, res) {
  res.render('about', { title: 'About' });
});

router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Contact' });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

router.get('/profile', auth.authenticate, function (req, res) {
  res.render('profile', { title: 'Profile'});
});

router.post('/signup', auth.register);

router.get('/programs', auth.authenticate, function (req, res) {
  res.render('programs', { title: 'Programs' });
});

router.get('/create', auth.authenticate, function (req, res) {
  res.render('create-program', { title: 'Programs' });
});

module.exports = router;
