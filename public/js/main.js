//var selection = "";
//document.program = {
//  "legs": {
//    "movement": "Squat",
//    "sets": "3-4",
//    "reps": "8-10"
//  },
//  "back": {
//    "movement": "Barbell row",
//    "sets": "3-4",
//    "reps": "8-12"
//  },
//  "chest": {
//    "movement": "Bench press",
//    "sets": "3-4",
//    "reps": "8-12"
//  },
//  "shoulders": {
//    "movement": "Military press",
//    "sets": "3-4",
//    "reps": "8-12"
//  },
//  "core": {
//    "movement": "Ab wheel",
//    "sets": "2-3",
//    "reps": "5-15"
//  }
//};

$(document).ready(function() {

  clientCarousel();

});

/* Handle the display of client testimonials */
function clientCarousel() {
  $("#clients").owlCarousel({
    navigation: true,
    navigationText: ["&#10094;","&#10095;"],
    pagination: true,
    slideSpeed: 300,
    paginationSpeed: 400,
    items : 1,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false,
    autoPlay: 7000,
    stopOnHover: true
  });
}

function checkAndPostExercises() {
  var elements = document.getElementsByClassName('btn dropdown-toggle btn-default');
  for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].title);
  }
}

function postSelection(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
