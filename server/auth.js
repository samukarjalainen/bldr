var bcrypt = require('bcryptjs');
var User = require('./models/user');


var auth = {

  authenticate : function (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  },

  login : function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) {
        res.render('login', { title: 'Bldr | login', error: 'Invalid email or password.' });
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          setSession(req, user);
          res.redirect('/profile');
        } else {
          res.render('login', { title: 'Bldr | login', error: 'Invalid email or password.' });
        }
      }
    })
  },

  logout : function (req, res) {
    req.session.reset();
    res.redirect('/');
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
        setSession(req, user);
        res.redirect('/profile');
      }
    })
  }
};

function setSession(req, user) {
  var userWithoutPassword = user;
  delete userWithoutPassword.password;
  req.app.locals.user = userWithoutPassword;
  req.session.user = userWithoutPassword;
}

module.exports = auth;

