// electronics.js - integrated with existing site scripts and styles
// Reuse existing markup classes and cart behavior

const E_CATEGORIES = ['Smartphones','Tablets','Laptops','Desktop Computers','Monitors','Headphones','Earbuds','Speakers','Televisions','Cameras','Smart Watches','Gaming','Keyboards','Mouse','Printers','Networking','Storage','Computer Accessories','Home Appliances','Smart Home'];
const E_BRANDS = ['TechPro','NovaWave','Astra','Soundix','PixelGear','HyperTech','Voltix','ZenCore'];
const RAM_OPTIONS_PHONE = ['4GB','6GB','8GB','12GB','16GB'];
const STORAGE_OPTIONS = ['64GB','128GB','256GB','512GB','1TB'];

let E_STATE = {query:'',category:null,brand:null,ram:null,storage:null,sort:'featured',page:1,perPage:24,items:[]};

function generateElectronics(count=40){
  const out=[];
  for(let i=1;i<=count;i++){
    const category = E_CATEGORIES[i % E_CATEGORIES.length];
    const brand = E_BRANDS[i % E_BRANDS.length];
    const price = Math.round(1999 + (i*37)%80000);
    const discount = [0,5,10,15,20,25,30,40][i%8];
    const original = discount? Math.round(price/(1-discount/100)) : price + 500;
    const rating = +(3 + (i%20)/5).toFixed(1);
    const reviews = (i*13)%1000;
    const stock = (i*5)%50;
    const ram = RAM_OPTIONS_PHONE[i%RAM_OPTIONS_PHONE.length];
    const storage = STORAGE_OPTIONS[i%STORAGE_OPTIONS.length];
    const specs = {RAM:ram,Storage:storage,Processor: 'Octa-Core',Display: '6.5 inch',Battery: '4000 mAh'};
    const badge = (i%10===0)?'Best Seller':(i%6===0?'New':(discount>=30?'Sale':''));
    out.push({id:`e${i}`,name:`${brand} ${category} Model ${i}`,brand,category,subcategory:category,price,originalPrice:original,discount,rating,reviews,stock,image:`https://picsum.photos/seed/elect${i}/900/700`,badge,specifications:specs});
  }
  return out;
}

function renderElectCategories(){
  const wrap = document.getElementById('electronicsCategoryGrid'); if(!wrap) return;
  wrap.innerHTML = E_CATEGORIES.map(cat=>`<article class="category-card" role="button" tabindex="0" data-cat="${cat}"><h3>${cat}</h3><ul><li>Shop</li><li>New</li></ul></article>`).join('');
  wrap.querySelectorAll('.category-card').forEach(c=>c.addEventListener('click',()=>{E_STATE.category=c.dataset.cat; applyEFilters(); scrollToProducts();}));
}

function scrollToProducts(){document.getElementById('electronicsProductsGrid')?.scrollIntoView({behavior:'smooth',block:'start'})}

function eProductCard(p){
  return `
  <article class="product-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View details for ${p.name}">
    <button class="wishlist-btn" type="button" aria-label="Add to wishlist">
      <i class="fa-regular fa-heart"></i>
    </button>
    <img src="${p.image}" alt="${p.name}" loading="lazy" />
    <div class="product-body">
      <span class="tag">${p.badge||''}</span>
      <h4>${p.name}</h4>
      <div class="meta"><span>${p.brand}</span><span>★ ${p.rating}</span></div>
      <div style="color:var(--muted);font-size:0.9rem;margin-top:6px">${p.specifications.Processor} • ${p.specifications.Display}</div>
      <div class="product-actions">
        <button type="button" class="btn-ripple quickview" data-id="${p.id}">Quick View</button>
        <button type="button" class="btn-ripple add-cart" data-id="${p.id}">Add</button>
      </div>
      <div class="meta" style="margin-top:6px"><span class="product-price">₹${p.price}</span><span style="text-decoration:line-through;color:var(--muted)">₹${p.originalPrice}</span><span style="color:var(--accent);font-weight:700"> ${p.discount}%</span></div>
    </div>
  </article>`;
}

function applyEFilters(){ E_STATE.page=1; renderEProducts(); }

function filterAndSortE(){
  let items = E_STATE.items.slice();
  if(E_STATE.query) items = items.filter(p=>p.name.toLowerCase().includes(E_STATE.query.toLowerCase())||p.brand.toLowerCase().includes(E_STATE.query.toLowerCase()));
  if(E_STATE.category) items = items.filter(p=>p.category===E_STATE.category);
  if(E_STATE.brand) items = items.filter(p=>p.brand===E_STATE.brand);
  if(E_STATE.ram) items = items.filter(p=>p.specifications.RAM===E_STATE.ram);
  if(E_STATE.storage) items = items.filter(p=>p.specifications.Storage===E_STATE.storage);
  switch(E_STATE.sort){
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'rating': items.sort((a,b)=>b.rating-a.rating); break;
    case 'discount': items.sort((a,b)=>b.discount-a.discount); break;
    case 'newest': items = items.reverse(); break;
    default: break;
  }
  return items;
}

function renderEProducts(){
  const grid = document.getElementById('electronicsProductsGrid'); if(!grid) return;
  const all = filterAndSortE(); const per = Number(document.getElementById('ePerPage')?.value||E_STATE.perPage); const pages = Math.max(1,Math.ceil(all.length/per)); if(E_STATE.page>pages) E_STATE.page=pages; const start=(E_STATE.page-1)*per; const pageItems = all.slice(start,start+per);
  grid.innerHTML = pageItems.map(eProductCard).join('');
  attachEHandlers(); renderEPagination(pages);
}

function renderEPagination(pages){ const wrap = document.getElementById('electronicsPagination'); wrap.innerHTML=''; for(let i=1;i<=pages;i++){ const b=document.createElement('button'); b.className='btn-ripple'; b.textContent=i; if(i===E_STATE.page) b.style.background='linear-gradient(135deg,var(--accent),var(--accent-2))'; b.addEventListener('click',()=>{E_STATE.page=i; renderEProducts()}); wrap.appendChild(b);} }

function attachEHandlers(){
  // wishlist
  document.querySelectorAll('#electronicsProductsGrid .wishlist-btn').forEach(btn=>btn.addEventListener('click', (e)=>{ const art = btn.closest('.product-card'); const id = art?.dataset.id; toggleWishlist(id, btn); e.stopPropagation(); }));
  // quickview
  document.querySelectorAll('#electronicsProductsGrid .quickview').forEach(b=>b.addEventListener('click', (e)=>{ openEQuickView(e.currentTarget.dataset.id); }));
  // add-cart uses global delegated handler in script.js
}

// wishlist reuse (localStorage key shared)
function toggleWishlist(id, btn){ if(!id) return; const key='NEXORA.SHOP-wishlist'; const list=JSON.parse(localStorage.getItem(key)||'[]'); const idx=list.indexOf(id); if(idx>=0){ list.splice(idx,1); btn.classList.remove('active'); btn.querySelector('i')?.classList.replace('fa-solid','fa-regular'); } else { list.push(id); btn.classList.add('active'); btn.querySelector('i')?.classList.replace('fa-regular','fa-solid'); } localStorage.setItem(key, JSON.stringify(list)); }

// Quick view modal reuse approach
let eModal;
function ensureEModal(){ if(eModal) return; eModal=document.createElement('div'); eModal.className='e-modal'; eModal.innerHTML = `<div class="e-dialog"><button class="e-close" aria-label="Close">×</button><div class="e-grid"><div class="e-img"><img src="" alt=""></div><div class="e-meta"><h3></h3><p class="e-brand"></p><p class="e-rating"></p><div class="e-specs"></div><div style="margin-top:12px"><button class="btn-primary e-add">Add to Cart</button><button class="btn-ripple e-buy">Buy Now</button></div></div></div></div>`; document.body.appendChild(eModal); eModal.querySelector('.e-close').addEventListener('click', closeEQuickView); eModal.addEventListener('click',(e)=>{ if(e.target===eModal) closeEQuickView(); }); }
function openEQuickView(id){ ensureEModal(); const p = E_STATE.items.find(x=>x.id===id); if(!p) return; eModal.classList.add('show'); eModal.querySelector('.e-img img').src=p.image; eModal.querySelector('.e-img img').alt=p.name; eModal.querySelector('h3').textContent=p.name; eModal.querySelector('.e-brand').textContent=p.brand; eModal.querySelector('.e-rating').textContent=`★ ${p.rating} • ${p.reviews} reviews`; eModal.querySelector('.e-specs').innerHTML = Object.entries(p.specifications).map(([k,v])=>`<div><strong>${k}:</strong> ${v}</div>`).join(''); eModal.querySelector('.e-add').onclick = ()=>{ document.querySelector('.cart-count').textContent = String(Number(document.querySelector('.cart-count').textContent||'0')+1); closeEQuickView(); }; }
function closeEQuickView(){ eModal?.classList.remove('show'); }

function wireEFilters(){ document.getElementById('electronicsSearch')?.addEventListener('input', (e)=>{ E_STATE.query = e.target.value; applyEFilters(); }); document.getElementById('electronicsSort')?.addEventListener('change', (e)=>{ E_STATE.sort = e.target.value; applyEFilters(); }); document.getElementById('ePerPage')?.addEventListener('change', (e)=>{ E_STATE.perPage = Number(e.target.value); renderEProducts(); }); const fcat=document.getElementById('eFilterCategory'); if(fcat){ fcat.innerHTML = E_CATEGORIES.map(c=>`<div><label><input type="radio" name="ecat" value="${c}">${c}</label></div>`).join(''); fcat.querySelectorAll('input[name="ecat"]').forEach(i=>i.addEventListener('change', e=>{ E_STATE.category = e.target.value; applyEFilters(); })); }
  const fb=document.getElementById('eFilterBrand'); if(fb){ fb.innerHTML = E_BRANDS.map(b=>`<div><label><input type="checkbox" name="ebrand" value="${b}">${b}</label></div>`).join(''); fb.querySelectorAll('input[name="ebrand"]').forEach(i=>i.addEventListener('change', ()=>{ const vals = Array.from(document.querySelectorAll('input[name="ebrand"]:checked')).map(x=>x.value); E_STATE.brand = vals.length?vals[0]:null; applyEFilters(); })); }
  const fram=document.getElementById('eFilterRam'); if(fram){ fram.innerHTML = RAM_OPTIONS_PHONE.map(r=>`<button class="filter-pill" data-ram="${r}">${r}</button>`).join(''); fram.querySelectorAll('.filter-pill').forEach(b=>b.addEventListener('click', ()=>{ const r=b.dataset.ram; E_STATE.ram = E_STATE.ram===r?null:r; b.classList.toggle('active'); applyEFilters(); })); }
  const fstor=document.getElementById('eFilterStorage'); if(fstor){ fstor.innerHTML = STORAGE_OPTIONS.map(s=>`<button class="filter-pill" data-storage="${s}">${s}</button>`).join(''); fstor.querySelectorAll('.filter-pill').forEach(b=>b.addEventListener('click', ()=>{ const s=b.dataset.storage; E_STATE.storage = E_STATE.storage===s?null:s; b.classList.toggle('active'); applyEFilters(); })); }
  document.getElementById('eApplyFilters')?.addEventListener('click', applyEFilters); document.getElementById('eClearFilters')?.addEventListener('click', ()=>{ E_STATE={query:'',category:null,brand:null,ram:null,storage:null,sort:'featured',page:1,perPage:24,items:E_STATE.items}; document.getElementById('electronicsSearch').value=''; document.querySelectorAll('#eFilterCategory input, #eFilterBrand input').forEach(i=>i.checked=false); document.querySelectorAll('.filter-pill.active').forEach(b=>b.classList.remove('active')); applyEFilters(); }); }

function renderTrendingElectronics(){ const t=document.getElementById('trendingElectronics'); if(!t) return; t.innerHTML = E_STATE.items.slice(0,8).map(eProductCard).join(''); document.querySelectorAll('#trendingElectronics .quickview').forEach(b=>b.addEventListener('click', (e)=>openEQuickView(e.currentTarget.dataset.id))); }

function initElectronics(){ E_STATE.items = generateElectronics(40); renderElectCategories(); renderTrendingElectronics(); renderEProducts(); wireEFilters(); }

document.addEventListener('click', (event) => {
  const card = event.target.closest('#electronicsProductsGrid .product-card[data-id], #trendingElectronics .product-card[data-id]');
  if (card && !event.target.closest('button')) {
    window.location.href = buildProductLink(card.dataset.id);
  }
});

document.addEventListener('keydown', (event) => {
  const card = event.target.closest('#electronicsProductsGrid .product-card[data-id], #trendingElectronics .product-card[data-id]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    window.location.href = buildProductLink(card.dataset.id);
  }
});

window.addEventListener('DOMContentLoaded', ()=>{ initElectronics(); });
