// accessories.js - Complete Premium Accessories Collection for NEXORA.SHOP
// 300+ unique, diverse, and realistic accessory products

const ACCESSORIES_PRODUCTS = [];

const ACCESSORY_CATEGORIES = [
  'Watches', 'Sunglasses', 'Wallets', 'Belts', 'Caps', 'Hats', 'Backpacks', 'Handbags',
  'Sling Bags', 'Clutches', 'Scarves', 'Gloves', 'Bracelets', 'Rings', 'Necklaces', 'Earrings',
  'Hair Accessories', 'Ties', 'Bow Ties', 'Socks', 'Keychains', 'Phone Cases',
  'Screen Protectors', 'Charging Cables', 'Fast Chargers', 'Wireless Chargers', 'Power Banks',
  'Car Chargers', 'Phone Holders', 'Car Mounts', 'Mobile Stands', 'Ring Holders', 'Pop Grips',
  'Selfie Sticks', 'OTG Adapters', 'Wireless Mouse', 'Gaming Mouse', 'Keyboards',
  'Mechanical Keyboards', 'Mouse Pads', 'Laptop Stands', 'Laptop Bags', 'Laptop Sleeves',
  'Cooling Pads', 'USB Hubs', 'Webcams', 'Microphones', 'USB Drives', 'External Card Readers',
  'Cable Organizers', 'Laptop Locks', 'Cleaning Kits', 'Docking Stations', 'Gaming Headsets',
  'Gaming Controllers', 'Gamepads', 'Controller Stands', 'Headset Stands', 'Gaming Microphones',
  'RGB Accessories', 'Earbuds', 'Headphones', 'Wired Earphones', 'Bluetooth Speakers',
  'Audio Cables', 'AUX Cables', 'USB Audio Adapters', 'Headphone Stands', 'Microphone Stands',
  'Earbud Cases', 'Smart Watch Straps', 'Smart Watch Chargers', 'Fitness Band Straps',
  'Travel Bags', 'Passport Covers', 'Luggage Tags', 'Travel Organizers', 'Packing Cubes',
  'Neck Pillows', 'Travel Bottles', 'Travel Adapters', 'Luggage Covers', 'Travel Locks',
  'Car Phone Holders', 'Dashboard Mounts', 'Seat Organizers', 'Air Freshener Holders',
  'Desk Organizers', 'Desk Lamps', 'Phone Stands', 'Tablet Stands', 'Storage Organizers',
  'Key Holders', 'LED Accessories', 'Sports Bags', 'Gym Gloves', 'Water Bottles',
  'Sports Watches', 'Fitness Accessories', 'Yoga Accessories', 'Running Accessories',
  'Cycling Accessories', 'Camera Lens Protectors', 'Cable Organisers'
];

const SUBCATEGORIES_MAP = {
  'Watches': ['Analog Watches', 'Digital Watches', 'Smart Watches', 'Sports Watches', 'Luxury Watches'],
  'Sunglasses': ['UV Protected', 'Polarized', 'Aviator', 'Wayfarer', 'Cat-Eye'],
  'Wallets': ['Leather Wallets', 'Card Wallets', 'RFID Wallets', 'Travel Wallets', 'Designer Wallets'],
  'Belts': ['Casual Belts', 'Formal Belts', 'Leather Belts', 'Canvas Belts', 'Designer Belts'],
  'Caps': ['Baseball Caps', 'Snapback Caps', 'Adjustable Caps', 'Trucker Caps', 'Vintage Caps'],
  'Hats': ['Beanies', 'Fedoras', 'Wide-Brim Hats', 'Bucket Hats', 'Woolly Hats'],
  'Backpacks': ['School Backpacks', 'Hiking Backpacks', 'Laptop Backpacks', 'Travel Backpacks', 'Gaming Backpacks'],
  'Handbags': ['Shoulder Bags', 'Crossbody Bags', 'Tote Bags', 'Hobo Bags', 'Satchel Bags'],
  'Sling Bags': ['Single Strap Bags', 'Crossbody Slings', 'Messenger Slings', 'Chest Bags', 'Sport Slings'],
  'Clutches': ['Evening Clutches', 'Leather Clutches', 'Metal Clutches', 'Designer Clutches', 'Travel Clutches'],
  'Scarves': ['Silk Scarves', 'Wool Scarves', 'Cotton Scarves', 'Designer Scarves', 'Printed Scarves'],
  'Gloves': ['Leather Gloves', 'Wool Gloves', 'Winter Gloves', 'Driving Gloves', 'Touch-Screen Gloves'],
  'Bracelets': ['Metal Bracelets', 'Beaded Bracelets', 'Leather Bracelets', 'Designer Bracelets', 'Fitness Bracelets'],
  'Rings': ['Diamond Rings', 'Gold Rings', 'Silver Rings', 'Statement Rings', 'Stainless Steel Rings'],
  'Necklaces': ['Chain Necklaces', 'Pendant Necklaces', 'Layered Necklaces', 'Statement Necklaces', 'Pearl Necklaces'],
  'Earrings': ['Stud Earrings', 'Drop Earrings', 'Hoop Earrings', 'Clip-On Earrings', 'Pearl Earrings'],
  'Hair Accessories': ['Hair Clips', 'Hair Bands', 'Hair Pins', 'Hair Combs', 'Hair Barrettes'],
  'Ties': ['Silk Ties', 'Formal Ties', 'Casual Ties', 'Printed Ties', 'Slim Ties'],
  'Bow Ties': ['Silk Bow Ties', 'Pre-Tied Bow Ties', 'Self-Tie Bow Ties', 'Printed Bow Ties', 'Velvet Bow Ties'],
  'Socks': ['Casual Socks', 'Athletic Socks', 'Formal Socks', 'Thermal Socks', 'Compression Socks'],
  'Phone Cases': ['Silicone Cases', 'Leather Cases', 'Hard Cases', 'Flip Cases', 'Designer Cases'],
  'Screen Protectors': ['Tempered Glass', 'Anti-Glare', 'Privacy Protectors', 'Blue Light Protectors', 'Matte Protectors'],
  'Charging Cables': ['Lightning Cables', 'USB-C Cables', 'Micro USB Cables', 'Braided Cables', 'Fast Charging Cables'],
  'Fast Chargers': ['20W Chargers', '30W Chargers', '65W Chargers', 'Dual Port Chargers', 'Multi-Device Chargers'],
  'Wireless Chargers': ['Pad Chargers', 'Stand Chargers', 'Car Chargers', 'Qi Chargers', 'Multi-Coil Chargers'],
  'Power Banks': ['10000mAh', '20000mAh', '30000mAh', 'Solar Power Banks', 'Quick Charge Power Banks'],
  'Phone Holders': ['Dashboard Holders', 'Desk Holders', 'Car Holders', 'Universal Holders', 'Adjustable Holders'],
  'Car Mounts': ['Windshield Mounts', 'Dashboard Mounts', 'Air Vent Mounts', 'CD Slot Mounts', 'Magnetic Mounts'],
  'Wireless Mouse': ['Optical Mouse', 'Laser Mouse', 'Ergonomic Mouse', 'Silent Mouse', 'Multi-Device Mouse'],
  'Gaming Mouse': ['RGB Mouse', 'DPI Adjustable', 'Programmable Mouse', 'Wireless Gaming Mouse', 'Wired Gaming Mouse'],
  'Keyboards': ['Wireless Keyboards', 'Mechanical Keyboards', 'Slim Keyboards', 'Gaming Keyboards', 'Ergonomic Keyboards'],
  'Mouse Pads': ['Large Mouse Pads', 'Gaming Mouse Pads', 'Hard Mouse Pads', 'Soft Mouse Pads', 'RGB Mouse Pads'],
  'Laptop Stands': ['Adjustable Stands', 'Portable Stands', 'Aluminum Stands', 'Cooling Stands', 'Foldable Stands'],
  'Laptop Bags': ['Shoulder Bags', 'Backpack Bags', 'Messenger Bags', 'Sleeve Bags', 'Rolling Bags'],
  'Cooling Pads': ['Active Cooling', 'Passive Cooling', '2-Fan Cooling', '4-Fan Cooling', '6-Fan Cooling'],
  'USB Hubs': ['4-Port Hub', '7-Port Hub', 'USB 3.0 Hub', 'USB-C Hub', 'Multi-Protocol Hub'],
  'Webcams': ['720p Webcam', '1080p Webcam', '4K Webcam', 'Auto-Focus Webcam', 'Built-in Mic Webcam'],
  'Microphones': ['USB Microphone', 'Condenser Microphone', 'Dynamic Microphone', 'Lapel Microphone', 'Streaming Microphone'],
  'USB Drives': ['32GB Drive', '64GB Drive', '128GB Drive', '256GB Drive', 'Encrypted Drive'],
  'Gaming Headsets': ['7.1 Surround', 'Wireless Headsets', 'RGB Headsets', 'Noise Cancelling Headsets', 'Budget Headsets'],
  'Earbuds': ['True Wireless', 'In-Ear Earbuds', 'Noise Cancelling Earbuds', 'Budget Earbuds', 'Premium Earbuds'],
  'Headphones': ['Over-Ear', 'On-Ear', 'Closed-Back', 'Open-Back', 'Noise Cancelling'],
  'Bluetooth Speakers': ['Portable Speakers', 'Party Speakers', 'Waterproof Speakers', 'Indoor Speakers', 'Outdoor Speakers'],
  'Smart Watch Straps': ['Silicone Straps', 'Metal Bands', 'Leather Straps', 'Sport Straps', 'Fashion Straps'],
  'Travel Bags': ['Cabin Bags', 'Duffel Bags', 'Roller Bags', 'Backpack Bags', 'Weekend Bags'],
  'Laptop Locks': ['Cable Locks', 'Key Locks', 'Combination Locks', 'TSA Locks', 'Smart Locks'],
  'Docking Stations': ['USB-C Dock', 'Thunderbolt Dock', 'Multi-Monitor Dock', 'Portable Dock', 'All-in-One Dock'],
  'Cable Organizers': ['Clip Organizers', 'Cable Ties', 'Cable Sleeves', 'Box Organizers', 'Desktop Organizers'],
  'Car Phone Holders': ['Dashboard Mounts', 'Windshield Mounts', 'Air Vent Mounts', 'CD Slot Mounts', 'Magnetic Mounts'],
  'Sports Bags': ['Gym Bags', 'Duffle Bags', 'Backpack Bags', 'Shoulder Bags', 'Crossbody Bags'],
  'Desk Organizers': ['Desktop Organizers', 'Drawer Organizers', 'Wall Organizers', 'Multi-Tier Organizers', 'Wooden Organizers'],
  'Storage Organizers': ['Closet Organizers', 'Shelving Units', 'Drawer Dividers', 'Box Organizers', 'Wall-Mounted Organizers'],
  'Travel Adapters': ['Universal Adapters', 'Multi-Country Adapters', 'USB Adapters', 'Power Adapters', 'Socket Adapters'],
  'Keychains': ['Leather Keychains', 'Metal Keychains', 'Carabiner Keychains', 'Personalized Keychains', 'Designer Keychains']
};

const BRANDS_ACCESSORIES = [
  'Spigen', 'Portronics', 'Ambrane', 'Belkin', 'Anker', 'JBL', 'Ugreen', 'Noise', 
  'Zebronics', 'Sony', 'Fossil', 'Titan', 'Casio', 'Tommy Hilfiger', 'Wildcraft', 
  'Skybags', 'American Tourister', 'Samsonite', 'Hidesign', 'Caprese', 'Logitech', 
  'Corsair', 'Cooler Master', 'SteelSeries', 'Razer', 'Redragon', 'HyperX', 'Creative',
  'Sennheiser', 'Audio-Technica', 'Shure', 'Rode', 'Blue Microphones', 'Steelseries',
  'Kingston', 'SanDisk', 'Samsung', 'Western Digital', 'Seagate', 'Crucial', 'Littlest',
  'IKEA', 'Urban Ladder', 'Nilkamal', 'Godrej', 'Hometown', 'CasaCraft', 'Woodware',
  'Decathlon', 'Under Armour', 'Puma', 'Adidas', 'Nike', 'Reebok', 'New Balance',
  'Levis', 'Wrangler', 'Van Heusen', 'Allen Solly', 'Arrow', 'Raymond', 'Blackberrys',
  'Rolex', 'Omega', 'Hamilton', 'Seiko', 'Timex', 'Garmin', 'Apple Watch', 'Fitbit',
  'Swarovski', 'Pandora', 'Fossil', 'Titan', 'Accessorize', 'Monsoon', 'Carlton London',
  'Morphe', 'Maybelline', 'Lakme', 'Nykaa', 'MAC', 'Bobbi Brown', 'Charlotte Tilbury',
  'Xiaomi', 'Mi Band', 'OnePlus', 'realme', 'Samsung', 'Apple', 'Fitbit', 'Garmin',
  'Proline', 'PowerMax', 'Decathlon', 'Yonex', 'Head', 'Wilson', 'Babolat',
  'Targus', 'Case Logic', 'Peak Design', 'Tumi', 'Briggs & Riley', 'Rimowa'
];

// Premium accessory names generator
const ACCESSORY_NAME_TEMPLATES = {
  'Watches': [
    'Classic ${brand} Analog Watch',
    'Premium ${brand} Chronograph Watch',
    'Luxury ${brand} Dress Watch',
    '${brand} Sport Digital Watch',
    'Designer ${brand} Fashion Watch'
  ],
  'Sunglasses': [
    '${brand} UV Protected Sunglasses',
    'Premium ${brand} Polarized Sunglasses',
    '${brand} Aviator Sunglasses',
    'Trendy ${brand} Wayfarer Sunglasses',
    '${brand} Cat-Eye Sunglasses'
  ],
  'Wallets': [
    'Premium ${brand} RFID Leather Wallet',
    '${brand} Travel Passport Wallet',
    'Genuine ${brand} Card Holder Wallet',
    'Designer ${brand} Bifold Wallet',
    '${brand} Minimalist Money Clip Wallet'
  ],
  'Backpacks': [
    'Durable ${brand} School Backpack',
    'Premium ${brand} Laptop Backpack',
    '${brand} Travel Adventure Backpack',
    'Gaming ${brand} Backpack with USB',
    'Professional ${brand} Business Backpack'
  ],
  'Phone Cases': [
    'Shockproof ${brand} Phone Case',
    '${brand} Leather Phone Case',
    'Heavy Duty ${brand} Phone Protection',
    'Designer ${brand} Flip Phone Case',
    'Premium ${brand} Hybrid Case'
  ],
  'Cables': [
    '${brand} Braided Fast Charging Cable',
    'Durable ${brand} USB-C Cable',
    '${brand} Lightning Fast Charge Cable',
    'Ultra-Strong ${brand} Nylon Cable',
    'Premium ${brand} Data Sync Cable'
  ],
  'Charging': [
    'High-Speed ${brand} USB Charger',
    '${brand} Fast Charging Adapter',
    'Dual Port ${brand} Quick Charger',
    'Compact ${brand} Power Adapter',
    '${brand} Multi-Device Charger'
  ],
  'Power Banks': [
    '${brand} 20000mAh Power Bank',
    'Compact ${brand} 10000mAh Power Bank',
    'Ultra-Fast ${brand} Charge Power Bank',
    'Wireless ${brand} Power Bank',
    'Solar ${brand} Power Bank'
  ],
  'Keyboards': [
    '${brand} Mechanical Gaming Keyboard',
    'Wireless ${brand} Slim Keyboard',
    'RGB ${brand} Gaming Keyboard',
    'Ergonomic ${brand} Mechanical Keyboard',
    '${brand} Silent Mechanical Keyboard'
  ],
  'Mouse': [
    '${brand} Wireless Optical Mouse',
    'Gaming ${brand} High-DPI Mouse',
    'Ergonomic ${brand} Mouse',
    '${brand} Silent Wireless Mouse',
    'Portable ${brand} Mouse'
  ],
  'Headphones': [
    'Premium ${brand} Noise Cancelling Headphones',
    '${brand} Wireless Bluetooth Headphones',
    'Gaming ${brand} Surround Sound Headphones',
    'Studio ${brand} Professional Headphones',
    'Portable ${brand} Foldable Headphones'
  ],
  'Earbuds': [
    '${brand} True Wireless Earbuds',
    'Premium ${brand} Noise Cancelling Earbuds',
    '${brand} Sports Waterproof Earbuds',
    'Gaming ${brand} Low-Latency Earbuds',
    'Compact ${brand} Earbuds'
  ]
};

// Generate comprehensive accessory products
function generateAccessoriesCollection() {
  const products = [];
  let productId = 4001;
  
  // Define realistic accessory products across all categories
  const accessoryData = [
    // Watches (18 variants)
    { cat: 'Watches', name: 'Premium Analog Leather Watch', brand: 'Fossil', price: 8999, mrp: 12999, desc: 'Classic analog watch with leather strap' },
    { cat: 'Watches', name: 'Digital Sports Chronograph', brand: 'Casio', price: 4999, mrp: 7499, desc: 'Durable digital sports watch' },
    { cat: 'Watches', name: 'Smart Fitness Watch', brand: 'Garmin', price: 12999, mrp: 16999, desc: 'GPS fitness tracking smartwatch' },
    { cat: 'Watches', name: 'Luxury Gold Watch', brand: 'Titan', price: 22999, mrp: 34999, desc: 'Elegant gold-plated luxury watch' },
    { cat: 'Watches', name: 'Stainless Steel Watch', brand: 'Casio', price: 6999, mrp: 9999, desc: 'Durable stainless steel timepiece' },
    { cat: 'Watches', name: 'Minimalist Fashion Watch', brand: 'Tommy Hilfiger', price: 7499, mrp: 10999, desc: 'Modern minimalist design watch' },
    { cat: 'Watches', name: 'Professional Chronograph', brand: 'Fossil', price: 11999, mrp: 17999, desc: 'Professional chronograph with precision' },
    { cat: 'Watches', name: 'Smart Health Watch', brand: 'Fitbit', price: 9999, mrp: 13999, desc: 'Health tracking smartwatch' },
    { cat: 'Watches', name: 'Classic Dress Watch', brand: 'Tommy Hilfiger', price: 9499, mrp: 13999, desc: 'Elegant formal dress watch' },
    { cat: 'Watches', name: 'Rugged Sports Watch', brand: 'Garmin', price: 14999, mrp: 19999, desc: 'Tough outdoor sports watch' },
    { cat: 'Watches', name: 'Skeleton Watch', brand: 'Fossil', price: 13499, mrp: 19999, desc: 'Visible mechanism skeleton watch' },
    { cat: 'Watches', name: 'Automatic Mechanical Watch', brand: 'Titan', price: 18999, mrp: 27999, desc: 'Premium automatic mechanical watch' },
    { cat: 'Watches', name: 'Dive Watch', brand: 'Casio', price: 7499, mrp: 11999, desc: 'Water-resistant dive watch' },
    { cat: 'Watches', name: 'Pilot Watch', brand: 'Fossil', price: 12499, mrp: 18999, desc: 'Classic pilot-style watch' },
    { cat: 'Watches', name: 'Retro Vintage Watch', brand: 'Timex', price: 5999, mrp: 8999, desc: 'Vintage-style analog watch' },
    { cat: 'Watches', name: 'Moon Phase Watch', brand: 'Titan', price: 19999, mrp: 29999, desc: 'Sophisticated moon phase watch' },
    { cat: 'Watches', name: 'Solar Powered Watch', brand: 'Casio', price: 8999, mrp: 12999, desc: 'Eco-friendly solar watch' },
    { cat: 'Watches', name: 'Premium Smart Band', brand: 'Garmin', price: 11999, mrp: 15999, desc: 'Advanced fitness smart band' },
    
    // Sunglasses (16 variants)
    { cat: 'Sunglasses', name: 'UV Protected Aviator Sunglasses', brand: 'Tommy Hilfiger', price: 3999, mrp: 6999, desc: 'Classic UV-protected aviators' },
    { cat: 'Sunglasses', name: 'Polarized Wayfarer Sunglasses', brand: 'Fossil', price: 4499, mrp: 7499, desc: 'Polarized wayfarer style shades' },
    { cat: 'Sunglasses', name: 'Designer Cat-Eye Sunglasses', brand: 'Accessorize', price: 3499, mrp: 5999, desc: 'Trendy cat-eye frame sunglasses' },
    { cat: 'Sunglasses', name: 'Premium Pilot Sunglasses', brand: 'Tommy Hilfiger', price: 4999, mrp: 8499, desc: 'Authentic pilot sunglasses' },
    { cat: 'Sunglasses', name: 'Mirror Coating Sunglasses', brand: 'Fossil', price: 4299, mrp: 7299, desc: 'Mirrored lens sunglasses' },
    { cat: 'Sunglasses', name: 'Round Frame Sunglasses', brand: 'Accessorize', price: 3299, mrp: 5599, desc: 'Retro round frame shades' },
    { cat: 'Sunglasses', name: 'Sport Performance Sunglasses', brand: 'Adidas', price: 5999, mrp: 9999, desc: 'Sport-oriented sunglasses' },
    { cat: 'Sunglasses', name: 'Luxury Designer Sunglasses', brand: 'Fossil', price: 8999, mrp: 14999, desc: 'Premium designer sunglasses' },
    { cat: 'Sunglasses', name: 'Gradient Lens Sunglasses', brand: 'Tommy Hilfiger', price: 4799, mrp: 7999, desc: 'Stylish gradient lens shades' },
    { cat: 'Sunglasses', name: 'Oversized Fashion Sunglasses', brand: 'Accessorize', price: 3799, mrp: 6299, desc: 'Trendy oversized sunglasses' },
    { cat: 'Sunglasses', name: 'Metal Frame Sunglasses', brand: 'Fossil', price: 5499, mrp: 8999, desc: 'Premium metal frame shades' },
    { cat: 'Sunglasses', name: 'Photochromic Sunglasses', brand: 'Tommy Hilfiger', price: 6999, mrp: 11999, desc: 'Light-adaptive photochromic lenses' },
    { cat: 'Sunglasses', name: 'Blue Light Sunglasses', price: 2499, mrp: 4499, desc: 'UV and blue light protection' },
    { cat: 'Sunglasses', name: 'Night Vision Sunglasses', price: 3999, mrp: 6999, desc: 'Clear night vision driving glasses' },
    { cat: 'Sunglasses', name: 'Sport Wrap Sunglasses', brand: 'Adidas', price: 4999, mrp: 8499, desc: 'Wrap-around sport sunglasses' },
    { cat: 'Sunglasses', name: 'Premium Gradient Sunglasses', brand: 'Fossil', price: 7499, mrp: 12499, desc: 'Luxury gradient sunglasses' },
    
    // Wallets (18 variants)
    { cat: 'Wallets', name: 'Genuine RFID Leather Wallet', brand: 'Hidesign', price: 2499, mrp: 4499, desc: 'Premium RFID-protected leather wallet' },
    { cat: 'Wallets', name: 'Minimalist Card Holder', brand: 'Caprese', price: 1299, mrp: 2499, desc: 'Slim minimalist card wallet' },
    { cat: 'Wallets', name: 'Bifold Leather Wallet', brand: 'Fossil', price: 2299, mrp: 3999, desc: 'Classic bifold leather wallet' },
    { cat: 'Wallets', name: 'Travel Passport Wallet', brand: 'Skybags', price: 1999, mrp: 3499, desc: 'Compact passport travel wallet' },
    { cat: 'Wallets', name: 'Premium Canvas Wallet', brand: 'Wildcraft', price: 1599, mrp: 2999, desc: 'Durable canvas travel wallet' },
    { cat: 'Wallets', name: 'Money Clip Wallet', brand: 'Fossil', price: 1799, mrp: 2999, desc: 'Sleek money clip wallet' },
    { cat: 'Wallets', name: 'Tri-Fold Organizer Wallet', brand: 'Hidesign', price: 3499, mrp: 5999, desc: 'Large tri-fold organizer wallet' },
    { cat: 'Wallets', name: 'Slim RFID Wallet', brand: 'Caprese', price: 1999, mrp: 3499, desc: 'Slim profile RFID protection wallet' },
    { cat: 'Wallets', name: 'Designer Satchel Wallet', brand: 'Fossil', price: 4299, mrp: 7499, desc: 'Premium designer satchel wallet' },
    { cat: 'Wallets', name: 'Woven Pattern Wallet', brand: 'Hidesign', price: 2699, mrp: 4799, desc: 'Artisan woven pattern wallet' },
    { cat: 'Wallets', name: 'Magnetic Closure Wallet', price: 1499, mrp: 2799, desc: 'Easy magnetic closure wallet' },
    { cat: 'Wallets', name: 'Zipper Pouch Wallet', brand: 'Caprese', price: 1699, mrp: 2999, desc: 'Secure zipper pouch wallet' },
    { cat: 'Wallets', name: 'Leather Long Wallet', brand: 'Fossil', price: 3999, mrp: 6999, desc: 'Premium long wallet' },
    { cat: 'Wallets', name: 'RFID Blocking Clutch', brand: 'Hidesign', price: 4499, mrp: 7999, desc: 'RFID-blocking clutch wallet' },
    { cat: 'Wallets', name: 'Minimalist Slim Wallet', brand: 'Caprese', price: 1399, mrp: 2599, desc: 'Ultra-slim minimalist wallet' },
    { cat: 'Wallets', name: 'Travel Organizer Wallet', brand: 'Wildcraft', price: 2199, mrp: 4499, desc: 'Multi-compartment travel wallet' },
    { cat: 'Wallets', name: 'Premium Brown Leather Wallet', brand: 'Fossil', price: 2999, mrp: 4999, desc: 'Rich brown leather wallet' },
    { cat: 'Wallets', name: 'Vegan Leather Wallet', price: 1899, mrp: 3499, desc: 'Eco-friendly vegan leather wallet' },
    
    // Phone Cases (22 variants)
    { cat: 'Phone Cases', name: 'Shockproof TPU Phone Case', brand: 'Spigen', price: 799, mrp: 1499, desc: 'Military-grade shock protection' },
    { cat: 'Phone Cases', name: 'Premium Leather Phone Case', brand: 'Fossil', price: 1999, mrp: 3499, desc: 'Genuine leather phone case' },
    { cat: 'Phone Cases', name: 'Clear Transparent Phone Case', brand: 'Spigen', price: 599, mrp: 1199, desc: 'Crystal clear transparent case' },
    { cat: 'Phone Cases', name: 'Slim Minimalist Case', brand: 'Spigen', price: 699, mrp: 1299, desc: 'Ultra-slim protective case' },
    { cat: 'Phone Cases', name: 'Flip Leather Case', brand: 'Fossil', price: 2499, mrp: 4499, desc: 'Premium flip leather case' },
    { cat: 'Phone Cases', name: 'Rugged Heavy Duty Case', brand: 'Spigen', price: 1199, mrp: 2199, desc: 'Heavy-duty rugged protection' },
    { cat: 'Phone Cases', name: 'Designer Pattern Case', price: 899, mrp: 1799, desc: 'Stylish designer pattern case' },
    { cat: 'Phone Cases', name: 'Wallet Hybrid Case', brand: 'Spigen', price: 1299, mrp: 2299, desc: 'Case with card holder slots' },
    { cat: 'Phone Cases', name: 'Textured Grip Case', brand: 'Spigen', price: 799, mrp: 1499, desc: 'Non-slip textured grip case' },
    { cat: 'Phone Cases', name: 'Anti-Glare Case', price: 699, mrp: 1299, desc: 'Matte anti-glare finish case' },
    { cat: 'Phone Cases', name: 'Magenetic Ring Case', brand: 'Spigen', price: 1099, mrp: 1999, desc: 'Built-in magnetic ring holder' },
    { cat: 'Phone Cases', name: 'Liquid Silicone Case', brand: 'Spigen', price: 999, mrp: 1799, desc: 'Smooth liquid silicone case' },
    { cat: 'Phone Cases', name: 'Raised Camera Case', brand: 'Spigen', price: 899, mrp: 1599, desc: 'Raised camera rim protection' },
    { cat: 'Phone Cases', name: 'Carbon Fiber Case', brand: 'Spigen', price: 1399, mrp: 2499, desc: 'Carbon fiber textured case' },
    { cat: 'Phone Cases', name: 'Military Series Case', brand: 'Spigen', price: 1599, mrp: 2999, desc: 'Military-tested protection case' },
    { cat: 'Phone Cases', name: 'Ultra Slim Case', brand: 'Spigen', price: 649, mrp: 1199, desc: 'Thinnest protective case' },
    { cat: 'Phone Cases', name: 'Chromatic Case', price: 1099, mrp: 1999, desc: 'Iridescent chromatic case' },
    { cat: 'Phone Cases', name: 'Kickstand Case', brand: 'Spigen', price: 1199, mrp: 2199, desc: 'Case with built-in kickstand' },
    { cat: 'Phone Cases', name: 'Designer Floral Case', price: 999, mrp: 1899, desc: 'Beautiful floral pattern case' },
    { cat: 'Phone Cases', name: 'Holographic Case', price: 1299, mrp: 2399, desc: 'Trendy holographic case' },
    { cat: 'Phone Cases', name: 'Vegan Leather Case', brand: 'Fossil', price: 1899, mrp: 3299, desc: 'Eco-friendly vegan leather case' },
    { cat: 'Phone Cases', name: 'Biodegradable Case', price: 799, mrp: 1499, desc: 'Eco-friendly biodegradable case' },
  ];

  // Generate more products to reach 300+
  const mobileAccessories = [
    { cat: 'Screen Protectors', name: 'Tempered Glass Screen Protector', brand: 'Spigen', price: 299, mrp: 699, desc: 'Premium tempered glass protection' },
    { cat: 'Screen Protectors', name: 'Anti-Glare Screen Protector', brand: 'Portronics', price: 249, mrp: 599, desc: 'Anti-glare matte protector' },
    { cat: 'Screen Protectors', name: 'Privacy Screen Protector', price: 399, mrp: 799, desc: 'Privacy filter screen protector' },
    { cat: 'Screen Protectors', name: 'Blue Light Protector', brand: 'Portronics', price: 349, mrp: 699, desc: 'Blue light blocking protector' },
    { cat: 'Screen Protectors', name: 'HD Clear Screen Protector', brand: 'Spigen', price: 279, mrp: 599, desc: 'Crystal clear HD protector' },
    { cat: 'Charging Cables', name: 'Braided USB-C Fast Charge Cable', brand: 'Anker', price: 499, mrp: 999, desc: 'Durable braided USB-C cable' },
    { cat: 'Charging Cables', name: 'Nylon Braided Lightning Cable', brand: 'Anker', price: 449, mrp: 899, desc: 'Braided lightning fast charge cable' },
    { cat: 'Charging Cables', name: 'Micro USB Charging Cable', brand: 'Anker', price: 349, mrp: 699, desc: 'Durable micro USB cable' },
    { cat: 'Charging Cables', name: 'Quick Charge USB-C Cable', brand: 'Anker', price: 549, mrp: 1099, desc: 'Fast charging USB-C cable' },
    { cat: 'Charging Cables', name: 'Multi-Pack Charging Cables', brand: 'Anker', price: 899, mrp: 1799, desc: '3-pack multi-length cables' },
    { cat: 'Fast Chargers', name: '20W Fast Charger', brand: 'Anker', price: 799, mrp: 1299, desc: '20W USB-C fast charger' },
    { cat: 'Fast Chargers', name: '30W Ultra Fast Charger', brand: 'Anker', price: 999, mrp: 1799, desc: '30W powerful fast charger' },
    { cat: 'Fast Chargers', name: 'Dual Port Fast Charger', brand: 'Anker', price: 1299, mrp: 2199, desc: 'Dual USB fast charger' },
    { cat: 'Fast Chargers', name: '65W Super Fast Charger', brand: 'Anker', price: 1599, mrp: 2699, desc: '65W super-fast charger' },
    { cat: 'Wireless Chargers', name: 'Wireless Charging Pad', brand: 'Anker', price: 1299, mrp: 2299, desc: 'Qi-certified wireless pad' },
    { cat: 'Wireless Chargers', name: 'Wireless Charging Stand', brand: 'Anker', price: 1499, mrp: 2599, desc: 'Adjustable wireless stand' },
    { cat: 'Wireless Chargers', name: 'Multi-Device Wireless Charger', brand: 'Anker', price: 2999, mrp: 4999, desc: 'Charges 3 devices wirelessly' },
    { cat: 'Power Banks', name: '10000mAh Power Bank', brand: 'Anker', price: 999, mrp: 1799, desc: 'Compact 10000mAh power bank' },
    { cat: 'Power Banks', name: '20000mAh Power Bank', brand: 'Anker', price: 1499, mrp: 2499, desc: 'High-capacity 20000mAh bank' },
    { cat: 'Power Banks', name: '30000mAh Super Power Bank', brand: 'Anker', price: 2199, mrp: 3799, desc: 'Massive 30000mAh capacity' },
    { cat: 'Power Banks', name: 'Solar Power Bank', brand: 'Portronics', price: 1799, mrp: 3299, desc: 'Solar-powered power bank' },
    { cat: 'Power Banks', name: 'Wireless Power Bank', brand: 'Anker', price: 1999, mrp: 3299, desc: 'Wireless charging power bank' },
    { cat: 'Car Chargers', name: 'Dual USB Car Charger', brand: 'Anker', price: 599, mrp: 1099, desc: 'Dual USB car charger' },
    { cat: 'Car Chargers', name: 'Fast Car Charger', brand: 'Anker', price: 799, mrp: 1399, desc: 'Quick charging car charger' },
    { cat: 'Phone Holders', name: 'Dashboard Phone Holder', brand: 'Portronics', price: 799, mrp: 1399, desc: 'Secure dashboard mount' },
    { cat: 'Phone Holders', name: 'Air Vent Phone Holder', brand: 'Portronics', price: 699, mrp: 1299, desc: 'Vent clip phone holder' },
    { cat: 'Phone Holders', name: 'Universal Desk Phone Holder', brand: 'Portronics', price: 599, mrp: 1099, desc: 'Adjustable desk stand' },
    { cat: 'Phone Holders', name: 'Pop Grip Phone Holder', price: 349, mrp: 699, desc: 'Trendy pop socket grip' },
    { cat: 'Car Mounts', name: 'Windshield Car Mount', brand: 'Portronics', price: 899, mrp: 1599, desc: 'Strong windshield suction mount' },
    { cat: 'Car Mounts', name: 'Dashboard Car Mount', brand: 'Portronics', price: 799, mrp: 1399, desc: 'Dashboard adhesive mount' },
    { cat: 'Car Mounts', name: 'Magnetic Car Mount', price: 499, mrp: 999, desc: 'Universal magnetic mount' },
    { cat: 'Mobile Stands', name: 'Portable Mobile Stand', brand: 'Portronics', price: 599, mrp: 1199, desc: 'Foldable portable stand' },
    { cat: 'Mobile Stands', name: 'Adjustable Desk Stand', brand: 'Portronics', price: 799, mrp: 1499, desc: 'Adjustable angles stand' },
    { cat: 'Ring Holders', name: 'Phone Ring Holder', brand: 'Spigen', price: 299, mrp: 599, desc: 'Secure ring holder' },
    { cat: 'Pop Grips', name: 'Designer Pop Grip', price: 449, mrp: 899, desc: 'Stylish pop grip' },
    { cat: 'Selfie Sticks', name: 'Selfie Stick Tripod', price: 1499, mrp: 2999, desc: 'Selfie stick with tripod' },
    { cat: 'OTG Adapters', name: 'USB OTG Adapter', brand: 'Anker', price: 249, mrp: 499, desc: 'USB to Micro USB OTG' },
    { cat: 'Camera Lens Protectors', name: 'Camera Lens Protector', brand: 'Spigen', price: 349, mrp: 699, desc: 'Tempered glass lens protector' },
  ];

  const computerAccessories = [
    { cat: 'Wireless Mouse', name: 'Compact Wireless Mouse', brand: 'Logitech', price: 1499, mrp: 2499, desc: 'Compact wireless optical mouse' },
    { cat: 'Wireless Mouse', name: 'Silent Wireless Mouse', brand: 'Logitech', price: 1299, mrp: 2199, desc: 'Quiet click wireless mouse' },
    { cat: 'Wireless Mouse', name: 'Ergonomic Wireless Mouse', brand: 'Logitech', price: 1999, mrp: 3299, desc: 'Ergonomic wireless mouse' },
    { cat: 'Wireless Mouse', name: 'Multi-Device Wireless Mouse', brand: 'Logitech', price: 2299, mrp: 3799, desc: 'Connects to 3 devices' },
    { cat: 'Gaming Mouse', name: 'Gaming RGB Mouse', brand: 'Corsair', price: 3999, mrp: 6499, desc: 'RGB gaming mouse' },
    { cat: 'Gaming Mouse', name: 'DPI Gaming Mouse', brand: 'Corsair', price: 4499, mrp: 7299, desc: 'Adjustable DPI gaming mouse' },
    { cat: 'Gaming Mouse', name: 'Wireless Gaming Mouse', brand: 'Corsair', price: 3499, mrp: 5799, desc: 'Wireless gaming mouse' },
    { cat: 'Keyboards', name: 'Wireless Keyboard', brand: 'Logitech', price: 2799, mrp: 4599, desc: 'Wireless keyboard' },
    { cat: 'Keyboards', name: 'Slim Wireless Keyboard', brand: 'Logitech', price: 2499, mrp: 3999, desc: 'Ultra-slim wireless keyboard' },
    { cat: 'Mechanical Keyboards', name: 'RGB Mechanical Keyboard', brand: 'Corsair', price: 8999, mrp: 14999, desc: 'RGB mechanical keyboard' },
    { cat: 'Mechanical Keyboards', name: 'Compact Mechanical Keyboard', brand: 'Corsair', price: 7999, mrp: 12999, desc: 'Compact mechanical keyboard' },
    { cat: 'Mechanical Keyboards', name: 'Gateron Mechanical Keyboard', brand: 'Corsair', price: 9999, mrp: 15999, desc: 'Gateron switches keyboard' },
    { cat: 'Mouse Pads', name: 'Large Gaming Mouse Pad', brand: 'Corsair', price: 1799, mrp: 2999, desc: 'Large gaming mouse pad' },
    { cat: 'Mouse Pads', name: 'RGB Mouse Pad', brand: 'Corsair', price: 2499, mrp: 4099, desc: 'RGB lighting mouse pad' },
    { cat: 'Mouse Pads', name: 'Hard Gaming Mouse Pad', brand: 'Corsair', price: 1599, mrp: 2699, desc: 'Hard surface mouse pad' },
    { cat: 'Laptop Stands', name: 'Adjustable Laptop Stand', brand: 'Portronics', price: 1999, mrp: 3499, desc: 'Adjustable aluminum stand' },
    { cat: 'Laptop Stands', name: 'Cooling Laptop Stand', price: 2499, mrp: 4299, desc: 'Stand with cooling vents' },
    { cat: 'Laptop Stands', name: 'Foldable Laptop Stand', brand: 'Portronics', price: 1699, mrp: 2999, desc: 'Portable foldable stand' },
    { cat: 'Laptop Bags', name: 'Laptop Messenger Bag', brand: 'Wildcraft', price: 2499, mrp: 4499, desc: 'Leather laptop messenger bag' },
    { cat: 'Laptop Bags', name: 'Laptop Backpack', brand: 'Wildcraft', price: 2999, mrp: 4999, desc: 'Spacious laptop backpack' },
    { cat: 'Laptop Sleeves', name: 'Neoprene Laptop Sleeve', brand: 'Portronics', price: 999, mrp: 1799, desc: 'Soft neoprene sleeve' },
    { cat: 'Laptop Sleeves', name: 'Waterproof Laptop Sleeve', brand: 'Wildcraft', price: 1299, mrp: 2199, desc: 'Waterproof laptop sleeve' },
    { cat: 'Cooling Pads', name: '2-Fan Laptop Cooler', price: 1499, mrp: 2499, desc: 'Dual fan cooling pad' },
    { cat: 'Cooling Pads', name: '4-Fan Laptop Cooler', price: 2299, mrp: 3899, desc: 'Quad fan cooling pad' },
    { cat: 'USB Hubs', name: '4-Port USB Hub', brand: 'Anker', price: 999, mrp: 1599, desc: '4-port USB 3.0 hub' },
    { cat: 'USB Hubs', name: '7-Port USB Hub', brand: 'Anker', price: 1499, mrp: 2499, desc: '7-port USB hub' },
    { cat: 'USB Hubs', name: 'USB-C Hub', brand: 'Anker', price: 2999, mrp: 4999, desc: 'Multi-port USB-C hub' },
    { cat: 'Webcams', name: '1080p HD Webcam', brand: 'Logitech', price: 3999, mrp: 6499, desc: '1080p full HD webcam' },
    { cat: 'Webcams', name: '4K Webcam', price: 7999, mrp: 11999, desc: '4K resolution webcam' },
    { cat: 'Microphones', name: 'USB Condenser Microphone', brand: 'Audio-Technica', price: 2999, mrp: 4999, desc: 'Studio-quality USB mic' },
    { cat: 'Microphones', name: 'Streaming Microphone', price: 1999, mrp: 3499, desc: 'Streaming-oriented microphone' },
    { cat: 'USB Drives', name: '32GB USB Drive', brand: 'Kingston', price: 299, mrp: 599, desc: '32GB USB 3.0 drive' },
    { cat: 'USB Drives', name: '64GB USB Drive', brand: 'Kingston', price: 499, mrp: 999, desc: '64GB high-speed drive' },
    { cat: 'USB Drives', name: '128GB USB Drive', brand: 'Kingston', price: 899, mrp: 1699, desc: '128GB USB drive' },
    { cat: 'External Card Readers', name: 'Multi-Card Reader', brand: 'Anker', price: 799, mrp: 1399, desc: 'Multi-format card reader' },
    { cat: 'Docking Stations', name: 'USB-C Docking Station', brand: 'Anker', price: 3999, mrp: 6499, desc: 'USB-C multi-port dock' },
    { cat: 'Docking Stations', name: 'Thunderbolt Docking Station', price: 8999, mrp: 14999, desc: 'Thunderbolt 3 dock' },
    { cat: 'Laptop Locks', name: 'Laptop Security Lock', brand: 'Kensington', price: 1199, mrp: 1999, desc: 'Cable security lock' },
    { cat: 'Cleaning Kits', name: 'Screen Cleaning Kit', price: 399, mrp: 799, desc: 'Complete screen cleaner kit' },
    { cat: 'Cable Organizers', name: 'Cable Management Kit', price: 599, mrp: 1099, desc: 'Cable organizers set' },
  ];

  const gamingAccessories = [
    { cat: 'Gaming Headsets', name: '7.1 Surround Gaming Headset', brand: 'HyperX', price: 5999, mrp: 9999, desc: '7.1 surround sound headset' },
    { cat: 'Gaming Headsets', name: 'Wireless Gaming Headset', brand: 'SteelSeries', price: 6999, mrp: 10999, desc: 'Wireless gaming headset' },
    { cat: 'Gaming Headsets', name: 'RGB Gaming Headset', brand: 'Corsair', price: 7999, mrp: 12999, desc: 'RGB lighting gaming headset' },
    { cat: 'Gaming Controllers', name: 'Wireless Game Controller', brand: 'Corsair', price: 4999, mrp: 7999, desc: 'Wireless gaming controller' },
    { cat: 'Gaming Controllers', name: 'Programmable Game Controller', brand: 'Corsair', price: 5999, mrp: 9299, desc: 'Programmable buttons controller' },
    { cat: 'Gamepads', name: 'Sports Gamepad', price: 1999, mrp: 3499, desc: 'Ergonomic sports gamepad' },
    { cat: 'Controller Stands', name: 'Controller Display Stand', price: 499, mrp: 899, desc: 'Gaming controller stand' },
    { cat: 'Headset Stands', name: 'Headset Stand', brand: 'Corsair', price: 999, mrp: 1699, desc: 'Headset display stand' },
    { cat: 'Gaming Mouse Pads', name: 'RGB Gaming Mouse Pad', brand: 'Corsair', price: 2999, mrp: 4999, desc: 'RGB mouse pad' },
    { cat: 'RGB Accessories', name: 'RGB Lighting Hub', price: 2999, mrp: 4999, desc: 'RGB LED controller hub' },
    { cat: 'RGB Accessories', name: 'RGB Light Strips', price: 1999, mrp: 3499, desc: 'Addressable RGB strips' },
  ];

  const audioAccessories = [
    { cat: 'Earbuds', name: 'True Wireless Earbuds', brand: 'Noise', price: 2999, mrp: 5999, desc: 'True wireless earbuds' },
    { cat: 'Earbuds', name: 'Noise Cancelling Earbuds', brand: 'Noise', price: 4999, mrp: 7999, desc: 'ANC earbuds' },
    { cat: 'Headphones', name: 'Wireless Bluetooth Headphones', brand: 'JBL', price: 5999, mrp: 9999, desc: 'Premium wireless headphones' },
    { cat: 'Headphones', name: 'Studio Monitor Headphones', brand: 'Audio-Technica', price: 8999, mrp: 14999, desc: 'Professional monitor headphones' },
    { cat: 'Wired Earphones', name: 'Premium Wired Earphones', brand: 'Audio-Technica', price: 2499, mrp: 4499, desc: 'High-quality wired earphones' },
    { cat: 'Bluetooth Speakers', name: 'Portable Bluetooth Speaker', brand: 'JBL', price: 3999, mrp: 6999, desc: 'Portable waterproof speaker' },
    { cat: 'Bluetooth Speakers', name: 'Party Bluetooth Speaker', brand: 'JBL', price: 7999, mrp: 12999, desc: 'High-power party speaker' },
    { cat: 'Audio Cables', name: 'Premium Audio Cable', price: 399, mrp: 799, desc: '3.5mm audio cable' },
    { cat: 'AUX Cables', name: 'Car AUX Cable', price: 299, mrp: 599, desc: 'Durable AUX cable' },
    { cat: 'USB Audio Adapters', name: 'USB Audio Adapter', brand: 'Anker', price: 699, mrp: 1299, desc: 'USB to audio adapter' },
    { cat: 'Headphone Stands', name: 'Premium Headphone Stand', price: 699, mrp: 1299, desc: 'Display headphone stand' },
    { cat: 'Microphone Stands', name: 'Desk Microphone Stand', price: 1299, mrp: 2299, desc: 'Adjustable mic stand' },
    { cat: 'Earbud Cases', name: 'Protective Earbud Case', brand: 'Spigen', price: 599, mrp: 1099, desc: 'Durable earbud case' },
  ];

  const wearableAccessories = [
    { cat: 'Smart Watch Straps', name: 'Silicone Smart Watch Strap', price: 499, mrp: 899, desc: 'Silicone sport strap' },
    { cat: 'Smart Watch Straps', name: 'Metal Smart Watch Band', price: 1299, mrp: 2299, desc: 'Stainless steel band' },
    { cat: 'Smart Watch Straps', name: 'Leather Smart Watch Strap', brand: 'Fossil', price: 1799, mrp: 2999, desc: 'Premium leather strap' },
    { cat: 'Smart Watch Chargers', name: 'Fast Smart Watch Charger', price: 699, mrp: 1299, desc: 'Quick charging dock' },
    { cat: 'Fitness Band Straps', name: 'Fitness Band Strap', price: 399, mrp: 699, desc: 'Replacement fitness band strap' },
  ];

  const travelAccessories = [
    { cat: 'Travel Bags', name: 'Cabin Travel Bag', brand: 'Skybags', price: 2999, mrp: 4999, desc: 'Lightweight cabin bag' },
    { cat: 'Travel Bags', name: 'Duffel Travel Bag', brand: 'Wildcraft', price: 2199, mrp: 3999, desc: 'Spacious duffel bag' },
    { cat: 'Travel Bags', name: 'Roller Travel Bag', brand: 'American Tourister', price: 4999, mrp: 7999, desc: 'Wheeled travel luggage' },
    { cat: 'Passport Covers', name: 'Leather Passport Cover', brand: 'Hidesign', price: 799, mrp: 1499, desc: 'Premium passport holder' },
    { cat: 'Luggage Tags', name: 'Luggage Tag Set', brand: 'Skybags', price: 299, mrp: 599, desc: 'Travel luggage tags' },
    { cat: 'Travel Organizers', name: 'Packing Organizer', price: 999, mrp: 1799, desc: 'Travel organizer cubes' },
    { cat: 'Packing Cubes', name: 'Compression Packing Cubes', brand: 'Wildcraft', price: 1299, mrp: 2299, desc: 'Compression packing set' },
    { cat: 'Neck Pillows', name: 'Memory Foam Neck Pillow', price: 1299, mrp: 2299, desc: 'Travel neck support pillow' },
    { cat: 'Travel Bottles', name: 'Leak-Proof Travel Bottle', price: 799, mrp: 1499, desc: 'Durable travel water bottle' },
    { cat: 'Travel Adapters', name: 'Universal Travel Adapter', price: 1499, mrp: 2499, desc: 'Universal power adapter' },
    { cat: 'Luggage Covers', name: 'Luggage Cover', brand: 'Skybags', price: 699, mrp: 1299, desc: 'Protective luggage cover' },
    { cat: 'Travel Locks', name: 'TSA Travel Lock', price: 599, mrp: 1099, desc: 'TSA-approved lock' },
  ];

  const homeAccessories = [
    { cat: 'Desk Organizers', name: 'Wooden Desk Organizer', price: 1299, mrp: 2299, desc: 'Wooden desktop organizer' },
    { cat: 'Desk Organizers', name: 'Multi-Tier Desk Organizer', price: 1699, mrp: 2999, desc: 'Multi-compartment organizer' },
    { cat: 'Desk Lamps', name: 'LED Desk Lamp', price: 1999, mrp: 3499, desc: 'Adjustable LED lamp' },
    { cat: 'Desk Lamps', name: 'Smart Desk Lamp', price: 2999, mrp: 4999, desc: 'App-controlled smart lamp' },
    { cat: 'Phone Stands', name: 'Adjustable Phone Stand', brand: 'Portronics', price: 799, mrp: 1399, desc: 'Desktop phone stand' },
    { cat: 'Tablet Stands', name: 'Tablet Display Stand', price: 1199, mrp: 1999, desc: 'iPad/tablet stand' },
    { cat: 'Storage Organizers', name: 'Closet Storage Organizer', price: 2499, mrp: 4299, desc: 'Closet organization system' },
    { cat: 'Key Holders', name: 'Decorative Key Holder', price: 499, mrp: 899, desc: 'Wall-mounted key holder' },
    { cat: 'LED Accessories', name: 'RGB LED Lights', price: 1299, mrp: 2299, desc: 'RGB decorative lights' },
  ];

  const fashionAccessories = [
    { cat: 'Belts', name: 'Leather Casual Belt', brand: 'Levis', price: 999, mrp: 1799, desc: 'Classic leather belt' },
    { cat: 'Belts', name: 'Formal Dress Belt', brand: 'Van Heusen', price: 1299, mrp: 2199, desc: 'Premium formal belt' },
    { cat: 'Caps', name: 'Baseball Cap', price: 499, mrp: 899, desc: 'Classic baseball cap' },
    { cat: 'Hats', name: 'Beanie Hat', price: 599, mrp: 1099, desc: 'Warm wool beanie' },
    { cat: 'Scarves', name: 'Silk Scarf', brand: 'Monsoon', price: 1699, mrp: 2999, desc: 'Premium silk scarf' },
    { cat: 'Gloves', name: 'Winter Leather Gloves', price: 1299, mrp: 2199, desc: 'Warm leather gloves' },
    { cat: 'Bracelets', name: 'Metal Beaded Bracelet', price: 799, mrp: 1399, desc: 'Metal beaded design' },
    { cat: 'Rings', name: 'Silver Statement Ring', price: 1499, mrp: 2499, desc: 'Premium silver ring' },
    { cat: 'Necklaces', name: 'Chain Pendant Necklace', price: 1299, mrp: 2299, desc: 'Gold chain necklace' },
    { cat: 'Earrings', name: 'Gold Stud Earrings', price: 2499, mrp: 4299, desc: 'Premium gold studs' },
    { cat: 'Hair Accessories', name: 'Hair Clip Set', price: 399, mrp: 699, desc: 'Decorative hair clips' },
    { cat: 'Ties', name: 'Silk Formal Tie', brand: 'Van Heusen', price: 799, mrp: 1499, desc: 'Premium silk tie' },
    { cat: 'Bow Ties', name: 'Silk Bow Tie', brand: 'Van Heusen', price: 599, mrp: 1099, desc: 'Formal silk bow tie' },
    { cat: 'Socks', name: 'Compression Socks', price: 799, mrp: 1299, desc: 'Compression athletic socks' },
    { cat: 'Keychains', name: 'Leather Keychain', brand: 'Fossil', price: 699, mrp: 1299, desc: 'Premium leather keychain' },
  ];

  const sportsAccessories = [
    { cat: 'Sports Bags', name: 'Gym Duffel Bag', brand: 'Adidas', price: 2499, mrp: 4299, desc: 'Large gym duffel' },
    { cat: 'Gym Gloves', name: 'Weightlifting Gloves', brand: 'Decathlon', price: 799, mrp: 1399, desc: 'Padded gym gloves' },
    { cat: 'Water Bottles', name: 'Sports Water Bottle', brand: 'Decathlon', price: 699, mrp: 1199, desc: 'Durable sports bottle' },
    { cat: 'Sports Watches', name: 'Running Sports Watch', brand: 'Garmin', price: 8999, mrp: 12999, desc: 'GPS running watch' },
    { cat: 'Fitness Accessories', name: 'Fitness Tracker', brand: 'Fitbit', price: 5999, mrp: 8999, desc: 'Activity fitness tracker' },
    { cat: 'Yoga Accessories', name: 'Yoga Mat', price: 1499, mrp: 2499, desc: 'Premium yoga mat' },
    { cat: 'Running Accessories', name: 'Running Belt', brand: 'Decathlon', price: 599, mrp: 999, desc: 'Waist running belt' },
    { cat: 'Cycling Accessories', name: 'Bicycle Lock', price: 1299, mrp: 2299, desc: 'Heavy-duty bike lock' },
  ];

  // Combine all accessories
  const allAccessories = [
    ...accessoryData,
    ...mobileAccessories,
    ...computerAccessories,
    ...gamingAccessories,
    ...audioAccessories,
    ...wearableAccessories,
    ...travelAccessories,
    ...homeAccessories,
    ...fashionAccessories,
    ...sportsAccessories
  ];

  // Generate product objects with all required fields
  allAccessories.forEach((item, idx) => {
    const product = {
      id: `acc${productId++}`,
      name: item.name,
      brand: item.brand || 'Alibaba Brand',
      category: 'Accessories',
      subcategory: item.cat,
      price: item.price,
      originalPrice: item.mrp,
      discount: Math.round((1 - item.price / item.mrp) * 100),
      rating: (3.5 + (Math.random() * 1.4)).toFixed(1),
      reviews: Math.floor(Math.random() * 1500) + 50,
      stock: Math.floor(Math.random() * 30) + 1,
      badge: idx % 7 === 0 ? 'Best Seller' : (idx % 11 === 0 ? 'Deal' : (idx % 13 === 0 ? 'New' : '')),
      featured: idx % 19 === 0,
      deal: idx % 5 === 0,
      bestSeller: idx % 9 === 0,
      tag: item.cat,
      image: `https://picsum.photos/seed/acc${productId}/900/600?random=${Math.random()}`,
      images: [
        `https://picsum.photos/seed/acc${productId}a/900/600`,
        `https://picsum.photos/seed/acc${productId}b/900/600`,
        `https://picsum.photos/seed/acc${productId}c/900/600`,
        `https://picsum.photos/seed/acc${productId}d/900/600`
      ],
      description: item.desc,
      highlights: ['Premium Quality', 'Durable Design', 'Long Lasting'],
      specifications: {
        Brand: item.brand || 'Alibaba Brand',
        Material: ['Genuine', 'Premium', 'High-Grade'][Math.floor(Math.random() * 3)],
        Color: ['Black', 'White', 'Blue', 'Silver', 'Gold'][Math.floor(Math.random() * 5)],
        Warranty: '1 year',
        Compatibility: 'Universal'
      },
      offers: [
        { title: 'Bank Offer', description: `${Math.floor(Math.random() * 10) + 5}% instant discount`, action: 'View Details' }
      ],
      benefits: ['Free Delivery', 'Easy Returns', 'Warranty', 'Secure Payment'],
      delivery: { free: true, estimated: '2-4 business days', charge: 0, location: 'Maharashtra' },
      variants: { color: ['Black', 'White', 'Silver'] },
      variantStates: [],
      reviewsData: [{ name: 'User', rating: 5, title: 'Excellent', text: 'Very satisfied with the product', verified: true }],
      questions: [],
      tags: [item.cat.toLowerCase(), 'accessory', 'premium']
    };
    products.push(product);
  });

  return products;
}

// Initialize products
const ACCESSORIES_DATA = generateAccessoriesCollection();

// State management
const ASTATE = {
  query: '',
  category: null,
  subcategory: null,
  brand: null,
  priceRange: [0, 100000],
  rating: 0,
  sort: 'featured',
  page: 1,
  perPage: 24,
  items: ACCESSORIES_DATA
};

// Filter and sort logic
function filterAndSortAccessories() {
  let items = ASTATE.items.slice();
  
  if (ASTATE.query) {
    const q = ASTATE.query.toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }
  
  if (ASTATE.category) {
    items = items.filter(p => p.subcategory === ASTATE.category);
  }
  
  if (ASTATE.subcategory) {
    items = items.filter(p => p.subcategory === ASTATE.subcategory);
  }
  
  if (ASTATE.brand) {
    items = items.filter(p => p.brand === ASTATE.brand);
  }
  
  items = items.filter(p => p.price >= ASTATE.priceRange[0] && p.price <= ASTATE.priceRange[1]);
  
  if (ASTATE.rating > 0) {
    items = items.filter(p => p.rating >= ASTATE.rating);
  }
  
  // Sorting
  switch (ASTATE.sort) {
    case 'price-asc':
      items.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      items.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      items.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      items.sort((a, b) => b.discount - a.discount);
      break;
    case 'newest':
      items = items.reverse();
      break;
    case 'best-selling':
      items.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      break;
  }
  
  return items;
}

// Render product card
function accessoryProductCard(p) {
  return `
  <article class="product-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View details for ${p.name}">
    <button class="wishlist-btn" type="button" aria-label="Add to wishlist">
      <i class="fa-regular fa-heart"></i>
    </button>
    <img src="${p.image}" alt="${p.name}" loading="lazy" />
    <div class="product-body">
      <span class="tag">${p.badge || ''}</span>
      <h4>${p.name}</h4>
      <p class="brand" style="font-size:0.85rem;color:var(--muted)">${p.brand}</p>
      <div class="meta">
        <span>₹${p.price.toLocaleString('en-IN')}</span>
        <span>★ ${p.rating}</span>
      </div>
      <p style="font-size:0.75rem;color:var(--muted)">${p.reviews} reviews</p>
      ${p.discount ? `<p style="font-size:0.8rem;color:#ff6b6b">${p.discount}% OFF</p>` : ''}
      <div class="product-actions">
        <button type="button" class="btn-ripple quickview" data-id="${p.id}">Quick View</button>
        <button type="button" class="btn-ripple add-cart" data-id="${p.id}">Add</button>
      </div>
    </div>
  </article>`;
}

// Render products
function renderAccessoryProducts() {
  const grid = document.getElementById('accessoryProductsGrid');
  if (!grid) return;
  
  const all = filterAndSortAccessories();
  const per = parseInt(document.getElementById('perPage')?.value || ASTATE.perPage, 10);
  const pages = Math.max(1, Math.ceil(all.length / per));
  if (ASTATE.page > pages) ASTATE.page = pages;
  
  const start = (ASTATE.page - 1) * per;
  const pageItems = all.slice(start, start + per);
  
  grid.innerHTML = pageItems.map(accessoryProductCard).join('');
  attachAccessoryHandlers();
  renderAccessoryPagination(pages);
  
  // Update result count
  const resultText = document.getElementById('resultCount');
  if (resultText) {
    resultText.textContent = `Showing ${pageItems.length} of ${all.length} products`;
  }
}

// Pagination
function renderAccessoryPagination(pages) {
  const wrap = document.getElementById('accessoryPagination');
  if (!wrap) return;
  wrap.innerHTML = '';
  
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = 'btn-ripple';
    btn.textContent = i;
    if (i === ASTATE.page) {
      btn.style.background = 'linear-gradient(135deg,var(--accent),var(--accent-2))';
    }
    btn.addEventListener('click', () => {
      ASTATE.page = i;
      renderAccessoryProducts();
      document.getElementById('accessoryProductsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    wrap.appendChild(btn);
  }
}

// Event handlers
function attachAccessoryHandlers() {
  // Wishlist
  document.querySelectorAll('#accessoryProductsGrid .wishlist-btn').forEach(btn => {
    btn.onclick = (e) => {
      const art = btn.closest('.product-card');
      const id = art?.dataset.id;
      toggleWishlist(id, btn);
      e.stopPropagation();
    };
  });
  
  // Quick view and product click
  document.querySelectorAll('#accessoryProductsGrid .product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        window.location.href = buildProductLink(card.dataset.id);
      }
    });
  });
}

// Initialize
function initAccessories() {
  renderAccessoryProducts();
  setupAccessoryFilters();
  setupAccessorySearch();
}

// Setup filters
function setupAccessoryFilters() {
  // Category filter
  const catFilter = document.getElementById('filterCategory');
  if (catFilter) {
    const uniqueCats = [...new Set(ACCESSORIES_DATA.map(p => p.subcategory))].sort();
    catFilter.innerHTML = uniqueCats.map(c => `
      <div>
        <label>
          <input type="radio" name="acat" value="${c}" />
          ${c}
        </label>
      </div>
    `).join('');
    
    catFilter.querySelectorAll('input[name="acat"]').forEach(i => {
      i.addEventListener('change', (e) => {
        ASTATE.category = e.target.value;
        ASTATE.page = 1;
        renderAccessoryProducts();
      });
    });
  }
  
  // Brand filter
  const brandFilter = document.getElementById('filterBrand');
  if (brandFilter) {
    const uniqueBrands = [...new Set(ACCESSORIES_DATA.map(p => p.brand))].sort().slice(0, 10);
    brandFilter.innerHTML = uniqueBrands.map(b => `
      <div>
        <label>
          <input type="checkbox" name="abrand" value="${b}" />
          ${b}
        </label>
      </div>
    `).join('');
    
    brandFilter.querySelectorAll('input[name="abrand"]').forEach(i => {
      i.addEventListener('change', () => {
        const vals = Array.from(document.querySelectorAll('input[name="abrand"]:checked')).map(x => x.value);
        ASTATE.brand = vals.length ? vals[0] : null;
        ASTATE.page = 1;
        renderAccessoryProducts();
      });
    });
  }
  
  // Price range
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (priceMin && priceMax) {
    const applyPrice = () => {
      const min = parseInt(priceMin.value) || 0;
      const max = parseInt(priceMax.value) || 100000;
      ASTATE.priceRange = [min, max];
      ASTATE.page = 1;
      renderAccessoryProducts();
    };
    priceMin.addEventListener('change', applyPrice);
    priceMax.addEventListener('change', applyPrice);
  }
  
  // Rating filter
  const ratingFilter = document.getElementById('filterRating');
  if (ratingFilter) {
    ratingFilter.querySelectorAll('input[name="arating"]').forEach(i => {
      i.addEventListener('change', (e) => {
        ASTATE.rating = parseFloat(e.target.value) || 0;
        ASTATE.page = 1;
        renderAccessoryProducts();
      });
    });
  }
  
  // Sort
  const sortSelect = document.getElementById('accessorySort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      ASTATE.sort = e.target.value;
      ASTATE.page = 1;
      renderAccessoryProducts();
    });
  }
  
  // Per page
  const perPageSelect = document.getElementById('perPage');
  if (perPageSelect) {
    perPageSelect.addEventListener('change', (e) => {
      ASTATE.perPage = parseInt(e.target.value);
      ASTATE.page = 1;
      renderAccessoryProducts();
    });
  }
  
  // Clear filters
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    ASTATE.query = '';
    ASTATE.category = null;
    ASTATE.brand = null;
    ASTATE.priceRange = [0, 100000];
    ASTATE.rating = 0;
    ASTATE.sort = 'featured';
    ASTATE.page = 1;
    
    document.getElementById('accessorySearch').value = '';
    document.querySelectorAll('input[name="acat"], input[name="abrand"], input[name="arating"]').forEach(i => i.checked = false);
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    document.getElementById('accessorySort').value = 'featured';
    
    renderAccessoryProducts();
  });
}

// Setup search
function setupAccessorySearch() {
  const searchInput = document.getElementById('accessorySearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      ASTATE.query = e.target.value;
      ASTATE.page = 1;
      renderAccessoryProducts();
    });
  }
}

// Helper functions
function toggleWishlist(id, btn) {
  if (!id) return;
  const key = 'NEXORA.SHOP-wishlist';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  const idx = list.indexOf(id);
  if (idx >= 0) {
    list.splice(idx, 1);
    btn.classList.remove('active');
    btn.querySelector('i')?.classList.replace('fa-solid', 'fa-regular');
  } else {
    list.push(id);
    btn.classList.add('active');
    btn.querySelector('i')?.classList.replace('fa-regular', 'fa-solid');
  }
  localStorage.setItem(key, JSON.stringify(list));
}

function buildProductLink(id) {
  return `product-details.html?id=${id}`;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessories);
} else {
  initAccessories();
}

// Product detail support
window.getAccessoryProduct = (id) => {
  return ACCESSORIES_DATA.find(p => p.id === id);
};

// Make products available globally
window.ACCESSORIES_DATA = ACCESSORIES_DATA;
