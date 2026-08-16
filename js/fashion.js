// fashion.js - integrates with existing site scripts and styles
// Reuse existing classes and DOM structure from style.css + script.js

const FASHION_PRODUCTS = [];
const FASHION_CATEGORIES = ['Men','Women','Kids','Footwear','Bags','Watches','Jewellery','Accessories','Sportswear','Ethnic Wear','Western Wear','Winter Wear'];
const BRANDS = ['Aliba','Modo','Urbanic','Velluto','CoutureLab','Astra'];
const SIZES_CLOTH = ['XS','S','M','L','XL','XXL','XXXL'];
const SIZES_SHOE = ['6','7','8','9','10','11','12'];
const COLORS = ['Black','White','Red','Blue','Green','Yellow','Pink','Brown','Grey'];

// Generate demo fashion products (keeps data structure compatible with site)
function generateFashionProducts(count=32){
  const out=[];
  for(let i=1;i<=count;i++){
    const category = FASHION_CATEGORIES[i % FASHION_CATEGORIES.length];
    const gender = (i%3===0)?'Kids':(i%2===0?'Women':'Men');
    const brand = BRANDS[i % BRANDS.length];
    const price = Math.round(299 + (i*13) % 4500);
    const discount = [0,5,10,15,20,30,40][i%7];
    const original = discount? Math.round(price/(1-discount/100)) : price + 200;
    const rating = +(3 + (i%20)/5).toFixed(1);
    const reviews = (i*7)%500;
    const sizes = category.toLowerCase().includes('footwear')? SIZES_SHOE.slice(0,4) : SIZES_CLOTH.slice(0,5);
    const colors = [COLORS[i%COLORS.length], COLORS[(i+2)%COLORS.length]];
    const badge = (i%11===0)?'Best Seller':(i%7===0?'New':(discount>=30?'Sale':''));
    out.push({
      id:`f${i}`,
      name:`${brand} ${category} Style ${i}`,
      brand,category,subcategory:category,gender,
      price,originalPrice:original,discount,rating,reviews,sizes,colors,
      image:`https://picsum.photos/seed/fashion${i}/900/600`,
      badge,stock: Math.max(0, (i*3)%60)
    });
  }
  return out;
}

// Render categories grid reusing .category-card
function renderFashionCategories(){
  const container = document.getElementById('fashionCategoryGrid');
  if(!container) return;
  container.innerHTML = FASHION_CATEGORIES.map(cat=>`
    <article class="category-card" role="button" tabindex="0" data-cat="${cat}">
      <h3>${cat}</h3>
      <ul>${['Shop','New','Best'].map(x=>`<li>${x}</li>`).join('')}</ul>
    </article>
  `).join('');
  container.querySelectorAll('.category-card').forEach(card=>{
    card.addEventListener('click',()=>{ document.getElementById('fashionSort').value='featured'; applyFashionFilter({category:card.dataset.cat}); scrollToTopOfListing();});
  });
}

function scrollToTopOfListing(){document.getElementById('fashionProductsGrid')?.scrollIntoView({behavior:'smooth',block:'start'})}

// Render product card using existing markup to reuse CSS
function fashionProductCard(p){
  return `
  <article class="product-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View details for ${p.name}">
    <button class="wishlist-btn" type="button" aria-label="Add to wishlist">
      <i class="fa-regular fa-heart"></i>
    </button>
    <img src="${p.image}" alt="${p.name}" loading="lazy" />
    <div class="product-body">
      <span class="tag">${p.badge || ''}</span>
      <h4>${p.name}</h4>
      <div class="meta"><span>₹${p.price}</span><span>★ ${p.rating}</span></div>
      <div class="product-actions">
        <button type="button" class="btn-ripple quickview" data-id="${p.id}">Quick View</button>
        <button type="button" class="btn-ripple add-cart" data-id="${p.id}">Add</button>
      </div>
      <p class="product-price">₹${p.price}</p>
    </div>
  </article>`;
}

// State and simple filtering/sorting
const FSTATE = {query:'',category:null,gender:null,size:null,color:null,brand:null,sort:'featured',page:1,perPage:24,items:[]};

function applyFashionFilter(opts={}){
  Object.assign(FSTATE,opts);
  FSTATE.page = 1;
  renderFashionProducts();
}

function filterAndSortProducts(){
  let items = FSTATE.items.slice();
  if(FSTATE.query) items = items.filter(p=> p.name.toLowerCase().includes(FSTATE.query.toLowerCase())||p.brand.toLowerCase().includes(FSTATE.query.toLowerCase()));
  if(FSTATE.category) items = items.filter(p=>p.category===FSTATE.category);
  if(FSTATE.gender) items = items.filter(p=>p.gender===FSTATE.gender);
  if(FSTATE.size) items = items.filter(p=>p.sizes.includes(FSTATE.size));
  if(FSTATE.color) items = items.filter(p=>p.colors.includes(FSTATE.color));
  if(FSTATE.brand) items = items.filter(p=>p.brand===FSTATE.brand);
  // sort
  switch(FSTATE.sort){
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'rating': items.sort((a,b)=>b.rating-a.rating); break;
    case 'discount': items.sort((a,b)=>b.discount-b.discount); break;
    case 'newest': items = items.reverse(); break;
    default: break;
  }
  return items;
}

function renderFashionProducts(){
  const grid = document.getElementById('fashionProductsGrid'); if(!grid) return;
  const all = filterAndSortProducts();
  const per = parseInt(document.getElementById('perPage')?.value || FSTATE.perPage,10);
  const pages = Math.max(1, Math.ceil(all.length / per));
  if(FSTATE.page>pages) FSTATE.page = pages;
  const start = (FSTATE.page-1)*per; const pageItems = all.slice(start, start+per);
  grid.innerHTML = pageItems.map(fashionProductCard).join('');
  attachFashionHandlers();
  renderFashionPagination(pages);
}

function renderFashionPagination(pages){
  const wrap = document.getElementById('fashionPagination'); wrap.innerHTML='';
  for(let i=1;i<=pages;i++){
    const btn = document.createElement('button'); btn.className='btn-ripple'; btn.textContent = i; if(i===FSTATE.page) btn.style.background='linear-gradient(135deg,var(--accent),var(--accent-2))';
    btn.addEventListener('click',()=>{FSTATE.page=i;renderFashionProducts()}); wrap.appendChild(btn);
  }
}

// Attach handlers for wishlist, quickview, add to cart
function attachFashionHandlers(){
  document.querySelectorAll('#fashionProductsGrid .wishlist-btn').forEach(btn=>{
    btn.onclick = (e)=>{
      const art = btn.closest('.product-card'); const id = art?.dataset.id; toggleWishlist(id, btn); e.stopPropagation();
    };
  });
  document.querySelectorAll('#fashionProductsGrid .quickview').forEach(b=>b.addEventListener('click', (e)=>{ const id = e.currentTarget.dataset.id; openFashionQuickView(id);}));
  // add-cart uses existing global handler in script.js delegated to .add-cart; nothing else required
}

// Wishlist simple reusable implementation (stores array of ids in localStorage 'wishlist')
function toggleWishlist(id, btn){
  if(!id) return;
  const key = 'NEXORA.SHOP-wishlist';
  const list = JSON.parse(localStorage.getItem(key)||'[]');
  const idx = list.indexOf(id);
  if(idx>=0){ list.splice(idx,1); btn.classList.remove('active'); btn.querySelector('i')?.classList.replace('fa-solid','fa-regular'); }
  else{ list.push(id); btn.classList.add('active'); btn.querySelector('i')?.classList.replace('fa-regular','fa-solid'); }
  localStorage.setItem(key, JSON.stringify(list));
}

// Quick view modal
let fvModal, fvDialog;
function ensureQuickView(){
  if(fvModal) return;
  fvModal = document.createElement('div'); fvModal.className='fv-modal';
  fvModal.innerHTML = `<div class="fv-dialog">
    <button class="fv-close" aria-label="Close">×</button>
    <div class="fv-grid"><div class="fv-image"><img src="" alt=""></div><div class="fv-meta"><h3></h3><p class="fv-brand"></p><p class="fv-price"></p><div class="fv-sizes"></div><div class="fv-colors"></div><div style="margin-top:12px"><button class="btn-primary fv-add">Add to Cart</button></div></div></div>
  </div>`;
  document.body.appendChild(fvModal);
  fvDialog = fvModal.querySelector('.fv-dialog');
  fvModal.addEventListener('click',(e)=>{ if(e.target===fvModal) closeFashionQuickView(); });
  fvModal.querySelector('.fv-close').addEventListener('click', closeFashionQuickView);
}
function openFashionQuickView(id){ ensureQuickView(); const product = FSTATE.items.find(x=>x.id===id); if(!product) return; fvModal.classList.add('show'); fvModal.querySelector('.fv-image img').src = product.image; fvModal.querySelector('.fv-image img').alt = product.name; fvModal.querySelector('h3').textContent = product.name; fvModal.querySelector('.fv-brand').textContent = product.brand; fvModal.querySelector('.fv-price').textContent = `₹${product.price}  `; const sizes = fvModal.querySelector('.fv-sizes'); sizes.innerHTML = product.sizes.map(s=>`<button class="filter-pill" data-size="${s}">${s}</button>`).join(''); const colors = fvModal.querySelector('.fv-colors'); colors.innerHTML = product.colors.map(c=>`<button class="filter-pill" data-color="${c}">${c}</button>`).join(''); fvModal.querySelector('.fv-add').onclick = ()=>{ document.querySelector('.cart-count').textContent = String(Number(document.querySelector('.cart-count').textContent||'0')+1); closeFashionQuickView(); } }
function closeFashionQuickView(){ fvModal?.classList.remove('show'); }

// Wire filters UI
function wireFilters(){
  document.getElementById('fashionSearch')?.addEventListener('input', (e)=>{ FSTATE.query = e.target.value; applyFashionFilter(); });
  document.getElementById('fashionSort')?.addEventListener('change',(e)=>{ FSTATE.sort = e.target.value; applyFashionFilter(); });
  document.getElementById('perPage')?.addEventListener('change',(e)=>{ FSTATE.perPage = Number(e.target.value); renderFashionProducts(); });
  // categories
  const fc = document.getElementById('filterCategory'); if(fc){ fc.innerHTML = FASHION_CATEGORIES.map(c=>`<div><label><input type="radio" name="fcat" value="${c}">${c}</label></div>`).join(''); fc.querySelectorAll('input[name="fcat"]').forEach(i=>i.addEventListener('change',e=>{ FSTATE.category = e.target.value; applyFashionFilter(); })); }
  const fg = document.getElementById('filterGender'); if(fg){ fg.innerHTML = ['Men','Women','Kids'].map(g=>`<div><label><input type="radio" name="fgen" value="${g}">${g}</label></div>`).join(''); fg.querySelectorAll('input[name="fgen"]').forEach(i=>i.addEventListener('change',e=>{ FSTATE.gender = e.target.value; applyFashionFilter(); })); }
  const fs = document.getElementById('filterSize'); if(fs){ fs.innerHTML = SIZES_CLOTH.map(s=>`<button class="filter-pill" data-size="${s}">${s}</button>`).join(''); fs.querySelectorAll('.filter-pill').forEach(b=>b.addEventListener('click',()=>{ const s = b.dataset.size; FSTATE.size = FSTATE.size===s?null:s; b.classList.toggle('active'); applyFashionFilter(); })); }
  const fc2 = document.getElementById('filterColor'); if(fc2){ fc2.innerHTML = COLORS.map(c=>`<button class="filter-pill" data-color="${c}">${c}</button>`).join(''); fc2.querySelectorAll('.filter-pill').forEach(b=>b.addEventListener('click',()=>{ const c = b.dataset.color; FSTATE.color = FSTATE.color===c?null:c; b.classList.toggle('active'); applyFashionFilter(); })); }
  const fb = document.getElementById('filterBrand'); if(fb){ fb.innerHTML = BRANDS.map(b=>`<div><label><input type="checkbox" name="fbrand" value="${b}">${b}</label></div>`).join(''); fb.querySelectorAll('input[name="fbrand"]').forEach(i=>i.addEventListener('change',()=>{ const vals = Array.from(document.querySelectorAll('input[name="fbrand"]:checked')).map(x=>x.value); FSTATE.brand = vals.length?vals[0]:null; applyFashionFilter(); })); }
  document.getElementById('applyFilters')?.addEventListener('click',()=>applyFashionFilter());
  document.getElementById('clearFilters')?.addEventListener('click',()=>{ FSTATE.query='';FSTATE.category=null;FSTATE.gender=null;FSTATE.size=null;FSTATE.color=null;FSTATE.brand=null; document.getElementById('fashionSearch').value=''; document.querySelectorAll('#filterCategory input, #filterGender input, #filterBrand input').forEach(i=>i.checked=false); document.querySelectorAll('.filter-pill.active').forEach(b=>b.classList.remove('active')); applyFashionFilter(); });
}

function initFashion(){
  FSTATE.items = generateFashionProducts(36);
  renderFashionCategories(); renderFashionProducts(); renderTrending(); wireFilters();
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('#fashionProductsGrid .product-card[data-id], #trendingGrid .product-card[data-id]');
  if (card && !event.target.closest('button')) {
    window.location.href = buildProductLink(card.dataset.id);
  }
});

document.addEventListener('keydown', (event) => {
  const card = event.target.closest('#fashionProductsGrid .product-card[data-id], #trendingGrid .product-card[data-id]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    window.location.href = buildProductLink(card.dataset.id);
  }
});

function renderTrending(){
  const t = document.getElementById('trendingGrid'); if(!t) return; t.innerHTML = FSTATE.items.slice(0,8).map(fashionProductCard).join(''); attachFashionHandlers(); }

window.addEventListener('DOMContentLoaded',()=>{ initFashion(); });

