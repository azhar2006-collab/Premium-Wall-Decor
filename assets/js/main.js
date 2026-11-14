/**
 * KINETIC MOTO - CORE E-COMMERCE ENGINE
 * Vanilla JavaScript (No Frameworks)
 * Handles Cart, Wishlist, LocalStorage, Filtering, Sorting, Modals, and UI
 */

// --- Global State Keys ---
const STORAGE_CART_KEY = 'kinetic_moto_cart_v1';
const STORAGE_WISHLIST_KEY = 'kinetic_moto_wishlist_v1';
const STORAGE_PROMO_KEY = 'kinetic_moto_promo_v1';

// --- State Initialization ---
let cart = JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || [];
let wishlist = JSON.parse(localStorage.getItem(STORAGE_WISHLIST_KEY)) || [];
let currentCategory = 'All';
let currentSort = 'featured';
let searchQuery = '';
let activePromo = JSON.parse(localStorage.getItem(STORAGE_PROMO_KEY)) || null;

// --- DOM Loaded Bootstrap ---
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDrawersAndModals();
  updateHeaderBadges();
  renderCartDrawer();
  renderWishlistDrawer();
  
  // If on Homepage
  if (document.getElementById('shopProductGrid')) {
    renderShopProducts();
    renderFeaturedProducts();
    initShopControls();
  }

  // Bind Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Welcome to the Collectors Circle! Check ${input.value} for your welcome perk.`);
        input.value = '';
      }
    });
  }
});

// ==========================================================================
// NAVBAR & MOBILE NAVIGATION
// ==========================================================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  // Sticky Navbar Blur Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    // Close when link clicked
    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ==========================================================================
// PRODUCTS RENDERING & FILTERING
// ==========================================================================
function renderShopProducts() {
  const grid = document.getElementById('shopProductGrid');
  const countDisplay = document.getElementById('shopCountDisplay');
  if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

  // Filter products
  let filtered = PRODUCTS_DATA.filter(p => {
    const matchesCat = (currentCategory === 'All') || (p.category === currentCategory);
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Featured / default ID order
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.id - b.id);
  }

  // Update count indicator
  if (countDisplay) {
    countDisplay.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${PRODUCTS_DATA.length}</strong> 3D Wall Sculptures`;
  }

  // Empty state check
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #141414; border-radius: 8px; border: 1px solid #333;">
        <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 10px;">No Motorcycle Models Found</h3>
        <p style="color: #a6a6a6; margin-bottom: 20px;">Try adjusting your category filter or search keywords.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render cards
  grid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
}

function renderFeaturedProducts() {
  const container = document.getElementById('featuredProductGrid');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  const featured = PRODUCTS_DATA.filter(p => p.featured).slice(0, 4);
  container.innerHTML = featured.map(product => createProductCardHTML(product)).join('');
}

function createProductCardHTML(product) {
  const isWishlisted = wishlist.includes(product.id);
  
  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-image-wrap">
        <span class="card-badge-top">${product.badge || '1:12 Scale'}</span>
        <span class="card-scale-tag">3D Shadowbox</span>
        <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="toggleWishlist(${product.id}, event)" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <a href="product.html?id=${product.id}">
          <img class="product-card-image" src="${product.image}" alt="${product.name} 3D Wall Art" loading="lazy">
        </a>
        <button class="card-quick-view-btn" onclick="openQuickView(${product.id}, event)">Quick View</button>
      </div>

      <div class="product-card-body">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="card-desc">${product.shortDesc}</p>
        
        <div class="card-rating-row">
          <div class="stars">★★★★★</div>
          <span class="rating-count">${product.rating} (${product.reviewsCount})</span>
        </div>

        <div class="card-price-row">
          <span class="current-price">$${product.price}</span>
          <span class="original-price">$${product.originalPrice}</span>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm btn-block btn-card-add" onclick="addToCart(${product.id}, 1, event)">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function initShopControls() {
  // Category Chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-category');
      renderShopProducts();
    });
  });

  // Sort Dropdown
  const sortSelect = document.getElementById('shopSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderShopProducts();
    });
  }

  // Shop Inline Search
  const shopSearchInput = document.getElementById('shopSearchInput');
  if (shopSearchInput) {
    shopSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderShopProducts();
    });
  }
}

function resetFilters() {
  currentCategory = 'All';
  searchQuery = '';
  currentSort = 'featured';
  
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-category') === 'All');
  });

  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('shopSortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  renderShopProducts();
}

// ==========================================================================
// CART OPERATIONS & LOCAL STORAGE
// ==========================================================================
function addToCart(productId, qty = 1, event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: qty
    });
  }

  saveCart();
  updateHeaderBadges();
  renderCartDrawer();
  openCartDrawer();
  showToast(`Added "${product.name}" to your cart.`);
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateHeaderBadges();
  renderCartDrawer();
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateHeaderBadges();
  renderCartDrawer();
  if (item) {
    showToast(`Removed "${item.name}" from cart.`);
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
}

function calculateCartTotals() {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountPercent = activePromo ? activePromo.percent : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = (subtotal >= 250 || subtotal === 0) ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return { subtotal, discountPercent, discountAmount, shipping, total };
}

function renderCartDrawer() {
  const list = document.getElementById('drawerCartItems');
  const footer = document.getElementById('drawerCartFooter');
  if (!list || !footer) return;

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty-message">
        <svg style="width:48px;height:48px;stroke:#555;fill:none;margin-bottom:12px;" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p style="color:#fff;font-weight:600;margin-bottom:6px;">Your wall art cart is empty</p>
        <p style="font-size:0.85rem;color:#777;">Explore our 20 legendary motorcycle 3D displays and bring your gallery to life.</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';

  // Render items
  list.innerHTML = `
    <div class="cart-items-list">
      ${cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">$${item.price} each</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
            <svg style="width:18px;height:18px;stroke:currentColor;fill:none;" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `).join('')}
    </div>
  `;

  // Calculations
  const { subtotal, discountPercent, discountAmount, shipping, total } = calculateCartTotals();
  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = freeShippingThreshold - subtotal;

  const progressHTML = subtotal >= freeShippingThreshold 
    ? `<div style="font-size:0.78rem;color:#fff;font-family:var(--font-mono);">✓ <strong>FREE INSURED SHIPPING UNLOCKED</strong></div>`
    : `<div style="font-size:0.78rem;color:var(--color-silver);font-family:var(--font-mono);">Add <strong>$${diffToFree}</strong> more for <strong>FREE Insured Delivery</strong></div>`;

  footer.innerHTML = `
    <div style="margin-bottom: 12px;">
      ${progressHTML}
      <div class="shipping-progress-bar">
        <div class="shipping-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <!-- Promo code input -->
    <div style="display:flex;gap:8px;margin-bottom:14px;">
      <input type="text" id="cartPromoInput" placeholder="Promo code (e.g. KINETIC10)" style="flex:1;padding:8px 12px;font-size:0.8rem;text-transform:uppercase;" value="${activePromo ? activePromo.code : ''}">
      <button class="btn btn-secondary btn-sm" onclick="applyPromoCode()">Apply</button>
    </div>

    ${activePromo ? `
      <div style="font-size:0.75rem;color:#4ade80;margin-bottom:10px;display:flex;justify-content:space-between;">
        <span>Promo '${activePromo.code}' applied (-${discountPercent}%)</span>
        <button style="color:#aaa;text-decoration:underline;cursor:pointer;" onclick="removePromoCode()">Remove</button>
      </div>
    ` : ''}

    <div class="drawer-subtotal-row">
      <span class="drawer-subtotal-label">Subtotal</span>
      <span class="drawer-subtotal-value">$${subtotal}</span>
    </div>

    ${discountAmount > 0 ? `
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:#4ade80;margin-bottom:8px;">
        <span>Discount</span>
        <span>-$${discountAmount}</span>
      </div>
    ` : ''}

    <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--color-silver);margin-bottom:16px;">
      <span>Estimated Shipping</span>
      <span>${shipping === 0 ? 'FREE' : '$' + shipping}</span>
    </div>

    <div style="display:flex;justify-content:space-between;font-size:1.1rem;font-weight:800;color:#fff;border-top:1px solid #282828;padding-top:12px;margin-bottom:18px;">
      <span>Estimated Total</span>
      <span>$${total}</span>
    </div>

    <a href="checkout.html" class="btn btn-primary btn-block">
      Proceed to Checkout
    </a>
  `;
}

// Promo Code Logic
function applyPromoCode() {
  const input = document.getElementById('cartPromoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'KINETIC10' || code === 'MOTO10') {
    activePromo = { code: code, percent: 10 };
    localStorage.setItem(STORAGE_PROMO_KEY, JSON.stringify(activePromo));
    showToast(`Promo code '${code}' applied: 10% discount!`);
    renderCartDrawer();
  } else {
    showToast(`Invalid promo code. Try 'KINETIC10' for 10% off.`);
  }
}

function removePromoCode() {
  activePromo = null;
  localStorage.removeItem(STORAGE_PROMO_KEY);
  showToast(`Promo code removed.`);
  renderCartDrawer();
}

// ==========================================================================
// WISHLIST OPERATIONS & LOCAL STORAGE
// ==========================================================================
function toggleWishlist(productId, event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed "${product.name}" from wishlist.`);
  } else {
    wishlist.push(productId);
    showToast(`Saved "${product.name}" to wishlist.`);
  }

  localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
  updateHeaderBadges();
  renderWishlistDrawer();

  // Update card heart buttons across DOM
  document.querySelectorAll(`.product-card[data-id="${productId}"] .card-wishlist-btn`).forEach(btn => {
    btn.classList.toggle('active', wishlist.includes(productId));
  });
}

function renderWishlistDrawer() {
  const list = document.getElementById('drawerWishlistItems');
  if (!list || typeof PRODUCTS_DATA === 'undefined') return;

  if (wishlist.length === 0) {
    list.innerHTML = `
      <div class="cart-empty-message">
        <svg style="width:48px;height:48px;stroke:#555;fill:none;margin-bottom:12px;" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <p style="color:#fff;font-weight:600;margin-bottom:6px;">Your Wishlist is Empty</p>
        <p style="font-size:0.85rem;color:#777;">Save your favorite 3D motorcycle wall sculptures by clicking the heart icon on any product.</p>
      </div>
    `;
    return;
  }

  const items = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));

  list.innerHTML = `
    <div class="cart-items-list">
      ${items.map(p => `
        <div class="cart-item">
          <img class="cart-item-img" src="${p.image}" alt="${p.name}">
          <div class="cart-item-info">
            <h4>${p.name}</h4>
            <div class="cart-item-price">$${p.price}</div>
            <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id}, 1); toggleWishlist(${p.id});">
              Move to Cart
            </button>
          </div>
          <button class="cart-item-remove" onclick="toggleWishlist(${p.id})" title="Remove from wishlist">
            <svg style="width:18px;height:18px;stroke:currentColor;fill:none;" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function updateHeaderBadges() {
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalWishlistCount = wishlist.length;

  document.querySelectorAll('.cart-badge-count').forEach(badge => {
    badge.textContent = totalCartCount;
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  });

  document.querySelectorAll('.wishlist-badge-count').forEach(badge => {
    badge.textContent = totalWishlistCount;
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  });
}

// ==========================================================================
// DRAWERS & MODALS CONTROLLER
// ==========================================================================
function initDrawersAndModals() {
  const backdrop = document.getElementById('drawerBackdrop');
  const cartDrawer = document.getElementById('cartDrawer');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const searchModal = document.getElementById('searchModal');
  const quickViewModal = document.getElementById('quickViewModal');

  // Trigger buttons
  document.getElementById('navCartBtn')?.addEventListener('click', openCartDrawer);
  document.getElementById('navWishlistBtn')?.addEventListener('click', openWishlistDrawer);
  document.getElementById('navSearchBtn')?.addEventListener('click', openSearchModal);

  // Close triggers
  document.querySelectorAll('.close-drawer-btn').forEach(btn => {
    btn.addEventListener('click', closeAllDrawersAndModals);
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeAllDrawersAndModals);
  }

  // Quick View Modal Close
  document.getElementById('quickViewCloseBtn')?.addEventListener('click', () => {
    quickViewModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Search Modal Close
  document.getElementById('searchModalCloseBtn')?.addEventListener('click', () => {
    searchModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Search Input live typing
  const liveSearchInput = document.getElementById('liveModalSearchInput');
  if (liveSearchInput) {
    liveSearchInput.addEventListener('input', (e) => {
      renderSearchModalResults(e.target.value.trim());
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawersAndModals();
    }
  });
}

function openCartDrawer() {
  closeAllDrawersAndModals();
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openWishlistDrawer() {
  closeAllDrawersAndModals();
  const drawer = document.getElementById('wishlistDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openSearchModal() {
  closeAllDrawersAndModals();
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.getElementById('liveModalSearchInput')?.focus();
    }, 150);
  }
}

function closeAllDrawersAndModals() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('wishlistDrawer')?.classList.remove('open');
  document.getElementById('drawerBackdrop')?.classList.remove('active');
  document.getElementById('quickViewModal')?.classList.remove('active');
  document.getElementById('searchModal')?.classList.remove('active');
  document.body.style.overflow = '';
}

// Quick View Modal Renderer
function openQuickView(productId, event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-image-box">
        <img src="${product.image}" alt="${product.name} Miniature Wall Decor">
      </div>
      <div class="quickview-details">
        <span class="card-category" style="font-size:0.75rem;margin-bottom:8px;">${product.category}</span>
        <h2 style="font-size:1.8rem;text-transform:uppercase;margin-bottom:10px;">${product.name}</h2>
        
        <div class="card-rating-row" style="margin-bottom:16px;">
          <div class="stars">★★★★★</div>
          <span class="rating-count" style="font-size:0.85rem;">${product.rating} (${product.reviewsCount} verified collector reviews)</span>
        </div>

        <div class="card-price-row" style="margin-bottom:18px;">
          <span class="current-price" style="font-size:1.8rem;">$${product.price}</span>
          <span class="original-price" style="font-size:1.1rem;">$${product.originalPrice}</span>
          <span style="font-family:var(--font-mono);font-size:0.75rem;background:#282828;padding:2px 8px;border-radius:3px;color:#fff;">Save $${product.originalPrice - product.price}</span>
        </div>

        <p style="font-size:0.95rem;line-height:1.6;color:var(--color-silver-light);margin-bottom:20px;">
          ${product.fullDesc}
        </p>

        <!-- Technical Specs -->
        <table class="specs-table">
          <tr>
            <td>Scale:</td>
            <td>${product.specs.scale}</td>
          </tr>
          <tr>
            <td>Dimensions:</td>
            <td>${product.specs.dimensions}</td>
          </tr>
          <tr>
            <td>Shadowbox:</td>
            <td>${product.specs.frame}</td>
          </tr>
          <tr>
            <td>Glazing:</td>
            <td>${product.specs.glazing}</td>
          </tr>
        </table>

        <!-- Controls -->
        <div style="display:flex;gap:12px;align-items:center;margin:20px 0;">
          <div class="cart-qty-ctrl" style="height:44px;">
            <button class="qty-btn" style="width:36px;height:42px;font-size:1.1rem;" onclick="adjustQuickViewQty(-1)">−</button>
            <span id="quickViewQtyVal" class="qty-display" style="padding:0 14px;font-size:1rem;">1</span>
            <button class="qty-btn" style="width:36px;height:42px;font-size:1.1rem;" onclick="adjustQuickViewQty(1)">+</button>
          </div>
          <button class="btn btn-primary" style="flex:1;" onclick="handleQuickViewAddToCart(${product.id})">
            Add to Cart
          </button>
        </div>

        <div style="display:flex;gap:14px;align-items:center;padding-top:14px;border-top:1px solid #282828;">
          <a href="product.html?id=${product.id}" style="font-size:0.85rem;color:var(--color-white);text-decoration:underline;letter-spacing:0.04em;">
            View Complete Product Page & High-Res Gallery →
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

let quickViewCurrentQty = 1;
function adjustQuickViewQty(delta) {
  quickViewCurrentQty = Math.max(1, quickViewCurrentQty + delta);
  const el = document.getElementById('quickViewQtyVal');
  if (el) el.textContent = quickViewCurrentQty;
}

function handleQuickViewAddToCart(productId) {
  addToCart(productId, quickViewCurrentQty);
  closeAllDrawersAndModals();
  quickViewCurrentQty = 1;
}

// Live Search in Modal
function renderSearchModalResults(term) {
  const container = document.getElementById('searchModalResults');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  if (!term) {
    container.innerHTML = `<p style="text-align:center;color:#666;padding:30px 0;">Start typing a motorcycle name (e.g., Ducati, BMW, Ninja, Bonneville)...</p>`;
    return;
  }

  const results = PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(term.toLowerCase()) ||
    p.category.toLowerCase().includes(term.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(term.toLowerCase())
  );

  if (results.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#888;padding:30px 0;">No matching motorcycle wall art found for "${term}".</p>`;
    return;
  }

  container.innerHTML = results.map(p => `
    <a href="product.html?id=${p.id}" class="search-result-item">
      <img src="${p.image}" alt="${p.name}">
      <div style="flex:1;">
        <h4 style="color:#fff;font-size:0.95rem;margin-bottom:2px;">${p.name}</h4>
        <div style="font-size:0.75rem;color:var(--color-silver);font-family:var(--font-mono);">${p.category} • 1:12 Scale</div>
      </div>
      <div style="font-family:var(--font-heading);font-weight:700;color:#fff;">$${p.price}</div>
    </a>
  `).join('');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg style="width:20px;height:20px;stroke:#fff;fill:none;flex-shrink:0;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

