/* =========================================================
   Takarda — main.js
   Small, dependency-free behaviours shared across pages.
   ========================================================= */
(function () {
  "use strict";

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Mobile nav toggle */
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var open = mobileMenu.getAttribute("data-open") === "true";
      mobileMenu.setAttribute("data-open", String(!open));
      navToggle.setAttribute("aria-expanded", String(!open));
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal-on-scroll — one quiet entrance per element, no repeats */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Impact / horizontal scroll galleries with prev/next controls */
  document.querySelectorAll("[data-scroller]").forEach(function (wrap) {
    var track = wrap.querySelector(".impact-scroller");
    var prev = wrap.querySelector('[data-scroll="prev"]');
    var next = wrap.querySelector('[data-scroll="next"]');
    if (!track) return;
    var step = function () {
      var card = track.querySelector(".impact-card");
      return card ? card.getBoundingClientRect().width + 20 : 300;
    };
    if (prev) prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    if (next) next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });
  });

  /* Blog category filter */
  var chips = document.querySelectorAll("[data-filter]");
  var posts = document.querySelectorAll("[data-category]");
  if (chips.length && posts.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        var value = chip.getAttribute("data-filter");
        posts.forEach(function (post) {
          var match = value === "all" || post.getAttribute("data-category") === value;
          post.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* Newsletter / join-community form — front-end only.
     Replace this handler with a real endpoint (Formspree, Mailchimp,
     Buttondown, your own API route, etc.) before going live. */
  var joinForm = document.getElementById("join-form");
  if (joinForm) {
    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("join-status");
      var email = joinForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      joinForm.reset();
      if (status) {
        status.textContent = "You're on the list — we'll be in touch at " + email + ".";
        status.classList.remove("hidden");
      }
    });
  }
})();
