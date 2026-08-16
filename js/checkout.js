const CHECKOUT_ADDRESS_KEY = 'NEXORA.SHOP-address';
const CHECKOUT_ORDERS_KEY = 'NEXORA.SHOP-orders';
const CHECKOUT_BUY_NOW_KEY = 'NEXORA.SHOP-checkout-buy-now';
const COUPONS = [
  { code: 'SAVE10', type: 'percent', value: 10 },
  { code: 'FLAT500', type: 'fixed', value: 500 },
  { code: 'WELCOME', type: 'percent', value: 8 }
];

const checkoutState = {
  items: [],
  step: 1,
  address: {
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    landmark: ''
  },
  errors: {},
  selectedCoupon: '',
  paymentMethod: '',
  confirmation: null,
  isOrderHistoryView: false
};

function getSavedAddress() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHECKOUT_ADDRESS_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...checkoutState.address, ...saved } : { ...checkoutState.address };
  } catch (error) {
    return { ...checkoutState.address };
  }
}

function setSavedAddress(address) {
  localStorage.setItem(CHECKOUT_ADDRESS_KEY, JSON.stringify(address));
}

function getOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(CHECKOUT_ORDERS_KEY) || '[]');
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    return [];
  }
}

function setOrders(orders) {
  localStorage.setItem(CHECKOUT_ORDERS_KEY, JSON.stringify(orders));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function getDeliveryWindow(product) {
  const baseDays = product?.delivery?.estimated ? Number.parseInt(product.delivery.estimated, 10) || 4 : 4;
  const businessDays = Math.max(2, baseDays);
  const date = new Date();
  let addedDays = 0;
  while (addedDays < businessDays) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      addedDays += 1;
    }
  }
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function getVariantMatch(product, variant) {
  if (!product || !Array.isArray(product.variantStates) || !product.variantStates.length) {
    return null;
  }

  if (!variant || typeof variant !== 'object') {
    return product.variantStates[0];
  }

  const keys = Object.keys(variant).filter((key) => key && variant[key] !== undefined && variant[key] !== null && variant[key] !== '');
  if (!keys.length) return product.variantStates[0];

  return product.variantStates.find((entry) => keys.every((key) => String(entry[key]).toLowerCase() === String(variant[key]).toLowerCase())) || product.variantStates[0];
}

function buildSelectedItem(product, quantity, variant = {}) {
  const selectedVariant = getVariantMatch(product, variant) || {};
  const finalPrice = Number(selectedVariant.price ?? product.price ?? 0);
  const originalPrice = Number(selectedVariant.originalPrice ?? product.originalPrice ?? finalPrice);
  const qty = Math.max(1, Number(quantity) || 1);
  const stock = Number(selectedVariant.stock ?? product.stock ?? 0);
  const deliveryCharge = product.delivery?.free ? 0 : Number(product.delivery?.charge || 0);

  return {
    id: product.id,
    product,
    variant: selectedVariant,
    quantity: Math.min(qty, stock || qty),
    selectedPrice: finalPrice,
    originalPrice,
    stock,
    deliveryCharge,
    deliveryDate: getDeliveryWindow(product)
  };
}

function getCheckoutSource() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const productId = params.get('product');
  const qtyParam = Number(params.get('qty') || '1');
  const buyNow = (() => {
    try {
      return JSON.parse(localStorage.getItem(CHECKOUT_BUY_NOW_KEY) || 'null');
    } catch (error) {
      return null;
    }
  })();

  if (mode === 'cart') {
    const cartItems = Array.isArray(window.getCartItems?.()) ? window.getCartItems() : [];
    if (!cartItems.length) {
      return { error: 'Empty cart', items: [] };
    }

    const normalized = cartItems.map((entry) => {
      const product = window.getProductById?.(entry.productId) || null;
      if (!product) return null;
      return buildSelectedItem(product, entry.quantity || 1, entry.variant || {});
    }).filter(Boolean);

    if (!normalized.length) {
      return { error: 'Product not found', items: [] };
    }
    return { error: '', items: normalized };
  }

  if (productId || buyNow?.productId) {
    const resolvedId = productId || buyNow.productId;
    const product = window.getProductById?.(resolvedId) || null;
    if (!product) {
      return { error: 'Product not found', items: [] };
    }

    const qty = Number((buyNow && buyNow.quantity) || qtyParam || 1);
    const selectedItem = buildSelectedItem(product, qty, buyNow?.variant || {});
    return { error: '', items: [selectedItem] };
  }

  const cartItems = Array.isArray(window.getCartItems?.()) ? window.getCartItems() : [];
  if (cartItems.length) {
    const normalized = cartItems.map((entry) => {
      const product = window.getProductById?.(entry.productId) || null;
      if (!product) return null;
      return buildSelectedItem(product, entry.quantity || 1, entry.variant || {});
    }).filter(Boolean);
    if (normalized.length) return { error: '', items: normalized };
  }

  return { error: 'Product not found', items: [] };
}

function calculateSummary() {
  const subtotal = checkoutState.items.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const mrp = checkoutState.items.reduce((sum, item) => sum + ((item.originalPrice || item.selectedPrice) * item.quantity), 0);
  const productDiscount = Math.max(0, mrp - subtotal);
  const couponDiscount = getCouponDiscount(subtotal);
  const deliveryFee = checkoutState.items.reduce((sum, item) => sum + Number(item.deliveryCharge || 0), 0);
  const taxes = Math.round((subtotal - productDiscount - couponDiscount + deliveryFee) * 0.05);
  const serviceFee = subtotal > 0 ? 49 : 0;
  const total = Math.max(0, subtotal - productDiscount - couponDiscount + deliveryFee + taxes + serviceFee);

  return {
    subtotal,
    mrp,
    productDiscount,
    couponDiscount,
    deliveryFee,
    taxes,
    serviceFee,
    total,
    savings: Math.max(0, productDiscount + couponDiscount)
  };
}

function getCouponDiscount(subtotal) {
  if (!checkoutState.selectedCoupon) return 0;
  const coupon = COUPONS.find((entry) => entry.code === checkoutState.selectedCoupon);
  if (!coupon) return 0;
  if (coupon.type === 'percent') {
    return Math.round((subtotal * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotal);
}

function validateAddress(address) {
  const errors = {};
  if (!address.name || address.name.trim().length < 2) errors.name = 'Please enter a valid full name.';
  if (!/^[6-9]\d{9}$/.test(String(address.mobile || '').replace(/\s+/g, ''))) errors.mobile = 'Mobile number must be 10 digits starting with 6-9.';
  if (!/^\d{6}$/.test(String(address.pincode || '').trim())) errors.pincode = 'PIN code must be a valid 6-digit number.';
  if (!address.address || address.address.trim().length < 5) errors.address = 'Please enter your house or street details.';
  if (!address.city || address.city.trim().length < 2) errors.city = 'Please enter your city.';
  if (!address.state || address.state.trim().length < 2) errors.state = 'Please enter your state.';
  return errors;
}

function renderLoading() {
  const shell = document.getElementById('checkoutShell');
  if (!shell) return;
  shell.innerHTML = `
    <div class="checkout-loading" aria-label="Loading checkout">
      <div class="skeleton-line" style="width: 42%;"></div>
      <div class="skeleton-line" style="width: 94%;"></div>
      <div class="skeleton-line" style="width: 90%;"></div>
      <div class="skeleton-line" style="width: 70%;"></div>
    </div>
  `;
}

function createStepper() {
  return `
    <div class="checkout-steps" aria-label="Checkout steps">
      <div class="checkout-step ${checkoutState.step === 1 ? 'active' : ''} ${checkoutState.step > 1 ? 'complete' : ''}">
        <span class="step-indicator">${checkoutState.step > 1 ? '✓' : '1'}</span>
        <span>Address</span>
      </div>
      <div class="checkout-step ${checkoutState.step === 2 ? 'active' : ''} ${checkoutState.step > 2 ? 'complete' : ''}">
        <span class="step-indicator">${checkoutState.step > 2 ? '✓' : '2'}</span>
        <span>Order Summary</span>
      </div>
      <div class="checkout-step ${checkoutState.step === 3 ? 'active' : ''} ${checkoutState.step > 3 ? 'complete' : ''}">
        <span class="step-indicator">${checkoutState.step > 3 ? '✓' : '3'}</span>
        <span>Payment</span>
      </div>
    </div>
  `;
}

function renderAddressStep() {
  const address = checkoutState.address;
  const errors = checkoutState.errors;

  return `
    <section class="checkout-panel checkout-header-panel">
      ${createStepper()}
    </section>

    <section class="checkout-panel checkout-content">
      <h2 class="section-title">Delivery Address</h2>
      <div class="form-grid">
        <div class="field ${errors.name ? 'error' : ''}">
          <label for="fullName">Full Name</label>
          <input id="fullName" name="name" value="${escapeHtml(address.name)}" placeholder="Enter your full name" />
          <span class="error-text">${errors.name || ''}</span>
        </div>

        <div class="field ${errors.mobile ? 'error' : ''}">
          <label for="mobileNumber">Mobile Number</label>
          <input id="mobileNumber" name="mobile" value="${escapeHtml(address.mobile)}" placeholder="10-digit mobile number" />
          <span class="error-text">${errors.mobile || ''}</span>
        </div>

        <div class="field ${errors.pincode ? 'error' : ''}">
          <label for="pinCode">PIN Code</label>
          <input id="pinCode" name="pincode" value="${escapeHtml(address.pincode)}" placeholder="6-digit PIN" />
          <span class="error-text">${errors.pincode || ''}</span>
        </div>

        <div class="field ${errors.city ? 'error' : ''}">
          <label for="city">City</label>
          <input id="city" name="city" value="${escapeHtml(address.city)}" placeholder="City" />
          <span class="error-text">${errors.city || ''}</span>
        </div>

        <div class="field full ${errors.address ? 'error' : ''}">
          <label for="houseAddress">House / Building / Street</label>
          <textarea id="houseAddress" name="address" placeholder="House number, street name, area">${escapeHtml(address.address)}</textarea>
          <span class="error-text">${errors.address || ''}</span>
        </div>

        <div class="field ${errors.state ? 'error' : ''}">
          <label for="state">State</label>
          <input id="state" name="state" value="${escapeHtml(address.state)}" placeholder="State" />
          <span class="error-text">${errors.state || ''}</span>
        </div>

        <div class="field">
          <label for="landmark">Landmark (Optional)</label>
          <input id="landmark" name="landmark" value="${escapeHtml(address.landmark)}" placeholder="Nearby landmark" />
          <span class="error-text"></span>
        </div>
      </div>

      <div class="inline-actions">
        <button type="button" class="primary-btn" data-action="save-address">Save & Continue</button>
        <button type="button" class="ghost-btn" data-action="change-address">Change Address</button>
      </div>
    </section>
  `;
}

function renderOrderSummaryStep() {
  const summary = calculateSummary();
  const activeCoupon = COUPONS.find((entry) => entry.code === checkoutState.selectedCoupon);

  return `
    <section class="checkout-panel checkout-header-panel">
      ${createStepper()}
    </section>

    <section class="checkout-panel checkout-content">
      <h2 class="section-title">Order Summary</h2>
      <div class="order-items">
        ${checkoutState.items.map((item) => {
          const product = item.product;
          const variantLabel = Object.entries(item.variant || {})
            .filter(([, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => `${titleCase(key)}: ${value}`)
            .join(' • ');

          return `
            <article class="product-checkout-card">
              <img src="${product.image}" alt="${product.name}" loading="lazy" />
              <div class="product-meta">
                <h4>${product.name}</h4>
                <span class="brand">Brand: ${product.brand}</span>
                <span class="variant">${variantLabel || 'Default variant'}</span>
                <span class="rating"><span class="stars">${renderStars(product.rating || 4.5)}</span> ${product.rating || 4.5} (${product.reviews || 0} reviews)</span>
                <span class="stock">Qty: ${item.quantity}</span>
                <span class="delivery">Delivery by ${item.deliveryDate}</span>
                <div class="price-line">
                  <span class="final-price">${formatCurrency(item.selectedPrice * item.quantity)}</span>
                  <span class="original-price">${formatCurrency((item.originalPrice || item.selectedPrice) * item.quantity)}</span>
                  <span class="discount-tag">-${Math.round(((item.originalPrice || item.selectedPrice) - item.selectedPrice) / Math.max(item.originalPrice || item.selectedPrice, 1) * 100)}%</span>
                </div>
                ${getProductSpecificInfo(product)}
              </div>
            </article>
          `;
        }).join('')}
      </div>

      <div class="coupon-box">
        <button class="secondary-btn" type="button" data-action="toggle-coupons">Apply Coupon</button>
        <div class="coupon-actions" id="couponList" style="display: none;">
          ${COUPONS.map((coupon) => `
            <button class="coupon-btn ${checkoutState.selectedCoupon === coupon.code ? 'active' : ''}" type="button" data-coupon="${coupon.code}">${coupon.code}</button>
          `).join('')}
        </div>
      </div>

      <div class="inline-actions">
        <button type="button" class="primary-btn" data-action="continue-payment">Continue to Payment</button>
      </div>
    </section>
  `;
}

function renderPaymentStep() {
  const summary = calculateSummary();
  return `
    <section class="checkout-panel checkout-header-panel">
      ${createStepper()}
    </section>

    <section class="checkout-panel checkout-content">
      <h2 class="section-title">Payment</h2>
      <div class="payment-options">
        ${[
          { value: 'upi', label: 'UPI', icon: 'fa-solid fa-mobile-screen-button' },
          { value: 'card', label: 'Credit / Debit Card', icon: 'fa-regular fa-credit-card' },
          { value: 'netbanking', label: 'Net Banking', icon: 'fa-solid fa-building-columns' },
          { value: 'wallet', label: 'Wallet', icon: 'fa-solid fa-wallet' },
          { value: 'cod', label: 'Cash on Delivery', icon: 'fa-solid fa-truck-fast' }
        ].map((option) => `
          <button type="button" class="payment-option ${checkoutState.paymentMethod === option.value ? 'selected' : ''}" data-payment="${option.value}">
            <span class="payment-icon"><i class="${option.icon}"></i></span>
            <span>${option.label}</span>
          </button>
        `).join('')}
      </div>

      <div class="inline-actions">
        <button type="button" class="primary-btn" data-action="place-order">Place Order</button>
      </div>
    </section>
  `;
}

function renderConfirmation() {
  const order = checkoutState.confirmation;
  if (!order) return '';
  return `
    <section class="checkout-panel order-confirmation">
      <div class="confirmation-mark"><i class="fa-solid fa-check"></i></div>
      <h2>Order Placed Successfully!</h2>
      <p>Your order is confirmed and will be processed shortly.</p>

      <div class="confirmation-grid">
        <div class="confirmation-item"><strong>Order ID</strong><span>${order.orderId}</span></div>
        <div class="confirmation-item"><strong>Product</strong><span>${order.products.map((item) => item.name).join(', ')}</span></div>
        <div class="confirmation-item"><strong>Quantity</strong><span>${order.products.reduce((sum, item) => sum + Number(item.quantity || 0), 0)}</span></div>
        <div class="confirmation-item"><strong>Total Amount</strong><span>${formatCurrency(order.total)}</span></div>
        <div class="confirmation-item"><strong>Delivery Date</strong><span>${order.deliveryDate}</span></div>
        <div class="confirmation-item"><strong>Payment Method</strong><span>${order.paymentMethodLabel}</span></div>
      </div>

      <div class="inline-actions" style="justify-content: center; margin-top: 1.2rem;">
        <a href="index.html" class="primary-btn" style="display:inline-flex; align-items:center; justify-content:center;">Continue Shopping</a>
        <a href="checkout.html?view=orders" class="secondary-btn" style="display:inline-flex; align-items:center; justify-content:center;">View Order</a>
      </div>
    </section>
  `;
}

function renderOrderHistory() {
  const orders = getOrders();
  if (!orders.length) {
    return `
      <section class="checkout-panel checkout-content">
        <h2 class="section-title">Account & Orders</h2>
        <div class="empty-state">
          <h3>No orders yet</h3>
          <p>Your placed orders will appear here.</p>
          <a href="index.html" class="primary-btn" style="display:inline-flex; margin-top: 1rem; align-items:center; justify-content:center;">Continue Shopping</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="checkout-panel checkout-content">
      <h2 class="section-title">Account & Orders</h2>
      <div class="order-history-list">
        ${orders.map((order) => `
          <article class="history-card">
            <div class="history-card-header">
              <strong>${order.orderId}</strong>
              <span class="badge-pill">${order.status}</span>
            </div>
            <ul>
              <li>Placed on: ${order.orderDate}</li>
              <li>Items: ${order.products.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</li>
              <li>Total: ${formatCurrency(order.total)}</li>
              <li>Delivery: ${order.deliveryDate}</li>
            </ul>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderSummarySidebar() {
  const summary = calculateSummary();
  const shippingText = summary.deliveryFee === 0 ? 'FREE' : formatCurrency(summary.deliveryFee);

  return `
    <aside class="checkout-summary">
      <div class="summary-header">
        <h3>Price Details</h3>
        <span>${checkoutState.items.length} item${checkoutState.items.length > 1 ? 's' : ''}</span>
      </div>

      <div class="price-list">
        <div class="price-row"><span>MRP</span><span>${formatCurrency(summary.mrp)}</span></div>
        <div class="price-row"><span>Product Discount</span><span class="discount">- ${formatCurrency(summary.productDiscount)}</span></div>
        <div class="price-row"><span>Coupon Discount</span><span class="discount">- ${formatCurrency(summary.couponDiscount)}</span></div>
        <div class="price-row"><span>Delivery Fee</span><span>${shippingText}</span></div>
        <div class="price-row"><span>Taxes</span><span>${formatCurrency(summary.taxes)}</span></div>
        <div class="price-row"><span>Platform / Service Fee</span><span>${formatCurrency(summary.serviceFee)}</span></div>
        <div class="price-row total"><span>Total Amount</span><span>${formatCurrency(summary.total)}</span></div>
      </div>

      ${summary.savings > 0 ? `<div class="savings-banner">You will save ${formatCurrency(summary.savings)} on this order</div>` : ''}
      <div class="price-row"><span>Deliver to</span><span>${escapeHtml(checkoutState.address.city || 'Your city')}</span></div>
      <div class="price-row"><span>Estimated Delivery</span><span>${checkoutState.items[0]?.deliveryDate || '4-6 business days'}</span></div>
    </aside>
  `;
}

function renderCheckout() {
  const shell = document.getElementById('checkoutShell');
  if (!shell) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'orders') {
    checkoutState.isOrderHistoryView = true;
    shell.innerHTML = `
      <div class="checkout-shell">
        <div class="checkout-main">
          ${renderOrderHistory()}
        </div>
      </div>
    `;
    return;
  }

  checkoutState.isOrderHistoryView = false;
  if (checkoutState.items.length === 0) {
    const source = getCheckoutSource();
    if (source.error) {
      shell.innerHTML = `
        <div class="checkout-shell">
          <div class="checkout-main">
            <section class="checkout-panel checkout-content">
              <h2 class="section-title">Product not found</h2>
              <p>${source.error === 'Empty cart' ? 'Your cart is empty. Add a product to continue.' : 'The selected product could not be found.'}</p>
              <div class="inline-actions">
                <a href="index.html" class="primary-btn" style="display:inline-flex; align-items:center; justify-content:center;">Back to Shopping</a>
              </div>
            </section>
          </div>
        </div>
      `;
      return;
    }

    checkoutState.items = source.items;
  }

  const content = checkoutState.step === 1 ? renderAddressStep() : checkoutState.step === 2 ? renderOrderSummaryStep() : renderPaymentStep();

  shell.innerHTML = `
    <div class="checkout-shell">
      <div class="checkout-main">
        ${content}
      </div>
      ${checkoutState.step === 4 ? '' : renderSummarySidebar()}
    </div>
    ${checkoutState.step === 4 ? renderConfirmation() : ''}
  `;

  if (checkoutState.step === 1) {
    bindAddressEvents();
  }

  bindCommonEvents();
}

function bindAddressEvents() {
  document.querySelector('[data-action="save-address"]')?.addEventListener('click', () => {
    const form = {
      name: document.getElementById('fullName')?.value || '',
      mobile: document.getElementById('mobileNumber')?.value || '',
      pincode: document.getElementById('pinCode')?.value || '',
      address: document.getElementById('houseAddress')?.value || '',
      city: document.getElementById('city')?.value || '',
      state: document.getElementById('state')?.value || '',
      landmark: document.getElementById('landmark')?.value || ''
    };

    checkoutState.errors = validateAddress(form);
    if (Object.keys(checkoutState.errors).length) {
      checkoutState.address = form;
      renderCheckout();
      return;
    }

    checkoutState.address = form;
    setSavedAddress(form);
    checkoutState.step = 2;
    renderCheckout();
  });

  document.querySelector('[data-action="change-address"]')?.addEventListener('click', () => {
    checkoutState.errors = {};
    checkoutState.address = getSavedAddress();
    renderCheckout();
  });
}

function bindCommonEvents() {
  document.querySelector('[data-action="toggle-coupons"]')?.addEventListener('click', () => {
    const list = document.getElementById('couponList');
    if (list) list.style.display = list.style.display === 'none' ? 'flex' : 'none';
  });

  document.querySelectorAll('[data-coupon]').forEach((button) => {
    button.addEventListener('click', () => {
      const code = String(button.dataset.coupon || '');
      checkoutState.selectedCoupon = code;
      renderCheckout();
    });
  });

  document.querySelector('[data-action="continue-payment"]')?.addEventListener('click', () => {
    const validationErrors = validateAddress(checkoutState.address);
    if (Object.keys(validationErrors).length) {
      checkoutState.errors = validationErrors;
      checkoutState.step = 1;
      renderCheckout();
      return;
    }

    const invalidStock = checkoutState.items.some((item) => (item.stock || 0) < item.quantity);
    if (invalidStock) {
      const message = 'One or more products exceed the available stock.';
      window.alert(message);
      return;
    }

    checkoutState.step = 3;
    renderCheckout();
  });

  document.querySelectorAll('[data-payment]').forEach((button) => {
    button.addEventListener('click', () => {
      checkoutState.paymentMethod = button.dataset.payment;
      renderCheckout();
    });
  });

  document.querySelector('[data-action="place-order"]')?.addEventListener('click', () => {
    const validationErrors = validateAddress(checkoutState.address);
    if (Object.keys(validationErrors).length || !checkoutState.paymentMethod) {
      checkoutState.errors = validationErrors;
      if (!checkoutState.paymentMethod) {
        window.alert('Please select a payment method.');
      }
      checkoutState.step = checkoutState.paymentMethod ? 1 : 3;
      renderCheckout();
      return;
    }

    const invalidStock = checkoutState.items.some((item) => (item.stock || 0) < item.quantity);
    if (invalidStock) {
      window.alert('Selected quantity is more than available stock.');
      return;
    }

    const summary = calculateSummary();
    const productList = checkoutState.items.map((item) => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.selectedPrice,
      variant: item.variant
    }));

    const order = {
      orderId: `ALI-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      products: productList,
      address: { ...checkoutState.address },
      paymentMethod: checkoutState.paymentMethod,
      paymentMethodLabel: document.querySelector('[data-payment].selected')?.textContent?.trim() || checkoutState.paymentMethod,
      subtotal: summary.subtotal,
      discount: summary.productDiscount + summary.couponDiscount,
      deliveryFee: summary.deliveryFee,
      tax: summary.taxes,
      total: summary.total,
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      deliveryDate: checkoutState.items[0]?.deliveryDate || '4-6 business days',
      status: 'Order Placed'
    };

    const orders = getOrders();
    orders.unshift(order);
    setOrders(orders);
    checkoutState.confirmation = order;
    checkoutState.step = 4;
    const purchasedKeys = checkoutState.items.map((item) => ({
      key: `${item.id}|${Object.entries(item.variant || {}).map(([k, v]) => `${k}:${String(v).toLowerCase()}`).join('|')}`,
      productId: item.id,
      variant: item.variant || {}
    }));
    if (typeof window.removePurchasedCartItems === 'function') {
      window.removePurchasedCartItems(purchasedKeys);
    }
    localStorage.removeItem(CHECKOUT_BUY_NOW_KEY);
    renderCheckout();
  });
}

function renderStars(rating) {
  const filled = '★'.repeat(Math.round(rating));
  const empty = '☆'.repeat(5 - Math.round(rating));
  return `${filled}${empty}`;
}

function getProductSpecificInfo(product) {
  const entries = Object.entries(product.specifications || {});
  const allowed = ['Warranty', 'Storage', 'RAM', 'Model', 'Color', 'Material', 'Size', 'Dimensions', 'Assembly'];
  const validEntries = entries.filter(([key]) => allowed.includes(key));
  if (!validEntries.length) return '';

  return `<div class="info-chip-group">${validEntries.slice(0, 3).map(([key, value]) => `<span class="info-chip">${key}: ${value}</span>`).join('')}</div>`;
}

function titleCase(value) {
  return String(value || '').replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (match) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match]));
}

function initCheckout() {
  checkoutState.address = getSavedAddress();
  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'orders') {
    renderCheckout();
    return;
  }

  const source = getCheckoutSource();
  if (source.error) {
    checkoutState.items = [];
    renderCheckout();
    return;
  }

  checkoutState.items = source.items;
  if (!checkoutState.address.name && !checkoutState.address.mobile) {
    checkoutState.address = { ...checkoutState.address, ...{ name: 'Demo User', mobile: '9876543210', pincode: '413512', address: 'Main Street', city: 'Latur', state: 'Maharashtra', landmark: 'Near City Center' } };
  }
  renderCheckout();
}

document.addEventListener('DOMContentLoaded', () => {
  renderLoading();
  setTimeout(() => {
    initCheckout();
  }, 400);
});
