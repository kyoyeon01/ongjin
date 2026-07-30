/**
 * Common — Header / Footer interactions
 */
(function ($) {
  "use strict";

  var $header = $(".header");
  var $menuBtn = $(".header__menu-btn");
  var $mobileNav = $(".header__mobile-nav");
  var $mobileToggleItems = $(".header__mobile-nav-item--has-sub");

  function closeMobileNav() {
    $header.removeClass("is-open");
    $menuBtn.attr("aria-expanded", "false");
    $mobileNav.removeClass("is-open").attr("aria-hidden", "true");
    $mobileToggleItems.removeClass("is-open");
    $("body").removeClass("is-nav-open");
  }

  function openMobileNav() {
    $header.addClass("is-open");
    $menuBtn.attr("aria-expanded", "true");
    $mobileNav.addClass("is-open").attr("aria-hidden", "false");
    $("body").addClass("is-nav-open");
  }

  $menuBtn.on("click", function () {
    if ($header.hasClass("is-open")) {
      closeMobileNav();
      return;
    }

    openMobileNav();
  });

  $mobileToggleItems.each(function () {
    var $item = $(this);
    var $toggle = $item.find(".header__mobile-nav-link--toggle");

    $toggle.on("click", function (event) {
      event.preventDefault();

      var isOpen = $item.hasClass("is-open");

      $mobileToggleItems.not($item).removeClass("is-open");
      $item.toggleClass("is-open", !isOpen);
      $toggle.attr("aria-expanded", String(!isOpen));
    });
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && $header.hasClass("is-open")) {
      closeMobileNav();
      $menuBtn.trigger("focus");
    }
  });

  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 75rem)").matches) {
      closeMobileNav();
    }
  });
})(jQuery);
