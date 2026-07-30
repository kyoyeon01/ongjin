/**
 * Swiper — Card carousel initialization
 */
(function ($) {
  "use strict";

  if (typeof Swiper === "undefined") {
    return;
  }

  $(".card__swiper").each(function (index) {
    var $swiperEl = $(this);
    var $card = $swiperEl.closest(".card");
    var paginationEl = $swiperEl.find(".card__swiper-pagination")[0];
    var prevEl = $swiperEl.find(".card__swiper-nav--prev")[0];
    var nextEl = $swiperEl.find(".card__swiper-nav--next")[0];
    var slideCount = $swiperEl.find(".swiper-slide").length;

    if (slideCount <= 1) {
      $swiperEl.find(".card__swiper-nav, .card__swiper-pagination").hide();
    }

    new Swiper(this, {
      loop: slideCount > 1,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: paginationEl
        ? {
            el: paginationEl,
            clickable: true,
          }
        : undefined,
      navigation:
        prevEl && nextEl
          ? {
              prevEl: prevEl,
              nextEl: nextEl,
            }
          : undefined,
      autoplay: $card.hasClass("card--hero")
        ? {
            delay: 5000,
            disableOnInteraction: false,
          }
        : false,
    });
  });
})(jQuery);
