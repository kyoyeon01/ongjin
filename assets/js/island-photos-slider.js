/**
 * Island Detail — 추천 포토스팟 Swiper (Tablet/Mobile only)
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var sliderEl = document.querySelector(".island-photos__slider");

  if (!sliderEl) {
    return;
  }

  var photosSwiper = null;
  var DESKTOP_BREAKPOINT = 1280;

  function shouldEnableSwiper() {
    return window.innerWidth < DESKTOP_BREAKPOINT;
  }

  function destroySwiper() {
    if (!photosSwiper) {
      return;
    }

    photosSwiper.destroy(true, true);
    photosSwiper = null;
  }

  function createSwiper() {
    photosSwiper = new Swiper(sliderEl, {
      speed: 500,
      rewind: true,
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 20,
      grabCursor: true,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        768: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
      },
      navigation: {
        prevEl: ".island-photos__nav-btn--prev",
        nextEl: ".island-photos__nav-btn--next",
      },
      pagination: {
        el: ".island-photos__pagination",
        clickable: true,
      },
    });
  }

  function syncSwiper() {
    if (shouldEnableSwiper()) {
      if (!photosSwiper) {
        createSwiper();
      } else {
        photosSwiper.update();
      }
      return;
    }

    destroySwiper();
  }

  syncSwiper();

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncSwiper, 150);
  });
})();
