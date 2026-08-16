function renderWishlist() {
  const shell = document.getElementById('wishlistShell');
  if (!shell) return;

  const wishlist = getWishlist();
  const products = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (!products.length) {
    shell.innerHTML = `
      <section class="empty-state-card" aria-live="polite">
        <h2>Your Wishlist is Empty</h2>
        <p>Save products you love to compare, revisit, and purchase later.</p>
        <a class="primary-btn" href="../index.html">Discover Products</a>
      </section>
    `;
    return;
  }

  shell.innerHTML = `
    <div class="wishlist-grid">
      ${products.map((product) => `
        <article class="wishlist-card" data-product-id="${product.id}">
          <div class="wishlist-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <button class="wishlist-remove" type="button" data-action="remove" data-product-id="${product.id}" aria-label="Remove ${product.name} from wishlist">♥</button>
          </div>
          <div class="wishlist-body">
            <h2 class="wishlist-name">${product.name}</h2>
            <div class="wishlist-meta">
              <span>${product.brand}</span>
              <span>${product.rating || 4.7} ★</span>
            </div>
            <div class="wishlist-price">
              <strong>${formatCurrency(product.price)}</strong>
              <span>${formatCurrency(product.originalPrice || product.price)}</span>
            </div>
            <div class="wishlist-actions">
              <button class="primary-btn" type="button" data-action="cart" data-product-id="${product.id}">Add to Cart</button>
              <button class="secondary-btn" type="button" data-action="buy" data-product-id="${product.id}">Buy Now</button>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  bindWishlistEvents();
}

function bindWishlistEvents() {
  document.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      toggleWishlist(productId);
      renderWishlist();
    });
  });

  document.querySelectorAll('[data-action="cart"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1, {});
      toggleWishlist(productId);
      renderWishlist();
    });
  });

  document.querySelectorAll('[data-action="buy"]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const payload = { productId: String(productId), quantity: 1, variant: {} };
      localStorage.setItem('NEXORA.SHOP-checkout-buy-now', JSON.stringify(payload));
      window.location.href = `checkout.html?product=${productId}&qty=1`;
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateWishlistCount();
  renderWishlist();
  updateCartCount();
  if (typeof attachGlobalSearch === 'function') attachGlobalSearch();
});
