/**
 * Islands Section — Swiper slider
 * Mobile/Tablet: auto + min-width Peek (2장 페이지)
 * Desktop: 기존 다열 레이아웃 유지
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
    rewind: false,
    grabCursor: true,
    slidesPerView: "auto",
    slidesPerGroup: 2,
    spaceBetween: 16,
    watchOverflow: true,
    pagination: {
      el: ".islands__pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".islands__nav-btn--prev",
      nextEl: ".islands__nav-btn--next",
      disabledClass: "swiper-button-disabled",
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        slidesPerGroup: 2,
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
