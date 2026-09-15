const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.tab');
const productCards = document.querySelectorAll('.product-card');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

  root.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
});

function closeMenu() {
  burgerButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('nav--open');
  document.body.classList.remove('menu-open');
}

burgerButton?.addEventListener('click', () => {
  const isOpen = burgerButton.getAttribute('aria-expanded') === 'true';

  burgerButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('nav--open');
  document.body.classList.toggle('menu-open');
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeMenu();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;

    tabs.forEach((item) => item.classList.remove('tab--active'));
    tab.classList.add('tab--active');

    productCards.forEach((card) => {
      card.hidden = card.dataset.category !== category;
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});
