const CART_EMPTY_MESSAGE = 'Your Cart is Empty';

function getCart() {
  return getCartItems();
}

function setCart(items) {
  setCartItems(items);
}

function getWishlistList() {
  return getWishlist();
}

function setWishlistList(items) {
  setWishlist(items);
}

function moveCartToWishlist(productId, variant = {}) {
  const cart = getCart();
  const nextCart = cart.filter((entry) => {
    const sameProduct = String(entry.productId) === String(productId);
    const sameVariant = getCartItemKey(entry.productId, entry.variant || {}) === getCartItemKey(productId, variant);
    return !(sameProduct && sameVariant);
  });

  setCart(nextCart);
  toggleWishlist(productId);
  return true;
}

function getCartSummary(items) {
  const resolved = items
    .map((entry) => {
      const product = getProductById(entry.productId);
      if (!product) return null;
      const quantity = Math.max(1, Number(entry.quantity || 1));
      const variant = entry.variant || {};
      const match = (product.variantStates || []).find((item) =>
        Object.entries(variant).every(([key, value]) => String(item[key] || '') === String(value))
      );
      const selectedVariant = match || product.variantStates?.[0] || {};
      const finalPrice = Number(selectedVariant.price ?? product.price ?? 0);
      const originalPrice = Number(selectedVariant.originalPrice ?? product.originalPrice ?? finalPrice);
      return {
        ...entry,
        product,
        variant: selectedVariant,
        selectedPrice: finalPrice,
        originalPrice,
        quantity,
        lineTotal: finalPrice * quantity,
        originalTotal: originalPrice * quantity
      };
    })
    .filter(Boolean);

  const mrp = resolved.reduce((sum, item) => sum + Number(item.originalTotal || 0), 0);
  const subtotal = resolved.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);
  const discount = Math.max(0, mrp - subtotal);
  const delivery = 0;
  const total = Math.max(0, subtotal - discount + delivery);
  return { resolved, mrp, subtotal, discount, delivery, total, savings: discount };
}

function renderCart() {
  const shell = document.getElementById('cartShell');
  if (!shell) return;

  const items = getCart();
  const summary = getCartSummary(items);

  if (!items.length || !summary.resolved.length) {
    shell.innerHTML = `
      <section class="empty-state-card" aria-live="polite">
        <h2>${CART_EMPTY_MESSAGE}</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a class="primary-btn" href="index.html">Continue Shopping</a>
      </section>
    `;
    return;
  }

  const productMarkup = summary.resolved.map((entry) => {
    const product = entry.product;
    const variantText = entry.variant && Object.keys(entry.variant).length
      ? Object.entries(entry.variant).map(([key, value]) => `${capitalize(key)}: ${value}`).join(' • ')
      : 'Standard';
    const productLink = `product-details.html?id=${product.id}`;

    return `
      <article class="cart-item" data-product-id="${product.id}">
        <a href="${productLink}"><img class="cart-image" src="${product.image}" alt="${product.name}" loading="lazy" /></a>
        <div class="cart-item-details">
          <div class="cart-product-top">
            <div>
              <a href="${productLink}"><h2 class="cart-product-name">${product.name}</h2></a>
              <div class="cart-brand">${product.brand}</div>
            </div>
            <div class="price-current">${formatCurrency(entry.lineTotal)}</div>
          </div>

          <div class="cart-item-meta">
            <span>${variantText}</span>
            <span>${product.category}</span>
            <span>${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          <div class="cart-pricing">
            <span class="price-current">${formatCurrency(entry.selectedPrice)}</span>
            <span class="price-original">${formatCurrency(entry.originalPrice)}</span>
            <span class="discount-pill">${product.discount}% OFF</span>
          </div>

          <div class="cart-actions">
            <div class="qty-control" aria-label="Quantity selector">
              <button class="qty-btn" type="button" data-action="decrease" data-product-id="${product.id}" data-variant='${JSON.stringify(entry.variant || {})}' ${entry.quantity <= 1 ? 'disabled' : ''}>−</button>
              <span>${entry.quantity}</span>
              <button class="qty-btn" type="button" data-action="increase" data-product-id="${product.id}" data-variant='${JSON.stringify(entry.variant || {})}' ${entry.quantity >= Number(product.stock || 999) ? 'disabled' : ''}>+</button>
            </div>

            <div class="cart-links">
              <button class="text-link" type="button" data-action="remove" data-product-id="${product.id}" data-variant='${JSON.stringify(entry.variant || {})}'>Remove</button>
              <button class="ghost-btn" type="button" data-action="wishlist" data-product-id="${product.id}" data-variant='${JSON.stringify(entry.variant || {})}'>Move to Wishlist</button>
              <button class="secondary-btn" type="button" data-action="buy" data-product-id="${product.id}" data-variant='${JSON.stringify(entry.variant || {})}'>Buy Now</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  shell.innerHTML = `
    <div class="cart-layout">
      <section class="cart-main">
        <div class="cart-header">
          <h1>Shopping Cart</h1>
          <span class="meta">${items.length} item${items.length === 1 ? '' : 's'}</span>
        </div>
        <div class="cart-items">${productMarkup}</div>
      </section>

      <aside class="summary-panel">
        <h2 class="summary-heading">Price Details</h2>
        <div class="summary-list">
          <div class="summary-row"><span>MRP</span><strong>${formatCurrency(summary.mrp)}</strong></div>
          <div class="summary-row"><span>Discount</span><strong>-${formatCurrency(summary.discount)}</strong></div>
          <div class="summary-row"><span>Delivery</span><strong>FREE</strong></div>
        </div>
        <div class="summary-total"><span>Total Amount</span><span>${formatCurrency(summary.total)}</span></div>
        <div class="savings-banner">You Save ${formatCurrency(summary.savings)}</div>
        <button class="primary-btn" type="button" id="checkoutBtn">Proceed to Checkout</button>
      </aside>
    </div>
  `;

  bindCartEvents();
}

function capitalize(value) {
  return String(value || '').charAt(0).toUpperCase() + String(value || '').slice(1);
}

function bindCartEvents() {
  document.querySelectorAll('[data-action="increase"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const variant = JSON.parse(button.dataset.variant || '{}');
      const cartItems = getCart();
      const cartItem = cartItems.find((item) =>
        String(item.productId) === String(productId) &&
        getCartItemKey(item.productId, item.variant || {}) === getCartItemKey(productId, variant)
      );
      const product = getProductById(productId);
      const maxQty = Number(product?.stock || 999);
      if (cartItem && cartItem.quantity < maxQty) {
        updateCartQuantity(productId, cartItem.quantity + 1, variant);
        renderCart();
      }
    });
  });

  document.querySelectorAll('[data-action="decrease"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const variant = JSON.parse(button.dataset.variant || '{}');
      const cartItems = getCart();
      const cartItem = cartItems.find((item) =>
        String(item.productId) === String(productId) &&
        getCartItemKey(item.productId, item.variant || {}) === getCartItemKey(productId, variant)
      );
      if (cartItem && cartItem.quantity > 1) {
        updateCartQuantity(productId, cartItem.quantity - 1, variant);
        renderCart();
      }
    });
  });

  document.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const variant = JSON.parse(button.dataset.variant || '{}');
      const next = getCart().filter((entry) => {
        const sameProduct = String(entry.productId) === String(productId);
        const sameVariant = getCartItemKey(entry.productId, entry.variant || {}) === getCartItemKey(productId, variant);
        return !(sameProduct && sameVariant);
      });
      setCart(next);
      renderCart();
    });
  });

  document.querySelectorAll('[data-action="wishlist"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const variant = JSON.parse(button.dataset.variant || '{}');
      moveCartToWishlist(productId, variant);
      renderCart();
    });
  });

  document.querySelectorAll('[data-action="buy"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const variant = JSON.parse(button.dataset.variant || '{}');
      const cartItems = getCart();
      const cartItem = cartItems.find((item) =>
        String(item.productId) === String(productId) &&
        getCartItemKey(item.productId, item.variant || {}) === getCartItemKey(productId, variant)
      );
      const payload = {
        productId: String(productId),
        quantity: Math.max(1, Number(cartItem?.quantity || 1)),
        variant: variant || {}
      };
      localStorage.setItem('NEXORA.SHOP-checkout-buy-now', JSON.stringify(payload));
      window.location.href = `checkout.html?product=${productId}&qty=${payload.quantity}`;
    });
  });

  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    window.location.href = 'checkout.html?mode=cart';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateWishlistCount();
  renderCart();
  updateCartCount();
  if (typeof attachGlobalSearch === 'function') attachGlobalSearch();
});
