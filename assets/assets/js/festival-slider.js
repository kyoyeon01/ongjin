/**
 * Festival Section — 축제 · 행사 1장 슬라이드
 * 좌우 화살표 + 페이지네이션 + 무한 루프 연동
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var root = document.querySelector(".festival");
  if (!root) {
    return;
  }

  var sliderEl = root.querySelector(".festival__slider");
  var prevBtn = root.querySelector(".festival__nav--prev");
  var nextBtn = root.querySelector(".festival__nav--next");
  var paginationEl = root.querySelector(".festival__pagination");

  if (!sliderEl) {
    return;
  }

  var festivalSwiper = new Swiper(sliderEl, {
    speed: 500,
    loop: true,
    loopAdditionalSlides: 1,
    grabCursor: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    watchOverflow: false,
    allowTouchMove: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });

  function ensureEnabled(btn) {
    if (!btn) {
      return;
    }
    btn.disabled = false;
    btn.removeAttribute("disabled");
    btn.setAttribute("aria-disabled", "false");
    btn.classList.remove("swiper-button-disabled", "swiper-button-lock");
  }

  function goPrev(event) {
    event.preventDefault();
    festivalSwiper.slidePrev();
  }

  function goNext(event) {
    event.preventDefault();
    festivalSwiper.slideNext();
  }

  ensureEnabled(prevBtn);
  ensureEnabled(nextBtn);

  if (prevBtn) {
    prevBtn.addEventListener("click", goPrev);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", goNext);
  }

  festivalSwiper.on("slideChange", function () {
    ensureEnabled(prevBtn);
    ensureEnabled(nextBtn);
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      festivalSwiper.update();
      ensureEnabled(prevBtn);
      ensureEnabled(nextBtn);
    }, 150);
  });
})();
