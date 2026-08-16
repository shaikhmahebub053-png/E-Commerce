// Best Sellers page interactions and demo content
const categoryFilters = ['All', 'Electronics', 'Mobiles', 'Fashion', 'Gaming', 'Computers', 'Home', 'Kitchen', 'Beauty', 'Books', 'Furniture', 'Sports'];

const products = [
  { id: 1, name: 'Aurora Smart Watch', category: 'Electronics', price: 499, originalPrice: 999, discount: 50, rating: 4.9, reviews: 1860, sold: 12540, stock: 'In Stock', description: 'Sleek health tracking with titanium finish.', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80', badge: 'Best Seller' },
  { id: 2, name: 'Nova Noise Cancelling Headphones', category: 'Electronics', price: 3499, originalPrice: 6999, discount: 50, rating: 4.8, reviews: 1430, sold: 9820, stock: 'In Stock', description: 'Immersive sound and all-day comfort.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', badge: 'Top Rated' },
  { id: 3, name: 'NEXORA Ultra Laptop', category: 'Computers', price: 39999, originalPrice: 79999, discount: 50, rating: 4.9, reviews: 1120, sold: 6740, stock: 'Limited', description: 'Performance-driven device with rich display.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80', badge: 'Editor Pick' },
  { id: 4, name: 'Lumen Desk Lamp', category: 'Home', price: 899, originalPrice: 1799, discount: 50, rating: 4.7, reviews: 860, sold: 4410, stock: 'In Stock', description: 'Warm ambient lighting with intelligent dimming.', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80', badge: 'Trending' },
  { id: 5, name: 'Glide Wireless Mouse', category: 'Electronics', price: 49, originalPrice: 69, discount: 29, rating: 4.8, reviews: 970, sold: 7810, stock: 'In Stock', description: 'Precision tracking with sculpted comfort.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80', badge: 'Hot Deal' },
  { id: 6, name: 'Velora Running Shoes', category: 'Fashion', price: 119, originalPrice: 159, discount: 25, rating: 4.8, reviews: 1280, sold: 8760, stock: 'In Stock', description: 'Cloud-soft cushioning for daily movement.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', badge: 'Popular' },
  { id: 7, name: 'Orbit Gaming Console', category: 'Gaming', price: 399, originalPrice: 499, discount: 20, rating: 4.9, reviews: 1610, sold: 11040, stock: 'In Stock', description: 'Next-gen performance in a premium compact shell.', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80', badge: 'Best Seller' },
  { id: 8, name: 'Pc Graphic Cards', category: 'Kitchen', price: 3899, originalPrice: 7999, discount: 31, rating: 4.6, reviews: 740, sold: 5230, stock: 'In Stock', description: 'Five-speed blending with precision control.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4h20vTG8TBjS5znj4QJ7t6mHsqKaYf2lj3rlhcO0pQ&s=10', badge: 'Kitchen Pick' },
  { id: 9, name: 'Mira Ceramic Vase', category: 'Home', price: 64, originalPrice: 89, discount: 28, rating: 4.7, reviews: 610, sold: 3450, stock: 'In Stock', description: 'Minimal sculptural decor for elevated interiors.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJLcTQP1_LmbleVbiBOon_qDasnyielchh62CK4kVYg&s=10', badge: 'Home Favorite' },
  { id: 10, name: 'Halo Smartphone', category: 'Mobiles', price: 799, originalPrice: 999, discount: 20, rating: 4.9, reviews: 2040, sold: 13480, stock: 'In Stock', description: 'Flagship camera system with brilliant display.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80', badge: 'Flagship' },
  { id: 11, name: 'Astra Backpack', category: 'Fashion', price: 89, originalPrice: 119, discount: 25, rating: 4.7, reviews: 720, sold: 6030, stock: 'In Stock', description: 'Smart organization with weather-resistant finish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx43VME3wj_IqYMXE3sF6wuuWODXMbzRSx-OTk9E9fPA&s=10', badge: 'Travel Ready' },
  { id: 12, name: 'Cedar Sofa Accent', category: 'Furniture', price: 549, originalPrice: 699, discount: 21, rating: 4.8, reviews: 980, sold: 5020, stock: 'Limited', description: 'Comfort-first lounge piece with premium upholstery.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE47GeXXR3IhdPnUi2C8qvWxHk22nGUTTXue77EY0YNw&s=10', badge: 'New Arrival' },
  { id: 13, name: 'Echo Smart Speaker', category: 'Electronics', price: 99, originalPrice: 129, discount: 23, rating: 4.8, reviews: 1180, sold: 7480, stock: 'In Stock', description: 'Immersive room-filling sound and voice control.', image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', badge: 'Customer Favorite' },
  { id: 14, name: 'Meridian Carry-On', category: 'Fashion', price: 149, originalPrice: 189, discount: 21, rating: 4.7, reviews: 830, sold: 4610, stock: 'In Stock', description: 'Lightweight travel companion with smart pockets.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWv3xGFVJwv_ykWEv3_delqZ_UCQbDvC7ueGyqLolbjQ&s=10', badge: 'Travel pick' },
  { id: 15, name: 'Flex Ergonomic Chair', category: 'Furniture', price: 289, originalPrice: 369, discount: 22, rating: 4.9, reviews: 1390, sold: 9100, stock: 'In Stock', description: 'Supportive design for focused workdays.', image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80', badge: 'Work From Home' },
  { id: 16, name: 'Pico Camera Drone', category: 'Electronics', price: 459, originalPrice: 589, discount: 22, rating: 4.8, reviews: 760, sold: 4120, stock: 'In Stock', description: 'Capture cinematic footage in a compact design.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTseBLZW3mljESCnqqkB0N1JU_qN6UzY1ZTsMBURZtivQ&s=10', badge: 'Trending' },
  { id: 17, name: 'Solace Knit Set', category: 'Fashion', price: 92, originalPrice: 124, discount: 26, rating: 4.6, reviews: 640, sold: 3380, stock: 'In Stock', description: 'Soft texture and premium everyday relaxation.', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', badge: 'Style Favorite' },
  { id: 18, name: 'Prime Coffee Maker', category: 'Kitchen', price: 129, originalPrice: 169, discount: 24, rating: 4.8, reviews: 980, sold: 5740, stock: 'In Stock', description: 'Crafted for espresso lovers and morning rituals.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', badge: 'Kitchen Pick' },
  { id: 19, name: 'Nimbus Tablet', category: 'Computers', price: 649, originalPrice: 799, discount: 19, rating: 4.8, reviews: 870, sold: 5150, stock: 'Limited', description: 'Ultra-portable display with vibrant color accuracy.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmasJ1_xCtVdhzaPcZpCCAwOYppnmzT5lz9GA7p7a6Cg&s=10', badge: 'Best Value' },
  { id: 20, name: 'Artisan Air Fryer', category: 'Kitchen', price: 108, originalPrice: 149, discount: 27, rating: 4.7, reviews: 760, sold: 4280, stock: 'In Stock', description: 'Healthy cooking with crisp finish and easy cleanup.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLptdk5aGM8hCJq66F0SJFlmC4zVYILa1iOBFH04yAg&s=10', badge: 'Trending' },
  { id: 21, name: 'Halo Smart Glasses', category: 'Electronics', price: 279, originalPrice: 349, discount: 20, rating: 4.7, reviews: 640, sold: 3120, stock: 'In Stock', description: 'Seamless audio and display in a sleek frame.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80', badge: 'New Tech' },
  { id: 22, name: 'Bloom Skincare Set', category: 'Beauty', price: 78, originalPrice: 99, discount: 21, rating: 4.8, reviews: 810, sold: 4720, stock: 'In Stock', description: 'A nourishing ritual for radiant daily care.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80', badge: 'Beauty Pick' },
  { id: 23, name: 'Atlas Table Lamp', category: 'Books', price: 58, originalPrice: 79, discount: 27, rating: 4.6, reviews: 520, sold: 2890, stock: 'In Stock', description: 'Focused lighting for late-night reading sessions.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE_mMULDy7-MAVtC3KZmyQTUwpaX3ufYWPrglEsHvpNQ&s=10', badge: 'Reader Favorite' },
  { id: 24, name: 'Alto Gaming Headset', category: 'Gaming', price: 119, originalPrice: 149, discount: 20, rating: 4.9, reviews: 1260, sold: 6940, stock: 'In Stock', description: 'Immersive audio tuned for competitive play.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu_6i0TNUrOVLVjgc1DEeasYPjX8uBjpHIfFEmusGzog&s=10', badge: 'Gaming Pick' },
  { id: 25, name: 'Harbor Side Table', category: 'Furniture', price: 139, originalPrice: 179, discount: 22, rating: 4.7, reviews: 610, sold: 3520, stock: 'In Stock', description: 'Refined structure with premium walnut finish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFjcpDzTeq5z7JD8jjpQFX2NcIKjYzXNJwsKmt7EKbwA&s', badge: 'Home Pick' },
  { id: 26, name: 'Basil Travel Mug', category: 'Home', price: 39, originalPrice: 54, discount: 28, rating: 4.6, reviews: 470, sold: 2520, stock: 'In Stock', description: 'Vacuum insulated comfort for every commute.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIWacZubR_4T8cW8jmxhAYMSyDs4ncVC2tZLzv940Tg&s=10', badge: 'Daily Carry' },
  { id: 27, name: 'Nexa Smart Thermostat', category: 'Home', price: 159, originalPrice: 199, discount: 20, rating: 4.8, reviews: 820, sold: 4810, stock: 'In Stock', description: 'Effortless climate control with app integration.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzqM2iJecNHvg6g5HkIcmhy9Jp8dGcDJWjgEmH2pZEUw&s=10', badge: 'Smart Home' },
  { id: 28, name: 'Revolve Fitness Band', category: 'Sports', price: 74, originalPrice: 99, discount: 25, rating: 4.7, reviews: 690, sold: 3860, stock: 'In Stock', description: 'Daily fitness tracking with intuitive coaching.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDfSULCMCJu2Ye-EC-hMAwNbhpbUMjEE8bjhGOgmt9dw&s=10', badge: 'Active Pick' },
  { id: 29, name: 'Marlow Leather Tote', category: 'Fashion', price: 134, originalPrice: 179, discount: 25, rating: 4.8, reviews: 980, sold: 5340, stock: 'In Stock', description: 'Refined silhouette for workdays and weekends.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJwRI8XukO_uYV9MjEpYAOTXZjPGf3MNdw3UDoRoM6g&s=10', badge: 'Style Favorite' },
  { id: 30, name: 'Crest Wireless Charger', category: 'Electronics', price: 46, originalPrice: 69, discount: 33, rating: 4.7, reviews: 620, sold: 2980, stock: 'In Stock', description: 'Fast charging with minimalist premium finish.', image: 'https://m.media-amazon.com/images/I/81zc0achT9L.jpg', badge: 'Fast Charge' },
  { id: 31, name: 'Sage Hair Styling Set', category: 'Beauty', price: 88, originalPrice: 119, discount: 26, rating: 4.8, reviews: 760, sold: 3710, stock: 'In Stock', description: 'Salon-inspired tools for smooth styling results.', image: 'https://stylecraftus.com/cdn/shop/collections/Sage_Collection_Homepage_Carousel_Web_Banner_2000X1746_33d7c1fe-6f35-4b05-aab0-65482eada851.jpg?crop=center&height=1000&v=1784217378&width=1000', badge: 'Beauty Pick' },
  { id: 32, name: 'Tidal Bottle Set', category: 'Sports', price: 54, originalPrice: 74, discount: 27, rating: 4.6, reviews: 440, sold: 2180, stock: 'In Stock', description: 'Hydration essentials with a sculptural finish.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQELxGf87-1lzmfVSKOLh2x7fuvgT9BJaanJk_3Ufa-Mg&s=10', badge: 'Wellness' }
];

const reviews = [
  { name: 'Maya Chen', rating: 5, review: 'Premium quality, super fast delivery, and the packaging felt luxurious.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { name: 'Aiden Brooks', rating: 5, review: 'The finish and performance exceeded my expectations. It feels like a premium product.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Sofia Patel', rating: 4, review: 'Great value for money and the support team was incredibly helpful.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
];

const brands = ['Apple', 'Samsung', 'Sony', 'HP', 'Dell', 'Nike', 'Adidas', 'Boat'];
const recentItems = [
  { name: 'Luxe Wireless Earbuds', price: '$129', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80' },
  { name: 'Sculpted Home Lamp', price: '$74', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Pro Travel Case', price: '$59', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80' },
  { name: 'Cloud Knit Throw', price: '$88', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80' }
];

let filteredProducts = [...products];
let activeCategory = 'All';
let currentPage = 1;
const itemsPerPage = 8;

function renderCategoryChips() {
  const container = document.getElementById('categoryChips');
  if (!container) return;

  container.innerHTML = categoryFilters.map((category) => `
    <button class="category-chip ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">
      ${category}
    </button>
  `).join('');

  container.querySelectorAll('.category-chip').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      currentPage = 1;
      filteredProducts = activeCategory === 'All' ? [...products] : products.filter((item) => item.category === activeCategory);
      renderCategoryChips();
      renderProducts();
      renderPagination();
    });
  });
}

function renderTopRankings() {
  const container = document.getElementById('rankGrid');
  if (!container) return;

  const topItems = filteredProducts.slice(0, 4);
  container.innerHTML = topItems.map((item, index) => `
    <article class="rank-card ${index === 0 ? 'rank-card--top' : ''}">
      <span class="rank-badge">#${index + 1}</span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="premium-product-card__meta">
        <span class="meta-chip">⭐ ${item.rating}</span>
        <span class="meta-chip">${item.sold.toLocaleString()} Sold</span>
      </div>
    </article>
  `).join('');
}

function renderProducts() {
  const container = document.getElementById('bestSellerProductGrid');
  if (!container) return;

  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredProducts.slice(start, start + itemsPerPage);

  container.innerHTML = pageItems.map((item) => `
    <article class="premium-product-card" data-id="${item.id}" role="button" tabindex="0" aria-label="View details for ${item.name}">
      <div class="premium-product-card__image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="premium-product-card__badge">${item.badge}</span>
        <div class="premium-product-card__actions">
          <button class="icon-pill" type="button" aria-label="Add to wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="premium-product-card__body">
        <div class="premium-product-card__header">
          <span>${item.category}</span>
          <span class="stock-status">${item.stock}</span>
        </div>
        <h3 class="premium-product-card__title">${item.name}</h3>
        <p class="premium-product-card__desc">${item.description}</p>
        <div class="premium-product-card__price-row">
          <span class="price-current">₹${item.price}</span>
          <span class="price-original">₹${item.originalPrice}</span>
          <span class="discount-pill">-${item.discount}%</span>
        </div>
        <div class="premium-product-card__meta">
          <span class="meta-chip">★ ${item.rating}</span>
          <span class="meta-chip">${item.reviews.toLocaleString()} reviews</span>
          <span class="meta-chip">${item.sold.toLocaleString()} sold</span>
        </div>
        <div class="premium-product-card__footer">
          <button class="view-btn btn-ripple" type="button">Quick View</button>
          <button class="add-btn btn-ripple" type="button">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');

  renderTopRankings();
}

function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const pages = Array.from({ length: Math.min(4, totalPages) }, (_, index) => index + 1);

  container.innerHTML = `
    <button type="button" class="btn-ripple" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    ${pages.map((page) => `<button class="btn-ripple ${page === currentPage ? 'active' : ''}" type="button" data-page="${page}">${page}</button>`).join('')}
    <button type="button" class="btn-ripple" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

  container.querySelectorAll('button[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.page;
      if (target === 'prev' && currentPage > 1) currentPage -= 1;
      if (target === 'next' && currentPage < totalPages) currentPage += 1;
      if (/^\d+$/.test(target)) currentPage = Number(target);
      renderProducts();
      renderPagination();
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderBrands() {
  const container = document.getElementById('brandTrack');
  if (!container) return;

  container.innerHTML = brands.map((brand) => `
    <article class="brand-card">
      <div class="brand-mark">${brand.slice(0, 2).toUpperCase()}</div>
      <h3>${brand}</h3>
      <p>Premium partner</p>
    </article>
  `).join('');
}

function renderReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  container.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="review-head">
        <img class="review-avatar" src="${review.image}" alt="${review.name}" loading="lazy" />
        <div>
          <div class="review-name">${review.name}</div>
          <div class="review-badge"><i class="fa-solid fa-circle-check"></i> Verified Purchase</div>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>“${review.review}”</p>
    </article>
  `).join('');
}

function renderRecentItems() {
  const container = document.getElementById('recentTrack');
  if (!container) return;

  container.innerHTML = recentItems.map((item) => `
    <article class="recent-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    </article>
  `).join('');
}

function setupSliderScroll(containerId, direction) {
  const track = document.getElementById(containerId);
  if (!track) return;

  const amount = 260;
  const button = document.querySelector(`.${direction === 'prev' ? 'recent-prev' : 'recent-next'}`);
  if (button) {
    button.addEventListener('click', () => {
      track.scrollBy({ left: direction === 'prev' ? -amount : amount, behavior: 'smooth' });
    });
  }
}

function setupBrandSlider() {
  const track = document.getElementById('brandTrack');
  const buttons = document.querySelectorAll('.brand-slider .slider-nav');
  if (!track || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const amount = 220;
      track.scrollBy({ left: button.classList.contains('next') ? amount : -amount, behavior: 'smooth' });
    });
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    if (button) {
      button.textContent = 'Subscribed';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Subscribe';
        button.disabled = false;
      }, 2200);
    }
  });
}

function init() {
  filteredProducts = [...products];
  renderCategoryChips();
  renderBrands();
  renderReviews();
  renderRecentItems();
  renderProducts();
  renderPagination();
  setupBrandSlider();
  setupNewsletterForm();
  setupSliderScroll('recentTrack', 'prev');
  setupSliderScroll('recentTrack', 'next');
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('.premium-product-card[data-id]');
  if (card && !event.target.closest('button')) {
    window.location.href = buildProductLink(card.dataset.id);
  }
});

document.addEventListener('keydown', (event) => {
  const card = event.target.closest('.premium-product-card[data-id]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    window.location.href = buildProductLink(card.dataset.id);
  }
});

init();
