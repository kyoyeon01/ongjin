/**
 * Theme Section — Swiper slider
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var sliderEl = document.querySelector(".theme__slider");

  if (!sliderEl) {
    return;
  }

  var themeSwiper = new Swiper(sliderEl, {
    speed: 500,
    grabCursor: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 15,
    watchOverflow: true,
    pagination: {
      el: ".theme__pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".theme__nav-btn--prev",
      nextEl: ".theme__nav-btn--next",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
      },
    },
  });

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      themeSwiper.update();
    }, 150);
  });
})();
