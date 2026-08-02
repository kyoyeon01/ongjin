/**
 * Common — Header / Footer interactions
 */
(function ($) {
  "use strict";

  var $header = $(".header");
  var $menuBtn = $(".header__menu-btn");
  var $mobileNav = $(".header__mobile-nav");
  var $mobileToggleItems = $(".header__mobile-nav-item--has-sub");
  var $overlay = $(".header__overlay");

  // Keep panel/overlay outside .header so fixed positioning is viewport-relative
  // (header backdrop-filter/transform would otherwise clip the menu to the bar height).
  if ($mobileNav.length) {
    $mobileNav.appendTo(document.body);
  }

  if (!$overlay.length) {
    $overlay = $('<div class="header__overlay" aria-hidden="true"></div>');
  }
  $overlay.appendTo(document.body);

  function closeMobileNav() {
    $header.removeClass("is-open");
    $menuBtn.attr({
      "aria-expanded": "false",
      "aria-label": "메뉴 열기",
    });
    $mobileNav.removeClass("is-open").attr("aria-hidden", "true");
    $overlay.removeClass("is-open").attr("aria-hidden", "true");
    $mobileToggleItems.removeClass("is-open");
    $mobileToggleItems
      .find(".header__mobile-nav-link--toggle")
      .attr("aria-expanded", "false");
    $("body").removeClass("is-nav-open");
  }

  function openMobileNav() {
    $header.addClass("is-open");
    $header.removeClass("is-scroll-hidden");
    $menuBtn.attr({
      "aria-expanded": "true",
      "aria-label": "메뉴 닫기",
    });
    $mobileNav.addClass("is-open").attr("aria-hidden", "false");
    $overlay.addClass("is-open").attr("aria-hidden", "false");
    $("body").addClass("is-nav-open");
  }

  $menuBtn.on("click", function (event) {
    event.stopPropagation();

    if ($header.hasClass("is-open")) {
      closeMobileNav();
      return;
    }

    openMobileNav();
  });

  $overlay.on("click", function () {
    closeMobileNav();
  });

  $mobileToggleItems.each(function () {
    var $item = $(this);
    var $toggle = $item.find(".header__mobile-nav-link--toggle");

    $toggle.on("click", function (event) {
      event.preventDefault();

      var isOpen = $item.hasClass("is-open");

      $mobileToggleItems.not($item).removeClass("is-open");
      $mobileToggleItems
        .not($item)
        .find(".header__mobile-nav-link--toggle")
        .attr("aria-expanded", "false");
      $item.toggleClass("is-open", !isOpen);
      $toggle.attr("aria-expanded", String(!isOpen));
    });
  });

  $mobileNav.on("click", "a", function () {
    closeMobileNav();
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
