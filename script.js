document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0;
  const nav = document.querySelector('nav');
  const navHeight = nav.offsetHeight; // Get the height of the navigation bar

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > navHeight) {
      // Scrolling Down
      nav.classList.remove('nav-visible');
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling Up
      nav.classList.remove('nav-hidden');
      nav.classList.add('nav-visible');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, false);
})