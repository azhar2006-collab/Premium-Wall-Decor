/**
 * KINETIC MOTO - CHECKOUT ENGINE
 * Handles order summary calculation, shipping choices, customer form validation,
 * payment simulation, and order confirmation receipt generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  initShippingOptions();
  initPaymentTabs();
  initCheckoutForm();
});

let selectedShippingRate = 0; // 0 for Standard Free, 15 for Express

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsList');
  const emptyState = document.getElementById('checkoutEmptyState');
  const mainLayout = document.getElementById('checkoutMainLayout');
  
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem('kinetic_moto_cart_v1')) || [];
  const promo = JSON.parse(localStorage.getItem('kinetic_moto_promo_v1')) || null;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (mainLayout) mainLayout.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (mainLayout) mainLayout.style.display = 'grid';

  // Render items
  container.innerHTML = cart.map(item => `
    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #222;">
      <div style="position:relative;width:56px;height:56px;flex-shrink:0;">
        <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;border:1px solid #333;">
        <span style="position:absolute;top:-6px;right:-6px;background:#fff;color:#000;font-size:0.7rem;font-weight:bold;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${item.qty}</span>
      </div>
      <div style="flex:1;">
        <h4 style="font-size:0.9rem;color:#fff;margin-bottom:2px;">${item.name}</h4>
        <div style="font-size:0.75rem;color:var(--color-silver);font-family:var(--font-mono);">${item.category} • 1:12 Scale</div>
      </div>
      <div style="font-family:var(--font-heading);font-weight:700;color:#fff;">$${item.price * item.qty}</div>
    </div>
  `).join('');

  // Calculations
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const discountPercent = promo ? promo.percent : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = selectedShippingRate;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  document.getElementById('checkoutSubtotal').textContent = `$${subtotal}`;
  document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping}`;
  
  const discountRow = document.getElementById('checkoutDiscountRow');
  if (discountRow) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('checkoutDiscount').textContent = `-$${discountAmount} (${promo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  document.getElementById('checkoutGrandTotal').textContent = `$${total}`;
}

function initShippingOptions() {
  const options = document.querySelectorAll('.shipping-option-card');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const rate = parseInt(opt.getAttribute('data-rate')) || 0;
      selectedShippingRate = rate;
      renderCheckoutSummary();
    });
  });
}

function initPaymentTabs() {
  const tabs = document.querySelectorAll('.payment-tab-btn');
  const panels = document.querySelectorAll('.payment-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.style.display = p.id === target ? 'block' : 'none';
      });
    });
  });
}

function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  const submitBtn = document.getElementById('placeOrderBtn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validity check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Simulate luxury order processing
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#000" stroke-width="3" fill="none" stroke-dasharray="30 60"></circle></svg>
      Securing & Encrypting Order...
    `;

    setTimeout(() => {
      const orderId = 'KM-' + Math.floor(100000 + Math.random() * 900000);
      const name = document.getElementById('custFirstName')?.value + ' ' + document.getElementById('custLastName')?.value;
      const email = document.getElementById('custEmail')?.value;
      const address = document.getElementById('custAddress')?.value + ', ' + document.getElementById('custCity')?.value;
      const grandTotal = document.getElementById('checkoutGrandTotal')?.textContent;

      // Populate Success Modal
      document.getElementById('successOrderId').textContent = orderId;
      document.getElementById('successCustomerName').textContent = name;
      document.getElementById('successCustomerEmail').textContent = email;
      document.getElementById('successShippingAddress').textContent = address;
      document.getElementById('successOrderTotal').textContent = grandTotal;

      // Show modal
      const modal = document.getElementById('orderSuccessModal');
      if (modal) modal.classList.add('active');

      // Clear Cart from localStorage
      localStorage.removeItem('kinetic_moto_cart_v1');
      localStorage.removeItem('kinetic_moto_promo_v1');
      updateHeaderBadges();

      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Order';
    }, 1800);
  });
}

