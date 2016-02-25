var selection = "";
document.program = {
  "legs": {
    "movement": "Squat",
    "sets": "3-4",
    "reps": "8-10"
  },
  "back": {
    "movement": "Barbell row",
    "sets": "3-4",
    "reps": "8-12"
  },
  "chest": {
    "movement": "Bench press",
    "sets": "3-4",
    "reps": "8-12"
  },
  "shoulders": {
    "movement": "Military press",
    "sets": "3-4",
    "reps": "8-12"
  },
  "core": {
    "movement": "Ab wheel",
    "sets": "2-3",
    "reps": "5-15"
  }
};

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
