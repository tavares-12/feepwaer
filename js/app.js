// =====================================================
// FeePwear - App Principal
// =====================================================

const WHATSAPP_NUMBER = "5511999999999"; // ← TROQUE PELO SEU NÚMERO (DDI+DDD+número)
const ADMIN_PASSWORD = "1111";

// Estado global
let currentUser = null;
let isAdmin = false;
let cart = [];
let currentProduct = null;
let selectedSize = null;
let selectedQty = 1;
let currentFilter = "all";

function formatPrice(price) {
  if (price === null || price === undefined) return "Sob consulta";
  return "R$ " + price.toFixed(2).replace(".", ",");
}

// =====================================================
// Inicialização
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderFeatured();
  renderCatalog();
  updateCartBadge();
  updateUserMenu();
  updateContactWhatsapp();
  showPage("home");
});

// =====================================================
// Persistência (banco de dados local)
// =====================================================
function loadState() {
  try {
    currentUser = JSON.parse(localStorage.getItem("feepwear_user")) || null;
    isAdmin = localStorage.getItem("feepwear_admin") === "true";
    cart = JSON.parse(localStorage.getItem("feepwear_cart")) || [];
  } catch (e) {
    currentUser = null;
    isAdmin = false;
    cart = [];
  }
}

function saveUser() {
  localStorage.setItem("feepwear_user", JSON.stringify(currentUser));
}

function saveCart() {
  localStorage.setItem("feepwear_cart", JSON.stringify(cart));
  updateCartBadge();
}

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("feepwear_orders") || "[]");
  orders.unshift(order);
  localStorage.setItem("feepwear_orders", JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("feepwear_orders") || "[]");
}

// =====================================================
// Navegação
// =====================================================
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add("active");

  document.getElementById("userMenu").classList.remove("open");
  document.getElementById("mainNav").classList.remove("open");

  if (pageId === "cart") renderCart();
  if (pageId === "checkout") renderOrderSummary();
  if (pageId === "admin") renderAdmin();
  if (pageId === "catalog") renderCatalog();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  document.getElementById("mainNav").classList.toggle("open");
}

function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  menu.classList.toggle("open");
  updateUserMenu();
}

function updateUserMenu() {
  const content = document.getElementById("userMenuContent");
  if (isAdmin) {
    content.innerHTML = `
      <p style="padding:8px 12px;color:var(--primary);font-weight:600;">👨‍💻 Admin</p>
      <button onclick="showPage('admin')">Painel Admin</button>
      <button onclick="logoutAdmin()">Sair do Admin</button>
    `;
  } else if (currentUser) {
    content.innerHTML = `
      <p style="padding:8px 12px;font-weight:600;">${currentUser.name}</p>
      <p style="padding:0 12px 8px;font-size:0.85rem;color:var(--text-muted);">${currentUser.email}</p>
      <button onclick="showPage('cart')">Meu Carrinho</button>
      <button onclick="logout()">Sair</button>
    `;
  } else {
    content.innerHTML = `
      <button onclick="showPage('login')">Entrar / Criar conta</button>
      <button onclick="showPage('admin-login')">Acesso Desenvolvedor</button>
    `;
  }
}

// =====================================================
// Produtos
// =====================================================
function renderFeatured() {
  const container = document.getElementById("featuredProducts");
  const featured = PRODUCTS.slice(0, 6);
  container.innerHTML = featured.map(p => productCard(p)).join("");
}

function renderCatalog() {
  const container = document.getElementById("catalogProducts");
  let list = PRODUCTS;
  if (currentFilter !== "all") {
    list = PRODUCTS.filter(p => p.category === currentFilter);
  }
  container.innerHTML = list.length
    ? list.map(p => productCard(p)).join("")
    : `<p class="text-muted">Nenhum produto encontrado.</p>`;
}

function productCard(p) {
  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500?text=FeePwear'">
      <div class="product-info">
        <div class="product-category">${CATEGORIES[p.category] || p.category}</div>
        <h3>${p.name}</h3>
        <div class="product-price">${formatPrice(p.price)}</div>
      </div>
    </div>
  `;
}

function filterCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  showPage("catalog");
  renderCatalog();
}

function openProduct(id) {
  currentProduct = PRODUCTS.find(p => p.id === id);
  if (!currentProduct) return;

  selectedSize = currentProduct.sizes[0];
  selectedQty = 1;

  const el = document.getElementById("productDetail");
  el.innerHTML = `
    <div>
      <img src="${currentProduct.image}" alt="${currentProduct.name}" onerror="this.src='https://via.placeholder.com/600x700?text=FeePwear'">
    </div>
    <div>
      <div class="product-category">${CATEGORIES[currentProduct.category] || currentProduct.category}</div>
      <h1>${currentProduct.name}</h1>
      <div class="price">${formatPrice(currentProduct.price)}</div>
      <p>${currentProduct.description}</p>

      <div class="size-selector">
        <label>Tamanho</label>
        <div class="size-options" id="sizeOptions">
          ${currentProduct.sizes.map(s => `
            <button class="size-btn ${s === selectedSize ? "active" : ""}" onclick="selectSize('${s}')">${s}</button>
          `).join("")}
        </div>
      </div>

      <div class="qty-selector">
        <label>Quantidade</label>
        <div class="qty-control">
          <button onclick="changeQty(-1)">−</button>
          <span id="qtyDisplay">${selectedQty}</span>
          <button onclick="changeQty(1)">+</button>
        </div>
      </div>

      <button class="btn btn-primary btn-block" onclick="addToCart()" style="margin-top:12px;">
        Adicionar ao Carrinho
      </button>
    </div>
  `;

  showPage("product");
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent === size);
  });
}

function changeQty(delta) {
  selectedQty = Math.max(1, selectedQty + delta);
  document.getElementById("qtyDisplay").textContent = selectedQty;
}

// =====================================================
// Carrinho
// =====================================================
function addToCart() {
  if (!currentProduct || !selectedSize) return;

  const existing = cart.find(
    item => item.id === currentProduct.id && item.size === selectedSize
  );

  if (existing) {
    existing.qty += selectedQty;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      size: selectedSize,
      qty: selectedQty,
      category: currentProduct.category
    });
  }

  saveCart();
  alert(`${currentProduct.name} (${selectedSize}) adicionado ao carrinho!`);
}

function updateCartBadge() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartBadge").textContent = total;
}

function renderCart() {
  const container = document.getElementById("cartContent");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <p style="font-size:3rem;margin-bottom:12px;">🛒</p>
        <p>Seu carrinho está vazio.</p>
        <button class="btn btn-primary mt-3" onclick="showPage('catalog')">Ver produtos</button>
      </div>
    `;
    return;
  }

  const hasPrice = cart.every(i => i.price != null);
  const total = hasPrice ? cart.reduce((sum, i) => sum + i.price * i.qty, 0) : null;

  container.innerHTML = `
    ${cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-meta">Tamanho: ${item.size} • ${formatPrice(item.price)}</div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button onclick="updateCartQty(${idx}, -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="updateCartQty(${idx}, 1)">+</button>
            </div>
            <button class="btn btn-ghost" style="color:var(--danger);" onclick="removeFromCart(${idx})">Remover</button>
          </div>
        </div>
        <div style="font-weight:700;color:var(--accent);">
          ${item.price != null ? formatPrice(item.price * item.qty) : "Sob consulta"}
        </div>
      </div>
    `).join("")}

    <div class="cart-total">
      <div>Total: <span class="total-value">${total != null ? formatPrice(total) : "Sob consulta"}</span></div>
      <button class="btn btn-primary mt-3" onclick="goToCheckout()">Finalizar Compra</button>
    </div>
  `;
}

function updateCartQty(idx, delta) {
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart();
  renderCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function goToCheckout() {
  if (cart.length === 0) return;
  showPage("checkout");
}

function renderOrderSummary() {
  const container = document.getElementById("orderSummary");
  const hasPrice = cart.every(i => i.price != null);
  const total = hasPrice ? cart.reduce((sum, i) => sum + i.price * i.qty, 0) : null;

  container.innerHTML = `
    <h3>Resumo do Pedido</h3>
    ${cart.map(i => `
      <div class="summary-line">
        <span>${i.qty}x ${i.name} (${i.size})</span>
        <span>${formatPrice(i.price != null ? i.price * i.qty : null)}</span>
      </div>
    `).join("")}
    <div class="summary-line summary-total">
      <span>Total</span>
      <span>${total != null ? formatPrice(total) : "Sob consulta"}</span>
    </div>
  `;
}

// =====================================================
// Pedido + WhatsApp
// =====================================================
function placeOrder(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const email = document.getElementById("orderEmail").value.trim();
  const address = document.getElementById("orderAddress").value.trim();
  const notes = document.getElementById("orderNotes").value.trim();

  const hasPrice = cart.every(i => i.price != null);
  const total = hasPrice ? cart.reduce((sum, i) => sum + i.price * i.qty, 0) : null;
  const orderId = "FP" + Date.now().toString().slice(-8);

  const order = {
    id: orderId,
    date: new Date().toLocaleString("pt-BR"),
    customer: { name, phone, email, address, notes },
    items: [...cart],
    total,
    status: "Novo"
  };

  saveOrder(order);

  cart = [];
  saveCart();

  document.getElementById("orderIdDisplay").textContent = orderId;

  const itemsText = order.items
    .map(i => `• ${i.qty}x ${i.name} (${i.size})`)
    .join("\n");

  const totalText = total != null ? `Total: *R$ ${total.toFixed(2)}*` : "Total: *Sob consulta*";
  const baseMsg = `Olá! Sou ${name}.\n\nPedido: *${orderId}*\n${totalText}\n\nItens:\n${itemsText}\n\nEndereço: ${address}`;

  const actions = document.getElementById("whatsappActions");
  actions.innerHTML = `
    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMsg + '\n\nQuero confirmar e acompanhar meu pedido.')}" target="_blank">
      📦 Quero acompanhar meu pedido
    </a>
    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMsg + '\n\nTenho uma dúvida sobre o pedido.')}" target="_blank">
      ❓ Tirar dúvida sobre o pedido
    </a>
    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da FeePwear.')}" target="_blank">
      💬 Falar com o atendimento
    </a>
  `;

  showPage("success");
  document.getElementById("checkoutForm").reset();
}

function updateContactWhatsapp() {
  const link = document.getElementById("contactWhatsapp");
  if (link) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Vim pelo site da FeePwear e gostaria de tirar uma dúvida.")}`;
  }
}

// =====================================================
// Autenticação
// =====================================================
function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById("loginName").value.trim();
  const email = document.getElementById("loginEmail").value.trim();

  if (!name || !email) return;

  currentUser = { name, email };
  saveUser();
  updateUserMenu();
  alert(`Bem-vindo(a), ${name}!`);
  showPage("home");
}

function loginWithGoogle() {
  const email = prompt("Digite seu e-mail do Google (ex: seunome@gmail.com):");
  if (!email) return;

  if (!email.includes("@")) {
    alert("E-mail inválido.");
    return;
  }

  const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  currentUser = { name, email, provider: "google" };
  saveUser();
  updateUserMenu();
  alert(`Login com Google realizado!\nBem-vindo(a), ${name}`);
  showPage("home");
}

function logout() {
  currentUser = null;
  localStorage.removeItem("feepwear_user");
  updateUserMenu();
  showPage("home");
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById("adminPassword").value;

  if (pass === ADMIN_PASSWORD) {
    isAdmin = true;
    localStorage.setItem("feepwear_admin", "true");
    updateUserMenu();
    showPage("admin");
  } else {
    alert("Senha incorreta.");
  }
}

function logoutAdmin() {
  isAdmin = false;
  localStorage.removeItem("feepwear_admin");
  updateUserMenu();
  showPage("home");
}

function renderAdmin() {
  if (!isAdmin) {
    showPage("admin-login");
    return;
  }

  const orders = getOrders();
  const container = document.getElementById("adminContent");

  if (orders.length === 0) {
    container.innerHTML = `<p class="text-muted">Nenhum pedido registrado ainda.</p>`;
    return;
  }

  container.innerHTML = `
    <p style="margin-bottom:20px;color:var(--text-muted);">${orders.length} pedido(s) encontrado(s)</p>
    ${orders.map(o => `
      <div class="order-card">
        <h4>Pedido ${o.id} <span style="font-size:0.85rem;color:var(--primary);">• ${o.status}</span></h4>
        <div class="order-meta">
          ${o.date} • ${o.customer.name} • ${o.customer.phone}
          ${o.customer.email ? ` • ${o.customer.email}` : ""}
        </div>
        <div class="order-items">
          ${o.items.map(i => `${i.qty}x ${i.name} (${i.size})`).join(" • ")}
        </div>
        <div style="font-weight:700;color:var(--accent);margin-top:8px;">
          Total: ${o.total != null ? formatPrice(o.total) : "Sob consulta"}
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-top:6px;">
          Endereço: ${o.customer.address}
          ${o.customer.notes ? `<br>Obs: ${o.customer.notes}` : ""}
        </div>
      </div>
    `).join("")}
  `;
}
