/**
 * contact.js - contact page related functions
 */

var sendgrid = require('sendgrid')(process.env.MAIL_KEY, process.env.MAIL_PW);
var TAG = "contact.js: ";

var contact = {

  /**
   * Parses the contact request and sends a reply to the user specified address as well as to the specified admin
   * in case of success. In case of error, print out error.
   *
   * @param req
   * @param res
   * @param next
     */
  sendContactMessage : function (req, res, next) {

    console.log(req.body);

    var admin = 'karjalainensamu@gmail.com';
    var to = req.body.email;
    var from = 'noreply@bldr.com';
    var subject = req.body.subject;
    var message = req.body.message;
    var replyMessage = 'Thank you for contacting us. We will get back to you as soon as possible. Below is a copy of the message you sent.\n\n\n';
    var adminMessage = 'New contact request from bldr.\n\n\n';


    // Make sure that the required fields exist
    if (!(to && subject && message)) {
      req.app.locals.contactMessage = "Couldn't send your message. Please try again.";
      console.log(TAG + "no to, subject or message");
      next();
    } else {
      console.log("Required fields found, sending mails");


      // Send a reply to the sender
      // The callback hell is real
      sendgrid.send({
        to: to,
        from: from,
        subject: subject,
        text: replyMessage + message
      }, function (err, result) {
        if (err) {
          req.app.locals.contactMessage = "Couldn't send your message. Please try again.";
          console.log(TAG + "error in sending the mail");
          console.log(err);
          res.redirect('/contact');
        } else {
          req.app.locals.contactMessage = "Your message has been sent.";
          console.log(result);
          console.log("1st mail sent, sending 2nd");
          sendgrid.send({
            to:       admin,
            from:     from,
            subject:  subject,
            text:     adminMessage + message
          }, function (err, result) {
            if (err) {
              req.app.locals.contactMessage = "Couldn't send your message. Please try again.";
              res.redirect('/contact');
            } else {
              req.app.locals.contactMessage = "Your message has been sent.";
              console.log(result);
              res.redirect('/contact');
            }
          });
        }
      });
    }
  }

};


module.exports = contact;
