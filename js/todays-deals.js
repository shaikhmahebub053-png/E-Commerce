const deals = [
  { id: 1, name: 'Aurora Pro Laptop', category: 'Computers', brand: 'Aurora', price: 1199, originalPrice: 1599, discount: 25, rating: 4.9, reviews: 318, stock: 12, countdown: 3, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 2, name: 'Halo Wireless Headset', category: 'Electronics', brand: 'Halo', price: 129, originalPrice: 249, discount: 48, rating: 4.8, reviews: 214, stock: 8, countdown: 5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 3, name: 'Nova Smart Watch', category: 'Electronics', brand: 'Nova', price: 199, originalPrice: 299, discount: 33, rating: 4.7, reviews: 176, stock: 26, countdown: 9, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 4, name: 'Luxe Running Shoes', category: 'Fashion', brand: 'Luxe', price: 89, originalPrice: 149, discount: 40, rating: 4.6, reviews: 92, stock: 14, countdown: 7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 5, name: 'Studio Mechanical Keyboard', category: 'Computers', brand: 'Studio', price: 149, originalPrice: 229, discount: 35, rating: 4.9, reviews: 142, stock: 6, countdown: 2, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 6, name: 'Royal Sofa Accent', category: 'Home', brand: 'Royal', price: 289, originalPrice: 429, discount: 32, rating: 4.5, reviews: 81, stock: 10, countdown: 11, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 7, name: 'Glint Camera 4K', category: 'Electronics', brand: 'Glint', price: 599, originalPrice: 899, discount: 33, rating: 4.8, reviews: 134, stock: 9, countdown: 4, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 8, name: 'Velora Premium Hoodie', category: 'Fashion', brand: 'Velora', price: 79, originalPrice: 129, discount: 39, rating: 4.7, reviews: 123, stock: 16, countdown: 6, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 9, name: 'Zenith Tablet Pro', category: 'Computers', brand: 'Zenith', price: 749, originalPrice: 999, discount: 25, rating: 4.8, reviews: 188, stock: 5, countdown: 1, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 10, name: 'Crest Gaming Chair', category: 'Gaming', brand: 'Crest', price: 269, originalPrice: 399, discount: 32, rating: 4.9, reviews: 204, stock: 7, countdown: 3, image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 11, name: 'Aurex Speaker', category: 'Electronics', brand: 'Aurex', price: 109, originalPrice: 179, discount: 39, rating: 4.6, reviews: 98, stock: 20, countdown: 8, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 12, name: 'Mira Makeup Set', category: 'Beauty', brand: 'Mira', price: 59, originalPrice: 99, discount: 40, rating: 4.7, reviews: 110, stock: 18, countdown: 10, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 13, name: 'North Desk Lamp', category: 'Home', brand: 'North', price: 69, originalPrice: 119, discount: 42, rating: 4.5, reviews: 78, stock: 22, countdown: 6, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 14, name: 'Plume Blender', category: 'Home', brand: 'Plume', price: 94, originalPrice: 129, discount: 27, rating: 4.6, reviews: 87, stock: 13, countdown: 5, image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 15, name: 'Orbit Headphones', category: 'Electronics', brand: 'Orbit', price: 159, originalPrice: 219, discount: 27, rating: 4.8, reviews: 161, stock: 11, countdown: 4, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 16, name: 'Kairo Coffee Maker', category: 'Home', brand: 'Kairo', price: 139, originalPrice: 189, discount: 26, rating: 4.7, reviews: 117, stock: 17, countdown: 7, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 17, name: 'Pulse Gaming Controller', category: 'Gaming', brand: 'Pulse', price: 59, originalPrice: 89, discount: 34, rating: 4.6, reviews: 96, stock: 15, countdown: 8, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 18, name: 'Bento Travel Bag', category: 'Fashion', brand: 'Bento', price: 72, originalPrice: 119, discount: 39, rating: 4.5, reviews: 88, stock: 12, countdown: 5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 19, name: 'Rook Office Chair', category: 'Home', brand: 'Rook', price: 249, originalPrice: 349, discount: 28, rating: 4.8, reviews: 145, stock: 7, countdown: 3, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 20, name: 'Marlow Book Set', category: 'Books', brand: 'Marlow', price: 34, originalPrice: 59, discount: 42, rating: 4.6, reviews: 67, stock: 24, countdown: 9, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 21, name: 'Vanta Smart Speaker', category: 'Electronics', brand: 'Vanta', price: 97, originalPrice: 149, discount: 35, rating: 4.7, reviews: 110, stock: 19, countdown: 6, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 22, name: 'Nova Luxe Chair', category: 'Furniture', brand: 'Nova', price: 319, originalPrice: 489, discount: 35, rating: 4.7, reviews: 103, stock: 6, countdown: 4, image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80', availability: 'limited' },
  { id: 23, name: 'Silva Beauty Kit', category: 'Beauty', brand: 'Silva', price: 44, originalPrice: 79, discount: 44, rating: 4.8, reviews: 130, stock: 21, countdown: 8, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', availability: 'in-stock' },
  { id: 24, name: 'Pico Gaming Console', category: 'Gaming', brand: 'Pico', price: 399, originalPrice: 549, discount: 27, rating: 4.9, reviews: 221, stock: 5, countdown: 2, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80', availability: 'limited' }
];

const categories = ['🔥 Flash Deals', '⚡ Lightning Deals', '📱 Electronics', '👕 Fashion', '💻 Computers', '🎮 Gaming', '🏠 Home', '💄 Beauty', '🛋 Furniture', '📚 Books'];
const brandNames = [...new Set(deals.map((item) => item.brand))];
const brands = document.getElementById('brandFilter');
const dealGrid = document.getElementById('dealGrid');
const pagination = document.getElementById('pagination');
const categoryPills = document.getElementById('categoryPills');
const sortSelect = document.getElementById('sortSelect');
const priceFilter = document.getElementById('priceFilter');
const discountFilter = document.getElementById('discountFilter');
const ratingFilter = document.getElementById('ratingFilter');
const availabilityFilter = document.getElementById('availabilityFilter');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const backToTop = document.getElementById('backToTop');
const heroCountdown = document.getElementById('heroCountdown');

const state = {
  category: '🔥 Flash Deals',
  sortBy: 'featured',
  price: 'all',
  brand: 'all',
  discount: 'all',
  rating: 'all',
  availability: 'all',
  search: '',
  currentPage: 1,
  wishlist: new Set(),
};

const itemsPerPage = 8;

function init() {
  renderCategories();
  populateBrands();
  bindEvents();
  startHeroCountdown();
  startProductCountdowns();
  render();
  window.addEventListener('scroll', toggleBackToTop);
}

function renderCategories() {
  categoryPills.innerHTML = categories.map((category) => `<button class="category-pill ${state.category === category ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
}

function populateBrands() {
  brands.innerHTML = '<option value="all">All</option>' + brandNames.map((brand) => `<option value="${brand}">${brand}</option>`).join('');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const pill = event.target.closest('.category-pill');
    if (pill) {
      state.category = pill.dataset.category;
      renderCategories();
      render();
    }

    const wishlist = event.target.closest('.wishlist-btn');
    if (wishlist) {
      event.preventDefault();
      wishlist.classList.toggle('active');
      showToast(wishlist.classList.contains('active') ? 'Saved to wishlist' : 'Removed from wishlist');
    }

    const quickView = event.target.closest('.quick-btn');
    if (quickView) {
      event.preventDefault();
      showToast('Quick view opened');
    }

    const cartBtn = event.target.closest('.cart-btn');
    if (cartBtn) {
      event.preventDefault();
      showToast('Added to cart');
    }
  });

  sortSelect.addEventListener('change', (event) => { state.sortBy = event.target.value; render(); });
  priceFilter.addEventListener('change', (event) => { state.price = event.target.value; render(); });
  brandFilter.addEventListener('change', (event) => { state.brand = event.target.value; render(); });
  discountFilter.addEventListener('change', (event) => { state.discount = event.target.value; render(); });
  ratingFilter.addEventListener('change', (event) => { state.rating = event.target.value; render(); });
  availabilityFilter.addEventListener('change', (event) => { state.availability = event.target.value; render(); });
  searchInput.addEventListener('input', (event) => { state.search = event.target.value.trim().toLowerCase(); state.currentPage = 1; render(); });

  document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Subscribed successfully');
  });
}

function getFilteredProducts() {
  const filtered = deals.filter((item) => {
    const matchesCategory = state.category === '🔥 Flash Deals' ? true : item.category === state.category.replace(/^[^\w]+|[^\w]+$/g, '').trim();
    const matchesPrice =
      state.price === 'all' ||
      (state.price === 'below-100' && item.price < 100) ||
      (state.price === '100-300' && item.price >= 100 && item.price <= 300) ||
      (state.price === '300-700' && item.price > 300 && item.price <= 700) ||
      (state.price === '700-plus' && item.price > 700);

    const matchesBrand = state.brand === 'all' || item.brand === state.brand;
    const matchesDiscount = state.discount === 'all' || item.discount >= Number(state.discount);
    const matchesRating = state.rating === 'all' || item.rating >= Number(state.rating);
    const matchesAvailability = state.availability === 'all' || item.availability === state.availability;
    const matchesSearch = item.name.toLowerCase().includes(state.search) || item.category.toLowerCase().includes(state.search);

    return matchesCategory && matchesPrice && matchesBrand && matchesDiscount && matchesRating && matchesAvailability && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (state.sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'discount': return b.discount - a.discount;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  return sorted;
}

function render() {
  const filtered = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const start = (state.currentPage - 1) * itemsPerPage;
  const visible = filtered.slice(start, start + itemsPerPage);

  if (!visible.length) {
    dealGrid.innerHTML = '<div class="empty-state">No deals match the current filters.</div>';
    pagination.innerHTML = '';
    return;
  }

  dealGrid.innerHTML = visible.map((item) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="deal-badge">Flash Deal</span>
        <button class="wishlist-btn ${state.wishlist.has(item.id) ? 'active' : ''}" type="button" aria-label="Add to wishlist">♡</button>
      </div>
      <div class="product-body">
        <h3 class="product-name">${item.name}</h3>
        <div class="price-row">
          <span class="original-price">$${item.originalPrice}</span>
          <span class="discount-price">$${item.price}</span>
          <span class="discount-badge">-${item.discount}%</span>
        </div>
        <div class="rating-row">
          <span class="rating-stars">★★★★★</span>
          <span>(${item.reviews})</span>
        </div>
        <div class="meta-row">
          <span>${item.category}</span>
          <span>${item.brand}</span>
        </div>
        <div class="progress-wrap">
          <div class="progress-bar"><span style="width:${Math.min(100, item.stock * 4)}%"></span></div>
          <span class="progress-label">Only ${item.stock} items left!</span>
        </div>
        <div class="countdown-line">
          <i class="fa-regular fa-clock"></i>
          <span data-countdown="${item.id}">${item.countdown}h left</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-outline quick-btn" type="button">Quick View</button>
          <button class="btn btn-primary cart-btn" type="button">Add to Cart</button>
        </div>
        <span class="stock-pill">${item.availability === 'limited' ? 'Limited stock' : 'In stock'}</span>
      </div>
    </article>
  `).join('');

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = `
    <button class="page-btn" data-page="prev">Previous</button>
    ${Array.from({ length: totalPages }, (_, index) => `<button class="page-btn ${index + 1 === state.currentPage ? 'active' : ''}" data-page="${index + 1}">${index + 1}</button>`).join('')}
    <button class="page-btn" data-page="next">Next</button>
  `;

  pagination.querySelectorAll('.page-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      if (!page) return;
      if (page === 'prev') state.currentPage = Math.max(1, state.currentPage - 1);
      else if (page === 'next') state.currentPage = Math.min(totalPages, state.currentPage + 1);
      else state.currentPage = Number(page);
      render();
      document.getElementById('flashDeals').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function startHeroCountdown() {
  const deadline = Date.now() + 1000 * 60 * 60 * 12 + 1000 * 60 * 45 + 1000 * 23;
  const update = () => {
    const distance = deadline - Date.now();
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    heroCountdown.innerHTML = [
      { label: 'Hours', value: hours },
      { label: 'Minutes', value: minutes },
      { label: 'Seconds', value: seconds },
    ].map((item) => `<div class="timer-box"><div>${String(item.value).padStart(2, '0')}</div><small>${item.label}</small></div>`).join('');
    if (distance < 0) clearInterval(timer);
  };
  update();
  const timer = setInterval(update, 1000);
}

function startProductCountdowns() {
  setInterval(() => {
    document.querySelectorAll('[data-countdown]').forEach((node) => {
      const current = Number(node.textContent.replace(/h left/, '').trim());
      const next = Math.max(0, current - 1);
      node.textContent = `${next}h left`;
    });
  }, 5000);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function toggleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 300);
}

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

init();
window.addEventListener("load", function () {
    const pageLoader = document.querySelector(".page-loader");

    if (pageLoader) {
        pageLoader.style.opacity = "0";

        setTimeout(() => {
            pageLoader.style.display = "none";
        }, 500);
    }
});
