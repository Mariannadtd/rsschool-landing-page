import { products } from "./products.js";

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const burgerButton = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const menuBreakpoint = window.matchMedia("(max-width: 768px)");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.dataset.theme = savedTheme;

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
  nav?.classList.toggle("nav--open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

menuBreakpoint.addEventListener("change", (event) => {
  if (!event.matches) closeMenu();
});

const slides = [
  {
    image: new URL("../assets/images/coffee-slider-1.png", import.meta.url).href,
    alt: "S'mores Frappuccino",
    title: "S'mores Frappuccino",
    description: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    image: new URL("../assets/images/coffee-slider-2.png", import.meta.url).href,
    alt: "Caramel Macchiato",
    title: "Caramel Macchiato",
    description: "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    image: new URL("../assets/images/coffee-slider-3.png", import.meta.url).href,
    alt: "Ice coffee",
    title: "Ice coffee",
    description: "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const favoriteCard = document.querySelector(".favorite-card");
const previousSlideButton = document.querySelector('[aria-label="Previous slide"]');
const nextSlideButton = document.querySelector('[aria-label="Next slide"]');
const sliderDots = document.querySelectorAll(".slider-dots__item");
let currentSlide = 0;
let slideTimer;

function updateSlideContent(slide) {
  const image = favoriteCard.querySelector("img");
  image.src = slide.image;
  image.alt = slide.alt;
  favoriteCard.querySelector("h3").textContent = slide.title;
  favoriteCard.querySelector("p").textContent = slide.description;
  favoriteCard.querySelector("strong").textContent = slide.price;
}

function showSlide(index, direction = 1, immediate = false) {
  if (!favoriteCard) return;

  clearTimeout(slideTimer);
  const render = () => {
    updateSlideContent(slides[index]);
    sliderDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("slider-dots__item--active", dotIndex === index);
    });
  };

  if (immediate) {
    render();
    return;
  }

  favoriteCard.style.setProperty("--slide-direction", String(direction));
  favoriteCard.classList.add("favorite-card--changing");
  slideTimer = window.setTimeout(() => {
    render();
    favoriteCard.classList.remove("favorite-card--changing");
  }, 180);
}

if (favoriteCard && previousSlideButton && nextSlideButton) {
  showSlide(currentSlide, 1, true);

  previousSlideButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide, -1);
  });

  nextSlideButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide, 1);
  });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const direction = index >= currentSlide ? 1 : -1;
      currentSlide = index;
      showSlide(currentSlide, direction);
    });
  });
}

const productsContainer = document.querySelector(".products");
const tabs = document.querySelectorAll(".tab");
const loadMoreButton = document.querySelector(".load-more");
const catalogBreakpoint = window.matchMedia("(max-width: 768px)");
const modal = document.querySelector(".modal");
let activeCategory = "coffee";
let showAllProducts = false;
let basePrice = 0;

function createProductCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}" tabindex="0">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-card__body">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <strong>$${product.price.toFixed(2)}</strong>
      </div>
    </article>`;
}

function renderProducts() {
  if (!productsContainer) return;

  const categoryProducts = products.filter(
    (product) => product.category === activeCategory,
  );
  const shouldLimit = catalogBreakpoint.matches && !showAllProducts;
  const visibleProducts = shouldLimit
    ? categoryProducts.slice(0, 4)
    : categoryProducts;

  productsContainer.innerHTML = visibleProducts.map(createProductCard).join("");

  if (loadMoreButton) {
    loadMoreButton.hidden = !(
      catalogBreakpoint.matches &&
      !showAllProducts &&
      categoryProducts.length > 4
    );
  }
}

function selectCategory(category) {
  activeCategory = category;
  showAllProducts = false;
  tabs.forEach((tab) => {
    const isActive = tab.dataset.category === category;
    tab.classList.toggle("tab--active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  renderProducts();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectCategory(tab.dataset.category));
});

loadMoreButton?.addEventListener("click", () => {
  showAllProducts = true;
  renderProducts();
});

catalogBreakpoint.addEventListener("change", () => {
  showAllProducts = false;
  renderProducts();
});

if (productsContainer) selectCategory("coffee");

if (modal) {
  const modalImage = modal.querySelector(".modal__image");
  const modalTitle = modal.querySelector(".modal__title");
  const modalDescription = modal.querySelector(".modal__description");
  const modalPrice = modal.querySelector(".modal__price");
  const modalCloseButton = modal.querySelector(".modal__close");
  const modalOverlay = modal.querySelector(".modal__overlay");
  const sizeButtons = modal.querySelectorAll("[data-size]");
  const additiveButtons = modal.querySelectorAll("[data-additive]");

  function updateTotal() {
    let total = basePrice;
    const selectedSize = modal.querySelector('[data-size][aria-pressed="true"]');
    if (selectedSize) total += Number(selectedSize.dataset.extraPrice);

    additiveButtons.forEach((button) => {
      if (button.getAttribute("aria-pressed") === "true") {
        total += Number(button.dataset.extraPrice);
      }
    });

    modalPrice.textContent = `$${total.toFixed(2)}`;
  }

  function setModalOptions(product) {
    sizeButtons.forEach((button, index) => {
      const size = product.sizes[index];
      button.querySelector(".modal-option__key").textContent = size.key;
      button.querySelector(".modal-option__label").textContent = size.label;
      button.dataset.extraPrice = String(size.extraPrice);
      const isSelected = index === 0;
      button.classList.toggle("modal-option--active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    additiveButtons.forEach((button, index) => {
      const additive = product.additives[index];
      button.querySelector(".modal-option__key").textContent = additive.key;
      button.querySelector(".modal-option__label").textContent = additive.label;
      button.dataset.extraPrice = String(additive.extraPrice);
      button.dataset.additive = additive.label.toLowerCase();
      button.classList.remove("modal-option--active");
      button.setAttribute("aria-pressed", "false");
    });
  }

  function openModal(product) {
    basePrice = product.price;
    setModalOptions(product);
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    updateTotal();
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function openCardFromEvent(event) {
    const card = event.target.closest(".product-card");
    if (!card) return;
    const product = products.find((item) => item.id === card.dataset.productId);
    if (product) openModal(product);
  }

  productsContainer?.addEventListener("click", openCardFromEvent);
  productsContainer?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCardFromEvent(event);
    }
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
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
