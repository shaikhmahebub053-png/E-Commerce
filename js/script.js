const body = document.body;
const loader = document.querySelector('.page-loader');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input-wrap input');
const suggestionsBox = document.querySelector('.search-suggestions');
const navLinks = document.querySelectorAll('.nav-link');
const allMenuTrigger = document.getElementById('allMenu');
const megaDropdown = document.getElementById('megaDropdown');
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const backToTop = document.getElementById('backToTop');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const cartCount = document.querySelector('.cart-count');
const siteHeader = document.querySelector('.site-header');
const closeMobile = document.querySelector('.mobile-sidebar .close-btn');
const CART_STORAGE_KEY = 'alibaba.shop-cart';
const WISHLIST_STORAGE_KEY = 'alibaba.shop-wishlist';
const CHECKOUT_SESSION_KEY = 'alibaba.shop-checkout-session';


window.addEventListener('DOMContentLoaded', () => {
  // Page initialization without authentication
});

const suggestions = [
  'Noise Cancelling Headphones',
  '4K Smart TV',
  'Ergonomic Office Chair',
  'Wireless Charging Pad',
  'Running Shoes',
  'Mechanical Keyboard',
  'Smart Home Hub',
  'Premium Coffee Maker',
  'Phone Case Protection',
  'Premium Watch',
  'Fast Charger',
  'Laptop Stand',
  'Gaming Mouse',
  'USB-C Cable',
  'Wireless Earbuds',
  'Travel Bag',
  'Power Bank',
  'Laptop Bag'
];

const heroSlides = [
  {
    title: 'Upgrade your workspace with design-forward essentials.',
    text: 'Discover ergonomic accessories, premium audio and smart devices curated for modern productivity.',
    badge: 'New Season Launch',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Fresh style that keeps pace with your day.',
    text: 'From streetwear to everyday comfort, explore elevated classics designed for movement and comfort.',
    badge: 'Fashion Spotlight',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Create a home that feels effortless and elevated.',
    text: 'Refresh your living space with lighting, décor, kitchen tools and wellness essentials.',
    badge: 'Home Refresh',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  }
];

const categories = [
  {
    title: 'Electronics',
    items: ['Smartphones', 'Audio', 'Accessories', 'Wearables']
  },
  {
    title: 'Fashion',
    items: ['Men', 'Women', 'Footwear', 'Bags']
  },
  {
    title: 'Gaming',
    items: ['Consoles', 'Headsets', 'Chairs', 'Controllers']
  },
  {
    title: 'Home Essentials',
    items: ['Decor', 'Lighting', 'Storage', 'Organizers']
  },
  {
    title: 'Kitchen',
    items: ['Cookware', 'Appliances', 'Dining', 'Coffee']
  },
  {
    title: 'Books',
    items: ['Fiction', 'Nonfiction', 'Children', 'Lifestyle']
  },
  {
    title: 'Furniture',
    items: ['Sofas', 'Tables', 'Beds', 'Office']
  },
  {
    title: 'Beauty',
    items: ['Skincare', 'Makeup', 'Hair', 'Self Care']
  }
];

const sharedProducts = [
  {
    id: 101,
    name: 'Aurora Smart Watch',
    brand: 'Aurora',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 999,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviews: 1860,
    stock: 15,
    badge: 'Best Seller',
    featured: true,
    deal: false,
    bestSeller: true,
    tag: 'Wellness Tech',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508341591423-29db4f7ff6f0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A premium smartwatch that blends fitness insights with a refined metallic finish for everyday style.',
    highlights: ['Health tracking', 'All-day battery', 'Water resistant'],
    specifications: { Brand: 'Aurora', Model: 'AW-9', Color: 'Graphite', Material: 'Titanium', Warranty: '2 years', Battery: '48 hrs' },
    offers: [{ title: 'Bank Offer', description: '10% instant discount', action: 'View Details' }, { title: 'No Cost EMI', description: '3 months on select cards', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Warranty', 'Secure Payment'],
    delivery: { free: true, estimated: '2-4 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Graphite', 'Silver'], size: ['42mm', '46mm'] },
    variantStates: [{ color: 'Graphite', size: '42mm', price: 999, stock: 15, sku: 'AW-9-GR-42', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80' }, { color: 'Silver', size: '46mm', price: 24999, stock: 8, sku: 'AW-9-SL-46', image: 'https://images.unsplash.com/photo-1508341591423-29db4f7ff6f0?auto=format&fit=crop&w=900&q=80' }],
    reviewsData: [{ name: 'Maya', rating: 5, title: 'Excellent build', text: 'Feels premium and the battery lasts for days.', verified: true }, { name: 'Aiden', rating: 4, title: 'Great value', text: 'Love the health insights and clean design.', verified: true }],
    questions: [{ user: 'Riya', question: 'Does it support sleep tracking?' }, { user: 'Dinesh', question: 'Is the strap replaceable?' }],
    tags: ['smartwatch', 'wearable', 'fitness']
  },
  {
    id: 102,
    name: 'Nova Noise Cancelling Headphones',
    brand: 'Nova',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 2999,
    originalPrice: 9000,
    discount: 24,
    rating: 4.8,
    reviews: 1430,
    stock: 12,
    badge: 'Top Rated',
    featured: true,
    deal: true,
    bestSeller: true,
    tag: 'Audio Pick',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Immersive sound with deep bass, smart noise control, and a lightweight fit for daily listening.',
    highlights: ['ANC', '20-hour battery', 'Bluetooth 5.3'],
    specifications: { Brand: 'Nova', Model: 'NC-200', Color: 'Black', Material: 'Memory foam', Warranty: '1 year', Battery: '30 hrs' },
    offers: [{ title: 'Coupon', description: 'Save ₹1,500 with code SOUND15', action: 'View Details' }, { title: 'Partner Offer', description: 'Free case and cable', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Secure Payment', 'Fast Delivery'],
    delivery: { free: true, estimated: '3-5 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Black', 'White', 'Blue'] },
    variantStates: [{ color: 'Black', price: 2999, stock: 12, sku: 'NC-200-BLK', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80' }, { color: 'White', price: 19999, stock: 7, sku: 'NC-200-WHT', image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80' }],
    reviewsData: [{ name: 'Nisha', rating: 5, title: 'Excellent noise cancellation', text: 'Perfect for work and travel.', verified: true }],
    questions: [{ user: 'Arjun', question: 'Does it support fast charging?' }],
    tags: ['headphones', 'audio', 'wireless']
  },
  {
    id: 103,
    name: 'Nike Running Shoes',
    brand: 'Nike',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 2599,
    originalPrice: 4999,
    discount: 40,
    rating: 4.6,
    reviews: 92,
    stock: 14,
    badge: 'Limited Deal',
    featured: false,
    deal: true,
    bestSeller: true,
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Cloud-soft cushioning and a breathable knit upper that keeps you moving comfortably all day.',
    highlights: ['Breathable', 'Flexible sole', 'Shock absorbing'],
    specifications: { Brand: 'Luxe', Model: 'Run-01', Color: 'White', Material: 'Mesh', Warranty: '6 months', Size: '6-12' },
    offers: [{ title: 'Bank Offer', description: 'Flat ₹800 off', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Secure Payment'],
    delivery: { free: true, estimated: '4-6 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['White', 'Black', 'Blue'], size: ['6', '7', '8', '9', '10'] },
    reviewsData: [{ name: 'Priya', rating: 5, title: 'Very comfortable', text: 'The cushioning is excellent for long walks.', verified: true }],
    questions: [{ user: 'Vikram', question: 'Are these good for wide feet?' }],
    tags: ['shoes', 'running', 'fashion']
  },
  {
    id: 104,
    name: 'Aurora Ultra Laptop',
    brand: 'Aurora',
    category: 'Computers',
    subcategory: 'Laptops',
    price: 119999,
    originalPrice: 159999,
    discount: 25,
    rating: 4.9,
    reviews: 318,
    stock: 8,
    badge: 'Editor Pick',
    featured: true,
    deal: true,
    bestSeller: true,
    tag: 'Workhorse',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A premium thin-and-light laptop for creators, professionals, and students who want speed without compromise.',
    highlights: ['16GB RAM', '512GB SSD', '13-hour battery'],
    specifications: { Brand: 'Aurora', Model: 'Ultra 14', Color: 'Silver', Processor: 'Intel i7', RAM: '16GB', Storage: '512GB SSD', Warranty: '1 year' },
    offers: [{ title: 'Cashback', description: '₹5,000 cashback on HDFC', action: 'View Details' }],
    benefits: ['Free Delivery', 'Warranty', 'Secure Payment', 'Genuine Product'],
    delivery: { free: true, estimated: '5-7 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Silver', 'Space Grey'], storage: ['512GB', '1TB'] },
    reviewsData: [{ name: 'Karan', rating: 5, title: 'Excellent laptop', text: 'Fast and beautiful display.', verified: true }],
    questions: [{ user: 'Sanjay', question: 'Can it handle video editing?' }],
    tags: ['laptop', 'computer', 'creator']
  },
  {
    id: 105,
    name: 'Crest Gaming Chair',
    brand: 'Crest',
    category: 'Gaming',
    subcategory: 'Accessories',
    price: 7999,
    originalPrice: 14999,
    discount: 32,
    rating: 4.9,
    reviews: 204,
    stock: 7,
    badge: 'Trending',
    featured: false,
    deal: true,
    bestSeller: true,
    tag: 'Gaming',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJgeGNPLNI8shzFGGHxZnx0XwnFuQYVauCY3ilxTPFA&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJgeGNPLNI8shzFGGHxZnx0XwnFuQYVauCY3ilxTPFA&s=10',
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Premium ergonomic seating with support for marathon gaming sessions and home office work.',
    highlights: ['Ergonomic', 'Adjustable recline', 'Lumbar support'],
    specifications: { Brand: 'Crest', Model: 'GC-2', Color: 'Black', Material: 'PU Leather', Warranty: '1 year', Weight: '18kg' },
    offers: [{ title: 'Coupon', description: 'Flat ₹2,000 off', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Warranty'],
    delivery: { free: true, estimated: '4-6 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Black', 'Red'] },
    reviewsData: [{ name: 'Harsha', rating: 5, title: 'Very comfortable', text: 'Great for long sessions.', verified: true }],
    questions: [{ user: 'Amit', question: 'Is assembly included?' }],
    tags: ['gaming', 'chair', 'ergonomic']
  },
  {
    id: 106,
    name: 'Velora Premium Hoodie',
    brand: 'Velora',
    category: 'Fashion',
    subcategory: 'Apparel',
    price: 1599,
    originalPrice: 2999,
    discount: 39,
    rating: 4.7,
    reviews: 123,
    stock: 16,
    badge: 'Style Favorite',
    featured: false,
    deal: true,
    bestSeller: false,
    tag: 'Comfort',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjV82ou_TN7gtaZyCRJl7bkJZlzToRLHlEgyrcZVr6g&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjV82ou_TN7gtaZyCRJl7bkJZlzToRLHlEgyrcZVr6g&s',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A premium hoodie crafted for comfort, warmth, and an elevated everyday silhouette.',
    highlights: ['Soft knit', 'Warm', 'Easy care'],
    specifications: { Brand: 'Velora', Model: 'HDO-12', Color: 'Navy', Material: 'Cotton blend', Warranty: 'No warranty', Size: 'XS-XXL' },
    offers: [{ title: 'No Cost EMI', description: '3 easy monthly installments', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Secure Payment'],
    delivery: { free: true, estimated: '3-5 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Navy', 'Grey', 'Black'], size: ['S', 'M', 'L', 'XL'] },
    reviewsData: [{ name: 'Ananya', rating: 5, title: 'So soft', text: 'Perfect for late evenings and travel.', verified: true }],
    questions: [{ user: 'Mohan', question: 'Is it true to size?' }],
    tags: ['hoodie', 'fashion', 'casual']
  },
  {
    id: 107,
    name: 'Studio Mechanical Keyboard',
    brand: 'Studio',
    category: 'Computers',
    subcategory: 'Accessories',
    price: 4599,
    originalPrice: 10599,
    discount: 35,
    rating: 4.9,
    reviews: 142,
    stock: 6,
    badge: 'Hot Deal',
    featured: true,
    deal: true,
    bestSeller: true,
    tag: 'Desk Setup',
    image: 'https://www.gravastar.co.uk/cdn/shop/files/Gravastar-K98-Pro-X-Pro-8000Hz-Gaming-Set-Phantom-Black-Studio-Bundle-Overview.webp?v=1784701075&width=1200',
    images: [
      'https://www.gravastar.co.uk/cdn/shop/files/Gravastar-K98-Pro-X-Pro-8000Hz-Gaming-Set-Phantom-Black-Studio-Bundle-Overview.webp?v=1784701075&width=1200',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Mechanical precision, quiet switches, and a premium finish for focused work and play.',
    highlights: ['Hot swappable', 'RGB lighting', 'Compact layout'],
    specifications: { Brand: 'Studio', Model: 'MK-3', Color: 'Blue', Material: 'Aluminum', Warranty: '1 year', Connectivity: 'USB-C' },
    offers: [{ title: 'Cashback', description: '₹1,000 cashback', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Secure Payment', 'Fast Delivery'],
    delivery: { free: true, estimated: '2-4 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Blue', 'Black'] },
    reviewsData: [{ name: 'Rohit', rating: 5, title: 'Great typing feel', text: 'Perfect for coding and writing.', verified: true }],
    questions: [{ user: 'Nikhil', question: 'Does it support Mac?' }],
    tags: ['keyboard', 'computer', 'accessory']
  },
  {
    id: 108,
    name: 'Royal Sofa Accent',
    brand: 'Royal',
    category: 'Furniture',
    subcategory: 'Living Room',
    price: 28999,
    originalPrice: 42999,
    discount: 32,
    rating: 4.5,
    reviews: 81,
    stock: 10,
    badge: 'New Arrival',
    featured: false,
    deal: true,
    bestSeller: false,
    tag: 'Home',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyt1rbMP_Ti1plJQe2AbsP62vKxwak8xykWbPfWwb-eg&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyt1rbMP_Ti1plJQe2AbsP62vKxwak8xykWbPfWwb-eg&s=10',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A sculptural statement sofa that adds warmth and comfort to any living space.',
    highlights: ['Premium upholstery', 'Easy assembly', 'Comfort-first'],
    specifications: { Brand: 'Royal', Model: 'Sofa 3', Color: 'Beige', Material: 'Velvet', Warranty: '1 year', Dimensions: '190x90x78 cm' },
    offers: [{ title: 'Free Installation', description: 'Complimentary setup', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Genuine Product'],
    delivery: { free: true, estimated: '6-8 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Beige', 'Grey'], material: ['Velvet', 'Linen'] },
    reviewsData: [{ name: 'Meera', rating: 4, title: 'Looks premium', text: 'Lovely finish and soft fabric.', verified: true }],
    questions: [{ user: 'Teja', question: 'Is assembly included?' }],
    tags: ['furniture', 'sofa', 'home']
  },
  {
    id: 109,
    name: 'i Phone 15 Pro',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 89999,
    originalPrice: 159999,
    discount: 20,
    rating: 4.9,
    reviews: 2040,
    stock: 9,
    badge: 'Flagship',
    featured: false,
    deal: false,
    bestSeller: true,
    tag: 'Mobile',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpFZE0IN68Ty62Jylipd7z_hPdnVlnEFaEzedRVg_7pQ&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpFZE0IN68Ty62Jylipd7z_hPdnVlnEFaEzedRVg_7pQ&s=10',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A flagship mobile experience with a powerful camera system, vibrant display, and premium feel.',
    highlights: ['Triple camera', '5G ready', 'Fast charging'],
    specifications: { Brand: 'Halo', Model: 'X1', Color: 'Midnight', Processor: 'Octa-Core', RAM: '8GB', Storage: '256GB', Warranty: '1 year' },
    offers: [{ title: 'Partner Offer', description: 'Free earbuds bundle', action: 'View Details' }],
    benefits: ['Free Delivery', 'Easy Returns', 'Secure Payment', 'Fast Delivery'],
    delivery: { free: true, estimated: '2-3 business days', charge: 0, location: 'Maharashtra' },
    variants: { color: ['Midnight', 'Silver'], storage: ['128GB', '256GB'] },
    reviewsData: [{ name: 'Sanjana', rating: 5, title: 'Excellent camera', text: 'Amazing photography quality.', verified: true }],
    questions: [{ user: 'Ishaan', question: 'Does it have wireless charging?' }],
    tags: ['mobile', 'smartphone', 'flagship']
  }
];

const featuredProducts = sharedProducts.filter((product) => product.featured);
const dealProducts = sharedProducts.filter((product) => product.deal);
const bestSellerProducts = sharedProducts.filter((product) => product.bestSeller);
const Mostlikelyproduct = sharedProducts.filter((product) => product.featured || product.bestSeller).slice(0, 4);

const expandedCatalogConfig = {
  'Mobiles': {
    subcategories: ['Smartphones', 'Feature Phones', 'Gaming Phones', '5G Phones'],
    brands: ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Realme', 'Motorola', 'Google', 'Vivo', 'Poco', 'Nothing', 'Nokia']
  },
  'Mobile Accessories': {
    subcategories: ['Cases', 'Chargers', 'Cables', 'Screen Protectors', 'Power Banks', 'Car Mounts'],
    brands: ['Spigen', 'Portronics', 'Ambrane', 'Belkin', 'Anker', 'JBL', 'Ugreen', 'Noise', 'Croma', 'Zebronics']
  },
  'Electronics': {
    subcategories: ['Headphones', 'Earbuds', 'Speakers', 'Power Banks', 'Chargers', 'Cables', 'Smart Watches', 'Smart Home Devices'],
    brands: ['Sony', 'JBL', 'boAt', 'Noise', 'Philips', 'Dell', 'HP', 'Logitech', 'Canon', 'Epson']
  },
  'Laptops': {
    subcategories: ['Business Laptops', 'Gaming Laptops', 'Ultrabooks', 'Student Laptops', 'Creator Laptops', '2-in-1 Laptops'],
    brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple', 'Samsung', 'LG', 'Xiaomi']
  },
  'Computers': {
    subcategories: ['Desktops', 'Monitors', 'Keyboards', 'Mouse', 'Webcams', 'Printers', 'Storage', 'All-in-One PCs'],
    brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'Samsung', 'Gigabyte', 'MSI', 'BenQ', 'Zebronics']
  },
  'Computer Accessories': {
    subcategories: ['Docking Stations', 'USB Hubs', 'Cooling Pads', 'Laptop Stands', 'Keyboards', 'Mouse Pads', 'Adapters', 'Storage Drives'],
    brands: ['Logitech', 'Corsair', 'Zebronics', 'Anker', 'Ugreen', 'Cooler Master', 'WD', 'Seagate', 'Samsung', 'Dell']
  },
  'Gaming': {
    subcategories: ['Gaming Laptops', 'Gaming Mouse', 'Gaming Keyboard', 'Gaming Headsets', 'Controllers', 'Gaming Chairs', 'Accessories'],
    brands: ['ASUS', 'MSI', 'Lenovo', 'HP', 'Acer', 'Dell', 'Razer', 'Redragon', 'Alienware', 'Gigabyte']
  },
  'Gaming Accessories': {
    subcategories: ['Mouse Pads', 'Headsets', 'Capture Cards', 'Gaming Chairs', 'Controllers', 'Keyboards', 'Mice', 'Streaming Gear'],
    brands: ['Redragon', 'Razer', 'Corsair', 'Logitech', 'MSI', 'Zebronics', 'HyperX', 'SteelSeries', 'Acer', 'Dell']
  },
  'Fashion - Men': {
    subcategories: ["Men's Shirts", "Men's T-Shirts", "Men's Jeans", "Men's Jackets", "Men's Formal Wear", "Men's Ethnic Wear", "Men's Activewear"],
    brands: ["Levi's", 'Puma', 'Adidas', 'Nike', 'Roadster', 'Van Heusen', 'U.S. Polo Assn.', 'Allen Solly', 'Indian Terrain', 'Pepe Jeans']
  },
  'Fashion - Women': {
    subcategories: ["Women's Dresses", "Women's Tops", "Women's Jeans", "Women's Ethnic Wear", "Women's Kurtas", "Women's Co-ords", "Women's Blazers"],
    brands: ['H&M', 'Zivame', 'Fabindia', 'Biba', 'Aurelia', 'Pantaloons', 'W for Woman', 'Only', 'Mango', 'Myntra']
  },
  'Kids Fashion': {
    subcategories: ['Kids T-Shirts', 'Kids Dresses', 'Kids Sets', 'Kids Jackets', 'Kids Shorts', 'Kids Ethnic Wear'],
    brands: ['Hopscotch', 'H&M', 'Max', 'Gini & Jony', 'Pantaloons', 'Mango Kids', 'Pepe Kids', 'Little Tags', 'Ruff Kids', 'Mothers Choice']
  },
  'Footwear': {
    subcategories: ['Sneakers', 'Running Shoes', 'Formal Shoes', 'Sandals', 'Boots', 'Slippers', 'Loafers'],
    brands: ['Nike', 'Adidas', 'Puma', 'Skechers', 'Bata', 'Campus', 'Woodland', 'Reebok', 'Crocs', 'Fila']
  },
  'Watches': {
    subcategories: ['Smart Watches', 'Analog Watches', 'Digital Watches', 'Luxury Watches', 'Fitness Watches', 'Chronograph Watches'],
    brands: ['Fossil', 'Titan', 'Casio', 'Rolex', 'Tommy Hilfiger', 'Daniel Klein', 'Citizen', 'Garmin', 'Fasttrack', 'Timex']
  },
  'Bags': {
    subcategories: ['Backpacks', 'Laptop Bags', 'Travel Bags', 'Handbags', 'Messenger Bags', 'Duffel Bags', 'Sling Bags'],
    brands: ['Skybags', 'Wildcraft', 'American Tourister', 'Samsonite', 'Hidesign', 'Caprese', 'Mokobara', 'Fossil', 'Targus', 'Puma']
  },
  'Home & Furniture': {
    subcategories: ['Sofas', 'Beds', 'Tables', 'Chairs', 'Storage Units', 'Decor', 'Lighting', 'Study Tables'],
    brands: ['IKEA', 'Nilkamal', 'Wakefit', 'Godrej', 'Urban Ladder', 'Hometown', 'CasaCraft', 'Cello', 'Peps', 'Durian']
  },
  'Kitchen': {
    subcategories: ['Cookware', 'Kitchen Tools', 'Storage', 'Appliances', 'Dinner Sets', 'Water Bottles', 'Cutlery'],
    brands: ['Prestige', 'Borosil', 'Milton', 'Cera', 'Hawkins', 'Tupperware', 'Butterfly', 'KitchenAid', 'Chef Craft', 'LocknLock']
  },
  'Home Appliances': {
    subcategories: ['Washing Machines', 'Refrigerators', 'Air Fryers', 'Microwave Ovens', 'Mixers', 'Vacuum Cleaners', 'Irons'],
    brands: ['LG', 'Samsung', 'Whirlpool', 'Philips', 'Haier', 'Voltas', 'Bajaj', 'Panasonic', 'Midea', 'Morphy Richards']
  },
  'Beauty & Personal Care': {
    subcategories: ['Skincare', 'Hair Care', 'Makeup', 'Fragrance', 'Bath & Body', 'Oral Care', 'Wellness'],
    brands: ['Lakme', 'Maybelline', 'Nykaa', 'The Body Shop', 'Himalaya', 'Mamaearth', 'Loreal', 'Ponds', 'Garnier', 'Biotique']
  },
  'Sports & Fitness': {
    subcategories: ['Yoga Mats', 'Dumbbells', 'Resistance Bands', 'Treadmills', 'Cycling', 'Running Gear', 'Fitness Accessories'],
    brands: ['Decathlon', 'Adidas', 'Nike', 'Puma', 'Under Armour', 'Reebok', 'PowerMax', 'Proline', 'Fitbit', 'Yonex']
  },
  'Books': {
    subcategories: ['Fiction', 'Self Help', 'Business', 'Technology', 'Children', 'Academic', 'Comics', 'Cookbooks'],
    brands: ['Penguin', 'HarperCollins', 'Oxford', 'Bloomsbury', 'Random House', 'Pearson', 'Scholastic', 'Arihant', 'Jaico', 'Westland']
  },
  'Toys': {
    subcategories: ['Educational Toys', 'RC Toys', 'Puzzles', 'Building Blocks', 'Outdoor Toys', 'Board Games', 'Stuffed Toys'],
    brands: ['Lego', 'Hot Wheels', 'Mattel', 'Fisher-Price', 'Funskool', 'Chicco', 'Meccano', 'PlayDoh', 'Little Tikes', 'Toyshine']
  },
  'Baby Products': {
    subcategories: ['Strollers', 'Feeding Essentials', 'Diapers', 'Nursery', 'Bath Care', 'Baby Toys', 'Travel Gear'],
    brands: ['Pampers', 'Huggies', 'MamyPoko', 'Chicco', 'Mee Mee', 'Avent', 'Babyhug', 'Johnson\'s', 'Little Huggies', 'Mothers Choice']
  },
  'Automotive Accessories': {
    subcategories: ['Car Chargers', 'Seat Covers', 'Tyres', 'Lights', 'Dash Cams', 'Cleaning Kits', 'Interior Accessories'],
    brands: ['Bosch', 'Michelin', 'Autobahn', 'Hella', 'Minda', 'Fastrack', 'Yokohama', 'Bridgestone', 'CarBags', 'K&N']
  },
  'Office Products': {
    subcategories: ['Desk Organizers', 'Office Chairs', 'Monitors', 'Printers', 'Lamps', 'Stationery Holders', 'Ergonomic Accessories'],
    brands: ['Staples', 'Camlin', 'HP', 'Dell', 'Classmate', 'Apsara', 'Bic', 'Moleskine', 'Santoor', 'Nataraj']
  },
  'Stationery': {
    subcategories: ['Notebooks', 'Pens', 'Art Supplies', 'Desktop Organizers', 'File Folders', 'Markers', 'Sketch Books'],
    brands: ['Classmate', 'Apsara', 'Parker', 'Reynolds', 'Camlin', 'Bic', 'Nataraj', 'Maped', 'Pentonic', 'Faber-Castell']
  },
  'Smart Home': {
    subcategories: ['Smart Cameras', 'Lighting', 'Plugs', 'Speakers', 'Thermostats', 'Security Systems', 'Doorbells'],
    brands: ['Philips', 'Mi', 'Wipro', 'TP-Link', 'Eufy', 'Echo', 'Samsung', 'D-Link', 'Godrej', 'Hikvision']
  },
  'Audio': {
    subcategories: ['Bluetooth Speakers', 'Soundbars', 'Home Audio', 'Party Speakers', 'Wireless Earbuds', 'Headphones', 'Turntables'],
    brands: ['Sony', 'JBL', 'Boat', 'Marshall', 'Sennheiser', 'Bose', 'Creative', 'Portronics', 'Zebronics', 'Skullcandy']
  },
  'Cameras & Accessories': {
    subcategories: ['DSLR Cameras', 'Mirrorless Cameras', 'Action Cameras', 'Lenses', 'Tripods', 'Camera Bags', 'Accessories'],
    brands: ['Canon', 'Sony', 'Nikon', 'GoPro', 'Fujifilm', 'Samyang', 'Sigma', 'DJI', 'Instax', 'Croma']
  },
  'TV & Entertainment': {
    subcategories: ['Smart TVs', 'Streaming Devices', 'Projectors', 'Soundbars', 'Gaming Screens', 'Entertainment Console', 'Media Players'],
    brands: ['Sony', 'Samsung', 'LG', 'Panasonic', 'OnePlus', 'Mi', 'Epson', 'Bose', 'Hisense', 'TCL']
  },
  'Travel Accessories': {
    subcategories: ['Luggage', 'Travel Organizers', 'Neck Pillows', 'Passport Holders', 'Toiletry Kits', 'Travel Wallets', 'Packing Cubes'],
    brands: ['Wildcraft', 'Samsonite', 'Skybags', 'American Tourister', 'Mokobara', 'Safari', 'Voyage', 'Caprese', 'Fossil', 'Hidesign']
  }
};

function generateExpandedCatalog() {
  const catalog = [];
  const imagePool = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1540168229735-62a3bd10ad11?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504153558482-4c3b644f9f91?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'
  ];

  const labels = ['Aero', 'Fusion', 'Peak', 'Pulse', 'Nova', 'Vertex', 'Orbit', 'Classic', 'Urban', 'Zen', 'Summit', 'Drift', 'Astra', 'Luma', 'Atlas'];
  const commonSpecs = {
    'Mobiles': { Processor: 'Octa-core', RAM: '8GB', Storage: '256GB', Display: '6.7-inch AMOLED', Camera: '50MP • 12MP', Battery: '5000mAh', 'Operating System': 'Android 14' },
    'Mobile Accessories': { Material: 'ABS + Silicone', Compatibility: 'Universal', Charging: '18W', Warranty: '1 Year' },
    'Electronics': { Battery: 'Up to 20 hours', Connectivity: 'Bluetooth 5.3', Warranty: '1 Year', Color: 'Matte Black' },
    'Laptops': { Processor: 'Intel Core i7', RAM: '16GB', Storage: '512GB SSD', Display: '14-inch FHD', GPU: 'Integrated', 'Operating System': 'Windows 11' },
    'Computers': { Processor: 'Intel Core i5', RAM: '16GB', Storage: '1TB SSD', Display: '27-inch IPS', Connectivity: 'USB-C', 'Operating System': 'Windows 11' },
    'Computer Accessories': { Material: 'Aluminum', Connectivity: 'USB-C', Warranty: '1 Year', Color: 'Black' },
    'Gaming': { Processor: 'Intel Core i7', RAM: '32GB', Storage: '1TB SSD', Display: '15.6-inch 165Hz', GPU: 'RTX 4060', 'Operating System': 'Windows 11' },
    'Gaming Accessories': { Material: 'Rubber + ABS', Connectivity: 'Wireless 2.4GHz', Warranty: '1 Year', Color: 'Black' },
    'Fashion - Men': { Material: 'Premium Cotton', Fit: 'Regular Fit', Size: 'S-XXL', Pattern: 'Solid', Color: 'Navy' },
    'Fashion - Women': { Material: 'Cotton Blend', Fit: 'Slim Fit', Size: 'XS-XL', Pattern: 'Printed', Color: 'Rose' },
    'Kids Fashion': { Material: 'Cotton', Fit: 'Comfort Fit', Size: '4-12 Years', Pattern: 'Graphic', Color: 'Multicolor' },
    'Footwear': { Material: 'Mesh', Size: 'UK 6-10', Closure: 'Lace-Up', Color: 'Black' },
    'Watches': { Material: 'Stainless Steel', Display: 'AMOLED', 'Water Resistance': '5 ATM', Battery: '48 hours', Connectivity: 'Bluetooth' },
    'Bags': { Material: 'Water Resistant Fabric', Capacity: '25L', Dimensions: '42 x 28 x 15 cm', Warranty: '6 Months' },
    'Home & Furniture': { Material: 'Engineered Wood', Assembly: 'Tool-Free', Dimensions: '180 x 90 x 75 cm', Warranty: '12 Months' },
    'Kitchen': { Material: 'Stainless Steel', Capacity: '2.5L', Warranty: '1 Year', Care: 'Dishwasher Safe' },
    'Home Appliances': { Power: '1500W', Capacity: '32L', Warranty: '1 Year', 'Energy Rating': '4 Star' },
    'Beauty & Personal Care': { 'Skin Type': 'All Skin Types', Usage: 'Daily Use', Packaging: 'Travel Friendly', Fragrance: 'Floral' },
    'Sports & Fitness': { Material: 'Eco Foam', Capacity: '30kg', Usage: 'Home Gym', Warranty: '6 Months' },
    'Books': { Format: 'Hardcover', Language: 'English', Pages: '300+', Publisher: 'Premium Press' },
    'Toys': { 'Age Group': '5+ years', Material: 'ABS Plastic', Safety: 'BPA Free', Color: 'Bright' },
    'Baby Products': { Safety: 'Dermatologically Tested', Material: 'Soft Cotton', 'Age Group': '0-24 months', Wash: 'Machine Wash' },
    'Automotive Accessories': { Material: 'Leatherette', Fitment: 'Universal', Warranty: '1 Year', Color: 'Black' },
    'Office Products': { Material: 'High Density', Usage: 'Office Setup', Ergonomic: 'Yes', Warranty: '12 Months' },
    'Stationery': { 'Paper Quality': '100 GSM', Usage: 'Daily Writing', Color: 'Blue/Black', Pack: '10pcs' },
    'Smart Home': { Connectivity: 'Wi-Fi', Power: '12W', Compatibility: 'Alexa & Google', Warranty: '1 Year' },
    'Audio': { Driver: '40mm', Battery: '20h', Bluetooth: 'v5.3', 'Noise Cancellation': 'Active' },
    'Cameras & Accessories': { Sensor: 'APS-C', 'Optical Zoom': '4x', Video: '4K', Warranty: '1 Year' },
    'TV & Entertainment': { Display: '4K UHD', 'Refresh Rate': '60Hz', Connectivity: 'HDMI', 'Smart Platform': 'Android TV' },
    'Travel Accessories': { Capacity: '55L', Material: 'Polyester', Weight: '750g', Warranty: '6 Months' }
  };

  Object.entries(expandedCatalogConfig).forEach(([category, config]) => {
    const { subcategories, brands } = config;
    subcategories.forEach((subcategory, subIndex) => {
      const count = Math.max(8, Math.min(12, 9 + ((subIndex + category.length) % 5)));
      for (let index = 0; index < count; index += 1) {
        const id = 1001 + catalog.length;
        const brand = brands[(index + subIndex + category.length) % brands.length];
        const label = labels[(index + subIndex + category.length) % labels.length];
        const productName = `${brand} ${label} ${subcategory.split(' ')[0]} ${index + 1}`;
        const baseValue = 299 + ((id * 11 + index * 43 + subIndex * 17) % 55000);
        const discount = 10 + ((id + index + subIndex) % 42);
        const mrp = Math.max(699, baseValue + 950);
        const price = Math.max(199, Math.round((mrp * (100 - discount)) / 100 / 10) * 10);
        const rating = Number((3.6 + ((id + index) % 13) / 10).toFixed(1));
        const reviews = 120 + ((id * 7 + index * 13) % 9500);
        const stock = 8 + ((id + index + subIndex) % 220);
        const isFeatured = (id + index) % 6 === 0;
        const isBestSeller = (id + index) % 5 === 0;
        const isDeal = (id + index) % 4 === 0;
        const saleCount = 50 + ((id + index * 7) % 9000);
        const popularity = 70 + ((id + index * 3) % 29);
        const modelTag = `${subcategory.replace(/\s+/g, '').slice(0, 5)}-${id.toString().slice(-3)}`;
        const images = Array.from({ length: 3 }, (_, imageIndex) => imagePool[(id + imageIndex + subIndex * 2) % imagePool.length]);
        const specBase = { ...commonSpecs[category], Model: modelTag, Color: ['Black', 'White', 'Blue', 'Silver', 'Red', 'Rose', 'Navy', 'Green'][((id + index) % 8)], Warranty: '1 Year' };
        const variantStates = [
          { color: specBase.Color, price: price, stock: stock },
          { color: ['Black', 'White', 'Silver', 'Blue'][((id + index) % 4)], price: price + 350, stock: Math.max(1, stock - 4) }
        ];

        catalog.push({
          id,
          name: productName,
          brand,
          category,
          subcategory,
          price,
          mrp,
          originalPrice: mrp,
          discount,
          rating,
          reviews,
          stock,
          image: images[0],
          images,
          description: `${brand} ${productName} is designed for everyday use with premium craftsmanship, reliable performance, and modern features tailored for ${category.toLowerCase()} shoppers.`,
          tags: [category.toLowerCase().replace(/\s+/g, ''), subcategory.toLowerCase().replace(/\s+/g, ''), brand.toLowerCase(), 'new arrival', 'quality guaranteed'],
          keywords: [brand.toLowerCase(), category.toLowerCase(), subcategory.toLowerCase(), productName.toLowerCase(), 'online shopping', 'best price'],
          specifications: specBase,
          isAvailable: stock > 0,
          isFeatured,
          isBestSeller,
          isDeal,
          featured: isFeatured,
          bestSeller: isBestSeller,
          deal: isDeal,
          dealEndDate: isDeal ? '2026-09-30' : undefined,
          salesCount: saleCount,
          popularityScore: popularity,
          badge: isBestSeller ? 'Best Seller' : isDeal ? 'Limited Deal' : isFeatured ? 'Featured' : 'Popular',
          benefits: ['Free delivery', 'Easy returns', 'Secure payment', 'Product assurance'],
          delivery: { free: true, estimated: '2-5 business days', charge: 0, location: 'India' },
          offers: [
            { title: 'Bank Offer', description: `Flat ${Math.min(35, discount + 5)}% off on eligible cards`, action: 'View Details' },
            { title: 'Exchange Offer', description: 'Extra savings on selected purchases', action: 'View Details' }
          ],
          highlights: ['Premium quality', 'Modern design', 'Best value'],
          variantStates,
          reviewsData: [
            { name: 'Aditi', rating: 5, title: 'Excellent', text: 'Great product quality and value for money.', verified: true },
            { name: 'Rahul', rating: 4, title: 'Worth it', text: 'Looks premium and works as expected.', verified: true }
          ]
        });
      }
    });
  });

  return catalog;
}

const extendedCatalogProducts = generateExpandedCatalog();
sharedProducts.push(...extendedCatalogProducts);

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

function buildProductLink(productId) {
  return `product-details.html?id=${productId}`;
}

function getProductById(productId) {
  // Search in shared products
  let product = sharedProducts.find((product) => String(product.id) === String(productId));
  if (product) return product;

  // Search in accessories if available
  if (typeof ACCESSORIES_DATA !== 'undefined') {
    product = ACCESSORIES_DATA.find((product) => String(product.id) === String(productId));
    if (product) return product;
  }

  return null;
}

function getProductsByCategory(category) {
  return sharedProducts.filter((product) => product.category === category);
}

function getRelatedProducts(product, limit = 4) {
  const related = sharedProducts.filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand || item.tags.some((tag) => product.tags.includes(tag)))).slice(0, limit);
  return related.length ? related : sharedProducts.filter((item) => item.id !== product.id).slice(0, limit);
}

window.ALIBABA_PRODUCTS = sharedProducts;
window.getProductById = getProductById;
window.buildProductLink = buildProductLink;
window.getProductsByCategory = getProductsByCategory;
window.getRelatedProducts = getRelatedProducts;
window.formatCurrency = formatCurrency;

function getCartItems() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(items) ? items : [];
  } catch (error) {
    return [];
  }
}

function setCartItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  updateCartCount();
}

function getWishlist() {
  try {
    const items = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    return Array.isArray(items) ? items.map((item) => String(item)) : [];
  } catch (error) {
    return [];
  }
}

function setWishlist(items) {
  const unique = [...new Set((Array.isArray(items) ? items : []).map((item) => String(item)))];
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(unique));
  updateWishlistCount();
  syncWishlistHearts();
}

function updateCartCount() {
  const counts = getCartItems();
  const total = counts.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  const cartNode = document.querySelector('.cart-count');
  if (cartNode) cartNode.textContent = String(total);
}

function updateWishlistCount() {
  const count = getWishlist().length;
  document.querySelectorAll('.wishlist-count').forEach((node) => {
    node.textContent = String(count);
  });
  const wishlistButton = document.querySelector('[aria-label="Wishlist"], .wishlist-link');
  if (wishlistButton && !wishlistButton.querySelector('.wishlist-count')) {
    const countNode = document.createElement('span');
    countNode.className = 'wishlist-count';
    countNode.textContent = String(count);
    countNode.style.marginLeft = '0.35rem';
    wishlistButton.appendChild(countNode);
  }
}

function syncWishlistHearts() {
  const ids = new Set(getWishlist());
  document.querySelectorAll('.wishlist-btn').forEach((button) => {
    const card = button.closest('.product-card, .premium-product-card, .search-product-card');
    const productId = card?.dataset?.id || button.dataset.productId;
    const active = ids.has(String(productId));
    const icon = button.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-solid', active);
      icon.classList.toggle('fa-regular', !active);
      icon.classList.toggle('text-warning', active);
    }
    button.classList.toggle('active', active);
    button.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
  });
}

function toggleWishlist(productId) {
  if (!productId) return false;
  const next = getWishlist();
  const value = String(productId);
  const hasItem = next.includes(value);
  const updated = hasItem ? next.filter((item) => item !== value) : [...next, value];
  setWishlist(updated);
  return !hasItem;
}

function getCartItemKey(productId, variant = {}) {
  const variantParts = Object.entries(variant)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${String(value).toLowerCase()}`)
    .join('|');
  return `${productId}|${variantParts}`;
}

function addToCart(productId, quantity = 1, variant = {}) {
  const product = getProductById(productId);
  if (!product) return null;
  const cart = getCartItems();
  const key = getCartItemKey(product.id, variant);
  const existingIndex = cart.findIndex((item) => item.key === key);
  const nextQty = Math.max(1, Number(quantity) || 1);
  const normalizedVariant = { ...variant };

  if (existingIndex >= 0) {
    cart[existingIndex].quantity = Math.min(product.stock || 999, cart[existingIndex].quantity + nextQty);
    cart[existingIndex].variant = normalizedVariant;
  } else {
    cart.push({
      key,
      productId: product.id,
      quantity: Math.min(product.stock || 999, nextQty),
      variant: normalizedVariant,
      addedAt: new Date().toISOString()
    });
  }

  setCartItems(cart);
  return cart[existingIndex >= 0 ? existingIndex : cart.length - 1];
}

function removePurchasedCartItems(items = []) {
  const keys = new Set(items.filter(Boolean).map((item) => item.key || getCartItemKey(item.productId, item.variant || {})));
  const cart = getCartItems().filter((entry) => !keys.has(entry.key));
  setCartItems(cart);
  return cart;
}

window.getCartItems = getCartItems;
window.setCartItems = setCartItems;
window.addToCart = addToCart;
window.getCartItemKey = getCartItemKey;
window.removePurchasedCartItems = removePurchasedCartItems;

let activeSuggestionIndex = -1;
let currentSlide = 0;
let slideTimer;

function hideLoader() {
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 400);
  }
}

window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 1200);

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('alibaba.shop-theme');
  if (storedTheme === 'dark') {
    body.classList.add('dark-mode');
  }
}

applyStoredTheme();

function normalizeSearchText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getProductSearchText(product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.subcategory,
    product.description,
    ...(product.tags || []),
    ...(product.keywords || []),
    ...(product.highlights || []),
    ...(Object.values(product.specifications || {})),
    ...(product.offers || []).map((offer) => `${offer.title} ${offer.description}`),
  ].join(' ');
}

function getQueryTokens(query) {
  return normalizeSearchText(query)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 8);
}

function scoreProductForSearch(product, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const queryTokens = getQueryTokens(normalizedQuery);
  const searchableText = getProductSearchText(product).toLowerCase();
  const normalizedName = normalizeSearchText(product.name);
  const normalizedBrand = normalizeSearchText(product.brand);
  const normalizedCategory = normalizeSearchText(product.category);
  const normalizedSubcategory = normalizeSearchText(product.subcategory);
  const normalizedDescription = normalizeSearchText(product.description);

  if (!searchableText.includes(normalizedQuery)) {
    const tokenMatches = queryTokens.filter((token) => searchableText.includes(token)).length;
    if (!tokenMatches) return 0;
  }

  let score = 0;
  const exactName = normalizedName === normalizedQuery;
  const nameContainsAllTokens = queryTokens.every((token) => normalizedName.includes(token));
  const nameContainsAnyToken = queryTokens.some((token) => normalizedName.includes(token));
  const brandMatch = normalizedBrand.includes(normalizedQuery);
  const categoryMatch = normalizedCategory.includes(normalizedQuery) || normalizedCategory === normalizedQuery;
  const subcategoryMatch = normalizedSubcategory.includes(normalizedQuery) || normalizedSubcategory === normalizedQuery;
  const tagMatch = (product.tags || []).some((tag) => normalizeSearchText(tag).includes(normalizedQuery));
  const keywordMatch = (product.keywords || []).some((keyword) => normalizeSearchText(keyword).includes(normalizedQuery));
  const descriptionMatch = normalizedDescription.includes(normalizedQuery);

  if (exactName) score += 1500;
  if (nameContainsAllTokens) score += 800;
  if (nameContainsAnyToken) score += 420;
  if (brandMatch) score += 310;
  if (categoryMatch) score += 220;
  if (subcategoryMatch) score += 180;
  if (tagMatch) score += 140;
  if (keywordMatch) score += 120;
  if (descriptionMatch) score += 60;

  queryTokens.forEach((token) => {
    if (normalizedName.includes(token)) score += 60;
    if (normalizedBrand.includes(token)) score += 35;
    if (normalizedCategory.includes(token)) score += 28;
    if (normalizedSubcategory.includes(token)) score += 22;
    if ((product.tags || []).some((tag) => normalizeSearchText(tag).includes(token))) score += 20;
    if ((product.keywords || []).some((keyword) => normalizeSearchText(keyword).includes(token))) score += 16;
  });

  score += Number(product.rating || 0) * 18;
  score += Number(product.salesCount || 0) / 15;
  return score;
}

function getDynamicSearchResults(query, options = {}) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const maxResults = typeof options.maxResults === 'number' ? options.maxResults : 50;

  // Search in both shared products and accessories
  let allProducts = [...sharedProducts];
  if (typeof ACCESSORIES_DATA !== 'undefined') {
    allProducts = [...allProducts, ...ACCESSORIES_DATA];
  }

  const directMatches = allProducts
    .map((product) => ({ product, score: scoreProductForSearch(product, normalizedQuery) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if ((b.product.rating || 0) !== (a.product.rating || 0)) return (b.product.rating || 0) - (a.product.rating || 0);
      if ((b.product.salesCount || 0) !== (a.product.salesCount || 0)) return (b.product.salesCount || 0) - (a.product.salesCount || 0);
      return (b.product.price || 0) - (a.product.price || 0);
    });

  const directList = directMatches.map(({ product }) => product);
  const seen = new Set(directList.map((product) => String(product.id)));
  const seedCategories = new Set(directList.flatMap((product) => [product.category, product.subcategory]).map((value) => normalizeSearchText(value)).filter(Boolean));
  const seedBrands = new Set(directList.map((product) => normalizeSearchText(product.brand)).filter(Boolean));
  const seedTags = new Set(directList.flatMap((product) => product.tags || []).map((tag) => normalizeSearchText(tag)).filter(Boolean));
  const seedKeywords = new Set(directList.flatMap((product) => product.keywords || []).map((keyword) => normalizeSearchText(keyword)).filter(Boolean));
  const queryTokens = getQueryTokens(normalizedQuery);

  const candidatePool = allProducts
    .map((product) => {
      const directScore = scoreProductForSearch(product, normalizedQuery);
      if (directScore > 0) {
        return { product, score: directScore };
      }

      const categoryNorm = normalizeSearchText(product.category);
      const subcategoryNorm = normalizeSearchText(product.subcategory);
      const brandNorm = normalizeSearchText(product.brand);
      const productText = normalizeSearchText(`${product.name} ${product.category} ${product.subcategory} ${product.brand} ${(product.tags || []).join(' ')} ${(product.keywords || []).join(' ')}`);

      let score = 0;
      if (seedCategories.has(categoryNorm)) score += 550;
      if (seedCategories.has(subcategoryNorm)) score += 480;
      if (seedBrands.has(brandNorm)) score += 420;
      score += (product.tags || []).map((tag) => normalizeSearchText(tag)).filter((tag) => seedTags.has(tag)).length * 220;
      score += (product.keywords || []).map((keyword) => normalizeSearchText(keyword)).filter((keyword) => seedKeywords.has(keyword)).length * 200;
      score += queryTokens.reduce((total, token) => (productText.includes(token) ? total + 90 : total), 0);
      score += Number(product.rating || 0) * 12;

      if (score <= 0) return null;
      return { product, score };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if ((b.product.rating || 0) !== (a.product.rating || 0)) return (b.product.rating || 0) - (a.product.rating || 0);
      return Number(b.product.salesCount || 0) - Number(a.product.salesCount || 0);
    });

  const unique = [];
  const uniqueIds = new Set();
  candidatePool.forEach(({ product }) => {
    const key = String(product.id);
    if (uniqueIds.has(key)) return;
    uniqueIds.add(key);
    unique.push(product);
  });

  if (unique.length >= maxResults) return unique.slice(0, maxResults);
  return unique;
}

function getSearchSuggestions(query, limit = 30) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const suggestions = [];
  const seen = new Set();

  const pushSuggestion = (label, type = 'Product', productId = null) => {
    const key = `${type}:${label}:${productId || 'none'}`;
    if (!label || seen.has(key)) return;
    seen.add(key);
    suggestions.push({ label, type, productId });
  };

  // Search in both shared products and accessories
  let allProducts = [...sharedProducts];
  if (typeof ACCESSORIES_DATA !== 'undefined') {
    allProducts = [...allProducts, ...ACCESSORIES_DATA];
  }

  const productPool = allProducts.filter((product) => scoreProductForSearch(product, normalizedQuery) > 0);

  productPool.forEach((product) => {
    const productName = product.name || 'Product';
    const brand = product.brand || '';
    const category = product.category || '';
    const subcategory = product.subcategory || '';
    const primaryTag = (product.tags || [])[0] || '';
    const primaryKeyword = (product.keywords || [])[0] || '';

    if (normalizeSearchText(productName).includes(normalizedQuery) || productName.toLowerCase().startsWith(normalizedQuery)) pushSuggestion(productName, 'Product', product.id);
    if (brand && (normalizeSearchText(brand).includes(normalizedQuery) || normalizeSearchText(brand).startsWith(normalizedQuery))) pushSuggestion(brand, 'Brand', product.id);
    if (category && (normalizeSearchText(category).includes(normalizedQuery) || normalizeSearchText(category).startsWith(normalizedQuery))) pushSuggestion(category, 'Category', product.id);
    if (subcategory && (normalizeSearchText(subcategory).includes(normalizedQuery) || normalizeSearchText(subcategory).startsWith(normalizedQuery))) pushSuggestion(subcategory, 'Subcategory', product.id);
    if (primaryTag && normalizeSearchText(primaryTag).includes(normalizedQuery)) pushSuggestion(primaryTag, 'Tag', product.id);
    if (primaryKeyword && normalizeSearchText(primaryKeyword).includes(normalizedQuery)) pushSuggestion(primaryKeyword, 'Keyword', product.id);
  });

  if (suggestions.length < limit) {
    allProducts.forEach((product) => {
      const label = product.name || product.category || product.brand;
      if (!label) return;
      const normalizedLabel = normalizeSearchText(label);
      const queryTokens = getQueryTokens(normalizedQuery);
      const tokenMatch = queryTokens.some((token) => normalizedLabel.includes(token));
      if (tokenMatch) {
        pushSuggestion(label, 'Related Search', product.id);
      }
    });
  }

  const relatedCollections = new Set();
  allProducts.forEach((product) => {
    const text = [product.category, product.subcategory, product.brand].filter(Boolean);
    text.forEach((item) => {
      const normalizedItem = normalizeSearchText(item);
      if (normalizedItem.includes(normalizedQuery) || normalizedItem.startsWith(normalizedQuery)) {
        relatedCollections.add(item);
      }
    });
  });

  relatedCollections.forEach((item) => pushSuggestion(item, 'Collection'));

  return suggestions.slice(0, limit);
}

function goToSearch(query) {
  const value = normalizeSearchText(query);
  if (!value) return;
  window.location.href = `search.html?q=${encodeURIComponent(value)}`;
}

function createRipple(element, event) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = element.getBoundingClientRect();
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  ripple.style.width = ripple.style.height = '1px';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
}

function attachRippleHandlers() {
  document.querySelectorAll('.btn-ripple').forEach((button) => {
    button.addEventListener('click', (event) => createRipple(button, event));
  });
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', (event) => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('alibaba.shop-theme', isDark ? 'dark' : 'light');
    createRipple(darkModeToggle, event);
  });
}

function showSuggestions(value) {
  const query = normalizeSearchText(value);
  if (!suggestionsBox) return;
  suggestionsBox.innerHTML = '';
  activeSuggestionIndex = -1;

  if (!query) {
    suggestionsBox.classList.remove('show');
    return;
  }

  const suggestionsList = getSearchSuggestions(query, 30);
  if (!suggestionsList.length) {
    suggestionsBox.classList.remove('show');
    return;
  }

  const fragment = document.createDocumentFragment();
  suggestionsList.forEach((item) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'search-suggestion-item';
    button.innerHTML = `
      <span class="suggestion-main"><i class="fa-solid fa-magnifying-glass"></i> ${item.label}</span>
      <span class="suggestion-type">${item.type}</span>
    `;
    button.addEventListener('click', () => {
      if (searchInput) searchInput.value = item.label;
      suggestionsBox.classList.remove('show');
      goToSearch(item.label);
    });
    li.appendChild(button);
    fragment.appendChild(li);
  });

  suggestionsBox.appendChild(fragment);
  suggestionsBox.classList.add('show');
}

if (searchInput) {
  let suggestionTimer;

  searchInput.addEventListener('input', (event) => {
    window.clearTimeout(suggestionTimer);
    suggestionTimer = window.setTimeout(() => showSuggestions(event.target.value), 120);
  });
  searchInput.addEventListener('focus', () => showSuggestions(searchInput.value));
  searchInput.addEventListener('keydown', (event) => {
    const items = suggestionsBox?.querySelectorAll('button') || [];
    if (!items.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
      items.forEach((item, index) => item.classList.toggle('active', index === activeSuggestionIndex));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
      items.forEach((item, index) => item.classList.toggle('active', index === activeSuggestionIndex));
    }

    if (event.key === 'Escape') {
      suggestionsBox?.classList.remove('show');
      activeSuggestionIndex = -1;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0) {
        items[activeSuggestionIndex].click();
        return;
      }
      const value = searchInput.value.trim();
      if (value) goToSearch(value);
    }
  });

  document.addEventListener('click', (event) => {
    if (!searchForm?.contains(event.target)) {
      suggestionsBox?.classList.remove('show');
      activeSuggestionIndex = -1;
    }
  });
}

if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (searchInput) {
      const value = searchInput.value.trim();
      if (value) {
        searchInput.value = value;
        suggestionsBox?.classList.remove('show');
        goToSearch(value);
      }
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    createRipple(link, event);
  });
});

// Set active nav-link based on current page path (keeps navbar state on load)
(function setActiveNavOnLoad() {
  try {
    const path = location.pathname.split('/').pop();
    if (!path) return;
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.split('/').pop() === path) {
        navLinks.forEach((i) => i.classList.remove('active'));
        link.classList.add('active');
      }
    });
  } catch (e) { console.warn(e) }
})();

function toggleMegaMenu(force) {
  if (!megaDropdown) return;
  const shouldOpen = typeof force === 'boolean' ? force : !megaDropdown.classList.contains('show');
  megaDropdown.classList.toggle('show', shouldOpen);
}

if (allMenuTrigger) {
  allMenuTrigger.addEventListener('mouseenter', () => toggleMegaMenu(true));
  allMenuTrigger.addEventListener('focus', () => toggleMegaMenu(true));
  allMenuTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMegaMenu();
    createRipple(allMenuTrigger, event);
  });
}

if (megaDropdown) {
  megaDropdown.addEventListener('mouseleave', () => toggleMegaMenu(false));
}

document.addEventListener('click', (event) => {
  if (!allMenuTrigger?.contains(event.target) && !megaDropdown?.contains(event.target)) {
    toggleMegaMenu(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleMegaMenu(false);
    closeMobileMenu();
  }
});

function openMobileMenu() {
  if (mobileSidebar) mobileSidebar.classList.add('open');
  if (mobileOverlay) mobileOverlay.classList.add('show');
}

function closeMobileMenu() {
  if (mobileSidebar) mobileSidebar.classList.remove('open');
  if (mobileOverlay) mobileOverlay.classList.remove('show');
}

if (mobileToggle) mobileToggle.addEventListener('click', (event) => {
  openMobileMenu();
  createRipple(mobileToggle, event);
});
if (closeMobile) closeMobile.addEventListener('click', closeMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

function renderHeroSlider() {
  const container = document.getElementById('heroSlides');
  const dots = document.getElementById('sliderDots');
  if (!container || !dots) return;

  container.innerHTML = heroSlides.map((slide, index) => `
    <article class="slide ${index === 0 ? 'active' : ''}">
      <div class="slide-content">
        <span class="slide-badge">${slide.badge}</span>
        <h3>${slide.title}</h3>
        <p>${slide.text}</p>
        <div class="slide-actions">
          <button class="btn-primary btn-ripple">Shop Now</button>
          <button class="btn-secondary btn-ripple">Learn More</button>
        </div>
      </div>
      <div class="slide-image">
        <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
      </div>
    </article>
  `).join('');

  dots.innerHTML = heroSlides.map((_, index) => `<button class="slider-dot ${index === 0 ? 'active' : ''}" type="button" aria-label="Go to slide ${index + 1}"></button>`).join('');

  const slides = container.querySelectorAll('.slide');
  const dotButtons = dots.querySelectorAll('.slider-dot');

  dotButtons.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  function showSlide(index) {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
    dotButtons.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  document.querySelector('.slider-btn.prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('.slider-btn.next')?.addEventListener('click', () => nextSlide());

  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 4000);
}

function renderSection(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const skeletons = Array.from({ length: 4 }, () => `<div class="skeleton"></div>`);
  container.innerHTML = skeletons.join('');

  setTimeout(() => {
    container.innerHTML = items.map((item) => {
      const highlights = Array.isArray(item.highlights) && item.highlights.length
        ? item.highlights.slice(0, 3).join(' • ')
        : item.specifications && Object.values(item.specifications).slice(0, 3).join(' • ');
      const ratingText = Number(item.reviews || item.reviewCount || 0) >= 1000
        ? `${(Number(item.reviews || item.reviewCount || 0) / 1000).toFixed(1)}K ratings`
        : `${Number(item.reviews || item.reviewCount || 0)} ratings`;
      const deliveryText = item.delivery?.free ? 'FREE Delivery Tomorrow' : `Delivery ${formatCurrency(item.delivery?.charge || 0)} Tomorrow`;
      const stockText = Number(item.stock || 0) > 0 ? '✓ In Stock' : 'Out of Stock';
      const badge = item.badge || item.tag || 'Popular';
      const productName = item.name || 'Product';
      const originalPrice = item.originalPrice || item.mrp || item.price;

      return `
        <article class="product-card" data-id="${item.id}" role="button" tabindex="0" aria-label="View details for ${productName}">
          <button class="wishlist-btn" type="button" aria-label="Add to wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
          <div class="product-image-wrap">
            <img src="${item.image}" alt="${productName}" loading="lazy" />
          </div>
          <div class="product-body">
            <span class="tag">${badge}</span>
            <h4><a href="product-details.html?id=${item.id}">${productName}</a></h4>
            <p class="product-spec">${highlights || 'Premium quality • Trusted product'}</p>
            <div class="meta">
              <span class="rating"><span>★</span> ${item.rating || 4.5}</span>
              <span>(${ratingText})</span>
            </div>
            <div class="product-price-row">
              <span class="price-current">${formatCurrency(item.price)}</span>
              <span class="price-original">${formatCurrency(originalPrice)}</span>
              <span class="discount-pill">${item.discount || 0}% OFF</span>
            </div>
            <div class="delivery">${deliveryText}</div>
            <div class="stock-status">${stockText}</div>
            <div class="product-actions">
              <button type="button" class="btn-ripple add-cart" data-id="${item.id}">Add to Cart</button>
              <button type="button" class="btn-ripple buy-btn" data-id="${item.id}">Buy Now</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
    attachRippleHandlers();
  }, 450);
}

function renderCategories() {
  const container = document.getElementById('categoryGrid');
  if (!container) return;
  container.innerHTML = '';
  container.innerHTML = categories.map((category) => `
    <article class="category-card">
      <h3>${category.title}</h3>
      <ul>
        ${category.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderHomePage() {
  updateCartCount();
  renderCategories();
  renderHeroSlider();
  renderSection('featuredProducts', featuredProducts);
  renderSection('dealsProducts', dealProducts);
  renderSection('bestSellerProducts', bestSellerProducts);
  renderSection('Mostlikelyproduct', Mostlikelyproduct);
}

function bindCartLink() {
  document.querySelectorAll('.cart-link').forEach((link) => {
    link.setAttribute('href', 'cart.html');
    link.addEventListener('click', (event) => {
      if (!getCartItems().length) {
        event.preventDefault();
      }
      window.location.href = 'cart.html';
    });
  });
}

function bindWishlistLink() {
  document.querySelectorAll('[aria-label="Wishlist"], .wishlist-link').forEach((button) => {
    if (button.tagName === 'A') {
      button.setAttribute('href', 'wishlist.html');
      return;
    }
    button.addEventListener('click', () => {
      window.location.href = 'wishlist.html';
    });
  });
}

window.addEventListener('scroll', () => {
  siteHeader?.classList.toggle('sticky', window.scrollY > 20);
  backToTop?.classList.toggle('show', window.scrollY > 500);
});

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('.product-card[data-id]');
  if (card && !event.target.closest('button, a, input, select')) {
    window.location.href = buildProductLink(card.dataset.id);
    return;
  }

  const wishlistBtn = event.target.closest('.wishlist-btn');
  if (wishlistBtn) {
    const productId = wishlistBtn.closest('.product-card, .premium-product-card, .search-product-card')?.dataset?.id || wishlistBtn.dataset.productId;
    if (productId) {
      toggleWishlist(productId);
      syncWishlistHearts();
    }
    event.stopPropagation();
    return;
  }

  if (event.target.closest('.add-cart')) {
    const productId = event.target.closest('.add-cart')?.dataset.id;
    const product = getProductById(productId);
    if (product) {
      addToCart(productId, 1, product.variantStates?.[0] || {});
      if (cartCount) {
        cartCount.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 450 });
      }
    }
    event.stopPropagation();
  }

  const buyBtn = event.target.closest('.buy-btn');
  if (buyBtn) {
    const productId = buyBtn.dataset.id;
    const product = getProductById(productId);
    if (product) {
      const payload = {
        productId: String(productId),
        quantity: 1,
        variant: product.variantStates?.[0] || {}
      };
      localStorage.setItem('alibaba.shop-checkout-buy-now', JSON.stringify(payload));
      localStorage.setItem('alibaba.shop-checkout-buy-now', JSON.stringify(payload));
      window.location.href = `checkout.html?product=${productId}&qty=1`;
    }
    event.stopPropagation();
    return;
  }

  if (event.target.closest('.quick-view-btn')) {
    event.stopPropagation();
  }
});

document.addEventListener('keydown', (event) => {
  const card = event.target.closest('.product-card[data-id]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    if (event.target === card) {
      event.preventDefault();
      window.location.href = buildProductLink(card.dataset.id);
    }
  }
});

/**
 * APPLY PRODUCT IMAGE SYSTEM
 * After all products are loaded, update their images using the centralized image system
 * This ensures every product has a matching image based on its type
 */
function applyProductImageSystem() {
  if (typeof getProductImageByType !== 'function') {
    console.warn('Product image system not loaded. Skipping image updates.');
    return;
  }

  // Apply to shared products
  sharedProducts.forEach((product, index) => {
    if (product.id && product.name) {
      const mainImage = getProductImageByType(product);
      const gallery = getProductImageGallery(product, 5);

      product.image = mainImage;
      product.images = gallery;

      // Also update variant images
      if (product.variantStates && Array.isArray(product.variantStates)) {
        product.variantStates.forEach((variant, vIndex) => {
          variant.image = gallery[vIndex % gallery.length];
        });
      }
    }
  });

  // Apply to accessories if available
  if (typeof ACCESSORIES_DATA !== 'undefined' && Array.isArray(ACCESSORIES_DATA)) {
    ACCESSORIES_DATA.forEach((product, index) => {
      if (product.id && product.name) {
        const mainImage = getProductImageByType(product);
        const gallery = getProductImageGallery(product, 5);

        product.image = mainImage;
        product.images = gallery;

        // Also update variant images
        if (product.variantStates && Array.isArray(product.variantStates)) {
          product.variantStates.forEach((variant, vIndex) => {
            variant.image = gallery[vIndex % gallery.length];
          });
        }
      }
    });
  }

  console.log('✓ Product image system applied successfully to all products');
}

// Apply image system when DOM is ready (after product-images.js is loaded)
document.addEventListener('DOMContentLoaded', () => {
  // Delay to ensure product-images.js is loaded
  setTimeout(applyProductImageSystem, 100);
});

// Also apply if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(applyProductImageSystem, 100);
  });
} else {
  setTimeout(applyProductImageSystem, 100);
}

renderHomePage();
attachRippleHandlers();
bindCartLink();
bindWishlistLink();
updateWishlistCount();
syncWishlistHearts();
