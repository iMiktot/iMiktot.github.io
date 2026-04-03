const readyBouquets = [
  {
    name: "Пудровый сад",
    description: "Нежный букет в светлой упаковке для дня рождения, свидания или подарка без повода.",
    price: "5 400 ₽",
    status: "В наличии",
    sold: false,
    image: "v2/5OU6T_l-HO6Q6BwFkFO8azgr-cfieEs6B9HcWivSUvjQUNNBHW60fu6Sw9kr3yX9H8Ut_-sOHCwuOKZXqxpMa4JX.jpg"
  },
  {
    name: "Пастельное облако",
    description: "Объёмная композиция в мягких оттенках для тёплого, нежного и нарядного вручения.",
    price: "6 200 ₽",
    status: "В наличии",
    sold: false,
    image: "v2/AiMFOh7n-rro5juauJVM_LfyWeKYtBSBAlott6jxyqfntOgs4N4WKsKCt0cga6uYMINcXipsIwVoHiYE7C09uX44.jpg"
  },
  {
    name: "Бордовый акцент",
    description: "Розы и зелень в более контрастной подаче для выразительного и эффектного подарка.",
    price: "6 800 ₽",
    status: "В наличии",
    sold: false,
    image: "v2/cA877TEYyTMO_bT-XU7CxWnvwkY4N9XhXEzfrfXgdCvpon1ju6ksTy0hjLfkOjYMJ8oJnB6wIRqKNLFxS7RXV0zH.jpg"
  },
  {
    name: "Зелёная линия",
    description: "Фирменный букет VETKA в глубоком зелёном цвете с премиальной подачей.",
    price: "7 900 ₽",
    status: "Продан",
    sold: true,
    image: "v2/aOYOJL2U3u9V6jK4i_xmXS2hNzU2ccf1IL2LhtvHp-K7f7YsnMEpVhdzbkIuUqnxWwKc9vMkxPl6ZhBvrPidarpY.jpg"
  }
];

const customBouquets = [
  {
    name: "Букет в фирменной гамме",
    description: "Соберём похожую композицию в зелёной или светлой фирменной упаковке.",
    image: "v2/wwFhePh285lkONQ-6-zVSwPRxdHi43N95Wr0El3MZ5OSMIFZzlWW_5g8xd4VOUOdksvWcciiNQcZaN-QiTBv9gHy.jpg"
  },
  {
    name: "Яркий сезонный букет",
    description: "Подберём контрастные сезонные цветы под событие, настроение и бюджет.",
    image: "v2/Ff8ZQvKCCAKR6_QIhBgxGuF8vYyMXRbeQWUoXc3HVlD78Rj9Kf6Ag9sPoiEyFmbeQvc0NZBjuYWTXWr4AKlv85Zl.jpg"
  },
  {
    name: "Композиция в вазе или коробке",
    description: "Подойдёт для подарка, интерьера или поздравления с доставкой по адресу.",
    image: "v2/jBQRFZn4yEjS_v8ZxUCUIiWGSYsTxEcvdEsZ3e9zkO3usEPKlzQVcSNc7NHitXM2ZMM8-00TzTiINW7ekrD275xh.jpg"
  },
  {
    name: "Индивидуальный букет по фото",
    description: "Можно прислать референс, а мы соберём похожий букет с учётом сезонности цветов.",
    image: "v2/aFPCDYl92nBR_rJUNJJQe_iHTCM3oFOhZjRdOEl7KSWvJRvzz8i8LhJzxUpoP7iIYGS7Z8DREqeoiCJPBZ23B_g-.jpg"
  }
];

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const readyGrid = document.getElementById("readyGrid");
const customGrid = document.getElementById("customGrid");
const modal = document.getElementById("actionModal");
const paymentBlock = document.getElementById("paymentBlock");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalSubmit = document.getElementById("modalSubmit");
const modalMessengerLink = document.getElementById("modalMessengerLink");
const modalType = document.getElementById("modalType");
const modalProduct = document.getElementById("modalProduct");
const modalSuccess = document.getElementById("modalSuccess");
const actionForm = document.getElementById("actionForm");
const mainRequestForm = document.getElementById("mainRequestForm");
const mainRequestSuccess = document.getElementById("mainRequestSuccess");
const mainRequestReset = document.getElementById("mainRequestReset");

function renderReadyBouquets() {
  readyGrid.innerHTML = readyBouquets
    .map(
      (item, index) => `
        <article class="product-card reveal">
          <div class="product-media">
            <img src="${item.image}" alt="${item.name}">
            <span class="product-status ${item.sold ? "is-sold" : ""}">${item.status}</span>
          </div>
          <div class="product-body">
            <div>
              <p class="product-category">Готовый букет</p>
              <h3 class="product-name">${item.name}</h3>
            </div>
            <p class="product-description">${item.description}</p>
            <div class="product-meta">
              <strong class="product-price">${item.price}</strong>
            </div>
            <div class="product-actions">
              <button
                class="button button-primary ${item.sold ? "is-disabled" : ""}"
                type="button"
                data-open-buy="${index}"
                ${item.sold ? "disabled" : ""}
              >
                Купить
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCustomBouquets() {
  customGrid.innerHTML = customBouquets
    .map(
      (item, index) => `
        <article class="product-card reveal">
          <div class="product-media">
            <img src="${item.image}" alt="${item.name}">
            <span class="product-status">Под заказ</span>
          </div>
          <div class="product-body">
            <div>
              <p class="product-category">Индивидуальный заказ</p>
              <h3 class="product-name">${item.name}</h3>
            </div>
            <p class="product-description">${item.description}</p>
            <div class="product-actions">
              <button class="button button-primary" type="button" data-open-custom="${index}">
                Заказать похожий
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function lockBody(locked) {
  document.body.classList.toggle("is-locked", locked);
}

function openModal(config) {
  modalKicker.textContent = config.kicker;
  modalTitle.textContent = config.title;
  modalSubtitle.textContent = config.subtitle;
  modalSubmit.textContent = config.submitLabel;
  modalMessengerLink.textContent = config.messengerLabel;
  modalMessengerLink.href = config.messengerHref;
  paymentBlock.hidden = !config.showPayment;
  modalType.value = config.type;
  modalProduct.value = config.product || "";
  modalSuccess.hidden = true;
  actionForm.hidden = false;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  lockBody(true);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  actionForm.reset();
  modalSuccess.hidden = true;
  actionForm.hidden = false;
  lockBody(false);
}

function openBuyModal(index) {
  const bouquet = readyBouquets[index];

  if (!bouquet || bouquet.sold) {
    return;
  }

  openModal({
    type: "buy",
    kicker: "Попап Купить",
    title: bouquet.name,
    subtitle: "Заполните форму для покупки готового букета. Менеджер свяжется с вами для подтверждения.",
    submitLabel: "Отправить заказ",
    messengerLabel: "Открыть WhatsApp",
    messengerHref: "https://wa.me/79990000000",
    showPayment: true,
    product: bouquet.name
  });
}

function openCustomModal(index) {
  const bouquet = customBouquets[index];

  if (!bouquet) {
    return;
  }

  openModal({
    type: "custom",
    kicker: "Заказать похожий",
    title: bouquet.name,
    subtitle: "Оставьте заявку или перейдите в Telegram / WhatsApp для быстрого обсуждения деталей.",
    submitLabel: "Отправить заявку",
    messengerLabel: "Открыть Telegram",
    messengerHref: "https://t.me/vetka_flowers",
    showPayment: false,
    product: bouquet.name
  });
}

function openRequestModal(subject) {
  openModal({
    type: "request",
    kicker: "Оставить заявку",
    title: subject,
    subtitle: "Заполните форму, и менеджер свяжется с вами для обсуждения деталей.",
    submitLabel: "Отправить заявку",
    messengerLabel: "Открыть WhatsApp",
    messengerHref: "https://wa.me/79990000000",
    showPayment: false,
    product: subject
  });
}

function initNav() {
  if (!navToggle || !nav) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function formatPhoneInput(input) {
  let value = input.value.replace(/\D/g, "");

  if (value.startsWith("7") || value.startsWith("8")) {
    value = value.slice(1);
  }

  value = value.slice(0, 10);

  let formatted = "+7";
  if (value.length > 0) formatted += " (" + value.slice(0, 3);
  if (value.length >= 3) formatted += ") " + value.slice(3, 6);
  if (value.length >= 6) formatted += "-" + value.slice(6, 8);
  if (value.length >= 8) formatted += "-" + value.slice(8, 10);
  input.value = formatted;
}

function initForms() {
  document.querySelectorAll("input[type='tel']").forEach((input) => {
    input.addEventListener("input", () => formatPhoneInput(input));
  });

  actionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    actionForm.hidden = true;
    modalSuccess.hidden = false;
  });

  mainRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    mainRequestForm.hidden = true;
    mainRequestSuccess.hidden = false;
  });

  mainRequestReset.addEventListener("click", () => {
    mainRequestForm.reset();
    mainRequestSuccess.hidden = true;
    mainRequestForm.hidden = false;
  });
}

function initActions() {
  document.addEventListener("click", (event) => {
    const buyButton = event.target.closest("[data-open-buy]");
    const customButton = event.target.closest("[data-open-custom]");
    const requestButton = event.target.closest("[data-open-request]");
    const closeButton = event.target.closest("[data-close-modal]");

    if (buyButton) {
      openBuyModal(Number(buyButton.dataset.openBuy));
    }

    if (customButton) {
      openCustomModal(Number(customButton.dataset.openCustom));
    }

    if (requestButton) {
      openRequestModal(requestButton.dataset.openRequest);
    }

    if (closeButton) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setYear() {
  const slot = document.querySelector("[data-year]");
  if (slot) {
    slot.textContent = String(new Date().getFullYear());
  }
}

renderReadyBouquets();
renderCustomBouquets();
initNav();
initReveal();
initForms();
initActions();
setYear();
