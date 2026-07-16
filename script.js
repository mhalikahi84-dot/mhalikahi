/* ===========================
   MOBILE MENU
=========================== */

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

/* ===========================
   SCROLL REVEAL
=========================== */

const revealTargets = document.querySelectorAll("section, .project-card, .cert-card");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(40px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 700, easing: "ease-out", fill: "forwards" }
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealTargets.forEach(target => revealObserver.observe(target));

/* ===========================
   BACK TO TOP
=========================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 600 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===========================
   ACTIVE NAV LINK ON SCROLL
=========================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a[href^='#']");

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => navObserver.observe(section));
}
