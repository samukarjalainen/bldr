var program = {

  selectGoal : function (req, res) {
    console.log("selectGoal called");
    req.app.locals.selection = req.body.selection;
    //req.session.user = req.body.selection;
    console.log("selection: " + req.body.selection);
    res.redirect('/create-2');
  }

};

module.exports = program;
