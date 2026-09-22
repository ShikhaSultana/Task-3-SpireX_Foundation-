/* ============================================
   Responsive Navigation Bar
   Mobile toggle menu + scroll effects
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay   = document.getElementById("overlay");
  const closeBtn  = document.getElementById("closeBtn");
  const yearEl    = document.getElementById("year");

  // 1. Dynamic footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Open / close mobile menu ---------- */
  const openMenu = () => {
    mobileMenu.classList.add("open");
    overlay.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  const toggleMenu = () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  };

  hamburger.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Close when a mobile link is clicked
  document.querySelectorAll(".mobile-menu__links a, .mobile-menu__cta a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
  });

  // Close automatically if resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && mobileMenu.classList.contains("open")) closeMenu();
  });

  /* ---------- Navbar shadow on scroll ---------- */
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active link highlighting on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const allLinks = document.querySelectorAll(".nav__links a, .mobile-menu__links a");

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            allLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }
});
