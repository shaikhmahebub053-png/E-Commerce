const RESULTS_PER_PAGE = 24;
const searchInputEl = document.getElementById('searchResultsInput');
const resultsGrid = document.getElementById('searchResultsGrid');
const resultsCount = document.getElementById('resultsCount');
const searchTitle = document.getElementById('searchResultsTitle');
const paginationEl = document.getElementById('searchPagination');
const sortSelect = document.getElementById('sortSelect');
const filterInputs = document.querySelectorAll('.filter-input');

let currentPage = 1;
let activeFilters = {
  rating: [],
  discount: [],
  inStock: false
};
let currentSort = 'relevance';

function getCurrentQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

function formatSearchCurrency(value) {
  return window.formatCurrency ? window.formatCurrency(value) : `₹${Number(value || 0).toLocaleString('en-IN')}`;
}

function normalizeText(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function getSearchMatches(query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];
  return getDynamicSearchResults(normalizedQuery, { maxResults: 500 });
}

function applyFilters(items) {
  const filtered = items.filter((product) => {
    const rating = Number(product.rating || 0);
    const discount = Number(product.discount || 0);
    const inStock = Number(product.stock || 0) > 0;

    const ratingOk = !activeFilters.rating.length || activeFilters.rating.some((threshold) => rating >= Number(threshold));
    const discountOk = !activeFilters.discount.length || activeFilters.discount.some((threshold) => discount >= Number(threshold));
    const stockOk = !activeFilters.inStock || inStock;

    return ratingOk && discountOk && stockOk;
  });

  return filtered;
}

function sortProducts(items) {
  const list = [...items];
  switch (currentSort) {
    case 'price-low':
      return list.sort((a, b) => Number(a.price) - Number(b.price));
    case 'price-high':
      return list.sort((a, b) => Number(b.price) - Number(a.price));
    case 'popularity':
      return list.sort((a, b) => Number(b.salesCount || 0) - Number(a.salesCount || 0));
    case 'rating':
      return list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    case 'discount':
      return list.sort((a, b) => Number(b.discount || 0) - Number(a.discount || 0));
    default:
      return list;
  }
}

function getDeliveryText(product) {
  const delivery = product.delivery || {};
  const freeText = delivery.free ? 'FREE delivery' : `${formatSearchCurrency(delivery.charge || 0)} delivery`;
  const estimate = delivery.estimated || 'Tomorrow';
  return `${freeText} • ${estimate}`;
}

function buildResultCard(product) {
  const values = Object.values(product.specifications || {});
  const featureList = values.slice(0, 4).map((value) => `<li>• ${value}</li>`).join('');
  const ratingText = Number(product.reviewCount || product.reviews || 0) >= 1000
    ? `${(Number(product.reviewCount || product.reviews || 0) / 1000).toFixed(1)}K ratings`
    : `${Number(product.reviewCount || product.reviews || 0)} ratings`;

  return `
    <article class="product-card search-product-card" data-id="${product.id}" tabindex="0" aria-label="View details for ${product.name}">
      <div class="search-card-visual">
        <button class="wishlist-btn" type="button" data-product-id="${product.id}" aria-label="Add ${product.name} to wishlist">
          <i class="fa-regular fa-heart"></i>
        </button>
        <a href="product-details.html?id=${product.id}" class="product-image-link">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </a>
      </div>

      <div class="search-card-content">
        <div class="search-card-badges">
          ${(product.badge ? `<span class="badge-pill search-badge">${product.badge}</span>` : '')}
          <span class="badge-pill muted-badge">${product.brand}</span>
        </div>

        <h4><a href="product-details.html?id=${product.id}">${product.name}</a></h4>

        <div class="search-rating-row">
          <span class="rating-pill">★ ${product.rating}</span>
          <span>${ratingText}</span>
        </div>

        <ul class="product-feature-list">${featureList || '<li>• Premium quality</li><li>• Trusted brand</li><li>• Easy returns</li>'}</ul>

        <div class="search-price-row">
          <div class="price-block">
            <span class="current-price">${formatSearchCurrency(product.price)}</span>
            <span class="mrp-price">M.R.P. ${formatSearchCurrency(product.originalPrice || product.mrp || product.price)}</span>
            <span class="discount-label">${product.discount}% OFF</span>
          </div>
        </div>

        <div class="search-delivery-row">${getDeliveryText(product)}</div>

        <div class="search-product-actions">
          <button type="button" class="btn-primary add-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderPagination(totalResults) {
  const pageCount = Math.max(1, Math.ceil(totalResults / RESULTS_PER_PAGE));
  const pages = [];

  for (let i = 1; i <= Math.min(5, pageCount); i += 1) {
    pages.push(`<button type="button" class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
  }

  paginationEl.innerHTML = `
    <button type="button" class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    ${pages.join('')}
    <button type="button" class="page-btn" data-page="${currentPage + 1}" ${currentPage >= pageCount ? 'disabled' : ''}>Next</button>
  `;

  paginationEl.querySelectorAll('.page-btn').forEach((btn) => {
    const page = Number(btn.dataset.page);
    if (!page || page < 1 || page > pageCount) return;
    btn.addEventListener('click', () => {
      currentPage = page;
      renderSearchResults();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function renderSearchResults() {
  const query = getCurrentQuery();
  const allMatches = getSearchMatches(query);
  const filtered = applyFilters(allMatches);
  const sorted = sortProducts(filtered);
  const total = sorted.length;
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginated = sorted.slice(start, start + RESULTS_PER_PAGE);

  searchTitle.textContent = `Search results for "${query}"`;
  resultsCount.textContent = total ? `Showing ${Math.min(start + 1, total)}–${Math.min(start + paginated.length, total)} of ${total} products` : 'No products found';

  if (!paginated.length) {
    resultsGrid.innerHTML = `
      <div class="empty-state-card" aria-live="polite">
        <h2>No products match your search.</h2>
        <p>Try another keyword, brand, category, or product type.</p>
      </div>
    `;
    paginationEl.innerHTML = '';
    return;
  }

  resultsGrid.innerHTML = paginated.map((product) => buildResultCard(product)).join('');
  renderPagination(total);

  resultsGrid.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const product = getProductById(id);
      if (product) {
        addToCart(id, 1, product.variantStates?.[0] || {});
      }
    });
  });

  resultsGrid.querySelectorAll('.wishlist-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      toggleWishlist(id);
      syncWishlistHearts();
    });
  });
}

function setFilterFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  if (searchInputEl) {
    searchInputEl.value = q;
  }
  searchTitle.textContent = q ? `Search results for "${q}"` : 'Search results';
}

if (searchInputEl) {
  searchInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      goToSearch(searchInputEl.value);
    }
    if (event.key === 'Escape') {
      searchInputEl.blur();
      document.querySelector('.search-suggestions')?.classList.remove('show');
    }
  });

  searchInputEl.addEventListener('input', () => {
    if (searchInputEl.value.trim()) {
      showSuggestions(searchInputEl.value);
    }
  });
}

filterInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const value = input.value;

    if (input.checked) {
      if (value === 'inStock') {
        activeFilters.inStock = true;
      } else if (value >= '1' && value <= '5') {
        activeFilters.rating.push(value);
      } else if (Number(value) >= 10) {
        activeFilters.discount.push(value);
      }
    } else {
      if (value === 'inStock') {
        activeFilters.inStock = false;
      } else if (value >= '1' && value <= '5') {
        activeFilters.rating = activeFilters.rating.filter((item) => item !== value);
      } else if (Number(value) >= 10) {
        activeFilters.discount = activeFilters.discount.filter((item) => item !== value);
      }
    }

    currentPage = 1;
    renderSearchResults();
  });
});

sortSelect?.addEventListener('change', (event) => {
  currentSort = event.target.value;
  renderSearchResults();
});

window.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateWishlistCount();
  syncWishlistHearts();
  bindCartLink();
  setFilterFromQuery();
  renderSearchResults();
  if (typeof attachGlobalSearch === 'function') attachGlobalSearch();
});
