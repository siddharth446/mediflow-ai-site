/* MediFlow AI — concept build enhancements (progressive, vanilla JS) */
(function () {
  "use strict";

  /* Sticky masthead border on scroll */
  var masthead = document.querySelector(".masthead");
  var onScroll = function () {
    masthead.classList.toggle("is-stuck", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Reveal fallback for browsers without scroll-driven animations */
  var hasScrollTimeline = CSS.supports && CSS.supports("animation-timeline", "view()");
  if (!hasScrollTimeline && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else if (!hasScrollTimeline) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Open the first FAQ item once, as a reading aid */
  var firstFaq = document.querySelector(".faq details");
  if (firstFaq) firstFaq.setAttribute("open", "");
})();
