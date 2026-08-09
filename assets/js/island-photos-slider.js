/**
 * Island Detail — 추천 포토스팟 Swiper (Tablet/Mobile only)
 * slidesPerView: auto + min-width Peek, 페이지 단위 2장 이동
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
  var controlsEl = null;

  function shouldEnableSwiper() {
    return window.innerWidth < DESKTOP_BREAKPOINT;
  }

  function ensureControls() {
    var wrap = document.querySelector(".island-photos__slider-wrap");
    var nav = document.querySelector(".island-photos__nav");
    var pagination = document.querySelector(".island-photos__pagination");
    var prevBtn = document.querySelector(".island-photos__nav-btn--prev");
    var nextBtn = document.querySelector(".island-photos__nav-btn--next");

    if (!wrap || !pagination || !prevBtn || !nextBtn) {
      return;
    }

    if (controlsEl && wrap.contains(controlsEl)) {
      return;
    }

    controlsEl = document.createElement("div");
    controlsEl.className = "island-photos__controls";
    controlsEl.appendChild(prevBtn);
    controlsEl.appendChild(pagination);
    controlsEl.appendChild(nextBtn);
    wrap.appendChild(controlsEl);

    if (nav && nav.children.length === 0) {
      nav.remove();
    }
  }

  function destroySwiper() {
    if (!photosSwiper) {
      return;
    }

    photosSwiper.destroy(true, true);
    photosSwiper = null;
  }

  function createSwiper() {
    ensureControls();

    photosSwiper = new Swiper(sliderEl, {
      speed: 500,
      rewind: false,
      slidesPerView: "auto",
      slidesPerGroup: 2,
      spaceBetween: 16,
      grabCursor: true,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        768: {
          slidesPerView: "auto",
          slidesPerGroup: 2,
          spaceBetween: 24,
        },
      },
      navigation: {
        prevEl: ".island-photos__nav-btn--prev",
        nextEl: ".island-photos__nav-btn--next",
        disabledClass: "swiper-button-disabled",
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
