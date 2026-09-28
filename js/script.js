const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const burgerButton = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".tab");
const productCards = document.querySelectorAll(".product-card");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

function closeMenu() {
  burgerButton?.setAttribute("aria-expanded", "false");
  nav?.classList.remove("nav--open");
  document.body.classList.remove("menu-open");
}

burgerButton?.addEventListener("click", () => {
  const isOpen = burgerButton.getAttribute("aria-expanded") === "true";

  burgerButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("nav--open");
  document.body.classList.toggle("menu-open");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;

    tabs.forEach((item) => item.classList.remove("tab--active"));
    tab.classList.add("tab--active");

    productCards.forEach((card) => {
      card.hidden = card.dataset.category !== category;
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();

    if (modal && !modal.hidden) {
      closeModal();
    }
  }
});

const slides = [
  {
    image: "assets/images/coffee-slider-1.png",
    alt: "S'mores Frappuccino",
    title: "S'mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    image: "assets/images/coffee-slider-2.png",
    alt: "Caramel Macchiato",
    title: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    image: "assets/images/coffee-slider-3.png",
    alt: "Ice coffee",
    title: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const favoriteCard = document.querySelector(".favorite-card");

const previousSlideButton = document.querySelector(
  '[aria-label="Previous slide"]',
);

const nextSlideButton = document.querySelector('[aria-label="Next slide"]');

const sliderDots = document.querySelectorAll(".slider-dots__item");

let currentSlide = 0;

function showSlide(index) {
  const slide = slides[index];
  const image = favoriteCard.querySelector("img");
  const title = favoriteCard.querySelector("h3");
  const description = favoriteCard.querySelector("p");
  const price = favoriteCard.querySelector("strong");

  image.src = slide.image;
  image.alt = slide.alt;
  title.textContent = slide.title;
  description.textContent = slide.description;
  price.textContent = slide.price;

  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("slider-dots__item--active", dotIndex === index);
  });
}

if (favoriteCard && previousSlideButton && nextSlideButton) {
  showSlide(currentSlide);
  previousSlideButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    showSlide(currentSlide);
  });

  nextSlideButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;

    showSlide(currentSlide);
  });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

const modal = document.querySelector(".modal");

if (modal) {
  const modalImage = modal.querySelector(".modal__image");
  const modalTitle = modal.querySelector(".modal__title");
  const modalDescription = modal.querySelector(".modal__description");
  const modalPrice = modal.querySelector(".modal__price");
  const modalCloseButton = modal.querySelector(".modal__close");
  const modalOverlay = modal.querySelector(".modal__overlay");
  const sizeButtons = modal.querySelectorAll("[data-size]");
  const additiveButtons = modal.querySelectorAll("[data-additive]");

  const modalOptionsByCategory = {
    coffee: {
      sizes: [
        { key: "S", label: "200 ml", extraPrice: 0 },
        { key: "M", label: "300 ml", extraPrice: 0.5 },
        { key: "L", label: "400 ml", extraPrice: 1 },
      ],
      additives: [
        { key: "1", label: "Sugar", extraPrice: 0.5 },
        { key: "2", label: "Cinnamon", extraPrice: 0.5 },
        { key: "3", label: "Syrup", extraPrice: 0.5 },
      ],
    },
    tea: {
      sizes: [
        { key: "S", label: "200 ml", extraPrice: 0 },
        { key: "M", label: "300 ml", extraPrice: 0.5 },
        { key: "L", label: "400 ml", extraPrice: 1 },
      ],
      additives: [
        { key: "1", label: "Sugar", extraPrice: 0.5 },
        { key: "2", label: "Lemon", extraPrice: 0.5 },
        { key: "3", label: "Syrup", extraPrice: 0.5 },
      ],
    },
    dessert: {
      sizes: [
        { key: "S", label: "50 g", extraPrice: 0 },
        { key: "M", label: "100 g", extraPrice: 0.5 },
        { key: "L", label: "200 g", extraPrice: 1 },
      ],
      additives: [
        { key: "1", label: "Berries", extraPrice: 0.5 },
        { key: "2", label: "Nuts", extraPrice: 0.5 },
        { key: "3", label: "Jam", extraPrice: 0.5 },
      ],
    },
  };

  let basePrice = 0;

  function updateTotal() {
    let total = basePrice;
    const selectedSize = modal.querySelector(
      '[data-size][aria-pressed="true"]',
    );

    if (selectedSize) {
      total += Number(selectedSize.dataset.extraPrice);
    }

    additiveButtons.forEach((button) => {
      if (button.getAttribute("aria-pressed") === "true") {
        total += Number(button.dataset.extraPrice);
      }
    });

    modalPrice.textContent = `$${total.toFixed(2)}`;
  }

  function setModalOptions(category) {
    const options = modalOptionsByCategory[category];

    sizeButtons.forEach((button, index) => {
      const size = options.sizes[index];
      button.querySelector(".modal-option__key").textContent = size.key;
      button.querySelector(".modal-option__label").textContent = size.label;
      button.dataset.extraPrice = String(size.extraPrice);

      const isSelected = index === 0;
      button.classList.toggle("modal-option--active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    additiveButtons.forEach((button, index) => {
      const additive = options.additives[index];
      button.querySelector(".modal-option__key").textContent = additive.key;
      button.querySelector(".modal-option__label").textContent = additive.label;
      button.dataset.extraPrice = String(additive.extraPrice);
      button.dataset.additive = additive.label.toLowerCase();
      button.classList.remove("modal-option--active");
      button.setAttribute("aria-pressed", "false");
    });
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardImage = card.querySelector("img");
      const cardTitle = card.querySelector("h2");
      const cardDescription = card.querySelector("p");
      const cardPrice = card.querySelector("strong");

      basePrice = Number(cardPrice.textContent.replace("$", ""));
      setModalOptions(card.dataset.category);

      modalImage.src = cardImage.src;
      modalImage.alt = cardImage.alt;
      modalTitle.textContent = cardTitle.textContent;
      modalDescription.textContent = cardDescription.textContent;

      updateTotal();
      modal.hidden = false;
      document.body.classList.add("modal-open");
    });
  });

  sizeButtons.forEach((selectedButton) => {
    selectedButton.addEventListener("click", () => {
      sizeButtons.forEach((button) => {
        button.classList.remove("modal-option--active");
        button.setAttribute("aria-pressed", "false");
      });

      selectedButton.classList.add("modal-option--active");
      selectedButton.setAttribute("aria-pressed", "true");
      updateTotal();
    });
  });

  additiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isSelected = button.getAttribute("aria-pressed") === "true";
      button.classList.toggle("modal-option--active", !isSelected);
      button.setAttribute("aria-pressed", String(!isSelected));
      updateTotal();
    });
  });

  modalCloseButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}