var User = require('./models/user');
var TAG = "user.js: ";

var userApi = {

  updateInformation : function (req, res, next) {

    // Set up needed variables
    req.app.locals.emailError = "";
    req.app.locals.updateInfoSuccess = "";
    req.app.locals.passwordError = "";
    req.app.locals.pwChangeSuccess = "";
    var emailFromSession = req.user.email;
    var emailFromRequest = req.body.email;
    var fNameFromRequest = req.body.firstname;
    var lNameFromRequest = req.body.lastname;
    var newEmailGivenAndValid = false;

    User.findOneAndUpdate(
      { email: req.user.email },
      { email: req.body.email,
        firstName: fNameFromRequest,
        lastName: lNameFromRequest
      },
      { runValidators: true, context: 'query' },
      function(err, updatedUser) {
        if (err) {
          req.app.locals.emailError = "The given e-mail is already taken";
          next();
        } else {
          req.app.locals.updateInfoSuccess = "Information updated succesfully";
          req.session.user = updatedUser;
          console.log(TAG + " " + updatedUser);
          next();
        }
      }
    );

    // Fetch the user from request
    //User.findOne( { email: req.user.email}, function (err, user) {
    //
    //  if (err) {
    //    console.log(TAG + "Error fetching user");
    //    console.log(err);
    //    res.json(err);
    //  } else {
    //    console.log(TAG + "No error finding the user from request");
    //  }
    //
    //  // If the email was changed, check that it isn already taken
    //  if (emailFromRequest !== emailFromSession) {
    //
    //    console.log(TAG + "Email from request was different than in session");
    //
    //    User.findOne( {email: emailFromRequest}, function (err, userFound) {
    //      if (err) {
    //        console.log(TAG + "Request email not found in db?");
    //        next();
    //      } else {
    //        if (userFound) {
    //          console.log(TAG + "User was found with that email");
    //          req.app.locals.emailError = "The given e-mail is already taken.";
    //          next();
    //        } else {
    //          console.log(TAG + "No user was found with that email");
    //          newEmailGivenAndValid = true;
    //        }
    //      }
    //    });
    //
    //  }
    //
    //  // Update the user information
    //
    //
    //
    //
    //});
  },

  changePassword : function (req, res, next) {
    console.log(req.body);
  }

};


module.exports = userApi;
