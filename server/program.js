var Exercise = require('./models/exercise');

var program = {

  selectGoal : function (req, res) {
    console.log("selectGoal called");

    // Get the exercises from DB
    var exercises = Exercise.find({});
    console.log(exercises);

    req.app.locals.selection = req.body.selection;
    console.log("selection: " + req.body.selection);
    res.redirect('/create-2');
  },

  createData : function (req, res) {
    Exercise.collection.insertMany(
      [
        {
          "type": "legs",
          "title": "Squat",
          "description": "Squat all the way down with a bar lying on your upper back."
        },
        {
          "type": "back",
          "title": "Barbell row",
          "description": "Pull the bar towards your lower abdomen in a slight forward-leaning posture and bent knees."
        },
        {
          "type": "chest",
          "title": "Bench press",
          "description": "Lower the bar until it slightly touches your chest just below nipples. Push the bar back up."
        },
        {
          "type": "shoulders",
          "title": "Military press",
          "description": "Hold the bar in front of you while standing still and push it above your head."
        },
        {
          "type": "core",
          "title": "Ab wheel",
          "description": "Start from kneeling position and roll the wheel away until your upper body almost touches the ground. Roll back to starting position."
        }
      ]
    ).then(function () {
      console.log("data inserted");
      res.redirect('/');
    });
  }

};

module.exports = program;
