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

  getExercises : function (req, res, next) {
    console.log("getExercises called");
    Exercise.find({}, function (err, exercises) {
      if (!err) {
        req.app.locals.exercises = exercises;
        next();
      } else {
        console.log("Error fetching exercises");
        throw err;
      }
    });
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
          "type": "legs",
          "title": "Leg press",
          "description": "Brace your lower back firmly against the seat and push the weights until your legs are almost straight."
        },
        {
          "type": "legs",
          "title": "Leg extension",
          "description": "Straighten your legs while seated firmly on the seat."
        },
        {
          "type": "back",
          "title": "Barbell row",
          "description": "Pull the bar towards your lower abdomen in a slight forward-leaning posture and bent knees."
        },
        {
          "type": "back",
          "title": "Pull up",
          "description": "Grab the bar and pull yourself up until your chin is over the bar. Lower back until your arms are almost straight"
        },
        {
          "type": "back",
          "title": "Cable pulldown",
          "description": "Grab the handle and pull it towards your upper chest until it is on your chin level."
        },
        {
          "type": "chest",
          "title": "Bench press",
          "description": "Lower the bar until it slightly touches your chest just below nipples. Push the bar back up."
        },
        {
          "type": "chest",
          "title": "Chest press",
          "description": "Push the handles away from yourself until your arms are straight. Return back to starting position."
        },
        {
          "type": "chest",
          "title": "Dumbbell fly",
          "description": "Lie on your back with arms to your sides slightly bent. Bring the dumbbells towards eachother atop your chest."
        },
        {
          "type": "shoulders",
          "title": "Military press",
          "description": "Hold the bar in front of you while standing still and push it above your head."
        },
        {
          "type": "shoulders",
          "title": "Shoulder fly",
          "description": "Hold dumbbells in your hands and and keep them at your side. Extend arms to your sides until hands are parallel with shoulders."
        },
        {
          "type": "shoulders",
          "title": "Seated shoulder press",
          "description": "Hold dumbbells in your hands beside your ears. Press the weights upwards until arms are almost straight. Return to starting position."
        },
        {
          "type": "core",
          "title": "Ab wheel",
          "description": "Start from kneeling position and roll the wheel away until your upper body almost touches the ground. Roll back to starting position."
        },
        {
          "type": "core",
          "title": "Crunch",
          "description": "Lie on your back with legs somewhat bent. Perform a crunching move with your abdomen so that your upper body lifts up from the floor buw lower back stays against the floor."
        },
        {
          "type": "core",
          "title": "Sit-up",
          "description": "Lie down and lock your feet against something. Lift yourself up into a sitting position and finally move back to starting position."
        }
      ]
    ).then(function () {
      console.log("data inserted");
      res.redirect('/');
    });
  }

};

module.exports = program;
