/**
 * Header — GSAP show / hide on scroll direction
 * Animates .header__inner only so .header__mobile-nav keeps true fixed positioning.
 */
(function () {
  "use strict";

  if (typeof gsap === "undefined") {
    return;
  }

  var header = document.querySelector(".header");
  var bar = header && header.querySelector(".header__inner");

  if (!header || !bar) {
    return;
  }

  var DURATION = 0.4;
  var EASE = "power2.out";
  var TOP_THRESHOLD = 8;
  var DELTA_THRESHOLD = 6;
  var lastScrollY = window.scrollY || window.pageYOffset || 0;
  var isHidden = false;
  var ticking = false;

  header.classList.add("header--fixed");
  gsap.set(bar, { yPercent: 0 });

  function showHeader() {
    if (!isHidden) {
      return;
    }

    isHidden = false;
    header.classList.remove("is-scroll-hidden");
    gsap.to(bar, {
      yPercent: 0,
      duration: DURATION,
      ease: EASE,
      overwrite: "auto",
    });
  }

  function hideHeader() {
    if (isHidden || header.classList.contains("is-open")) {
      return;
    }

    isHidden = true;
    header.classList.add("is-scroll-hidden");
    gsap.to(bar, {
      yPercent: -100,
      duration: DURATION,
      ease: EASE,
      overwrite: "auto",
    });
  }

  function updateHeader() {
    var currentY = window.scrollY || window.pageYOffset || 0;
    var delta = currentY - lastScrollY;

    if (header.classList.contains("is-open") || currentY <= TOP_THRESHOLD) {
      showHeader();
      lastScrollY = currentY;
      ticking = false;
      return;
    }

    if (Math.abs(delta) >= DELTA_THRESHOLD) {
      if (delta > 0) {
        hideHeader();
      } else {
        showHeader();
      }
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateHeader);
    },
    { passive: true }
  );
})();
