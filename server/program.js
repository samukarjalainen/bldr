/**
 * program.js - exercise program related functions
 *
 * @type {Exercise|exports|module.exports}
 */

var Exercise = require('./models/exercise');
var Program = require('./models/program');

var program = {

  /**
   * Get the user's goal from request and set it into a local variable.
   * In case of error redirect to create page and pass the error along.
   *
   * @param req
   * @param res
     */
  selectGoal : function (req, res) {
    if (req.body.selection) {
      req.app.locals.selection = req.body.selection;
      res.redirect('/create-2');
    } else {
      res.redirect('/create', { error: "Could not find selection." });
    }

  },

  /**
   * Fetch the exercises from db and set in a local variable
   * In case of error, throw it
   *
   * @param req
   * @param res
   * @param next
     */
  getExercises : function (req, res, next) {
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

  /**
   * Handle a create program request. Parse data from the request and save the program into db
   *
   * @param req
   * @param res
   * @param next
     */
  createProgram : function (req, res, next) {
    console.log("createProgram called");
    var sets, reps, rest;

    // Set the amount of sets and reps, and resting time according to the user's selection
    if (req.body.goal === 'muscle') {
      sets = "3-4";
      reps = "8-12";
      rest = "90s";
    } else if (req.body.goal === 'strength') {
      sets = "4-5";
      reps = "4-6";
      rest = "120s";
    } else if (req.body.goal === 'weight loss') {
      sets = "3-5";
      reps = "8-15";
      rest = "60s";
    } else {
      res.status(400);
      res.json({ error: "Bad request. Program goal not found." });
    }

    // Create new program
    var program = new Program({
      legs: req.body.legs,
      back: req.body.back,
      chest: req.body.chest,
      shoulders: req.body.shoulders,
      core: req.body.core,
      _user: req.session.user.email,
      goal: req.body.goal,
      sets: sets,
      reps: reps,
      rest: rest
    });

    // Save the program into db
    program.save(function (err, program) {
      if (err) {
        return console.log(err);
      } else {
        req.app.locals.program = program;
        next();
      }
    });
  },

  /**
   * Get the currently logged in user's programs from the database and set them into a local variable.
   * In case of error, send error message.
   *
   * @param req
   * @param res
   * @param next
     */
  getCurrentUserPrograms : function (req, res, next) {
    Program.find({ _user: req.session.user.email }, function (err, programs) {
      if (err) {
        res.render('programs', { title: 'Programs', error: "Couldn't get programs." });
      } else {
        // Check if the user has programs
        if (!programs.length) {
          // User doesn't have any programs
          req.app.locals.hasPrograms = 'false';
          next();
        } else {
          // User has programs
          req.app.locals.hasPrograms = 'true';
          req.app.locals.allprograms = programs;
          next();
        }
      }
    })
  },

  /**
   * Delete a program from the db by it's id
   *
   * @param req
   * @param res
     */
  deleteProgram : function (req, res) {
    Program.remove({ _id: req.params.id }, function (err, removed) {
      if (err) {
        console.log(err);
        res.redirect('/programs');
      } else {
        res.redirect('/programs');
      }
    });
  },

  /**
   * Utility function to populate exercise data into the database
   *
   * @param req
   * @param res
     */
  createData : function (req, res, next) {

    // Populate data into an array
    var data =
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
    ];

    // Loop through data and update it. If the entry doesn't exist, create one.
    data.forEach(function (item) {
      Exercise.findOneAndUpdate(
        { type: item.title },
        item, {
          upsert: true,
          'new': true
        },
        function (err, result) {
          if (err) {
            console.log("Err");
            console.log(err);
          } else {
            console.log("Success");
            console.log(result);
          }
        }
      )
    });

    next();
  }

};

module.exports = program;
