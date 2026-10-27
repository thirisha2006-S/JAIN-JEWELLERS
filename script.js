const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.querySelector(".cart-count");
const cartTotalEl = document.getElementById("cartTotal");
const cartLink = document.querySelector(".cart-link");
const closeCartBtn = document.querySelector(".close-cart");

let cart = [];

function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCountEl) cartCountEl.textContent = totalQty;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (cartTotalEl) cartTotalEl.textContent = "Rs." + total.toLocaleString();

  if (cart.length === 0) {
    if (cartItemsEl) cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => `
      <div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid var(--border);">
        <div style="flex:1;">
          <div style="font-weight:600; color:var(--text);">${item.name}</div>
          <div style="color:var(--primary-dark); font-weight:700; margin:6px 0;">Rs. ${item.price.toLocaleString()}</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)" style="background:var(--bg); border:none; width:28px; height:28px; border-radius:6px; cursor:pointer; font-weight:700; color:var(--primary-dark);">-</button>
            <span style="font-weight:600;">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)" style="background:var(--bg); border:none; width:28px; height:28px; border-radius:6px; cursor:pointer; font-weight:700; color:var(--primary-dark);">+</button>
          </div>
        </div>
        <button onclick="removeItem(${item.id})" style="background:none; border:none; color:var(--text-light); cursor:pointer; font-size:18px;">&times;</button>
      </div>
    `).join("");
  }
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function openCart() {
  if (cartSidebar) cartSidebar.classList.add("active");
  if (cartOverlay) cartOverlay.classList.add("active");
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");
}

if (cartLink) cartLink.addEventListener("click", (e) => {
  e.preventDefault();
  openCart();
});

if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    alert("Exploring " + category.charAt(0).toUpperCase() + category.slice(1) + " collection at Jain Jewellers");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    if (window.scrollY > 300) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  }
});

const scrollTopBtn = document.querySelector(".scroll-top");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");

if (menuToggle) menuToggle.addEventListener("click", () => mobileMenu.classList.add("active"));
if (closeMenu) closeMenu.addEventListener("click", () => mobileMenu.classList.remove("active"));

updateCartUI();