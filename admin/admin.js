const STORAGE_KEYS = {
  products: 'alibaba_products',
  categories: 'alibaba_categories',
  orders: 'alibaba_orders',
  reviews: 'alibaba_reviews',
  homepage: 'alibaba_homepage',
  websiteContent: 'alibaba_website_content',
  settings: 'alibaba_settings',
  adminCredentials: 'alibaba_admin_credentials',
  adminSession: 'alibaba_admin_session'
};

const PRODUCTS_PER_PAGE = 20;
const DEFAULT_CREDENTIALS = { username: 'admin', password: 'admin123' };
const state = {
  section: 'dashboard',
  productPage: 1,
  productFilters: {
    search: '',
    category: '',
    stock: '',
    sort: 'newest'
  }
};

const PRODUCT_TEMPLATE = {
  id: Date.now(),
  name: 'New Product',
  category: 'Electronics',
  subcategory: 'Accessories',
  brand: 'ALIBABA',
  description: 'Premium product',
  price: 999,
  mrp: 1299,
  discount: 20,
  stock: 10,
  rating: 4.5,
  reviewCount: 100,
  tags: ['new', 'featured'],
  specifications: { Brand: 'ALIBABA', Warranty: '1 year' },
  image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  images: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
  ],
  featured: false,
  bestSeller: false,
  isTodayDeal: false,
  isNewArrival: false,
  createdAt: new Date().toISOString()
};

function ensureStorageDefaults() {
  const credentials = loadData(STORAGE_KEYS.adminCredentials, DEFAULT_CREDENTIALS);
  if (!credentials || !credentials.username || !credentials.password) {
    saveData(STORAGE_KEYS.adminCredentials, DEFAULT_CREDENTIALS);
  }

  if (!loadData(STORAGE_KEYS.categories, null)) {
    saveData(STORAGE_KEYS.categories, [
      { id: 'electronics', name: 'Electronics', subcategories: ['Audio', 'Accessories', 'Wearables'] },
      { id: 'fashion', name: 'Fashion', subcategories: ['Men', 'Women', 'Footwear'] },
      { id: 'home', name: 'Home', subcategories: ['Decor', 'Furniture', 'Kitchen'] },
      { id: 'gaming', name: 'Gaming', subcategories: ['Accessories', 'Consoles', 'Chairs'] }
    ]);
  }

  if (!loadData(STORAGE_KEYS.homepage, null)) {
    saveData(STORAGE_KEYS.homepage, {
      heroHeading: 'Upgrade your daily essentials.',
      heroDescription: 'Discover premium everyday products curated for modern living.',
      heroImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
      heroButtonText: 'Shop Now',
      heroButtonLink: '../index.html',
      featuredIds: [],
      trendingIds: [],
      bestSellersIds: [],
      todayDealsIds: [],
      newArrivalsIds: [],
      recommendedIds: []
    });
  }

  if (!loadData(STORAGE_KEYS.websiteContent, null)) {
    saveData(STORAGE_KEYS.websiteContent, {
      homepageHeading: 'ALIBABA.SHOP',
      homepageSubtitle: 'Trusted deals for everyday living',
      contactPhone: '+91 98765 43210',
      contactEmail: 'support@alibaba.shop',
      aboutUs: 'ALIBABA.SHOP brings premium products and thoughtful essentials to shoppers across India.',
      customerService: 'Our support team works to resolve questions, returns, and order issues quickly.',
      footerText: '© 2026 ALIBABA.SHOP. All rights reserved.',
      announcementBar: 'Free delivery on orders above ₹999'
    });
  }

  if (!loadData(STORAGE_KEYS.settings, null)) {
    saveData(STORAGE_KEYS.settings, {
      siteName: 'ALIBABA.SHOP',
      demoMode: true,
      theme: 'dark'
    });
  }

  if (!loadData(STORAGE_KEYS.reviews, null)) {
    saveData(STORAGE_KEYS.reviews, [
      {
        id: 1,
        productId: 101,
        customerName: 'Aarav',
        rating: 5,
        review: 'Excellent product quality and fast delivery.',
        status: 'approved',
        date: new Date().toISOString()
      }
    ]);
  }

  if (!loadData(STORAGE_KEYS.orders, null)) {
    saveData(STORAGE_KEYS.orders, [
      {
        id: 'ALB-1001',
        customer: { name: 'Riya Sharma', phone: '9876543210', email: 'riya@example.com' },
        address: '12, Market Road, Pune',
        products: [{ productId: 101, quantity: 1, price: 999, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80' }],
        total: 999,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Confirmed',
        createdAt: new Date().toISOString(),
        discount: 0,
        deliveryCharge: 0
      }
    ]);
  }

  if (!loadData(STORAGE_KEYS.products, null)) {
    saveData(STORAGE_KEYS.products, [
      {
        id: 101,
        name: 'Aurora Smart Watch',
        category: 'Electronics',
        subcategory: 'Wearables',
        brand: 'Aurora',
        description: 'Premium smartwatch with health tracking and premium design.',
        price: 999,
        mrp: 2499,
        discount: 24,
        stock: 15,
        rating: 4.8,
        reviewCount: 1860,
        tags: ['smartwatch', 'wearable', 'fitness'],
        specifications: { Brand: 'Aurora', Model: 'AW-9', Warranty: '2 years' },
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
        images: [
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1508341591423-29db4f7ff6f0?auto=format&fit=crop&w=900&q=80'
        ],
        featured: true,
        bestSeller: true,
        isTodayDeal: false,
        isNewArrival: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 102,
        name: 'Nova Noise Cancelling Headphones',
        category: 'Electronics',
        subcategory: 'Audio',
        brand: 'Nova',
        description: 'Immersive sound with deep bass and active noise cancellation.',
        price: 2999,
        mrp: 9000,
        discount: 24,
        stock: 12,
        rating: 4.8,
        reviewCount: 1430,
        tags: ['headphones', 'audio', 'wireless'],
        specifications: { Brand: 'Nova', Model: 'NC-200', Warranty: '1 year' },
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80'
        ],
        featured: true,
        bestSeller: true,
        isTodayDeal: true,
        isNewArrival: false,
        createdAt: new Date().toISOString()
      }
    ]);
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function updateData(key, updater) {
  const current = loadData(key, []);
  const next = typeof updater === 'function' ? updater(current) : updater;
  saveData(key, next);
  return next;
}

function deleteData(key) {
  localStorage.removeItem(key);
}

function parseSpecs(specText) {
  const output = {};
  if (!specText) return output;
  specText.split(/\n|;/).forEach((entry) => {
    const trimmed = entry.trim();
    if (!trimmed) return;
    const [key, ...rest] = trimmed.split(':');
    if (key && rest.length) {
      output[key.trim()] = rest.join(':').trim();
    }
  });
  return output;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
}

function getProducts() {
  return Array.isArray(loadData(STORAGE_KEYS.products, [])) ? loadData(STORAGE_KEYS.products, []) : [];
}

function setProducts(nextProducts) {
  const normalized = nextProducts.map((product) => normalizeProduct(product));
  saveData(STORAGE_KEYS.products, normalized);
  if (typeof window !== 'undefined') {
    window.ALIBABA_PRODUCTS = normalized;
    window.dispatchEvent(new CustomEvent('alibaba-products-updated', { detail: { products: normalized } }));
  }
  return normalized;
}

function normalizeProduct(product) {
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const mainImage = product.image || images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80';
  const normalized = {
    ...PRODUCT_TEMPLATE,
    ...product,
    id: Number(product.id || Date.now()),
    price: Number(product.price || 0),
    mrp: Number(product.mrp || product.originalPrice || product.price || 0),
    discount: Number(product.discount || 0),
    stock: Number(product.stock || 0),
    rating: Number(product.rating || 0),
    reviewCount: Number(product.reviewCount || product.reviews || 0),
    tags: Array.isArray(product.tags) ? product.tags : String(product.tags || '').split(',').map((item) => item.trim()).filter(Boolean),
    specifications: typeof product.specifications === 'object' && product.specifications ? product.specifications : parseSpecs(product.specifications || ''),
    image: product.image || mainImage,
    images: images.length ? images : [mainImage],
    featured: Boolean(product.featured),
    bestSeller: Boolean(product.bestSeller),
    isTodayDeal: Boolean(product.isTodayDeal || product.todayDeal),
    isNewArrival: Boolean(product.isNewArrival || product.newArrival),
    createdAt: product.createdAt || new Date().toISOString()
  };
  if (!normalized.images.length) normalized.images = [normalized.image];
  return normalized;
}

function getCategories() {
  return loadData(STORAGE_KEYS.categories, []);
}

function setCategories(categories) {
  saveData(STORAGE_KEYS.categories, categories);
}

function getOrders() {
  return loadData(STORAGE_KEYS.orders, []);
}

function getReviews() {
  return loadData(STORAGE_KEYS.reviews, []);
}

function getHomepageSettings() {
  return loadData(STORAGE_KEYS.homepage, {});
}

function getWebsiteContent() {
  return loadData(STORAGE_KEYS.websiteContent, {});
}

function getSettings() {
  return loadData(STORAGE_KEYS.settings, {});
}

function ensureAdminSession() {
  const existing = loadData(STORAGE_KEYS.adminSession, null);
  if (existing && existing.loggedIn) {
    document.getElementById('adminApp').classList.remove('hidden');
    document.getElementById('adminLoginOverlay').classList.add('hidden');
  }
}

function setSection(section) {
  state.section = section;
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === section);
  });
  document.querySelectorAll('.page-section').forEach((sectionNode) => {
    sectionNode.classList.toggle('active', sectionNode.dataset.sectionContent === section);
  });
  const titles = {
    dashboard: 'Dashboard',
    products: 'Products',
    categories: 'Categories',
    orders: 'Orders',
    inventory: 'Inventory',
    deals: 'Today\'s Deals',
    bestSellers: 'Best Sellers',
    homepage: 'Homepage',
    reviews: 'Reviews',
    content: 'Website Content',
    settings: 'Settings'
  };
  document.getElementById('pageTitle').textContent = titles[section] || 'Admin';
}

function checkLogin() {
  const credentials = loadData(STORAGE_KEYS.adminCredentials, DEFAULT_CREDENTIALS);
  const session = loadData(STORAGE_KEYS.adminSession, null);
  const isLoggedIn = session && session.loggedIn && session.username === credentials.username;
  document.getElementById('adminApp').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('adminLoginOverlay').classList.toggle('hidden', isLoggedIn);
  return isLoggedIn;
}

function loginAdmin(event) {
  event.preventDefault();
  const credentials = loadData(STORAGE_KEYS.adminCredentials, DEFAULT_CREDENTIALS);
  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value.trim();

  if (username === credentials.username && password === credentials.password) {
    saveData(STORAGE_KEYS.adminSession, { loggedIn: true, username, timestamp: Date.now() });
    checkLogin();
    renderAll();
  } else {
    alert('Invalid admin credentials. Use the demo admin credentials.');
  }
}

function logoutAdmin() {
  saveData(STORAGE_KEYS.adminSession, { loggedIn: false, username: '', timestamp: Date.now() });
  checkLogin();
}

function generateProductId() {
  const max = Math.max(0, ...getProducts().map((product) => Number(product.id || 0)));
  return max + 1;
}

function getFilteredProducts() {
  const query = state.productFilters.search.toLowerCase();
  const category = state.productFilters.category;
  const stockFilter = state.productFilters.stock;
  let filtered = [...getProducts()];

  if (query) {
    filtered = filtered.filter((product) => {
      const haystack = [
        product.name,
        String(product.id),
        product.category,
        product.subcategory,
        product.brand,
        ...(product.tags || [])
      ].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }

  if (category) {
    filtered = filtered.filter((product) => product.category === category || product.subcategory === category);
  }

  if (stockFilter === 'in-stock') filtered = filtered.filter((product) => Number(product.stock || 0) > 10);
  if (stockFilter === 'low-stock') filtered = filtered.filter((product) => Number(product.stock || 0) > 0 && Number(product.stock || 0) < 10);
  if (stockFilter === 'out-stock') filtered = filtered.filter((product) => Number(product.stock || 0) === 0);

  switch (state.productFilters.sort) {
    case 'price-asc':
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'price-desc':
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case 'rating':
      filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
    case 'stock':
      filtered.sort((a, b) => Number(b.stock) - Number(a.stock));
      break;
    default:
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      break;
  }

  return filtered;
}

function renderDashboard() {
  const products = getProducts();
  const orders = getOrders();
  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Orders', value: orders.length },
    { label: 'Total Sales', value: formatCurrency(orders.reduce((sum, order) => sum + Number(order.total || 0), 0)) },
    { label: 'Pending Orders', value: orders.filter((order) => String(order.orderStatus || '').toLowerCase() === 'pending').length },
    { label: 'Confirmed Orders', value: orders.filter((order) => String(order.orderStatus || '').toLowerCase() === 'confirmed').length },
    { label: 'Delivered Orders', value: orders.filter((order) => String(order.orderStatus || '').toLowerCase() === 'delivered').length },
    { label: 'Cancelled Orders', value: orders.filter((order) => String(order.orderStatus || '').toLowerCase() === 'cancelled').length },
    { label: 'Low Stock Products', value: products.filter((product) => Number(product.stock || 0) < 10 && Number(product.stock || 0) > 0).length }
  ];

  document.getElementById('dashboardStats').innerHTML = stats.map((stat) => `
    <div class="stat-card card">
      <span class="label">${stat.label}</span>
      <div class="value">
        <span>${stat.value}</span>
      </div>
    </div>
  `).join('');

  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);
  document.getElementById('recentOrdersTable').innerHTML = recentOrders.length
    ? recentOrders.map((order) => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer?.name || 'N/A'}</td>
        <td>${formatCurrency(order.total || 0)}</td>
        <td><span class="status-pill ${String(order.orderStatus || 'pending').toLowerCase().replace(/\s+/g, '-')}">${order.orderStatus || 'Pending'}</span></td>
      </tr>
    `).join('')
    : '<tr><td colspan="4">No orders yet.</td></tr>';

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);
  document.getElementById('recentProductsTable').innerHTML = recentProducts.length
    ? recentProducts.map((product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${formatCurrency(product.price || 0)}</td>
      </tr>
    `).join('')
    : '<tr><td colspan="3">No products available.</td></tr>';

  const lowStock = products.filter((product) => Number(product.stock || 0) < 10).slice(0, 5);
  document.getElementById('lowStockTable').innerHTML = lowStock.length
    ? lowStock.map((product) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.stock}</td>
        <td><span class="stock-pill ${Number(product.stock || 0) === 0 ? 'out' : 'low'}">${Number(product.stock || 0) === 0 ? 'Out of Stock' : 'Low Stock'}</span></td>
      </tr>
    `).join('')
    : '<tr><td colspan="4">No low-stock products.</td></tr>';
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const categories = getCategories();
  const categoryFilter = document.getElementById('productCategoryFilter');
  const selectedCategory = state.productFilters.category;
  categoryFilter.innerHTML = '<option value="">All categories</option>' + categories.map((category) => `
    <option value="${category.name}">${category.name}</option>
  `).join('');
  categoryFilter.value = selectedCategory;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  if (state.productPage > totalPages) state.productPage = totalPages;
  const start = (state.productPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  document.getElementById('productPaginationInfo').textContent = `Showing ${filtered.length ? start + 1 : 0}–${Math.min(start + pageItems.length, filtered.length)} of ${filtered.length} products`;
  document.getElementById('productsTableBody').innerHTML = pageItems.length
    ? pageItems.map((product) => `
      <tr>
        <td><img class="product-thumb" src="${product.image || product.images?.[0] || ''}" alt="${product.name}" /></td>
        <td>
          <strong>${product.name}</strong><br />
          <small>ID: ${product.id}</small>
        </td>
        <td>${product.category}</td>
        <td>${product.brand}</td>
        <td>${formatCurrency(product.price || 0)}</td>
        <td><span class="stock-pill ${Number(product.stock || 0) === 0 ? 'out' : Number(product.stock || 0) < 10 ? 'low' : 'good'}">${product.stock}</span></td>
        <td>${[product.featured ? 'Featured' : '', product.bestSeller ? 'Best Seller' : '', product.isTodayDeal ? 'Deal' : '', product.isNewArrival ? 'New' : ''].filter(Boolean).join(', ') || '—'}</td>
        <td>
          <div class="actions">
            <button class="small-btn primary" data-action="view-product" data-id="${product.id}" type="button">View</button>
            <button class="small-btn" data-action="edit-product" data-id="${product.id}" type="button">Edit</button>
            <button class="small-btn" data-action="duplicate-product" data-id="${product.id}" type="button">Duplicate</button>
            <button class="small-btn danger" data-action="delete-product" data-id="${product.id}" type="button">Delete</button>
          </div>
        </td>
      </tr>
    `).join('')
    : '<tr><td colspan="8">No products match your filters.</td></tr>';

  document.getElementById('productPagination').innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return `<button class="page-btn ${state.productPage === pageNumber ? 'active' : ''}" data-page="${pageNumber}" type="button">${pageNumber}</button>`;
  }).join('');
}

function renderCategories() {
  const list = document.getElementById('categoriesList');
  list.innerHTML = getCategories().map((category) => `
    <div class="category-card">
      <div class="category-header">
        <h3>${category.name}</h3>
        <div class="actions">
          <button class="small-btn" data-action="edit-category" data-id="${category.id}" type="button">Edit</button>
          <button class="small-btn danger" data-action="delete-category" data-id="${category.id}" type="button">Delete</button>
        </div>
      </div>
      <div class="category-subcategories">
        ${(category.subcategories || []).map((subcategory) => `
          <span class="subtag">${subcategory}</span>
        `).join('')}
      </div>
      <div class="actions" style="margin-top: 0.9rem;">
        <button class="small-btn" data-action="add-subcategory" data-id="${category.id}" type="button">Add Subcategory</button>
        <button class="small-btn" data-action="edit-subcategory" data-id="${category.id}" type="button">Edit Subcategories</button>
      </div>
    </div>
  `).join('');
}

function renderOrders() {
  const orders = [...getOrders()].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  document.getElementById('ordersTableBody').innerHTML = orders.length
    ? orders.map((order) => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer?.name || 'N/A'}</td>
        <td>${(order.products || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)}</td>
        <td>${formatCurrency(order.total || 0)}</td>
        <td>${order.paymentMethod || 'N/A'}</td>
        <td><span class="status-pill ${String(order.orderStatus || 'pending').toLowerCase().replace(/\s+/g, '-')}">${order.orderStatus || 'Pending'}</span></td>
        <td><button class="small-btn primary" data-action="view-order" data-id="${order.id}" type="button">Details</button></td>
      </tr>
    `).join('')
    : '<tr><td colspan="7">No orders to display.</td></tr>';
}

function renderInventory() {
  const products = [...getProducts()];
  document.getElementById('inventoryTableBody').innerHTML = products.map((product) => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:0.7rem;">
          <img class="product-thumb" src="${product.image || product.images?.[0]}" alt="${product.name}" />
          <span>${product.name}</span>
        </div>
      </td>
      <td><img class="product-thumb" src="${product.image || product.images?.[0]}" alt="${product.name}" /></td>
      <td>${product.id}</td>
      <td><input type="number" min="0" value="${product.stock || 0}" data-role="stock-input" data-id="${product.id}" style="width: 90px; border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem;" /></td>
      <td><span class="stock-pill ${Number(product.stock || 0) === 0 ? 'out' : Number(product.stock || 0) < 10 ? 'low' : 'good'}">${Number(product.stock || 0) === 0 ? 'Out of Stock' : Number(product.stock || 0) < 10 ? 'Low Stock' : 'In Stock'}</span></td>
      <td><button class="small-btn" data-action="save-stock" data-id="${product.id}" type="button">Save</button></td>
    </tr>
  `).join('');
}

function renderDeals() {
  const products = getProducts();
  document.getElementById('dealsTableBody').innerHTML = products.map((product) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td><input type="number" min="0" max="100" value="${product.discount || 0}" data-role="deal-discount" data-id="${product.id}" style="width: 80px; border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem;" /></td>
      <td><span class="tag-pill">${product.isTodayDeal ? 'Enabled' : 'Disabled'}</span></td>
      <td>
        <div class="actions">
          <button class="small-btn" data-action="toggle-deal" data-id="${product.id}" type="button">${product.isTodayDeal ? 'Disable' : 'Enable'}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderBestSellers() {
  const products = getProducts();
  document.getElementById('bestSellerTableBody').innerHTML = products.map((product) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.brand}</td>
      <td><span class="tag-pill">${product.bestSeller ? 'Best Seller' : 'Not marked'}</span></td>
      <td>
        <button class="small-btn" data-action="toggle-best-seller" data-id="${product.id}" type="button">${product.bestSeller ? 'Remove' : 'Mark'}</button>
      </td>
    </tr>
  `).join('');
}

function renderReviews() {
  const reviews = getReviews();
  document.getElementById('reviewsTableBody').innerHTML = reviews.length
    ? reviews.map((review) => `
      <tr>
        <td>${getProducts().find((product) => Number(product.id) === Number(review.productId))?.name || review.productId}</td>
        <td>${review.customerName || 'Guest'}</td>
        <td>${'★'.repeat(Math.round(Number(review.rating || 0)))} ${Number(review.rating || 0)}</td>
        <td>${review.review || '—'}</td>
        <td><span class="status-pill ${review.status || 'pending'}">${review.status || 'Pending'}</span></td>
        <td>
          <div class="actions">
            <button class="small-btn" data-action="approve-review" data-id="${review.id}" type="button">Approve</button>
            <button class="small-btn" data-action="hide-review" data-id="${review.id}" type="button">Hide</button>
            <button class="small-btn danger" data-action="delete-review" data-id="${review.id}" type="button">Delete</button>
          </div>
        </td>
      </tr>
    `).join('')
    : '<tr><td colspan="6">No reviews yet.</td></tr>';
}

function populateHomepageForm() {
  const homepage = getHomepageSettings();
  const form = document.getElementById('homepageForm');
  form.heroHeading.value = homepage.heroHeading || '';
  form.heroDescription.value = homepage.heroDescription || '';
  form.heroImage.value = homepage.heroImage || '';
  form.heroButtonText.value = homepage.heroButtonText || '';
  form.heroButtonLink.value = homepage.heroButtonLink || '';
  form.featuredIds.value = (homepage.featuredIds || []).join(', ');
  form.trendingIds.value = (homepage.trendingIds || []).join(', ');
  form.bestSellersIds.value = (homepage.bestSellersIds || []).join(', ');
  form.todayDealsIds.value = (homepage.todayDealsIds || []).join(', ');
  form.newArrivalsIds.value = (homepage.newArrivalsIds || []).join(', ');
  form.recommendedIds.value = (homepage.recommendedIds || []).join(', ');
}

function populateContentForm() {
  const content = getWebsiteContent();
  const form = document.getElementById('contentForm');
  form.homepageHeading.value = content.homepageHeading || '';
  form.homepageSubtitle.value = content.homepageSubtitle || '';
  form.contactPhone.value = content.contactPhone || '';
  form.contactEmail.value = content.contactEmail || '';
  form.aboutUs.value = content.aboutUs || '';
  form.customerService.value = content.customerService || '';
  form.footerText.value = content.footerText || '';
  form.announcementBar.value = content.announcementBar || '';
}

function populateCredentialForm() {
  const creds = loadData(STORAGE_KEYS.adminCredentials, DEFAULT_CREDENTIALS);
  document.getElementById('credentialUsername').value = creds.username || 'admin';
  document.getElementById('credentialPassword').value = creds.password || 'admin123';
}

function renderAll() {
  renderDashboard();
  renderProducts();
  renderCategories();
  renderOrders();
  renderInventory();
  renderDeals();
  renderBestSellers();
  populateHomepageForm();
  renderReviews();
  populateContentForm();
  populateCredentialForm();
}

function openProductModal(product = null) {
  const form = document.getElementById('productForm');
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');
  form.reset();

  if (product) {
    title.textContent = 'Edit Product';
    form.id.value = product.id;
    form.name.value = product.name || '';
    form.category.value = product.category || '';
    form.subcategory.value = product.subcategory || '';
    form.brand.value = product.brand || '';
    form.price.value = product.price || 0;
    form.mrp.value = product.mrp || product.originalPrice || 0;
    form.discount.value = product.discount || 0;
    form.stock.value = product.stock || 0;
    form.rating.value = product.rating || 0;
    form.reviewCount.value = product.reviewCount || 0;
    form.description.value = product.description || '';
    form.specifications.value = Object.entries(product.specifications || {}).map(([key, value]) => `${key}: ${value}`).join('\n');
    form.tags.value = (product.tags || []).join(', ');
    form.image.value = product.image || '';
    form.image2.value = (product.images || [])[1] || '';
    form.image3.value = (product.images || [])[2] || '';
    form.image4.value = (product.images || [])[3] || '';
    form.featured.checked = Boolean(product.featured);
    form.bestSeller.checked = Boolean(product.bestSeller);
    form.todayDeal.checked = Boolean(product.isTodayDeal || product.todayDeal);
    form.newArrival.checked = Boolean(product.isNewArrival || product.newArrival);
  } else {
    title.textContent = 'Add Product';
    form.id.value = '';
    form.price.value = 0;
    form.mrp.value = 0;
    form.discount.value = 0;
    form.stock.value = 0;
    form.rating.value = 4.5;
    form.reviewCount.value = 0;
    form.featured.checked = false;
    form.bestSeller.checked = false;
    form.todayDeal.checked = false;
    form.newArrival.checked = false;
  }

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function openConfirmation({ title, message, actionLabel, onConfirm }) {
  const modal = document.getElementById('confirmationModal');
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmActionBtn').textContent = actionLabel;
  modal.dataset.onConfirm = JSON.stringify({ onConfirm });
  modal.classList.remove('hidden');
}

function deleteProductById(productId) {
  const products = getProducts().filter((product) => Number(product.id) !== Number(productId));
  setProducts(products);
  renderAll();
}

function duplicateProductById(productId) {
  const source = getProducts().find((product) => Number(product.id) === Number(productId));
  if (!source) return;
  const clone = normalizeProduct({ ...source, id: generateProductId(), name: `${source.name} Copy`, createdAt: new Date().toISOString() });
  setProducts([...getProducts(), clone]);
  renderAll();
}

function saveProductFromForm(event) {
  event.preventDefault();
  const form = event.target;
  const product = {
    id: form.id.value ? Number(form.id.value) : generateProductId(),
    name: form.name.value.trim(),
    category: form.category.value.trim(),
    subcategory: form.subcategory.value.trim() || 'General',
    brand: form.brand.value.trim() || 'ALIBABA',
    description: form.description.value.trim(),
    price: Number(form.price.value || 0),
    mrp: Number(form.mrp.value || form.price.value || 0),
    discount: Number(form.discount.value || 0),
    stock: Number(form.stock.value || 0),
    rating: Number(form.rating.value || 0),
    reviewCount: Number(form.reviewCount.value || 0),
    tags: (form.tags.value || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    specifications: parseSpecs(form.specifications.value),
    image: form.image.value.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    images: [
      form.image.value.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      form.image2.value.trim(),
      form.image3.value.trim(),
      form.image4.value.trim()
    ].filter(Boolean),
    featured: form.featured.checked,
    bestSeller: form.bestSeller.checked,
    isTodayDeal: form.todayDeal.checked,
    isNewArrival: form.newArrival.checked,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const products = getProducts();
  const index = products.findIndex((entry) => Number(entry.id) === Number(product.id));
  if (index >= 0) {
    products[index] = normalizeProduct({ ...products[index], ...product });
  } else {
    products.push(normalizeProduct(product));
  }

  setProducts(products);
  closeModal('productModal');
  renderAll();
}

function addCategory() {
  const name = prompt('Category name:');
  if (!name) return;
  const categories = getCategories();
  categories.push({ id: name.toLowerCase().replace(/\s+/g, '-'), name, subcategories: [] });
  setCategories(categories);
  renderCategories();
}

function editCategory(categoryId) {
  const categories = getCategories();
  const category = categories.find((item) => item.id === categoryId || item.name === categoryId);
  if (!category) return;
  const name = prompt('Update category name:', category.name);
  if (name) {
    category.name = name;
    setCategories(categories);
    renderCategories();
  }
}

function deleteCategory(categoryId) {
  const categories = getCategories().filter((category) => category.id !== categoryId && category.name !== categoryId);
  setCategories(categories);
  renderCategories();
}

function addSubcategory(categoryId) {
  const categories = getCategories();
  const category = categories.find((item) => item.id === categoryId || item.name === categoryId);
  if (!category) return;
  const subcategory = prompt('New subcategory name:');
  if (!subcategory) return;
  category.subcategories = [...(category.subcategories || []), subcategory];
  setCategories(categories);
  renderCategories();
}

function editSubcategories(categoryId) {
  const categories = getCategories();
  const category = categories.find((item) => item.id === categoryId || item.name === categoryId);
  if (!category) return;
  const next = prompt('Edit subcategories separated by commas:', (category.subcategories || []).join(', '));
  if (next !== null) {
    category.subcategories = next.split(',').map((item) => item.trim()).filter(Boolean);
    setCategories(categories);
    renderCategories();
  }
}

function showOrderDetails(orderId) {
  const order = getOrders().find((entry) => String(entry.id) === String(orderId));
  if (!order) return;
  const orderDetailsContent = document.getElementById('orderDetailsContent');
  orderDetailsContent.innerHTML = `
    <div class="order-info-grid">
      <div class="detail-box">
        <h4>Order ID</h4>
        <p>${order.id}</p>
      </div>
      <div class="detail-box">
        <h4>Customer</h4>
        <p>${order.customer?.name || 'N/A'}</p>
      </div>
      <div class="detail-box">
        <h4>Phone</h4>
        <p>${order.customer?.phone || 'N/A'}</p>
      </div>
      <div class="detail-box">
        <h4>Address</h4>
        <p>${order.address || 'N/A'}</p>
      </div>
      <div class="detail-box">
        <h4>Payment Method</h4>
        <p>${order.paymentMethod || 'N/A'}</p>
      </div>
      <div class="detail-box">
        <h4>Order Date</h4>
        <p>${new Date(order.createdAt || Date.now()).toLocaleString()}</p>
      </div>
    </div>
    <div class="detail-box">
      <h4>Payment Status</h4>
      <select id="paymentStatusSelect" class="admin-select">
        ${['Pending', 'Paid', 'Failed', 'Cancelled', 'Refunded'].map((status) => `<option value="${status}" ${status === (order.paymentStatus || 'Pending') ? 'selected' : ''}>${status}</option>`).join('')}
      </select>
    </div>
    <div class="detail-box">
      <h4>Order Status</h4>
      <select id="orderStatusSelect" class="admin-select">
        ${['Pending', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => `<option value="${status}" ${status === (order.orderStatus || 'Pending') ? 'selected' : ''}>${status}</option>`).join('')}
      </select>
    </div>
    <div class="order-items">
      ${(order.products || []).map((item) => `
        <div class="order-item-row">
          <img src="${item.image || ''}" alt="${item.productId}" />
          <div>
            <strong>Product #${item.productId}</strong><br />
            <small>Qty: ${item.quantity}</small>
          </div>
          <small>${formatCurrency(item.price || 0)}</small>
          <small>${formatCurrency((Number(item.price || 0) * Number(item.quantity || 0)) || 0)}</small>
        </div>
      `).join('')}
    </div>
    <div class="modal-actions">
      <button class="ghost-btn" type="button" data-close="orderModal">Close</button>
      <button class="primary-btn" type="button" id="saveOrderStatusBtn">Save Changes</button>
    </div>
  `;

  const saveBtn = document.getElementById('saveOrderStatusBtn');
  saveBtn.addEventListener('click', () => {
    const orders = getOrders();
    const current = orders.find((entry) => String(entry.id) === String(orderId));
    if (!current) return;
    current.paymentStatus = document.getElementById('paymentStatusSelect').value;
    current.orderStatus = document.getElementById('orderStatusSelect').value;
    saveData(STORAGE_KEYS.orders, orders);
    renderAll();
    closeModal('orderModal');
  });

  document.getElementById('orderModal').classList.remove('hidden');
  document.getElementById('orderModal').setAttribute('aria-hidden', 'false');
}

function updateStock(productId, newStock) {
  const products = getProducts();
  const target = products.find((product) => Number(product.id) === Number(productId));
  if (!target) return;
  target.stock = Number(newStock || 0);
  setProducts(products);
  renderAll();
}

function toggleDeal(productId) {
  const products = getProducts();
  const target = products.find((product) => Number(product.id) === Number(productId));
  if (!target) return;
  target.isTodayDeal = !Boolean(target.isTodayDeal);
  setProducts(products);
  renderAll();
}

function setDealDiscount(productId, discount) {
  const products = getProducts();
  const target = products.find((product) => Number(product.id) === Number(productId));
  if (!target) return;
  target.discount = Number(discount || 0);
  setProducts(products);
  renderAll();
}

function toggleBestSeller(productId) {
  const products = getProducts();
  const target = products.find((product) => Number(product.id) === Number(productId));
  if (!target) return;
  target.bestSeller = !Boolean(target.bestSeller);
  setProducts(products);
  renderAll();
}

function approveReview(reviewId) {
  const reviews = getReviews();
  const target = reviews.find((review) => Number(review.id) === Number(reviewId));
  if (!target) return;
  target.status = 'approved';
  saveData(STORAGE_KEYS.reviews, reviews);
  renderReviews();
}

function hideReview(reviewId) {
  const reviews = getReviews();
  const target = reviews.find((review) => Number(review.id) === Number(reviewId));
  if (!target) return;
  target.status = 'hidden';
  saveData(STORAGE_KEYS.reviews, reviews);
  renderReviews();
}

function deleteReview(reviewId) {
  const reviews = getReviews().filter((review) => Number(review.id) !== Number(reviewId));
  saveData(STORAGE_KEYS.reviews, reviews);
  renderReviews();
}

function exportData() {
  const payload = {
    products: getProducts(),
    categories: getCategories(),
    orders: getOrders(),
    reviews: getReviews(),
    homepage: getHomepageSettings(),
    websiteContent: getWebsiteContent(),
    settings: getSettings()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'alibaba-backup.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(String(event.target.result || '{}'));
      const { products, categories, orders, reviews, homepage, websiteContent, settings } = parsed;
      if (Array.isArray(products)) saveData(STORAGE_KEYS.products, products.map(normalizeProduct));
      if (Array.isArray(categories)) saveData(STORAGE_KEYS.categories, categories);
      if (Array.isArray(orders)) saveData(STORAGE_KEYS.orders, orders);
      if (Array.isArray(reviews)) saveData(STORAGE_KEYS.reviews, reviews);
      if (homepage) saveData(STORAGE_KEYS.homepage, homepage);
      if (websiteContent) saveData(STORAGE_KEYS.websiteContent, websiteContent);
      if (settings) saveData(STORAGE_KEYS.settings, settings);
      renderAll();
    } catch (error) {
      alert('Invalid backup file. Please choose a valid JSON export.');
    }
  };
  reader.readAsText(file);
}

function saveHomepage(event) {
  event.preventDefault();
  const form = event.target;
  const settings = {
    heroHeading: form.heroHeading.value.trim(),
    heroDescription: form.heroDescription.value.trim(),
    heroImage: form.heroImage.value.trim(),
    heroButtonText: form.heroButtonText.value.trim(),
    heroButtonLink: form.heroButtonLink.value.trim(),
    featuredIds: parseCsv(form.featuredIds.value),
    trendingIds: parseCsv(form.trendingIds.value),
    bestSellersIds: parseCsv(form.bestSellersIds.value),
    todayDealsIds: parseCsv(form.todayDealsIds.value),
    newArrivalsIds: parseCsv(form.newArrivalsIds.value),
    recommendedIds: parseCsv(form.recommendedIds.value)
  };
  saveData(STORAGE_KEYS.homepage, settings);
  renderAll();
}

function parseCsv(value) {
  return (value || '').split(',').map((item) => item.trim()).filter(Boolean);
}

function saveContent(event) {
  event.preventDefault();
  const form = event.target;
  const content = {
    homepageHeading: form.homepageHeading.value.trim(),
    homepageSubtitle: form.homepageSubtitle.value.trim(),
    contactPhone: form.contactPhone.value.trim(),
    contactEmail: form.contactEmail.value.trim(),
    aboutUs: form.aboutUs.value.trim(),
    customerService: form.customerService.value.trim(),
    footerText: form.footerText.value.trim(),
    announcementBar: form.announcementBar.value.trim()
  };
  saveData(STORAGE_KEYS.websiteContent, content);
  renderAll();
}

function updateDemoCredentials(event) {
  event.preventDefault();
  const username = document.getElementById('credentialUsername').value.trim();
  const password = document.getElementById('credentialPassword').value.trim();
  saveData(STORAGE_KEYS.adminCredentials, { username: username || 'admin', password: password || 'admin123' });
  alert('Admin demo credentials updated.');
}

function resetDemoData() {
  openConfirmation({
    title: 'Reset Demo Data',
    message: 'This will restore the default demo catalog and clear local admin data. Continue?',
    actionLabel: 'Reset',
    onConfirm: () => {
      localStorage.clear();
      ensureStorageDefaults();
      renderAll();
      checkLogin();
    }
  });
}

function performBackup() {
  const payload = {
    products: getProducts(),
    categories: getCategories(),
    orders: getOrders(),
    reviews: getReviews(),
    homepage: getHomepageSettings(),
    websiteContent: getWebsiteContent(),
    settings: getSettings()
  };
  localStorage.setItem('alibaba_backup_snapshot', JSON.stringify(payload));
  alert('Backup saved in localStorage.');
}

function restoreBackup() {
  const snapshot = loadData('alibaba_backup_snapshot', null);
  if (!snapshot) {
    alert('No backup snapshot exists yet.');
    return;
  }

  if (snapshot.products) saveData(STORAGE_KEYS.products, snapshot.products.map(normalizeProduct));
  if (snapshot.categories) saveData(STORAGE_KEYS.categories, snapshot.categories);
  if (snapshot.orders) saveData(STORAGE_KEYS.orders, snapshot.orders);
  if (snapshot.reviews) saveData(STORAGE_KEYS.reviews, snapshot.reviews);
  if (snapshot.homepage) saveData(STORAGE_KEYS.homepage, snapshot.homepage);
  if (snapshot.websiteContent) saveData(STORAGE_KEYS.websiteContent, snapshot.websiteContent);
  if (snapshot.settings) saveData(STORAGE_KEYS.settings, snapshot.settings);

  renderAll();
}

function bindGlobalEvents() {
  document.getElementById('adminLoginForm').addEventListener('submit', loginAdmin);
  document.getElementById('logoutBtn').addEventListener('click', logoutAdmin);
  document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
  document.getElementById('productForm').addEventListener('submit', saveProductFromForm);
  document.getElementById('productSearch').addEventListener('input', (event) => {
    state.productFilters.search = event.target.value;
    state.productPage = 1;
    renderProducts();
  });
  document.getElementById('productCategoryFilter').addEventListener('change', (event) => {
    state.productFilters.category = event.target.value;
    state.productPage = 1;
    renderProducts();
  });
  document.getElementById('stockFilter').addEventListener('change', (event) => {
    state.productFilters.stock = event.target.value;
    state.productPage = 1;
    renderProducts();
  });
  document.getElementById('productSort').addEventListener('change', (event) => {
    state.productFilters.sort = event.target.value;
    state.productPage = 1;
    renderProducts();
  });
  document.getElementById('productPagination').addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    state.productPage = Number(button.dataset.page || 1);
    renderProducts();
  });

  document.getElementById('homepageForm').addEventListener('submit', saveHomepage);
  document.getElementById('contentForm').addEventListener('submit', saveContent);
  document.getElementById('credentialForm').addEventListener('submit', updateDemoCredentials);
  document.getElementById('exportDataBtn').addEventListener('click', exportData);
  document.getElementById('importDataInput').addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    if (file) importData(file);
  });
  document.getElementById('backupDataBtn').addEventListener('click', performBackup);
  document.getElementById('restoreDataBtn').addEventListener('click', restoreBackup);
  document.getElementById('resetDemoBtn').addEventListener('click', resetDemoData);

  document.getElementById('confirmCancelBtn').addEventListener('click', () => document.getElementById('confirmationModal').classList.add('hidden'));
  document.getElementById('confirmActionBtn').addEventListener('click', () => {
    const modal = document.getElementById('confirmationModal');
    const payload = JSON.parse(modal.dataset.onConfirm || '{}');
    modal.classList.add('hidden');
    if (typeof payload.onConfirm === 'function') payload.onConfirm();
  });

  document.getElementById('adminSidebar').addEventListener('click', (event) => {
    const button = event.target.closest('[data-section]');
    if (!button) return;
    setSection(button.dataset.section);
  });

  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('adminSidebar').classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    const actionElement = event.target.closest('[data-action]');
    if (!actionElement) return;
    const { action, id } = actionElement.dataset;

    if (action === 'edit-product') {
      const product = getProducts().find((item) => Number(item.id) === Number(id));
      openProductModal(product);
    }
    if (action === 'view-product') {
      const product = getProducts().find((item) => Number(item.id) === Number(id));
      if (!product) return;
      alert(`${product.name}\nPrice: ${formatCurrency(product.price)}\nStock: ${product.stock}`);
    }
    if (action === 'duplicate-product') {
      duplicateProductById(id);
    }
    if (action === 'delete-product') {
      openConfirmation({
        title: 'Delete product',
        message: 'Are you sure you want to delete this product?',
        actionLabel: 'Delete',
        onConfirm: () => deleteProductById(id)
      });
    }
    if (action === 'edit-category') {
      editCategory(id);
    }
    if (action === 'delete-category') {
      openConfirmation({
        title: 'Delete category',
        message: 'Are you sure you want to delete this category?',
        actionLabel: 'Delete',
        onConfirm: () => deleteCategory(id)
      });
    }
    if (action === 'add-subcategory') {
      addSubcategory(id);
    }
    if (action === 'edit-subcategory') {
      editSubcategories(id);
    }
    if (action === 'view-order') {
      showOrderDetails(id);
    }
    if (action === 'save-stock') {
      const input = document.querySelector(`[data-role="stock-input"][data-id="${id}"]`);
      updateStock(id, input?.value);
    }
    if (action === 'toggle-deal') {
      toggleDeal(id);
    }
    if (action === 'toggle-best-seller') {
      toggleBestSeller(id);
    }
    if (action === 'approve-review') {
      approveReview(id);
    }
    if (action === 'hide-review') {
      hideReview(id);
    }
    if (action === 'delete-review') {
      openConfirmation({
        title: 'Delete review',
        message: 'Are you sure you want to delete this review?',
        actionLabel: 'Delete',
        onConfirm: () => deleteReview(id)
      });
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('[data-role="deal-discount"]')) {
      setDealDiscount(target.dataset.id, target.value);
    }
  });

  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) {
      closeModal(closeButton.dataset.close);
    }
  });

  document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
}

function init() {
  ensureStorageDefaults();
  bindGlobalEvents();
  checkLogin();
  setSection('dashboard');
  renderAll();
}

window.addEventListener('DOMContentLoaded', init);
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (['alibaba_products', 'alibaba_orders', 'alibaba_homepage', 'alibaba_website_content', 'alibaba_categories'].includes(event.key)) {
      renderAll();
    }
  });
}
