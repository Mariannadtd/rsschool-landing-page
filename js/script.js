const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.tab');
const productCards = document.querySelectorAll('.product-card');
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

productCards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h2')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalDescription) {
      modalDescription.textContent = description;
    }

    if (modal) {
      modal.hidden = false;
      document.body.classList.add('menu-open');
    }
  });
});

function closeModal() {
  if (modal) {
    modal.hidden = true;
    document.body.classList.remove('menu-open');
  }
}

modalClose?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    closeMenu();
  }
});
