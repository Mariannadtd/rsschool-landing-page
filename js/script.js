const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.product-card');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('.modal__description');
const modalClose = document.querySelector('.modal__close');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

  root.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
});

burgerButton?.addEventListener('click', () => {
  const isOpen = burgerButton.getAttribute('aria-expanded') === 'true';

  burgerButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('nav--open');
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('tab--active'));
    tab.classList.add('tab--active');

    const category = tab.dataset.category;

    cards.forEach((card) => {
      card.hidden = card.dataset.category !== category;
    });
  });
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h2')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalDescription) {
      modalDescription.textContent = description;
    }

    modal.hidden = false;
  });
});

modalClose?.addEventListener('click', () => {
  modal.hidden = true;
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});
