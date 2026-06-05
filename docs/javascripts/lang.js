// Highlight the active language button based on the page's <html lang="…">
(function () {
  function markActive() {
    var lang = (document.documentElement.lang || "en").slice(0, 2);
    document.querySelectorAll(".bcf-lang-btn").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-lang") === lang);
    });
  }
  if (window.document$ && window.document$.subscribe) {
    // Material instant-navigation aware
    window.document$.subscribe(markActive);
  } else {
    document.addEventListener("DOMContentLoaded", markActive);
  }
})();
