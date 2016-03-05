var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var program = require('./program.js');


/* -- PAGES -- */
/* -- Home page -- */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

/* -- Contact page -- */
router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Contact' });
});

/* -- Register page -- */
router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

/* -- Login Page-- */
router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

/* -- Profile Page -- */
router.get('/profile', auth.authenticate, function (req, res) {
  res.render('profile', { title: 'Profile'});
});

/* -- Programs Page -- */
router.get('/programs', auth.authenticate, program.getCurrentUserPrograms, function (req, res) {
  res.render('programs', { title: 'Programs', hasPrograms: req.app.locals.hasPrograms });
});

/* -- Create Program Pages -- */
/* -- 1st Phase -- */
router.get('/create', auth.authenticate, function (req, res) {
  res.render('create-program-1', { title: 'Programs' });
});

/* -- 2nd Phase -- */
router.get('/create-2', auth.authenticate, program.getExercises,  function (req, res) {
  if (!req.app.locals.selection) {
    res.redirect('/create');
  } else {
    res.render('create-program-2', { title: 'Programs', selectedGoal: req.app.locals.selection, exercises: req.app.locals.exercises });
  }
});

/* -- 3rd Phase -- */
router.post('/create-2', auth.authenticate, program.createProgram, function (req, res) {
  res.redirect('/create-3');
});

router.get('/create-3', auth.authenticate, function (req, res) {
  if (!req.app.locals.program) {
    res.redirect('/create');
  } else {
    res.render('create-program-3', { title: 'Programs' });
  }

});


/* -- API ROUTES -- */
/* -- Authentication routes -- */
router.post('/login', auth.login);
router.post('/signup', auth.register);
router.get('/logout', auth.logout);

/* -- Program routes -- */
router.post('/programs/delete/:id', auth.authenticate, program.deleteProgram);
router.post('/programs/create', auth.authenticate, program.selectGoal);
router.get('/programs/create-exercises', program.createData);

/* -- User routes -- */
router.post('/user/update-info', auth.authenticate);
router.post('/user/change-password', auth.authenticate);


module.exports = router;
