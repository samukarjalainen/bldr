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
};
