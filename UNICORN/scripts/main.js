document.querySelectorAll(".nav-toggle").forEach((toggle) => {
  const navId = toggle.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;

  if (!nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

reveals.forEach((item) => observer.observe(item));

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const successBox = form.querySelector(".lead-form__success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "клиент";

    if (successBox) {
      successBox.textContent = `${name}, в финальной версии сайта заявка будет отправляться менеджеру Unicorn для подготовки оптового предложения.`;
    }
  });
});
