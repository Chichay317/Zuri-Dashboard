"use strict";

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // SCROLL BACK TO TOP
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// STICKY NAVIGATION
const sectionHeroEl = document.querySelector(".section__a");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // Inside of the entire browser window
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Making Accordion work
const accordionHeaderEl = document.querySelectorAll(".accordion-header");
accordionHeaderEl.forEach((cur) => {
  cur.addEventListener("click", (event) => {
    // Making one dropdown closed while one is open
    const currentActive = document.querySelector(".accordion-header.active");
    if (currentActive && currentActive !== cur) {
      currentActive.classList.toggle("active");
      currentActive.nextElementSibling.style.maxHeight = 0;
    }

    cur.classList.toggle("active");
    // Making the dropdown show
    const accordionItemBody = cur.nextElementSibling;
    if (cur.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
