/**
 * Festival Section — 축제 · 행사 Swiper
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var sliderEl = document.querySelector(".festival__slider");

  if (!sliderEl) {
    return;
  }

  var festivalSwiper = new Swiper(sliderEl, {
    speed: 600,
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".festival__pagination",
      clickable: true,
    },
  });

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      festivalSwiper.update();
    }, 150);
  });
})();
