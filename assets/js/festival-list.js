/**
 * Festival Page — 필터 + 페이지네이션 (Desktop/Tablet 4개, Mobile 1개)
 */
(function () {
  "use strict";

  var MOBILE_MQ = "(max-width: 47.9375rem)";
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

  var currentFilter = "all";
  var currentPage = 0;
  var animating = false;
  var touchStartX = 0;
  var touchStartY = 0;

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function perPage() {
    return isMobile() ? 1 : 4;
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
    return Math.max(1, Math.ceil(list.length / perPage()));
  }

  function setActiveFilter(status) {
    filters.forEach(function (btn) {
      var active = btn.getAttribute("data-filter") === status;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function equalizeHeights(visibleItems) {
    visibleItems.forEach(function (item) {
      var card = item.querySelector(".festival-event");
      if (card) {
        card.style.minHeight = "";
      }
    });

    if (isMobile() || visibleItems.length === 0) {
      return;
    }

    var max = 0;
    visibleItems.forEach(function (item) {
      var card = item.querySelector(".festival-event");
      if (card) {
        max = Math.max(max, card.offsetHeight);
      }
    });

    if (max > 0) {
      visibleItems.forEach(function (item) {
        var card = item.querySelector(".festival-event");
        if (card) {
          card.style.minHeight = max + "px";
        }
      });
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
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages - 1;
    }
  }

  function showPage(page, animate) {
    if (animating) {
      return;
    }

    var filtered = getFiltered();
    var total = pageCount(filtered);

    if (filtered.length === 0) {
      currentPage = 0;
      items.forEach(function (item) {
        item.classList.remove("is-visible", "is-animating-out");
      });
      if (emptyEl) {
        emptyEl.classList.add("is-visible");
      }
      renderPagination(0);
      updateNav(1);
      return;
    }

    if (emptyEl) {
      emptyEl.classList.remove("is-visible");
    }

    currentPage = Math.max(0, Math.min(page, total - 1));
    var start = currentPage * perPage();
    var end = start + perPage();
    var pageItems = filtered.slice(start, end);

    function applyVisible() {
      items.forEach(function (item) {
        item.classList.remove("is-visible", "is-animating-out");
      });

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
        equalizeHeights(pageItems);
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
    if (page === currentPage) {
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
    showPage(0, true);
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setFilter(btn.getAttribute("data-filter"));
    });
  });

  if (pagination) {
    pagination.addEventListener("click", function (event) {
      var dot = event.target.closest(".festival-page__dot");
      if (!dot) {
        return;
      }
      goToPage(Number(dot.getAttribute("data-page")));
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goToPage(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goToPage(currentPage + 1);
    });
  }

  if (viewport) {
    viewport.addEventListener(
      "touchstart",
      function (event) {
        if (!isMobile() || !event.changedTouches.length) {
          return;
        }
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchend",
      function (event) {
        if (!isMobile() || !event.changedTouches.length) {
          return;
        }
        var dx = event.changedTouches[0].clientX - touchStartX;
        var dy = event.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) {
          return;
        }
        if (dx < 0) {
          goToPage(currentPage + 1);
        } else {
          goToPage(currentPage - 1);
        }
      },
      { passive: true }
    );
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var total = pageCount(getFiltered());
      if (currentPage > total - 1) {
        currentPage = total - 1;
      }
      showPage(currentPage, false);
    }, 150);
  });

  setActiveFilter(currentFilter);
  showPage(0, false);
})();
