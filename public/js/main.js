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
