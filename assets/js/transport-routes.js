/**
 * Transport Routes — 노선 선택 / 시간표 / 선착장 렌더링
 */
(function () {
  "use strict";

  var PIN_SVG =
    '<svg class="transport-terminal__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="2"/></svg>';
  var PHONE_SVG =
    '<svg class="transport-terminal__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var PARK_SVG =
    '<svg class="transport-terminal__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M9 7.5h6v3.2c0 1.66-1.34 3-3 3s-3-1.34-3-3V7.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  var root = document.querySelector(".transport-routes");
  if (!root || !window.TRANSPORT_ROUTES || !window.TRANSPORT_ROUTES.length) {
    return;
  }

  var routes = window.TRANSPORT_ROUTES;
  var track = root.querySelector(".transport-routes__nav-track");
  var prevBtn = root.querySelector(".transport-routes__nav-btn--prev");
  var nextBtn = root.querySelector(".transport-routes__nav-btn--next");
  var scheduleTitle = root.querySelector("[data-schedule-title]");
  var terminalTitle = root.querySelector("[data-terminal-title]");
  var board = root.querySelector(".transport-routes__board");
  var terminalsEl = root.querySelector(".transport-routes__terminals");
  var activeId = routes[0].id;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function findRoute(id) {
    for (var i = 0; i < routes.length; i += 1) {
      if (routes[i].id === id) {
        return routes[i];
      }
    }
    return routes[0];
  }

  function buildNav() {
    track.innerHTML = routes
      .map(function (route, index) {
        return (
          '<button type="button" class="transport-routes__route-btn' +
          (index === 0 ? " is-active" : "") +
          '" data-route-id="' +
          escapeHtml(route.id) +
          '" aria-pressed="' +
          (index === 0 ? "true" : "false") +
          '">' +
          escapeHtml(route.label) +
          "</button>"
        );
      })
      .join("");
  }

  function buildPanel(side, route) {
    var panel = side === "outbound" ? route.outbound : route.inbound;
    var title;

    if (route.type === "bridge") {
      title = panel.title;
    } else {
      title =
        side === "outbound"
          ? "인천 → " + route.islandShort
          : route.islandShort + " → 인천";

      if (route.id === "sinsimodo") {
        title =
          side === "outbound"
            ? "삼목 → " + route.islandShort
            : route.islandShort + " → 삼목";
      }
    }

    var headCols;
    if (route.type === "bridge") {
      headCols =
        "<th>구분</th><th>내용</th><th>안내</th><th>비고</th>";
    } else {
      headCols =
        "<th>" +
        escapeHtml(panel.fromLabel) +
        "</th><th>" +
        escapeHtml(panel.toLabel) +
        "</th><th>소요시간</th><th>선박명</th>";
    }

    var rows = (panel.rows || [])
      .map(function (row) {
        return (
          "<tr>" +
          "<td>" +
          escapeHtml(row.depart) +
          "</td>" +
          "<td>" +
          escapeHtml(row.arrive) +
          "</td>" +
          "<td>" +
          escapeHtml(row.duration) +
          "</td>" +
          "<td>" +
          escapeHtml(row.ship) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    return (
      '<div class="transport-routes__panel">' +
      '<h4 class="transport-routes__panel-title">' +
      escapeHtml(title) +
      "</h4>" +
      '<table class="transport-routes__table">' +
      "<thead><tr>" +
      headCols +
      "</tr></thead>" +
      "<tbody>" +
      rows +
      "</tbody>" +
      "</table>" +
      "</div>"
    );
  }

  function buildTerminals(route) {
    return (route.terminals || [])
      .map(function (terminal) {
        return (
          '<article class="transport-terminal">' +
          '<div class="transport-terminal__media">' +
          '<img class="transport-terminal__img" src="' +
          escapeHtml(terminal.image) +
          '" alt="" width="640" height="360" loading="lazy" />' +
          "</div>" +
          '<div class="transport-terminal__body">' +
          '<h4 class="transport-terminal__name">' +
          escapeHtml(terminal.name) +
          "</h4>" +
          '<ul class="transport-terminal__list">' +
          '<li class="transport-terminal__item">' +
          PIN_SVG +
          '<p class="transport-terminal__text"><span class="transport-terminal__label">주소</span> ' +
          escapeHtml(terminal.address) +
          "</p>" +
          "</li>" +
          '<li class="transport-terminal__item">' +
          PHONE_SVG +
          '<p class="transport-terminal__text"><span class="transport-terminal__label">연락처</span> ' +
          escapeHtml(terminal.phone) +
          "</p>" +
          "</li>" +
          '<li class="transport-terminal__item">' +
          PARK_SVG +
          '<p class="transport-terminal__text"><span class="transport-terminal__label">주차장</span> ' +
          escapeHtml(terminal.parking) +
          "</p>" +
          "</li>" +
          "</ul>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function updateNavState() {
    var buttons = track.querySelectorAll(".transport-routes__route-btn");
    buttons.forEach(function (btn) {
      var active = btn.getAttribute("data-route-id") === activeId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function updateArrowState() {
    if (!prevBtn || !nextBtn) {
      return;
    }
    var maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
  }

  function scrollNav(direction) {
    var amount = Math.max(180, track.clientWidth * 0.6);
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function scrollActiveIntoView() {
    var activeBtn = track.querySelector(
      '.transport-routes__route-btn[data-route-id="' + activeId + '"]'
    );
    if (!activeBtn) {
      return;
    }
    var left =
      activeBtn.offsetLeft - (track.clientWidth - activeBtn.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }

  function renderRoute(id, animate) {
    var route = findRoute(id);
    activeId = route.id;
    updateNavState();

    var apply = function () {
      if (scheduleTitle) {
        scheduleTitle.textContent =
          route.scheduleTitle || "운항 시간표";
      }
      if (terminalTitle) {
        terminalTitle.textContent =
          route.terminalTitle || "선착장 정보";
      }

      board.innerHTML =
        buildPanel("outbound", route) + buildPanel("inbound", route);
      terminalsEl.innerHTML = buildTerminals(route);
      root.classList.remove("is-switching");
      scrollActiveIntoView();
      updateArrowState();
    };

    if (!animate) {
      apply();
      return;
    }

    root.classList.add("is-switching");
    window.setTimeout(apply, 180);
  }

  buildNav();

  track.addEventListener("click", function (event) {
    var btn = event.target.closest(".transport-routes__route-btn");
    if (!btn) {
      return;
    }
    var id = btn.getAttribute("data-route-id");
    if (id === activeId) {
      return;
    }
    renderRoute(id, true);
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      scrollNav(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      scrollNav(1);
    });
  }

  track.addEventListener("scroll", function () {
    updateArrowState();
  });

  window.addEventListener("resize", function () {
    updateArrowState();
  });

  renderRoute(activeId, false);
})();
