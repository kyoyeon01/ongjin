/**
 * Main Page
 */
(function ($) {
  "use strict";

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });
  }

  $('a[href="#about"]').on("click", function (event) {
    var $target = $("#about");

    if (!$target.length) {
      return;
    }

    event.preventDefault();
    $("html, body").animate({ scrollTop: $target.offset().top }, 600);
  });
})(jQuery);
