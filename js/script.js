// Toggle class acrive
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");
const searchBtn = document.querySelector("#search-btn");
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
const cartBtn = document.querySelector("#shopping-btn");
const shoppingCart = document.querySelector(".shopping-cart");

// ketika hamburger menu di klik
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active unton search form
searchBtn.onclick = (e) => {
  e.preventDefault();
  searchForm.classList.toggle("active");
  searchBox.focus();
};

cartBtn.onclick = () => {
  shoppingCart.classList.toggle("active");
};

// klik di luar sidebar untuk menghilangkan nav
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!cartBtn.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const items = document.querySelectorAll(".show-detail-product");

items.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "block";
  });
});

// Klik tombol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
};

// Klik diluar Modal
window.onclick = (e) => {
  e.preventDefault();
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
