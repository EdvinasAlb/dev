const backdrop = document.querySelector(".backdrop");

const modal = document.querySelector(".modal");

const selectPlanButton = document.querySelectorAll(".plan button");

const modalNoButton = document.querySelector(".modal__action--negative");

const toogleButton = document.querySelector(".toggle-button");

const mobileNav = document.querySelector(".mobile-nav");

selectPlanButton.forEach((a) => {
  a.addEventListener("click", () => {
    modal.classList.add("open");
    backdrop.style.display = "block";
    setTimeout(function () {
      backdrop.classList.add("open");
    }, 0.1);
  });
});

backdrop.addEventListener("click", function () {
  mobileNav.classList.remove("open");
  closeModal();
});
if (modalNoButton) {
  modalNoButton.addEventListener("click", closeModal);
}

function closeModal() {
  if (modal) {
    modal.classList.remove("open");
  }
  backdrop.classList.remove("open");
  setTimeout(function () {
    backdrop.style.display = "none";
  }, 200);
}

toogleButton.addEventListener("click", () => {
  mobileNav.classList.add("open");
  setTimeout(function () {
    backdrop.classList.add("open");
  }, 0.1);
});
