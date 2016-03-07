var sendgrid = require('sendgrid')('bldrmailer', 'salasana12');

var contact = {

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
      next();
    } else {
      console.log("Required fields found, sending mails");

      // Send a reply to the sender
      sendgrid.send({
        to:       to,
        from:     from,
        subject:  subject,
        text:     replyMessage + message
      }, function (err, result) {
        if (err) {
          req.app.locals.contactMessage = "Couldn't send your message. Please try again.";
          res.redirect('/contact');
        } else {
          req.app.locals.contactMessage = "Your message has been sent.";
        }
      });

      // Send e-mail to the administrator that a message has been sent from the system
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
          res.redirect('/contact');
        }
      });
    }

  }

};


module.exports = contact;
