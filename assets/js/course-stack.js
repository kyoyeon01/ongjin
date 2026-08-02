/**
 * Course Stack Carousel — 2장씩 노출 (day-trip / overnight 공용)
 * Swiper: slidesPerView 2 / slidesPerGroup 2 / no loop
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  /**
   * Placeholder — overridden by course-modal.js
   * @param {number|string} courseId
   */
  window.openCourseModal =
    window.openCourseModal ||
    function openCourseModal(courseId) {
      if (typeof console !== "undefined" && console.debug) {
        console.debug("[course-stack] openCourseModal:", courseId);
      }
    };

  function initStack(root) {
    var sliderEl = root.querySelector(".course-stack__slider");
    var prevBtn = root.querySelector(".course-stack__nav--prev");
    var nextBtn = root.querySelector(".course-stack__nav--next");
    var paginationEl = root.querySelector(".course-stack__pagination");

    if (!sliderEl) {
      return;
    }

    var swiper = new Swiper(sliderEl, {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 24,
      speed: 450,
      watchOverflow: true,
      resistanceRatio: 0.65,
      grabCursor: true,
      allowTouchMove: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
        disabledClass: "swiper-button-disabled",
      },
      pagination: {
        el: paginationEl,
        clickable: true,
        bulletClass: "course-stack__dot",
        bulletActiveClass: "is-active",
      },
      breakpoints: {
        0: {
          spaceBetween: 12,
        },
        768: {
          spaceBetween: 20,
        },
        1024: {
          spaceBetween: 24,
        },
      },
    });

    root.querySelectorAll(".course-stack-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-course-id");
        var indexAttr = card.getAttribute("data-index");
        var index = indexAttr !== null ? Number(indexAttr) : -1;

        if (typeof window.openCourseModal === "function") {
          window.openCourseModal(id || index);
        }
      });
    });

    return swiper;
  }

  function initAll() {
    document.querySelectorAll(".course-stack").forEach(function (section) {
      initStack(section);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
