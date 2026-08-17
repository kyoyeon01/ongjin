/**
 * Festival Page — 필터 + 목록
 * Desktop (≥1024): 4개(2×2) 페이지네이션
 * Tablet·Mobile: Swiper 1장 보기
 * 상태 태그: data-start / data-end 기준 자동 판별
 */
(function () {
  "use strict";

  var DESKTOP_MQ = "(min-width: 64rem)";
  var STATUS_LABELS = {
    ongoing: "진행중",
    upcoming: "예정",
    ended: "종료",
  };

  var root = document.querySelector(".festival-page");
  if (!root) {
    return;
  }

  var filters = root.querySelectorAll(".festival-page__filter");
  var items = Array.prototype.slice.call(
    root.querySelectorAll(".festival-page__item")
  );
  var grid = root.querySelector(".festival-page__grid");
  var viewport = root.querySelector(".festival-page__viewport") || grid;
  var pagination = root.querySelector(".festival-page__pagination");
  var prevBtn = root.querySelector(".festival-page__nav--prev");
  var nextBtn = root.querySelector(".festival-page__nav--next");
  var emptyEl = root.querySelector(".festival-page__empty");
  var controlsEl = root.querySelector(".festival-page__controls");

  var currentFilter = "all";
  var currentPage = 0;
  var animating = false;
  var swiperInstance = null;
  var desktopMq = window.matchMedia(DESKTOP_MQ);

  function parseDate(value) {
    if (!value) {
      return null;
    }
    var parts = String(value).trim().split("-");
    if (parts.length !== 3) {
      return null;
    }
    var y = Number(parts[0]);
    var m = Number(parts[1]);
    var d = Number(parts[2]);
    if (!y || !m || !d) {
      return null;
    }
    return new Date(y, m - 1, d);
  }

  function startOfToday() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function resolveStatus(startDate, endDate, today) {
    if (!startDate || !endDate) {
      return "";
    }
    if (today < startDate) {
      return "upcoming";
    }
    if (today > endDate) {
      return "ended";
    }
    return "ongoing";
  }

  function ensureStatusBadge(media) {
    var badge = media.querySelector(".festival-event__status");
    if (badge) {
      return badge;
    }
    badge = document.createElement("span");
    badge.className = "festival-event__status";
    badge.setAttribute("aria-hidden", "true");
    media.insertBefore(badge, media.firstChild);
    return badge;
  }

  function applyEventStatuses() {
    var today = startOfToday();

    items.forEach(function (item) {
      var startDate = parseDate(item.getAttribute("data-start"));
      var endDate = parseDate(item.getAttribute("data-end")) || startDate;
      var status = resolveStatus(startDate, endDate, today);

      if (!status) {
        status = item.getAttribute("data-status") || "";
      }

      item.setAttribute("data-status", status);

      var media = item.querySelector(".festival-event__media");
      if (!media || !status) {
        return;
      }

      var badge = ensureStatusBadge(media);
      badge.textContent = STATUS_LABELS[status] || status;
      badge.setAttribute("data-state", status);
      badge.classList.add("is-visible");
    });
  }

  function isDesktop() {
    return desktopMq.matches;
  }

  function matches(item, status) {
    if (status === "all") {
      return true;
    }
    return item.getAttribute("data-status") === status;
  }

  function getFiltered() {
    return items.filter(function (item) {
      return matches(item, currentFilter);
    });
  }

  function pageCount(list) {
    return Math.max(1, Math.ceil(list.length / 4));
  }

  function setActiveFilter(status) {
    filters.forEach(function (btn) {
      var active = btn.getAttribute("data-filter") === status;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setControlsVisible(visible) {
    if (controlsEl) {
      controlsEl.hidden = !visible;
    }
  }

  function clearItemState() {
    items.forEach(function (item) {
      item.classList.remove("is-visible", "is-animating-out", "swiper-slide");
      item.style.animationDelay = "";
      item.style.width = "";
      item.style.marginRight = "";
      item.style.minHeight = "";
    });
  }

  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    if (viewport) {
      viewport.classList.remove("swiper");
    }
    if (grid) {
      grid.classList.remove("swiper-wrapper");
    }

    items.forEach(function (item) {
      item.classList.remove("swiper-slide");
      item.style.width = "";
      item.style.marginRight = "";
    });
  }

  function createSwiper(initialIndex) {
    if (!viewport || !grid || typeof Swiper === "undefined") {
      return;
    }

    viewport.classList.add("swiper");
    grid.classList.add("swiper-wrapper");

    items.forEach(function (item) {
      if (item.classList.contains("is-visible")) {
        item.classList.add("swiper-slide");
      } else {
        item.classList.remove("swiper-slide");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = false;
      prevBtn.classList.remove("swiper-button-disabled");
    }
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.remove("swiper-button-disabled");
    }

    swiperInstance = new Swiper(viewport, {
      speed: 450,
      slidesPerView: 1,
      spaceBetween: 16,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      grabCursor: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
        disabledClass: "swiper-button-disabled",
      },
      pagination: {
        el: pagination,
        clickable: true,
        bulletClass: "festival-page__dot",
        bulletActiveClass: "is-active",
      },
      breakpoints: {
        768: {
          spaceBetween: 24,
        },
      },
    });

    if (initialIndex > 0) {
      swiperInstance.slideTo(initialIndex, 0);
    }
  }

  function renderPagination(totalPages) {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";

    if (getFiltered().length === 0) {
      pagination.hidden = true;
      return;
    }

    pagination.hidden = false;

    for (var i = 0; i < totalPages; i += 1) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "festival-page__dot" + (i === currentPage ? " is-active" : "");
      btn.setAttribute("aria-label", i + 1 + "페이지");
      btn.setAttribute("aria-current", i === currentPage ? "true" : "false");
      btn.setAttribute("data-page", String(i));
      li.appendChild(btn);
      pagination.appendChild(li);
    }
  }

  function updateNav(totalPages) {
    if (prevBtn) {
      prevBtn.disabled = currentPage <= 0;
      prevBtn.classList.toggle("swiper-button-disabled", currentPage <= 0);
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages - 1;
      nextBtn.classList.toggle(
        "swiper-button-disabled",
        currentPage >= totalPages - 1
      );
    }
  }

  function showEmpty() {
    destroySwiper();
    clearItemState();
    currentPage = 0;
    if (emptyEl) {
      emptyEl.classList.add("is-visible");
    }
    setControlsVisible(false);
    if (pagination) {
      pagination.hidden = true;
      pagination.innerHTML = "";
    }
  }

  function renderSwiper(keepIndex) {
    var filtered = getFiltered();

    if (filtered.length === 0) {
      showEmpty();
      return;
    }

    if (emptyEl) {
      emptyEl.classList.remove("is-visible");
    }

    var slideIndex = 0;
    if (keepIndex && swiperInstance) {
      slideIndex = swiperInstance.activeIndex || 0;
    } else {
      slideIndex = Math.min(currentPage * 4, filtered.length - 1);
    }
    slideIndex = Math.max(0, Math.min(slideIndex, filtered.length - 1));

    destroySwiper();
    clearItemState();

    filtered.forEach(function (item) {
      item.classList.add("is-visible");
    });

    setControlsVisible(true);
    if (pagination) {
      pagination.hidden = false;
    }

    createSwiper(slideIndex);
    animating = false;
  }

  function showPage(page, animate) {
    if (animating) {
      return;
    }

    if (!isDesktop()) {
      renderSwiper(false);
      return;
    }

    destroySwiper();

    var filtered = getFiltered();
    var total = pageCount(filtered);

    if (filtered.length === 0) {
      showEmpty();
      animating = false;
      return;
    }

    if (emptyEl) {
      emptyEl.classList.remove("is-visible");
    }

    setControlsVisible(true);
    currentPage = Math.max(0, Math.min(page, total - 1));
    var start = currentPage * 4;
    var pageItems = filtered.slice(start, start + 4);

    function applyVisible() {
      clearItemState();

      pageItems.forEach(function (item, index) {
        item.classList.add("is-visible");
        if (animate) {
          item.style.animationDelay = index * 45 + "ms";
        } else {
          item.style.animationDelay = "0ms";
        }
      });

      renderPagination(total);
      updateNav(total);

      requestAnimationFrame(function () {
        window.setTimeout(function () {
          pageItems.forEach(function (item) {
            item.style.animationDelay = "";
          });
          animating = false;
        }, animate ? 380 : 0);
      });
    }

    if (!animate) {
      applyVisible();
      return;
    }

    animating = true;
    var currentlyVisible = items.filter(function (item) {
      return item.classList.contains("is-visible");
    });

    if (currentlyVisible.length === 0) {
      applyVisible();
      return;
    }

    currentlyVisible.forEach(function (item) {
      item.classList.add("is-animating-out");
      item.classList.remove("is-visible");
    });

    window.setTimeout(function () {
      currentlyVisible.forEach(function (item) {
        item.classList.remove("is-animating-out");
      });
      applyVisible();
    }, 180);
  }

  function goToPage(page) {
    if (!isDesktop() || page === currentPage) {
      return;
    }
    showPage(page, true);
  }

  function setFilter(status) {
    if (status === currentFilter && !animating) {
      return;
    }
    currentFilter = status;
    setActiveFilter(status);
    currentPage = 0;
    showPage(0, isDesktop());
  }

  function syncLayout() {
    if (isDesktop()) {
      var total = pageCount(getFiltered());
      if (currentPage > total - 1) {
        currentPage = Math.max(0, total - 1);
      }
      showPage(currentPage, false);
      return;
    }

    renderSwiper(true);
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setFilter(btn.getAttribute("data-filter"));
    });
  });

  if (pagination) {
    pagination.addEventListener("click", function (event) {
      if (!isDesktop()) {
        return;
      }
      var dot = event.target.closest(".festival-page__dot");
      if (!dot) {
        return;
      }
      goToPage(Number(dot.getAttribute("data-page")));
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (!isDesktop()) {
        return;
      }
      goToPage(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (!isDesktop()) {
        return;
      }
      goToPage(currentPage + 1);
    });
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncLayout, 150);
  });

  if (typeof desktopMq.addEventListener === "function") {
    desktopMq.addEventListener("change", syncLayout);
  } else if (typeof desktopMq.addListener === "function") {
    desktopMq.addListener(syncLayout);
  }

  applyEventStatuses();
  setActiveFilter(currentFilter);
  showPage(0, false);
})();
