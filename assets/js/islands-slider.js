/**
 * Islands Section — Swiper slider
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var sliderEl = document.querySelector(".islands__slider");

  if (!sliderEl) {
    return;
  }

  var islandsSwiper = new Swiper(sliderEl, {
    speed: 500,
    rewind: true,
    grabCursor: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 15,
    watchOverflow: true,
    pagination: {
      el: ".islands__pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".islands__nav-btn--prev",
      nextEl: ".islands__nav-btn--next",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 36,
      },
    },
  });

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      islandsSwiper.update();
    }, 150);
  });
})();
