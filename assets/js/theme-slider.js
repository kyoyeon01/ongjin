/**
 * Theme Section — Swiper slider
 * Mobile/Tablet: auto + min-width Peek (2장 페이지)
 * Desktop: 기존 다열 레이아웃 유지
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
    slidesPerView: "auto",
    slidesPerGroup: 2,
    spaceBetween: 16,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".theme__pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".theme__nav-btn--prev",
      nextEl: ".theme__nav-btn--next",
      disabledClass: "swiper-button-disabled",
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
      },
    },
  });

  function refreshThemeSwiper() {
    if (themeSwiper && themeSwiper.update) {
      themeSwiper.update();
    }
  }

  window.addEventListener("load", refreshThemeSwiper);
  window.addEventListener("pageshow", refreshThemeSwiper);

  requestAnimationFrame(function () {
    requestAnimationFrame(refreshThemeSwiper);
  });

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      themeSwiper.update();
    }, 150);
  });
})();
