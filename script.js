/* ==========================================================================
   RHEA FINANCE — clone behavior (vanilla JS, no dependencies)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     POOL DATA — matches the reference screenshots
  ------------------------------------------------------------------ */
  const pools = [
    { pair: ['near', 'usdt'], name: 'NEAR-USDt', fee: null, type: 'ALMM', apy: '412.57%', vol: '$2.55M' },
    { pair: ['near', 'usdc'], name: 'NEAR-USDC', fee: null, type: 'ALMM', apy: '238.76%', vol: '$2.08M' },
    { pair: ['rhea', 'near'], name: 'RHEA-NEAR', fee: '0.30%', type: 'AMM', apy: '118.85%', vol: '$2.09M' },
    { pair: ['usdc', 'near'], name: 'USDC-NEAR', fee: '0.30%', type: 'AMM', apy: '36.08%', vol: '$950.09K' },
    { pair: ['usdt', 'usdc'], name: 'USDt-USDC-USDT.e-USDC.e', fee: null, type: 'ALMM', apy: '18.93%', vol: '$11.13K' },
    { pair: ['frax', 'near'], name: 'FRAX-NEAR', fee: '0.30%', type: 'AMM', apy: '8.28%', vol: '$25.27K' },
    { pair: ['near', 'usdt'], name: 'NEAR-USDt', fee: '0.01%', type: 'CLMM', apy: '0%', vol: '$5.99K', tooltip: true },
    { pair: ['zec', 'usdc'], name: 'ZEC-USDC', fee: '1.00%', type: 'CLMM', apy: '0%', vol: '$531.74', tooltip: true },
    { pair: ['near', 'usdc'], name: 'NEAR-USDC', fee: '0.01%', type: 'CLMM', apy: '0%', vol: '$4.34M', tooltip: true },
    { pair: ['near', 'zec'], name: 'NEAR-ZEC', fee: '0%', type: 'AMM', apy: '0%', vol: '$856.77K' },
  ];

  const coinImages = { near: 'img/NEARIcon.png', usdc: 'img/usdc.png', usdt: 'img/USDT_Logo.png', rhea: 'img/rheaicon.png', frax: 'img/FRAX.png', zec: 'img/ZEC.png' };

  function coinPairHTML(pair) {
    return `<span class="coin-pair">
      <img src="${coinImages[pair[0]]}" class="coin coin-${pair[0]}" alt="${pair[0]}">
      <img src="${coinImages[pair[1]]}" class="coin coin-${pair[1]}" alt="${pair[1]}">
    </span>`;
  }

  function apyBlockHTML(pool) {
    return `
      <span class="apy-value">${pool.apy}${pool.tooltip ? ' <i class="ri-question-line"></i>' : ''}</span>
      <span class="apy-tag">1x <i class="ri-checkbox-circle-fill"></i></span>
    `;
  }

  /* ---- Desktop table rows ---- */
  const poolsBody = document.getElementById('poolsBody');
  if (poolsBody) {
    poolsBody.innerHTML = pools.map(pool => `
      <div class="pools-row">
        <div class="col-market">
          ${coinPairHTML(pool.pair)}
          <div>
            <div class="market-name">${pool.name}</div>
            ${pool.fee ? `<div class="market-fee">Fee Tiers ${pool.fee}</div>` : ''}
          </div>
        </div>
        <div class="col-type"><span class="market-type-badge">${pool.type}</span></div>
        <div class="col-apy">${apyBlockHTML(pool)}</div>
        <div class="col-vol">${pool.vol}</div>
        <div class="col-action"><button class="btn-deposit connect-button">Deposit</button></div>
      </div>
    `).join('');
  }

  /* ---- Mobile stacked cards ---- */
  const poolsCards = document.getElementById('poolsCards');
  if (poolsCards) {
    poolsCards.innerHTML = pools.map(pool => `
      <div class="pool-card">
        <div class="pool-card-head">
          <div class="col-market">
            ${coinPairHTML(pool.pair)}
            <div>
              <div class="market-name">${pool.name}</div>
              ${pool.fee ? `<div class="pool-card-fee">Fee Tiers ${pool.fee}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="pool-card-row"><span>Type</span><span class="value">${pool.type}</span></div>
        <div class="pool-card-row"><span>APY</span><span class="value">
          <span class="apy-tag">1x <i class="ri-checkbox-circle-fill"></i></span> ${pool.apy}${pool.tooltip ? ' <i class="ri-question-line"></i>' : ''}
        </span></div>
        <div class="pool-card-row"><span>Volume(24h)</span><span class="value">${pool.vol}</span></div>
        <button class="btn-deposit connect-button">Deposit</button>
      </div>
    `).join('');
  }

  /* ------------------------------------------------------------------
     TRADE DROPDOWN (desktop sidebar)
  ------------------------------------------------------------------ */
  const tradeTrigger = document.getElementById('tradeTrigger');
  const tradeSub = document.getElementById('tradeSub');
  if (tradeTrigger && tradeSub) {
    tradeSub.classList.add('open');
    tradeTrigger.setAttribute('aria-expanded', 'true');
    tradeTrigger.addEventListener('click', () => {
      const isOpen = tradeSub.classList.toggle('open');
      tradeTrigger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ------------------------------------------------------------------
     SIDEBAR COLLAPSE (desktop)
  ------------------------------------------------------------------ */
  const collapseBtn = document.getElementById('collapseBtn');
  const sidebar = document.getElementById('sidebar');
  const appShell = document.getElementById('appShell');
  if (collapseBtn && sidebar && appShell) {
    collapseBtn.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('collapsed');
      if (collapsed) {
        sidebar.style.width = '76px';
        appShell.style.marginLeft = '76px';
        document.querySelectorAll('.nav-label, .brand-name').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.dropdown-chevron, .tag-new').forEach(el => el.style.display = 'none');
        tradeSub && tradeSub.classList.remove('open');
        const footer = document.querySelector('.app-footer');
        if (footer) footer.style.left = '76px';
        collapseBtn.querySelector('i').className = 'ri-arrow-right-double-line';
      } else {
        sidebar.style.width = '';
        appShell.style.marginLeft = '';
        document.querySelectorAll('.nav-label, .brand-name').forEach(el => el.style.display = '');
        document.querySelectorAll('.dropdown-chevron, .tag-new').forEach(el => el.style.display = '');
        const footer = document.querySelector('.app-footer');
        if (footer) footer.style.left = '';
        collapseBtn.querySelector('i').className = 'ri-arrow-left-double-line';
      }
    });
  }

  /* ------------------------------------------------------------------
     HERO CAROUSEL
  ------------------------------------------------------------------ */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let carouselTimer;

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(nextSlide, 6000);
  }

  if (slides.length) {
    goToSlide(0);
    startCarousel();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startCarousel();
      });
    });
  }

  /* ------------------------------------------------------------------
     SWAP DIRECTION TOGGLE
  ------------------------------------------------------------------ */
  const swapDirectionBtn = document.getElementById('swapDirectionBtn');
  if (swapDirectionBtn) {
    swapDirectionBtn.addEventListener('click', () => {
      const fields = document.querySelectorAll('.swap-field');
      if (fields.length === 2) {
        const sellSelect = fields[0].querySelector('.token-select').innerHTML;
        const buySelect = fields[1].querySelector('.token-select').innerHTML;
        fields[0].querySelector('.token-select').innerHTML = buySelect;
        fields[1].querySelector('.token-select').innerHTML = sellSelect;
      }
      swapDirectionBtn.style.transform = 'rotate(180deg)';
      setTimeout(() => { swapDirectionBtn.style.transform = ''; }, 200);
    });
  }

  /* ------------------------------------------------------------------
     MOBILE SLIDE-IN NAV
  ------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  function openMobileNav() {
    mobileNavPanel.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNavFn() {
    mobileNavPanel.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (closeMobileNav) closeMobileNav.addEventListener('click', closeMobileNavFn);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNavFn);

  /* ------------------------------------------------------------------
     MOBILE NAV ACCORDION GROUPS
  ------------------------------------------------------------------ */
  document.querySelectorAll('.mnav-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.mnav-group');
      group.classList.toggle('open');
    });
  });

  /* ------------------------------------------------------------------
     PAGINATION (visual only — single page of data)
  ------------------------------------------------------------------ */
  const pagePrev = document.getElementById('pagePrev');
  const pageNext = document.getElementById('pageNext');
  [pagePrev, pageNext].forEach(btn => {
    if (btn) btn.addEventListener('click', () => { /* single page — no-op for now */ });
  });

});
