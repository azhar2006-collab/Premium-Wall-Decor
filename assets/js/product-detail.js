/**
 * KINETIC MOTO - INDIVIDUAL PRODUCT PAGE CONTROLLER
 * Handles URL ?id= param, multi-angle gallery, quantity, specs table,
 * add-to-cart, buy now, and related products rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')) || 1;

  if (typeof PRODUCTS_DATA === 'undefined') {
    console.error('PRODUCTS_DATA not loaded');
    return;
  }

  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];
  renderProductDetail(product);
  renderRelatedProducts(product);
  initAccordions();
});

let detailSelectedQty = 1;

function renderProductDetail(product) {
  // Page Title
  document.title = `${product.name} | 3D Miniature Wall Art | KINETIC MOTO`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  const breadcrumbProduct = document.getElementById('breadcrumbProduct');
  if (breadcrumbCategory) breadcrumbCategory.textContent = product.category;
  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

  // Header & Info
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailTitle').textContent = product.name;
  document.getElementById('detailRatingText').textContent = `${product.rating} (${product.reviewsCount} verified collector reviews)`;
  document.getElementById('detailCurrentPrice').textContent = `$${product.price}`;
  document.getElementById('detailOriginalPrice').textContent = `$${product.originalPrice}`;
  document.getElementById('detailSaveBadge').textContent = `Save $${product.originalPrice - product.price}`;
  document.getElementById('detailShortDesc').textContent = product.shortDesc;
  document.getElementById('detailFullDesc').textContent = product.fullDesc;

  // Main Image & Gallery
  const mainImg = document.getElementById('detailMainImage');
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = `${product.name} 3D Miniature Wall Art`;
  }

  // Gallery Thumbnails
  const thumbsContainer = document.getElementById('detailGalleryThumbs');
  if (thumbsContainer) {
    // Show 3 perspective views using the main image and curated detailed crops
    thumbsContainer.innerHTML = `
      <div class="gallery-thumb active" onclick="switchDetailImage('${product.image}', this)">
        <img src="${product.image}" alt="${product.name} Front Elevation">
      </div>
      <div class="gallery-thumb" onclick="switchDetailImage('assets/images/craft-detail.jpg', this)">
        <img src="assets/images/craft-detail.jpg" alt="${product.name} Precision Macro View">
      </div>
      <div class="gallery-thumb" onclick="switchDetailImage('assets/images/wall-decor-mockup.jpg', this)">
        <img src="assets/images/wall-decor-mockup.jpg" alt="${product.name} Gallery Wall Mount">
      </div>
    `;
  }

  // Specifications Table
  const specsTbody = document.getElementById('detailSpecsTable');
  if (specsTbody) {
    specsTbody.innerHTML = `
      <tr><td>Scale Ratio:</td><td>${product.specs.scale}</td></tr>
      <tr><td>Dimensions:</td><td>${product.specs.dimensions}</td></tr>
      <tr><td>Frame Material:</td><td>${product.specs.frame}</td></tr>
      <tr><td>Backing Plaque:</td><td>${product.specs.backing}</td></tr>
      <tr><td>Glazing Shield:</td><td>${product.specs.glazing}</td></tr>
      <tr><td>Display Weight:</td><td>${product.specs.weight}</td></tr>
      <tr><td>Mounting System:</td><td>${product.specs.mounting}</td></tr>
      <tr><td>Production Batch:</td><td>Limited Collector Run (Individually Numbered)</td></tr>
    `;
  }

  // Add to Cart Button Binding
  const addBtn = document.getElementById('detailAddToCartBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(product.id, detailSelectedQty);
    };
  }

  // Buy Now Button Binding
  const buyBtn = document.getElementById('detailBuyNowBtn');
  if (buyBtn) {
    buyBtn.onclick = () => {
      addToCart(product.id, detailSelectedQty);
      window.location.href = 'checkout.html';
    };
  }

  // Wishlist Button Binding
  const wishBtn = document.getElementById('detailWishlistBtn');
  if (wishBtn) {
    const isWish = wishlist.includes(product.id);
    wishBtn.classList.toggle('active', isWish);
    wishBtn.onclick = () => {
      toggleWishlist(product.id);
      wishBtn.classList.toggle('active', wishlist.includes(product.id));
    };
  }
}

function switchDetailImage(src, thumbElement) {
  const mainImg = document.getElementById('detailMainImage');
  if (mainImg) mainImg.src = src;

  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbElement.classList.add('active');
}

function changeDetailQty(delta) {
  detailSelectedQty = Math.max(1, detailSelectedQty + delta);
  const input = document.getElementById('detailQtyInput');
  if (input) input.value = detailSelectedQty;
}

function renderRelatedProducts(currentProduct) {
  const container = document.getElementById('relatedProductsGrid');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  // Find 4 other products preferably in the same category, or closest IDs
  const related = PRODUCTS_DATA
    .filter(p => p.id !== currentProduct.id)
    .sort((a, b) => (a.category === currentProduct.category ? -1 : 1))
    .slice(0, 4);

  container.innerHTML = related.map(p => createProductCardHTML(p)).join('');
}

function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });
}

