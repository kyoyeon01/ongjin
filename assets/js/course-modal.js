/**
 * Course Detail Modal — 코스 상세보기
 * Requires: Swiper, COURSE_MODAL_DATA, openCourseModal(courseId)
 *
 * 당일치기: 좌우 화살표 없음
 * 1박2일: 동일 섬의 1일차 ↔ 2일차만 전환
 */
(function () {
  "use strict";

  var modalEl = null;
  var swiperInstance = null;
  var courseType = "day-trip";
  var courseList = [];
  var currentIndex = 0;
  var currentDayIndex = 0;
  var focusReturnEl = null;

  var ICONS = {
    pin:
      '<svg class="course-modal__type-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="2"/></svg>',
    clock:
      '<svg class="course-modal__meta-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    distance:
      '<svg class="course-modal__meta-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h4v4M17 17h-4v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    places:
      '<svg class="course-modal__meta-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-4.2 6-9a6 6 0 1 0-12 0c0 4.8 6 9 6 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2"/></svg>',
    map:
      '<svg class="course-modal__map-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18 3 20.5V6.5L9 4l6 2.5L21 4v14l-6 2.5L9 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4v14M15 6.5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    external:
      '<svg class="course-modal__external-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6M20 4 10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close:
      '<svg class="course-modal__close-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronLeft:
      '<svg class="course-modal__nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18 9 12l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronRight:
      '<svg class="course-modal__nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function getCourseTypeFromPage() {
    var section = document.querySelector(".course-stack[data-course-type]");
    return section ? section.getAttribute("data-course-type") : "day-trip";
  }

  function normalizeList(type) {
    var raw = (window.COURSE_MODAL_DATA && window.COURSE_MODAL_DATA[type]) || [];

    if (type === "overnight") {
      return raw.map(function (island) {
        return {
          id: island.id,
          type: "overnight",
          days: island.days || [],
        };
      });
    }

    return raw.slice();
  }

  function getActivePayload() {
    var item = courseList[currentIndex];
    if (!item) {
      return null;
    }

    if (item.type === "overnight") {
      var day = item.days[currentDayIndex] || item.days[0];
      if (!day) {
        return null;
      }

      return {
        id: item.id,
        type: item.type,
        day: day.day,
        title: day.title,
        description: day.description,
        time: day.time,
        distance: day.distance,
        placeCount: day.placeCount,
        places: day.places || [],
        map: day.map || "#",
        images: day.images || [],
        dayCount: item.days.length,
      };
    }

    return {
      id: item.id,
      type: item.type,
      day: item.day,
      title: item.title,
      description: item.description,
      time: item.time,
      distance: item.distance,
      placeCount: item.placeCount,
      places: item.places || [],
      map: item.map || "#",
      images: item.images || [],
      dayCount: 1,
    };
  }

  function buildModalMarkup() {
    return (
      '<div class="course-modal" id="course-modal" aria-hidden="true">' +
      '<button type="button" class="course-modal__backdrop" aria-label="모달 닫기"></button>' +
      '<p class="course-modal__heading">코스 상세보기</p>' +
      '<div class="course-modal__shell">' +
      '<button type="button" class="course-modal__nav course-modal__nav--prev" aria-label="이전 일차">' +
      ICONS.chevronLeft +
      "</button>" +
      '<div class="course-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">' +
      '<button type="button" class="course-modal__close" aria-label="닫기">' +
      ICONS.close +
      "</button>" +
      '<div class="course-modal__info">' +
      '<p class="course-modal__type">' +
      ICONS.pin +
      '<span class="course-modal__type-text"></span>' +
      "</p>" +
      '<h2 id="course-modal-title" class="course-modal__title"></h2>' +
      '<p class="course-modal__desc"></p>' +
      '<ul class="course-modal__meta">' +
      '<li class="course-modal__meta-item">' +
      ICONS.clock +
      '<span class="course-modal__meta-label">소요시간</span>' +
      '<span class="course-modal__meta-value course-modal__meta-time"></span>' +
      "</li>" +
      '<li class="course-modal__meta-item">' +
      ICONS.distance +
      '<span class="course-modal__meta-label">총 거리</span>' +
      '<span class="course-modal__meta-value course-modal__meta-distance"></span>' +
      "</li>" +
      '<li class="course-modal__meta-item">' +
      ICONS.places +
      '<span class="course-modal__meta-label">추천 장소</span>' +
      '<span class="course-modal__meta-value course-modal__meta-places"></span>' +
      "</li>" +
      "</ul>" +
      '<hr class="course-modal__divider" />' +
      '<ol class="course-modal__places"></ol>' +
      '<a class="course-modal__map-btn" href="#" target="_blank" rel="noopener noreferrer">' +
      '<span class="course-modal__map-btn-inner">' +
      ICONS.map +
      "<span>네이버 지도로 보기</span>" +
      "</span>" +
      ICONS.external +
      "</a>" +
      "</div>" +
      '<div class="course-modal__media">' +
      '<div class="swiper course-modal__slider">' +
      '<div class="swiper-wrapper"></div>' +
      "</div>" +
      '<div class="course-modal__pagination swiper-pagination"></div>' +
      '<a class="course-modal__map-btn course-modal__map-btn--mobile" href="#" target="_blank" rel="noopener noreferrer">' +
      '<span class="course-modal__map-btn-inner">' +
      ICONS.map +
      "<span>네이버 지도로 보기</span>" +
      "</span>" +
      ICONS.external +
      "</a>" +
      "</div>" +
      "</div>" +
      '<button type="button" class="course-modal__nav course-modal__nav--next" aria-label="다음 일차">' +
      ICONS.chevronRight +
      "</button>" +
      "</div>" +
      "</div>"
    );
  }

  function ensureModal() {
    if (modalEl) {
      return modalEl;
    }

    var wrap = document.createElement("div");
    wrap.innerHTML = buildModalMarkup();
    modalEl = wrap.firstChild;
    document.body.appendChild(modalEl);
    bindModalEvents();
    return modalEl;
  }

  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  function renderSwiper(images) {
    var slider = modalEl.querySelector(".course-modal__slider");
    var wrapper = slider.querySelector(".swiper-wrapper");
    var pagination = modalEl.querySelector(".course-modal__pagination");

    destroySwiper();
    wrapper.innerHTML = (images || [])
      .map(function (src) {
        return (
          '<div class="swiper-slide">' +
          '<img class="course-modal__slide-img" src="' +
          src +
          '" alt="" loading="lazy" />' +
          "</div>"
        );
      })
      .join("");

    if (typeof Swiper === "undefined") {
      return;
    }

    swiperInstance = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      speed: 400,
      pagination: {
        el: pagination,
        clickable: true,
      },
    });
  }

  function syncNavVisibility(payload) {
    var showNav =
      courseType === "overnight" && payload && payload.dayCount > 1;

    modalEl.classList.toggle("is-day-trip", courseType === "day-trip");
    modalEl.classList.toggle("has-day-nav", showNav);
  }

  function renderContent() {
    var payload = getActivePayload();
    if (!payload || !modalEl) {
      return;
    }

    modalEl.querySelector(".course-modal__type-text").textContent = payload.day;
    modalEl.querySelector(".course-modal__title").textContent = payload.title;
    modalEl.querySelector(".course-modal__desc").textContent = payload.description;
    modalEl.querySelector(".course-modal__meta-time").textContent = payload.time;
    modalEl.querySelector(".course-modal__meta-distance").textContent =
      payload.distance;
    modalEl.querySelector(".course-modal__meta-places").textContent =
      payload.placeCount;

    var placesEl = modalEl.querySelector(".course-modal__places");
    placesEl.innerHTML = payload.places
      .map(function (place, index) {
        return (
          '<li class="course-modal__place">' +
          '<span class="course-modal__place-num">' +
          (index + 1) +
          "</span>" +
          "<span>" +
          place +
          "</span>" +
          "</li>"
        );
      })
      .join("");

    var mapHref = payload.map || "#";
    modalEl.querySelectorAll(".course-modal__map-btn").forEach(function (btn) {
      btn.setAttribute("href", mapHref);
    });

    syncNavVisibility(payload);
    renderSwiper(payload.images);
  }

  function openModal(index, dayIndex) {
    ensureModal();
    currentIndex = ((index % courseList.length) + courseList.length) % courseList.length;
    currentDayIndex = typeof dayIndex === "number" ? dayIndex : 0;
    renderContent();

    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-course-modal-open");
    modalEl.querySelector(".course-modal__close").focus();
  }

  function closeModal() {
    if (!modalEl) {
      return;
    }

    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-course-modal-open");
    destroySwiper();

    if (focusReturnEl && typeof focusReturnEl.focus === "function") {
      focusReturnEl.focus();
    }
  }

  /** 동일 섬의 1일차 ↔ 2일차만 전환 (overnight 전용) */
  function goDay(delta) {
    var item = courseList[currentIndex];
    if (!item || item.type !== "overnight" || !item.days || item.days.length < 2) {
      return;
    }

    var len = item.days.length;
    currentDayIndex = (currentDayIndex + delta + len) % len;
    renderContent();
  }

  function bindModalEvents() {
    modalEl
      .querySelector(".course-modal__backdrop")
      .addEventListener("click", closeModal);
    modalEl
      .querySelector(".course-modal__close")
      .addEventListener("click", closeModal);
    modalEl
      .querySelector(".course-modal__nav--prev")
      .addEventListener("click", function () {
        goDay(-1);
      });
    modalEl
      .querySelector(".course-modal__nav--next")
      .addEventListener("click", function () {
        goDay(1);
      });

    document.addEventListener("keydown", function (event) {
      if (!modalEl || !modalEl.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowLeft") {
        goDay(-1);
      } else if (event.key === "ArrowRight") {
        goDay(1);
      }
    });
  }

  function findIndexById(id) {
    for (var i = 0; i < courseList.length; i += 1) {
      if (String(courseList[i].id) === String(id)) {
        return i;
      }
    }
    return -1;
  }

  window.openCourseModal = function openCourseModal(courseId) {
    courseType = getCourseTypeFromPage();
    courseList = normalizeList(courseType);

    if (!courseList.length) {
      return;
    }

    var index = findIndexById(courseId);
    if (index < 0) {
      index = Number(courseId);
      if (isNaN(index) || index < 0 || index >= courseList.length) {
        index = 0;
      }
    }

    focusReturnEl = document.activeElement;
    openModal(index, 0);
  };

  window.closeCourseModal = closeModal;
})();
