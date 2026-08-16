const productShell = document.getElementById('productShell');
const toast = document.getElementById('toast');
let state = {
  product: null,
  imageIndex: 0,
  quantity: 1,
  selectedVariant: null,
  currentView: null,
  recentIds: []
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function getParameterByName(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getRecentViews() {
  try {
    return JSON.parse(localStorage.getItem('NEXORA.SHOP-recently-viewed') || '[]');
  } catch (error) {
    return [];
  }
}

function saveRecentView(productId) {
  const next = [String(productId), ...getRecentViews().filter((id) => String(id) !== String(productId))].slice(0, 6);
  localStorage.setItem('NEXORA.SHOP-recently-viewed', JSON.stringify(next));
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('NEXORA.SHOP-wishlist') || '[]');
  } catch (error) {
    return [];
  }
}

function setWishlist(list) {
  localStorage.setItem('NEXORA.SHOP-wishlist', JSON.stringify(list));
}

function startLoading() {
  if (!productShell) return;
  productShell.innerHTML = `
    <section class="product-loading" aria-label="Loading product details">
      <div class="skeleton-bar" style="width: 35%;"></div>
      <div class="skeleton-bar" style="width: 85%;"></div>
      <div class="skeleton-bar" style="width: 68%;"></div>
      <div class="skeleton-bar" style="width: 92%;"></div>
    </section>
  `;
}

function renderNotFound() {
  if (!productShell) return;
  productShell.innerHTML = `
    <section class="product-error" aria-label="Product not found">
      <h2>Product Not Found</h2>
      <p>The selected product could not be found. Please return to browsing and try another item.</p>
      <a class="btn-primary" href="index.html">Back to Shopping</a>
    </section>
  `;
}

function renderProduct() {
  if (!productShell || !state.product) return;
  const product = state.product;
  const selectedVariant = state.selectedVariant || product.variantStates?.[0] || null;
  const price = selectedVariant?.price || product.price;
  const stockStatus = selectedVariant?.stock ?? product.stock;
  const stockText = stockStatus > 0 ? (stockStatus <= 5 ? `Only ${stockStatus} left` : 'In stock') : 'Out of stock';
  const stockClass = stockStatus > 0 ? '' : 'out';
  const priceDifference = product.originalPrice - price;
  const savingsText = priceDifference > 0 ? `Save ${formatCurrency(priceDifference)}` : '';
  const reviewsDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = star === 5 ? Math.floor(product.reviews / 6) : star === 4 ? Math.floor(product.reviews / 10) : star === 3 ? 8 : star === 2 ? 3 : 2;
    const percent = Math.max(10, Math.min(100, count));
    return `<div>${star} Stars <span><strong style="width:${percent}%"></strong></span></div>`;
  }).join('');
  const offersMarkup = (product.offers || []).map((offer) => `
    <article class="offer-card">
      <strong>${offer.title}</strong>
      <p>${offer.description}</p>
      <a href="#">${offer.action}</a>
    </article>
  `).join('');
  const benefitsMarkup = (product.benefits || []).map((benefit) => `<span class="benefit-pill">${benefit}</span>`).join('');
  const variantsMarkup = Object.entries(product.variants || {}).map(([key, values]) => `
    <div class="variant-row">
      <strong>${key[0].toUpperCase() + key.slice(1)}:</strong>
      ${values.map((value) => `<button class="variant-pill" type="button" data-variant-type="${key}" data-variant-value="${value}">${value}</button>`).join('')}
    </div>
  `).join('');
  const relatedMarkup = getRelatedProducts(product, 4).map((item) => `
    <article class="related-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <strong>${item.name}</strong>
      <span>${item.category}</span>
      <a href="product-details.html?id=${item.id}">View Product</a>
    </article>
  `).join('');
  const recentMarkup = getRecentViews().filter((id) => String(id) !== String(product.id)).slice(0, 4).map((id) => {
    const item = getProductById(id);
    return item ? `
      <article class="related-item">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <strong>${item.name}</strong>
        <a href="product-details.html?id=${item.id}">Open</a>
      </article>
    ` : '';
  }).join('');
  const wishlistActive = getWishlist().includes(String(product.id));

  productShell.innerHTML = `
    <section class="product-details-card" aria-label="Product details">
      <nav class="product-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span>/</span>
        <a href="${product.category === 'Electronics' ? 'electronics.html' : product.category === 'Fashion' ? 'fashion.html' : 'index.html'}">${product.category}</a>
        <span>/</span>
        <a href="${product.category === 'Electronics' ? 'electronics.html' : product.category === 'Fashion' ? 'fashion.html' : 'index.html'}">${product.subcategory}</a>
        <span>/</span>
        <span>${product.name}</span>
      </nav>

      <div class="product-grid">
        <section class="gallery-card" aria-label="Product gallery">
          <div class="gallery-main">
            <img id="galleryMainImage" src="${(product.images || [product.image])[state.imageIndex] || product.image}" alt="${product.name}" />
            <div class="gallery-nav">
              <button type="button" class="gallery-prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
              <button type="button" class="gallery-next" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          <div class="gallery-thumbs" role="listbox" aria-label="Product thumbnails">
            ${(product.images || [product.image]).map((image, index) => `
              <button type="button" class="${index === state.imageIndex ? 'active' : ''}" data-index="${index}" aria-label="Show image ${index + 1}">
                <img src="${image}" alt="${product.name} thumbnail ${index + 1}" loading="lazy" />
              </button>
            `).join('')}
          </div>
          <div class="badge-row" style="margin-top:0.8rem;">
            <span class="badge-pill">${product.badge}</span>
            <span class="badge-pill">NEXORA.SHOP Choice</span>
            <span class="badge-pill">Top Rated</span>
          </div>
        </section>

        <section class="info-card" aria-label="Product information">
          <div class="badge-row">
            <span class="badge-pill">${product.brand}</span>
            <span class="badge-pill">${product.category}</span>
            <span class="badge-pill">${product.tag}</span>
          </div>
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="badge-row">
            <span class="badge-pill">★ ${product.rating}</span>
            <span class="badge-pill">${product.reviews} reviews</span>
            <span class="badge-pill"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>
          </div>

          <div class="price-row">
            <div class="price-current">${formatCurrency(price)}</div>
            <div class="badge-row">
              <span class="price-original">${formatCurrency(product.originalPrice)}</span>
              <span class="badge-pill">-${product.discount}%</span>
              <span class="price-savings">${savingsText}</span>
            </div>
            <div class="badge-row">
              <span class="badge-pill">Tax included</span>
              <span class="badge-pill">Free shipping on orders over ₹999</span>
            </div>
          </div>

          ${product.deal ? `<div class="offer-card"><strong>Limited Time Deal</strong><p>Deal price ${formatCurrency(price)} • Ends soon</p></div>` : ''}

          <div class="offer-list">${offersMarkup}</div>
          <div class="benefit-row">${benefitsMarkup}</div>
          <div>${variantsMarkup}</div>
          <div>
            <h3>Highlights</h3>
            <ul>${(product.highlights || []).map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </section>

        <aside class="purchase-card" aria-label="Purchase panel">
          <div class="price-row">
            <div class="price-current">${formatCurrency(price)}</div>
            <div class="badge-row">
              <span class="price-original">${formatCurrency(product.originalPrice)}</span>
              <span class="badge-pill">-${product.discount}%</span>
            </div>
            <div class="badge-row">
              <span class="badge-pill">Free delivery</span>
              <span class="badge-pill">${product.delivery?.estimated || '2-4 days'}</span>
            </div>
          </div>
          <div class="stock-pill ${stockClass}">
            <i class="fa-solid fa-circle-check"></i>
            <span>${stockText}</span>
          </div>
          <div class="quantity-row">
            <button class="qty-btn" type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
            <strong id="quantityValue">${state.quantity}</strong>
            <button class="qty-btn" type="button" data-action="increase" aria-label="Increase quantity">+</button>
          </div>
          <div class="purchase-actions">
            <button class="btn-primary" type="button" id="addToCartBtn" ${stockStatus <= 0 ? 'disabled' : ''}>Add to Cart</button>
            <button class="btn-secondary" type="button" id="buyNowBtn" ${stockStatus <= 0 ? 'disabled' : ''}>Buy Now</button>
            <button class="btn-outline" type="button" id="wishlistBtn">${wishlistActive ? 'Added to Wishlist' : 'Add to Wishlist'}</button>
          </div>
          <div class="badge-row">
            <button class="badge-pill" type="button" id="shareBtn"><i class="fa-solid fa-share-nodes"></i> Share</button>
            <a class="badge-pill" href="index.html">Back to shopping</a>
          </div>
          <p><strong>Deliver to:</strong> ${product.delivery?.location || 'Maharashtra'}</p>
          <p><strong>Delivery charge:</strong> ${product.delivery?.free ? 'Free' : formatCurrency(product.delivery?.charge || 0)}</p>
        </aside>
      </div>

      <section class="spec-card" aria-label="Product description">
        <h3>About this product</h3>
        <p>${product.description}</p>
        <h3>Specifications</h3>
        <table class="spec-table">
          <tbody>
            ${Object.entries(product.specifications || {}).map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join('')}
          </tbody>
        </table>
      </section>

      <section class="review-card" aria-label="Product reviews">
        <div class="badge-row">
          <h3>Customer Reviews</h3>
          <span class="badge-pill">★★★★★ ${product.rating}</span>
          <span class="badge-pill">${product.reviews} reviews</span>
        </div>
        <div class="review-bars">${reviewsDistribution}</div>
        <div class="badge-row">
          ${(product.reviewsData || []).map((review) => `
            <article class="offer-card">
              <strong>${review.name}</strong>
              <p>${review.title}</p>
              <p>${review.text}</p>
              <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
              ${review.verified ? '<span>Verified Purchase</span>' : ''}
            </article>
          `).join('')}
        </div>
      </section>

      <section class="qna-card" aria-label="Questions and answers">
        <h3>Questions about this product?</h3>
        <div class="qa-list">
          ${(product.questions || []).map((item) => `<div class="offer-card"><strong>${item.user}</strong><p>${item.question}</p></div>`).join('')}
        </div>
        <div class="badge-row">
          <input id="qaInput" type="text" placeholder="Ask a question" aria-label="Ask a question" />
          <button class="btn-outline" type="button" id="qaSubmit">Submit</button>
        </div>
      </section>

      <section class="related-card" aria-label="Related products">
        <h3>Customers Also Viewed</h3>
        <div class="related-list">${relatedMarkup}</div>
        ${recentMarkup ? `<h3>Recently Viewed</h3><div class="related-list">${recentMarkup}</div>` : ''}
      </section>
    </section>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelector('.gallery-prev')?.addEventListener('click', () => {
    state.imageIndex = (state.imageIndex - 1 + (state.product?.images?.length || 1)) % (state.product?.images?.length || 1);
    renderProduct();
  });
  document.querySelector('.gallery-next')?.addEventListener('click', () => {
    state.imageIndex = (state.imageIndex + 1) % (state.product?.images?.length || 1);
    renderProduct();
  });
  document.querySelectorAll('.gallery-thumbs button').forEach((button) => {
    button.addEventListener('click', () => {
      state.imageIndex = Number(button.dataset.index);
      renderProduct();
    });
  });
  document.querySelector('.gallery-main img')?.addEventListener('click', () => {
    const image = document.querySelector('.gallery-main img');
    if (!image) return;
    const viewer = document.createElement('div');
    viewer.className = 'fullscreen';
    viewer.innerHTML = `<button class="close-btn" type="button" aria-label="Close viewer"><i class="fa-solid fa-xmark"></i></button><img src="${image.src}" alt="${state.product?.name || 'Product image'}" />`;
    viewer.querySelector('.close-btn').addEventListener('click', () => viewer.remove());
    document.body.appendChild(viewer);
  });
  document.querySelector('#addToCartBtn')?.addEventListener('click', () => {
    const current = Number(document.querySelector('.cart-count')?.textContent || '0');
    document.querySelector('.cart-count').textContent = String(current + state.quantity);
    showToast('Added to cart');
  });
  document.querySelector('#buyNowBtn')?.addEventListener('click', () => {
    const productId = String(state.product?.id || '');
    const selectedVariant = state.selectedVariant || state.product?.variantStates?.[0] || {};
    const payload = {
      productId,
      quantity: Math.max(1, Number(state.quantity) || 1),
      variant: {
        ...selectedVariant,
        color: selectedVariant.color || state.product?.specifications?.Color || selectedVariant.Color || '',
        size: selectedVariant.size || selectedVariant.Size || '',
        storage: selectedVariant.storage || selectedVariant.Storage || '',
        ram: selectedVariant.ram || selectedVariant.RAM || '',
        material: selectedVariant.material || selectedVariant.Material || '',
        model: selectedVariant.model || selectedVariant.Model || ''
      }
    };
    localStorage.setItem('NEXORA.SHOP-checkout-buy-now', JSON.stringify(payload));
    const current = Number(document.querySelector('.cart-count')?.textContent || '0');
    document.querySelector('.cart-count').textContent = String(current + payload.quantity);
    window.location.href = `checkout.html?product=${productId}&qty=${payload.quantity}`;
  });
  document.querySelector('#wishlistBtn')?.addEventListener('click', () => {
    const list = getWishlist();
    const productId = String(state.product?.id);
    const next = list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId];
    setWishlist(next);
    showToast(next.includes(productId) ? 'Saved to wishlist' : 'Removed from wishlist');
    renderProduct();
  });
  document.querySelector('#shareBtn')?.addEventListener('click', async () => {
    const url = `${window.location.origin}${window.location.pathname}?id=${state.product?.id}`;
    if (navigator.share) {
      await navigator.share({ title: state.product?.name, url });
    } else {
      navigator.clipboard?.writeText(url);
      showToast('Link copied');
    }
  });
  document.querySelector('#qaSubmit')?.addEventListener('click', () => {
    const input = document.querySelector('#qaInput');
    if (!input || !input.value.trim()) return;
    showToast('Question added');
    input.value = '';
  });
  document.querySelectorAll('.variant-pill').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.variantValue;
      const type = button.dataset.variantType;
      const variant = state.product?.variantStates?.find((item) => item[type] === selected) || state.product?.variantStates?.[0];
      if (variant) {
        state.selectedVariant = variant;
        renderProduct();
      }
    });
  });
  document.querySelector('[data-action="increase"]')?.addEventListener('click', () => {
    const max = state.selectedVariant?.stock ?? state.product?.stock ?? 1;
    if (state.quantity < max) {
      state.quantity += 1;
      document.getElementById('quantityValue').textContent = state.quantity;
    }
  });
  document.querySelector('[data-action="decrease"]')?.addEventListener('click', () => {
    if (state.quantity > 1) {
      state.quantity -= 1;
      document.getElementById('quantityValue').textContent = state.quantity;
    }
  });
}

function initProductDetails() {
  startLoading();
  const id = getParameterByName('id');
  const product = getProductById(id);
  if (!product) {
    renderNotFound();
    return;
  }
  state.product = product;
  state.selectedVariant = product.variantStates?.[0] || null;
  state.imageIndex = 0;
  saveRecentView(product.id);
  renderProduct();
}

window.addEventListener('DOMContentLoaded', initProductDetails);
