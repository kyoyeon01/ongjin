/**
 * Course Stack Carousel — day-trip / overnight 공용
 * Desktop/Tablet: 스택형 1장 포커스 넘김
 * Mobile(≤767): 2장 노출 Swiper
 */
(function () {
  "use strict";

  var MOBILE_MQ = "(max-width: 47.9375rem)";
  var MAX_VISIBLE_OFFSET = 3;
  var DRAG_THRESHOLD = 48;

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

  function CourseStack(root) {
    this.root = root;
    this.sliderEl = root.querySelector(".course-stack__slider");
    this.stage = root.querySelector(".course-stack__stage");
    this.viewport = root.querySelector(".course-stack__viewport");
    this.slides = Array.prototype.slice.call(
      root.querySelectorAll(".swiper-slide")
    );
    this.cards = Array.prototype.slice.call(
      root.querySelectorAll(".course-stack-card")
    );
    this.prevBtn = root.querySelector(".course-stack__nav--prev");
    this.nextBtn = root.querySelector(".course-stack__nav--next");
    this.pagination = root.querySelector(".course-stack__pagination");
    this._controlsWrap = null;
    this.activeIndex = 0;
    this.count = this.slides.length || this.cards.length;
    this.dots = [];
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragDeltaX = 0;
    this.suppressClick = false;
    this.swiper = null;
    this.mode = null;
    this.boundOnResize = this.onResize.bind(this);

    if (this.count === 0) {
      return;
    }

    this.bindCardClicks();
    this.bindNavFallback();
    window.addEventListener("resize", this.boundOnResize);
    this.syncMode(true);
  }

  CourseStack.prototype.isMobile = function () {
    return window.matchMedia(MOBILE_MQ).matches;
  };

  CourseStack.prototype.bindCardClicks = function () {
    var self = this;

    this.cards.forEach(function (card, index) {
      card.addEventListener("click", function () {
        if (self.suppressClick) {
          self.suppressClick = false;
          return;
        }

        if (!self.isMobile()) {
          var slideIndex = self.slides.indexOf(card.closest(".swiper-slide"));
          if (slideIndex < 0) {
            slideIndex = index;
          }
          var offset = slideIndex - self.activeIndex;
          if (offset !== 0) {
            self.goTo(slideIndex);
            return;
          }
        }

        var id = card.getAttribute("data-course-id");
        var indexAttr = card.getAttribute("data-index");
        var courseIndex = indexAttr !== null ? Number(indexAttr) : index;

        if (typeof window.openCourseModal === "function") {
          window.openCourseModal(id || courseIndex);
        }
      });
    });
  };

  CourseStack.prototype.bindNavFallback = function () {
    var self = this;

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", function () {
        if (self.isMobile() || self.swiper) {
          return;
        }
        self.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", function () {
        if (self.isMobile() || self.swiper) {
          return;
        }
        self.next();
      });
    }
  };

  CourseStack.prototype.syncMode = function (force) {
    var nextMode = this.isMobile() ? "mobile" : "desktop";

    if (!force && this.mode === nextMode) {
      if (nextMode === "desktop") {
        this.updateStack();
      }
      return;
    }

    this.mode = nextMode;

    if (nextMode === "mobile") {
      this.destroyStackUI();
      this.initSwiper();
    } else {
      this.destroySwiper();
      this.restoreDesktopControls();
      this.buildStackPagination();
      this.bindStackDrag();
      this.updateStack();

      // 레이아웃 확정 후 한 번 더 배치해 첫 페인트부터 스택이 보이게 함
      var self = this;
      window.requestAnimationFrame(function () {
        self.updateStack();
      });
    }
  };

  CourseStack.prototype.destroyStackUI = function () {
    this.slides.forEach(function (slide) {
      slide.classList.remove("is-hidden", "is-active");
      slide.style.transform = "";
      slide.style.opacity = "";
      slide.style.zIndex = "";
      slide.style.visibility = "";
    });

    if (this.pagination) {
      this.pagination.innerHTML = "";
    }
    this.dots = [];
  };

  CourseStack.prototype.destroySwiper = function () {
    if (this.swiper && this.swiper.destroy) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    if (this.pagination) {
      this.pagination.innerHTML = "";
      this.pagination.classList.remove("swiper-pagination-bullets");
    }
  };

  CourseStack.prototype.initSwiper = function () {
    if (typeof Swiper === "undefined" || !this.sliderEl || this.swiper) {
      return;
    }

    this.ensureMobileControls();

    this.swiper = new Swiper(this.sliderEl, {
      slidesPerView: "auto",
      slidesPerGroup: 2,
      spaceBetween: 16,
      speed: 450,
      watchOverflow: true,
      grabCursor: true,
      allowTouchMove: true,
      navigation: {
        prevEl: this.prevBtn,
        nextEl: this.nextBtn,
        disabledClass: "swiper-button-disabled",
      },
      pagination: {
        el: this.pagination,
        clickable: true,
        bulletClass: "course-stack__dot",
        bulletActiveClass: "is-active",
      },
    });
  };

  CourseStack.prototype.ensureMobileControls = function () {
    if (this._controlsWrap || !this.prevBtn || !this.nextBtn || !this.pagination) {
      return;
    }

    var wrap = document.createElement("div");
    wrap.className = "course-stack__controls";
    this.pagination.parentNode.insertBefore(wrap, this.pagination);
    wrap.appendChild(this.prevBtn);
    wrap.appendChild(this.pagination);
    wrap.appendChild(this.nextBtn);
    this._controlsWrap = wrap;
  };

  CourseStack.prototype.restoreDesktopControls = function () {
    if (!this._controlsWrap || !this.viewport) {
      return;
    }

    this.viewport.appendChild(this.prevBtn);
    this.viewport.appendChild(this.nextBtn);
    this._controlsWrap.parentNode.insertBefore(
      this.pagination,
      this._controlsWrap
    );
    this._controlsWrap.remove();
    this._controlsWrap = null;
  };

  CourseStack.prototype.buildStackPagination = function () {
    if (!this.pagination) {
      return;
    }

    this.pagination.innerHTML = "";
    this.dots = [];

    for (var i = 0; i < this.count; i += 1) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "course-stack__dot";
      dot.setAttribute("aria-label", i + 1 + "번째 코스로 이동");
      dot.dataset.index = String(i);
      this.pagination.appendChild(dot);
      this.dots.push(dot);
    }

    var self = this;
    this.pagination.onclick = function (event) {
      var target = event.target;
      if (!target || !target.classList.contains("course-stack__dot")) {
        return;
      }
      if (self.isMobile()) {
        return;
      }
      self.goTo(Number(target.dataset.index));
    };
  };

  CourseStack.prototype.normalizeIndex = function (index) {
    var n = this.count;
    return ((index % n) + n) % n;
  };

  /**
   * 순환 오프셋: 첫/끝 카드가 중앙이어도 좌우에 스택이 보이도록
   * 예) 7장, active=0 → offsets: 0,1,2,3,-3,-2,-1
   */
  CourseStack.prototype.getCircularOffset = function (index) {
    var n = this.count;
    var raw = index - this.activeIndex;
    var half = Math.floor(n / 2);

    if (raw > half) {
      raw -= n;
    } else if (raw < -half) {
      raw += n;
    }

    return raw;
  };

  CourseStack.prototype.getGap = function () {
    var styles = window.getComputedStyle(this.root);
    var gap = styles.getPropertyValue("--course-stack-gap").trim();
    var probe = document.createElement("div");

    probe.style.cssText =
      "position:absolute;visibility:hidden;width:" + gap + ";height:0;";
    document.body.appendChild(probe);
    var px = probe.offsetWidth;
    document.body.removeChild(probe);

    return px || 72;
  };

  CourseStack.prototype.updateStack = function () {
    var self = this;
    var gap = this.getGap();

    this.slides.forEach(function (slide, index) {
      var offset = self.getCircularOffset(index);
      var abs = Math.abs(offset);
      var hidden = abs > MAX_VISIBLE_OFFSET;
      var scale = Math.max(0.64, 1 - abs * 0.12);
      var opacity = Math.max(0.35, 1 - abs * 0.18);
      var x = offset * gap;
      var z = self.count - abs;

      slide.classList.toggle("is-hidden", hidden);
      slide.classList.toggle("is-active", offset === 0);
      slide.style.zIndex = String(z);
      slide.style.opacity = hidden ? "0" : String(opacity);
      slide.style.visibility = hidden ? "hidden" : "visible";
      slide.style.transform =
        "translate(calc(-50% + " + x + "px), -50%) scale(" + scale + ")";
      slide.setAttribute(
        "aria-hidden",
        hidden || offset !== 0 ? "true" : "false"
      );
    });

    this.dots.forEach(function (dot, index) {
      var active = index === self.activeIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });

    if (this.prevBtn) {
      this.prevBtn.disabled = false;
      this.prevBtn.classList.remove("swiper-button-disabled");
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = false;
      this.nextBtn.classList.remove("swiper-button-disabled");
    }
  };

  CourseStack.prototype.goTo = function (index) {
    this.activeIndex = this.normalizeIndex(index);
    this.updateStack();
  };

  CourseStack.prototype.next = function () {
    this.goTo(this.activeIndex + 1);
  };

  CourseStack.prototype.prev = function () {
    this.goTo(this.activeIndex - 1);
  };

  CourseStack.prototype.bindStackDrag = function () {
    if (this._stackDragBound || !this.stage) {
      return;
    }

    this._stackDragBound = true;
    var self = this;
    var el = this.stage;

    function onPointerDown(event) {
      if (self.isMobile()) {
        return;
      }

      if (event.type === "mousedown" && event.button !== 0) {
        return;
      }

      self.isDragging = true;
      self.dragDeltaX = 0;
      self.dragStartX =
        event.type.indexOf("touch") === 0
          ? event.touches[0].clientX
          : event.clientX;
    }

    function onPointerMove(event) {
      if (!self.isDragging || self.isMobile()) {
        return;
      }

      var clientX =
        event.type.indexOf("touch") === 0
          ? event.touches[0].clientX
          : event.clientX;

      self.dragDeltaX = clientX - self.dragStartX;

      if (Math.abs(self.dragDeltaX) > 8 && event.cancelable) {
        event.preventDefault();
      }
    }

    function onPointerUp() {
      if (!self.isDragging) {
        return;
      }

      self.isDragging = false;

      if (self.isMobile()) {
        self.dragDeltaX = 0;
        return;
      }

      if (Math.abs(self.dragDeltaX) >= DRAG_THRESHOLD) {
        self.suppressClick = true;

        if (self.dragDeltaX < 0) {
          self.next();
        } else {
          self.prev();
        }
      }

      self.dragDeltaX = 0;
    }

    el.addEventListener("mousedown", onPointerDown);
    el.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: false });
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
  };

  CourseStack.prototype.onResize = function () {
    clearTimeout(this._resizeTimer);
    var self = this;
    this._resizeTimer = setTimeout(function () {
      self.syncMode(false);
    }, 150);
  };

  function initAll() {
    document.querySelectorAll(".course-stack").forEach(function (section) {
      new CourseStack(section);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
