/**
 * user.js - user related functions
 *
 * @type {User|exports|module.exports}
 */

var User = require('./models/user');
var bcrypt = require('bcryptjs');

var userApi = {

  /**
   * Handle an update request and and update information according to the request
   *
   * @param req
   * @param res
   * @param next
     */
  updateInformation : function (req, res, next) {

    // Set up needed variables
    var newPass = req.body.newpassword;
    var confirmPw = req.body.pwconfirm;
    req.app.locals.emailError = "";
    req.app.locals.updateInfoSuccess = "";
    req.app.locals.passwordError = "";

    // Check that the new pw and confirm pw fields match
    if (newPass !== confirmPw) {

      // PW's weren't a match
      req.app.locals.passwordError = "New password and Confirm PW fields didn't match";
      next();

    } else {

      // PW's matched
      if (newPass == '' && confirmPw == '') {

        // The user didn't input new password, e.g. both new pw and confirm were empty
        User.findOneAndUpdate(
          { email: req.user.email },
          { email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname
          },
          { runValidators: true, context: 'query' },
          function(err, updatedUser) {
            if (err) {
              req.app.locals.emailError = "The given e-mail is already taken";
              next();
            } else {
              req.app.locals.updateInfoSuccess = "Information updated successfully";
              req.session.reset();
              req.session.user = updatedUser;
              req.app.locals.user = updatedUser;
              next();
            }
          }
        );

      } else {

        // User wanted to change the password
        var hash = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10));

        User.findOneAndUpdate(
          { email: req.user.email },
          { email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: hash
          },
          { runValidators: true, context: 'query' },
          function(err, updatedUser) {
            if (err) {
              req.app.locals.emailError = "The given e-mail is already taken";
              next();
            } else {
              req.app.locals.updateInfoSuccess = "Information updated successfully";
              req.session.reset();
              req.session.user = updatedUser;
              req.app.locals.user = updatedUser;
              next();
            }
          }
        );
      }
    }
  }

};


module.exports = userApi;
