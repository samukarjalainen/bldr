var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var program = require('./program.js');


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
  res.render('create-program-1', { title: 'Programs' });
});

router.get('/create-2', auth.authenticate, program.getExercises,  function (req, res) {
  if (!req.app.locals.selection) {
    res.redirect('/create');
  } else {
    res.render('create-program-2', { title: 'Programs', selectedGoal: req.app.locals.selection, exercises: req.app.locals.exercises });
  }
});

router.post('/create-2', auth.authenticate, program.createProgram, function (req, res) {
  res.render('create-program-3');
});

router.post('/create', auth.authenticate, program.selectGoal);

router.get('/create-exercises', program.createData);

module.exports = router;
