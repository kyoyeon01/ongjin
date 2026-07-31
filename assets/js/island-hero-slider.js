/**
 * Island Detail — Hero Swiper + Background Sync
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

  function syncHeroBackground(swiper) {
    if (slideSources.length === 0) {
      collectSlideSources();
    }

    var src = slideSources[swiper.realIndex];

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
      delay: 5000,
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
        syncHeroBackground(swiper);
      },
    },
  });

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      islandHeroSwiper.update();
    }, 150);
  });
})();
