/**
 * Island Detail — Hero Swiper + Background Sync
 *
 * PC (≥1280): 오른쪽 슬라이드 + 배경 동기화
 * Tablet/Mobile (<1280): 슬라이드 숨김, 동일 이미지로 배경 자동 페이드(5초)
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var sliderEl = document.querySelector(".island-hero__slider");
  var bgEl = document.querySelector(".island-hero__bg");

  if (!sliderEl || !bgEl) {
    return;
  }

  var bgLayers = bgEl.querySelectorAll(".island-hero__bg-layer");
  var activeLayerIndex = 0;
  var slideSources = [];
  var bgIndex = 0;
  var bgTimer = null;
  var BG_DELAY = 5000;
  var desktopMq = window.matchMedia("(min-width: 80rem)");

  function collectSlideSources() {
    slideSources = [];
    var slides = sliderEl.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    slides.forEach(function (slide) {
      var img = slide.querySelector(".island-hero__slide-img");

      if (!img) {
        return;
      }

      slideSources.push(
        slide.getAttribute("data-slide-src") ||
          img.getAttribute("src") ||
          img.currentSrc ||
          img.src ||
          ""
      );
    });

    slideSources = slideSources.filter(Boolean);
  }

  collectSlideSources();

  function setLayerImage(layer, src) {
    var img = layer.querySelector(".island-hero__bg-img");

    if (!img || !src) {
      return;
    }

    if (img.getAttribute("src") !== src) {
      img.setAttribute("src", src);
    }
  }

  function fadeToBackground(src) {
    if (!src || bgLayers.length < 2) {
      return;
    }

    var activeLayer = bgLayers[activeLayerIndex];
    var activeImg = activeLayer.querySelector(".island-hero__bg-img");
    var currentSrc = activeImg ? activeImg.getAttribute("src") : "";

    if (currentSrc === src && activeLayer.classList.contains("is-active")) {
      return;
    }

    var nextLayerIndex = activeLayerIndex === 0 ? 1 : 0;
    var nextLayer = bgLayers[nextLayerIndex];

    setLayerImage(nextLayer, src);
    nextLayer.classList.add("is-active");
    activeLayer.classList.remove("is-active");
    activeLayerIndex = nextLayerIndex;
  }

  function syncHeroBackground(swiper) {
    if (slideSources.length === 0) {
      collectSlideSources();
    }

    var src = slideSources[swiper.realIndex];

    if (!src) {
      return;
    }

    bgIndex = swiper.realIndex % slideSources.length;
    fadeToBackground(src);
  }

  function stopBgAutoplay() {
    if (bgTimer) {
      clearInterval(bgTimer);
      bgTimer = null;
    }
  }

  function startBgAutoplay() {
    stopBgAutoplay();

    if (slideSources.length === 0) {
      collectSlideSources();
    }

    if (slideSources.length === 0) {
      return;
    }

    fadeToBackground(slideSources[bgIndex % slideSources.length]);

    if (slideSources.length < 2) {
      return;
    }

    bgTimer = window.setInterval(function () {
      bgIndex = (bgIndex + 1) % slideSources.length;
      fadeToBackground(slideSources[bgIndex]);
    }, BG_DELAY);
  }

  var islandHeroSwiper = new Swiper(sliderEl, {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    grabCursor: true,
    loopAdditionalSlides: 1,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: BG_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".island-hero__pagination",
      clickable: true,
    },
    navigation: {
      prevEl: ".island-hero__nav--prev",
      nextEl: ".island-hero__nav--next",
    },
    on: {
      init: function (swiper) {
        syncHeroBackground(swiper);
      },
      slideChangeTransitionStart: function (swiper) {
        if (!desktopMq.matches) {
          return;
        }

        syncHeroBackground(swiper);
      },
    },
  });

  function applyViewportMode() {
    collectSlideSources();

    if (desktopMq.matches) {
      stopBgAutoplay();

      if (islandHeroSwiper.autoplay && islandHeroSwiper.autoplay.start) {
        islandHeroSwiper.autoplay.start();
      }

      syncHeroBackground(islandHeroSwiper);
      islandHeroSwiper.update();
      return;
    }

    if (islandHeroSwiper.autoplay && islandHeroSwiper.autoplay.stop) {
      islandHeroSwiper.autoplay.stop();
    }

    startBgAutoplay();
  }

  applyViewportMode();

  var resizeTimer;

  function onViewportChange() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyViewportMode, 150);
  }

  if (typeof desktopMq.addEventListener === "function") {
    desktopMq.addEventListener("change", onViewportChange);
  } else if (typeof desktopMq.addListener === "function") {
    desktopMq.addListener(onViewportChange);
  }

  window.addEventListener("resize", onViewportChange);
})();
