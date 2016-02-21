var bcrypt = require('bcryptjs');
var User = require('./models/user');
var app = require('../app');


var auth = {

  authenticate : function (req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, function (err, user) {
        if (!user) {
          req.session.reset();
          res.redirect('/login');
        } else {
          res.locals.user = user;
          next();
        }
      })
    } else {
      res.redirect('/login');
    }
  },

  login : function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) {
        res.render('login', { title: 'Bldr | login', error: 'Invalid email or password.' });
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.user = user;
          res.redirect('/profile');
        } else {
          res.render('login', { title: 'Bldr | login', error: 'Invalid email or password.' });
        }
      }
    })
  },

  register : function (req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = new User({
      firstName: req.body.firstname || 'First',
      lastName: req.body.lastname || 'Last',
      email: req.body.email || 'email@email.com',
      password: hash
    });
    user.save(function (err) {
      if (err) {
        var err = "Something went wrong";
        if (err.code === 11000) {
          error = "That e-mail is already taken, try another one.";
        }
        res.render('register', { error: error });
      } else {
        req.app.locals.user = user;
        req.session.user = user;
        res.redirect('/profile');
      }
    })
  }
};

module.exports = auth;

