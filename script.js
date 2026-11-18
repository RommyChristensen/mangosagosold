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

// Menu filters
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-selected", String(c === chip));
    });
    const f = chip.dataset.filter;
    cards.forEach((card) => {
      card.hidden = f !== "all" && card.dataset.cat !== f;
    });
  });
});

// Highlight today's hours
const today = new Date().getDay();
document.querySelector(`.hours tr[data-day="${today}"]`)?.classList.add("today");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validates, then opens the visitor's email app.
// To receive messages without email, swap this for a form service (e.g. Formspree).
const SHOP_EMAIL = "hello@example.com"; // TODO: replace with your real address
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("input, textarea").forEach((el) => {
    const valid = el.checkValidity() && el.value.trim() !== "";
    el.closest(".field").classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    status.textContent = "Please fill in every field with a valid email.";
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Message from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("email")}`);
  window.location.href = `mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = "Thanks! Your email app should open to send the message.";
  form.reset();
});
