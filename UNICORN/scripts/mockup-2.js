const atelierToggle = document.querySelector(".atelier-toggle");
const atelierNavId = atelierToggle?.getAttribute("aria-controls");
const atelierNav = atelierNavId ? document.getElementById(atelierNavId) : null;

if (atelierToggle && atelierNav) {
  atelierToggle.addEventListener("click", () => {
    const isOpen = atelierNav.classList.toggle("is-open");
    atelierToggle.setAttribute("aria-expanded", String(isOpen));
  });

  atelierNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      atelierNav.classList.remove("is-open");
      atelierToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const atelierReveals = document.querySelectorAll(".reveal");
const atelierObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        atelierObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

atelierReveals.forEach((item) => atelierObserver.observe(item));

const atelierPainting = document.querySelector(".atelier-painting");

if (atelierPainting) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    atelierPainting.classList.add("is-animated");
  } else {
    const paintingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            atelierPainting.classList.add("is-animated");
            paintingObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    paintingObserver.observe(atelierPainting);
  }
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const successBox = form.querySelector(".atelier-form__success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "клиент";

    if (successBox) {
      successBox.textContent = `${name}, спасибо! В рабочей версии сайта заявка уйдёт менеджеру Unicorn, и с вами свяжутся для подготовки оптового предложения.`;
    }
  });
});
