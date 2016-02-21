var express = require('express');
var router = express.Router();
var User = require('./models/user');


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

router.get('/profile', function (req, res) {
  res.render('profile', { title: 'Bldr | profile'});
});

router.post('/signup', function (req, res) {
  var user = new User({
    firstName: req.body.firstname || 'First',
    lastName: req.body.lastname || 'Last',
    email: req.body.email || 'email@email.com',
    password: req.body.password || 'password'
  });
  user.save(function (err) {
    if (err) {
      var err = "Something went wrong";
      if (err.code === 11000) {
        error = "That e-mail is already taken, try another one.";
      }
      res.render('register', { error: error });
    } else {
      res.redirect('/profile')
    }
  })
});

module.exports = router;
