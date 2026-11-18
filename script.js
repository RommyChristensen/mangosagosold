// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// "What's inside": hover or tap a layer to highlight it in the cartoon cup
const cup = document.querySelector(".cartoon-cup");
const items = document.querySelectorAll(".layers li");

function showLayer(n) {
  cup.classList.toggle("focus", n !== null);
  cup.querySelectorAll(".layer").forEach((el) => el.classList.toggle("on", el.dataset.layer === n));
  items.forEach((li) => li.classList.toggle("on", li.dataset.layer === n));
}
items.forEach((li) => {
  li.addEventListener("mouseenter", () => showLayer(li.dataset.layer));
  li.addEventListener("mouseleave", () => showLayer(null));
  li.addEventListener("click", () => showLayer(li.classList.contains("on") ? null : li.dataset.layer));
});

// Pop sections in as they scroll into view
const revealEls = document.querySelectorAll(".feature-card, .layers li, .card-cartoon, .cta");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    io.observe(el);
  });
}

// Highlight today's hours
const today = new Date().getDay();
document.querySelector(`.hours tr[data-day="${today}"]`)?.classList.add("today");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
