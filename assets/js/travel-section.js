/**
 * Travel Section — 여행 기간별 추천
 */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  var TRAVEL_DATA = {
    "day-trip": {
      courseTitle: "당일치기 추천 코스",
      moreLink: "day-trip.html",
      courses: [
        {
          num: "01",
          title: "신시모도 코스",
          image: "day-trip-sinsimodo.webp",
          desc: "신도, 시도, 모도를 잇는 연도교를 따라\n가볍게 떠나는 섬 여행을 즐겨보세요.",
          tags: ["수기해변", "연도교", "구봉산"],
        },
        {
          num: "02",
          title: "장봉도 코스",
          image: "day-trip-jangbongdo.webp",
          desc: "넓은 해변과 해안길을 따라 걸으며\n장봉도의 여유로운 풍경을 만나보세요.",
          tags: ["옹암해변", "가막머리전망대", "국사봉"],
        },
        {
          num: "03",
          title: "영흥도 코스",
          image: "day-trip-yeongheungdo.webp",
          desc: "맑은 바다와 다양한 체험이 가득한\n영흥도에서 특별한 하루를 보내세요.",
          tags: ["십리포해변", "에너지파크", "영흥대교"],
        },
        {
          num: "04",
          title: "자월도 코스",
          image: "day-trip-jawoldo.webp",
          desc: "자연 그대로의 자월도에서\n조용한 힐링 시간을 가져보세요.",
          tags: ["장골해변", "국사봉", "자월목섬"],
        },
        {
          num: "05",
          title: "선재도 코스",
          image: "day-trip-seonjaedo.webp",
          desc: "썰물에 드러나는 목섬을 따라 걸으며\n특별한 서해 풍경을 만나보세요.",
          tags: ["목섬", "선재도해변", "뻘다방"],
        },
        {
          num: "06",
          title: "승봉도 코스",
          image: "day-trip-seungbongdo.webp",
          desc: "기암절벽과 해안 절경이 어우러진\n한적한 힐링 섬을 걸어보세요.",
          tags: ["촛대바위", "이일레해변", "남대문바위"],
        },
        {
          num: "07",
          title: "덕적도 코스",
          image: "day-trip-deokjeokdo.webp",
          desc: "숲길과 해변이 조화를 이루는\n서해 대표 힐링 섬을 만나보세요.",
          tags: ["서포리해변", "비조봉", "능동자갈마당"],
        },
      ],
    },
    overnight: {
      courseTitle: "1박2일 추천 코스",
      moreLink: "overnight.html",
      courses: [
        {
          num: "01",
          title: "백령도 코스",
          image: "overnight-baengnyeongdo.webp",
          desc: "천연기념물과 절경이 어우러진\n서해 최북단의 특별한 여행을 떠나보세요.",
          tags: ["두무진", "콩돌해변", "천연기념물"],
        },
        {
          num: "02",
          title: "대청도 코스",
          image: "overnight-daecheongdo.webp",
          desc: "푸른 해안과 독특한 자연경관이 펼쳐지는\n한적한 힐링 여행을 즐겨보세요.",
          tags: ["옥죽동", "모래사막", "해안절경"],
        },
        {
          num: "03",
          title: "덕적도 코스",
          image: "overnight-deokjeokdo.webp",
          desc: "울창한 숲과 아름다운 해변이 어우러진\n여유로운 섬 산책을 만나보세요.",
          tags: ["비조봉", "서포리해변", "캠핑명소"],
        },
        {
          num: "04",
          title: "대이작도 코스",
          image: "overnight-daeijakdo.webp",
          desc: "대표 트레킹 코스와 아름다운 바다를 따라\n걷는 즐거움을 경험해보세요.",
          tags: ["풀등", "부아산", "트레킹"],
        },
        {
          num: "05",
          title: "대연평도 코스",
          image: "overnight-yeonpyeongdo.webp",
          desc: "서해의 아름다운 해안 풍경과 함께\n특별한 섬 여행의 매력을 느껴보세요.",
          tags: ["구리동해변", "연평등대", "안보관광"],
        },
      ],
    },
  };

  var sectionEl = document.querySelector(".travel");
  var wrapperEl = document.querySelector(".travel__slider .swiper-wrapper");
  var courseTitleEl = document.querySelector(".travel__course-title");
  var moreLinkEl = document.querySelector(".travel__more");
  var toggleButtons = document.querySelectorAll(".travel__toggle-btn");
  var toggleEl = document.querySelector(".travel__toggle");
  var contentEl = document.querySelector(".travel__content");
  var sliderEl = document.querySelector(".travel__slider");
  var TRANSITION_MS = 280;

  if (!sectionEl || !wrapperEl || !sliderEl) {
    return;
  }

  var currentType = "day-trip";
  var travelSwiper = null;

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDesc(text) {
    return escapeHtml(text)
      .replace(/(을|를) 따라/g, "$1\u00A0따라")
      .replace(/\n/g, "<br />");
  }

  function createCardHTML(course) {
    var tagsHTML = course.tags
      .map(function (tag) {
        return '<span class="course-card__tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");

    return (
      '<div class="swiper-slide">' +
      '<article class="course-card">' +
      '<div class="course-card__header">' +
      '<span class="course-card__num">' +
      escapeHtml(course.num) +
      "</span>" +
      "<h4 class=\"course-card__title\">" +
      escapeHtml(course.title) +
      "</h4>" +
      "</div>" +
      '<div class="course-card__media">' +
      '<img src="assets/images/course/' +
      escapeHtml(course.image) +
      '" alt="' +
      escapeHtml(course.title) +
      '" class="course-card__img" loading="lazy" />' +
      "</div>" +
      '<div class="course-card__body">' +
      '<p class="course-card__desc">' +
      formatDesc(course.desc) +
      "</p>" +
      '<div class="course-card__tags">' +
      tagsHTML +
      "</div>" +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderCards(type) {
    var data = TRAVEL_DATA[type];
    wrapperEl.innerHTML = data.courses.map(createCardHTML).join("");
    courseTitleEl.textContent = data.courseTitle;
    moreLinkEl.setAttribute("href", data.moreLink);
  }

  function getSwiperOptions() {
    return {
      speed: 500,
      grabCursor: true,
      slidesPerView: "auto",
      slidesPerGroup: 2,
      spaceBetween: 16,
      watchOverflow: true,
      pagination: {
        el: ".travel__pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: "auto",
          slidesPerGroup: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 24,
        },
      },
    };
  }

  function initSwiper() {
    if (travelSwiper) {
      travelSwiper.destroy(true, true);
    }

    travelSwiper = new Swiper(sliderEl, getSwiperOptions());
  }

  function setActiveToggle(type) {
    if (toggleEl) {
      toggleEl.setAttribute("data-active", type);
    }

    toggleButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-type") === type;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function switchType(type) {
    if (!TRAVEL_DATA[type] || type === currentType) {
      return;
    }

    if (contentEl) {
      contentEl.classList.add("is-transitioning");
    }

    window.setTimeout(function () {
      currentType = type;
      setActiveToggle(type);
      renderCards(type);
      initSwiper();

      window.requestAnimationFrame(function () {
        if (contentEl) {
          contentEl.classList.remove("is-transitioning");
        }
      });
    }, TRANSITION_MS);
  }

  toggleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchType(btn.getAttribute("data-type"));
    });
  });

  renderCards(currentType);
  setActiveToggle(currentType);
  initSwiper();

  var resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (travelSwiper) {
        travelSwiper.update();
      }
    }, 150);
  });
})();
