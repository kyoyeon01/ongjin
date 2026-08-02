/**
 * Theme Travel Page — 테마 메뉴 / 패널 / 카드 슬라이더 / hash 연동
 */
(function () {
  "use strict";

  var PIN_SVG =
    '<svg class="theme-travel-card__place-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="2"/></svg>';

  var root = document.querySelector(".theme-travel");
  if (!root || !window.THEME_TRAVEL_DATA || !window.THEME_TRAVEL_ORDER) {
    return;
  }

  var order = window.THEME_TRAVEL_ORDER;
  var data = window.THEME_TRAVEL_DATA;
  var navEl = root.querySelector(".theme-travel__nav");
  var indicatorEl = root.querySelector(".theme-travel__indicator");
  var contentEl = root.querySelector(".theme-travel__content");
  var swipers = [];
  var activeId = order[0];

  function buildNav() {
    navEl.innerHTML = order
      .map(function (id, index) {
        var theme = data[id];
        return (
          '<li class="theme-travel__nav-item">' +
          '<button type="button" class="theme-travel__nav-btn' +
          (index === 0 ? " is-active" : "") +
          '" data-theme-id="' +
          id +
          '" aria-selected="' +
          (index === 0 ? "true" : "false") +
          '">' +
          '<span class="theme-travel__nav-icon" aria-hidden="true">' +
          '<img src="' +
          theme.icon +
          '" alt="" class="theme-travel__nav-icon-img" width="44" height="44" />' +
          "</span>" +
          '<span class="theme-travel__nav-label">' +
          theme.label +
          "</span>" +
          "</button>" +
          "</li>"
        );
      })
      .join("");
  }

  function buildCard(card, themeId, cardIndex) {
    var slides = (card.images || [])
      .map(function (src) {
        return (
          '<div class="swiper-slide">' +
          '<img class="theme-travel-card__img" src="' +
          src +
          '" alt="" loading="lazy" />' +
          "</div>"
        );
      })
      .join("");

    var places = (card.places || [])
      .map(function (place) {
        return (
          '<li class="theme-travel-card__place">' +
          PIN_SVG +
          "<div>" +
          '<p class="theme-travel-card__place-name">' +
          place.name +
          "</p>" +
          '<p class="theme-travel-card__place-desc">' +
          place.desc +
          "</p>" +
          "</div>" +
          "</li>"
        );
      })
      .join("");

    var theme = data[themeId];

    return (
      '<article class="theme-travel-card" data-theme-card="' +
      themeId +
      "-" +
      cardIndex +
      '">' +
      '<header class="theme-travel-card__header">' +
      '<h3 class="theme-travel-card__title">' +
      card.name +
      "</h3>" +
      '<p class="theme-travel-card__desc">' +
      card.desc +
      "</p>" +
      "</header>" +
      '<div class="theme-travel-card__body">' +
      '<div class="theme-travel-card__media">' +
      '<div class="swiper theme-travel-card__slider">' +
      '<div class="swiper-wrapper">' +
      slides +
      "</div>" +
      "</div>" +
      '<div class="theme-travel-card__pagination swiper-pagination"></div>' +
      "</div>" +
      '<div class="theme-travel-card__places">' +
      '<h4 class="theme-travel-card__places-title">' +
      theme.placesTitle +
      "</h4>" +
      '<ul class="theme-travel-card__place-list">' +
      places +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function buildPanels() {
    contentEl.innerHTML = order
      .map(function (id, index) {
        var theme = data[id];
        var cards = (theme.cards || [])
          .map(function (card, cardIndex) {
            return buildCard(card, id, cardIndex);
          })
          .join("");

        return (
          '<div class="theme-travel__panel' +
          (index === 0 ? " is-active" : "") +
          '" data-theme-panel="' +
          id +
          '" id="theme-panel-' +
          id +
          '">' +
          cards +
          "</div>"
        );
      })
      .join("");
  }

  function destroySwipers() {
    swipers.forEach(function (instance) {
      if (instance && instance.destroy) {
        instance.destroy(true, true);
      }
    });
    swipers = [];
  }

  function initSwipers(panel) {
    if (typeof Swiper === "undefined" || !panel) {
      return;
    }

    panel.querySelectorAll(".theme-travel-card__slider").forEach(function (el) {
      var pagination = el.parentElement.querySelector(
        ".theme-travel-card__pagination"
      );
      var instance = new Swiper(el, {
        slidesPerView: 1,
        speed: 400,
        grabCursor: true,
        pagination: {
          el: pagination,
          clickable: true,
        },
      });
      swipers.push(instance);
    });
  }

  function observeCards(panel) {
    var cards = panel.querySelectorAll(".theme-travel-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach(function (card, index) {
      card.style.transitionDelay = index * 80 + "ms";
      observer.observe(card);
    });
  }

  function updateIndicator() {
    var activeBtn = navEl.querySelector(".theme-travel__nav-btn.is-active");
    var track = root.querySelector(".theme-travel__nav-track");
    if (!activeBtn || !indicatorEl || !track) {
      return;
    }

    var trackRect = track.getBoundingClientRect();
    var btnRect = activeBtn.getBoundingClientRect();
    var left = btnRect.left - trackRect.left + track.scrollLeft;
    var width = btnRect.width;

    indicatorEl.style.width = width + "px";
    indicatorEl.style.transform = "translateX(" + left + "px)";
  }

  function setActive(themeId, updateHash) {
    if (!data[themeId]) {
      themeId = order[0];
    }

    activeId = themeId;

    navEl.querySelectorAll(".theme-travel__nav-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-theme-id") === themeId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    destroySwipers();

    contentEl.querySelectorAll(".theme-travel__panel").forEach(function (panel) {
      var active = panel.getAttribute("data-theme-panel") === themeId;
      panel.classList.toggle("is-active", active);

      if (active) {
        panel.querySelectorAll(".theme-travel-card").forEach(function (card) {
          card.classList.remove("is-visible");
        });
        initSwipers(panel);
        observeCards(panel);
      }
    });

    updateIndicator();

    if (updateHash) {
      if (history.replaceState) {
        history.replaceState(null, "", "#" + themeId);
      } else {
        window.location.hash = themeId;
      }
    }
  }

  function getHashTheme() {
    var hash = (window.location.hash || "").replace(/^#/, "");
    if (hash === "sea") {
      return "beach";
    }
    return data[hash] ? hash : null;
  }

  function bindEvents() {
    navEl.addEventListener("click", function (event) {
      var btn = event.target.closest(".theme-travel__nav-btn");
      if (!btn) {
        return;
      }
      setActive(btn.getAttribute("data-theme-id"), true);
    });

    window.addEventListener("resize", function () {
      updateIndicator();
    });

    var track = root.querySelector(".theme-travel__nav-track");
    if (track) {
      track.addEventListener("scroll", function () {
        updateIndicator();
      });
    }

    window.addEventListener("hashchange", function () {
      var hashTheme = getHashTheme();
      if (hashTheme && hashTheme !== activeId) {
        setActive(hashTheme, false);
      }
    });
  }

  buildNav();
  buildPanels();
  bindEvents();
  setActive(getHashTheme() || order[0], false);

  requestAnimationFrame(function () {
    updateIndicator();
  });
})();
