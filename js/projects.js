/* ─────────────────────────────────────────────────────────
   projects-core.js  —  Renderer + all interactive logic
   for the projects overview page.

   Usage in index.html:
     <script src="./projects.data.js"></script>
     <script src="../../js/projects-core.js"></script>
   ───────────────────────────────────────────────────────── */

(function () {

  /* ══════════════════════════════════════════════════════
     1. RENDER PAGE
     ══════════════════════════════════════════════════════ */
  function renderPage(d) {
    document.title = d.title;
    document.body.innerHTML = '';

    // Static decorators
    document.body.insertAdjacentHTML('afterbegin', `
      <div id="grain"></div>
      <canvas id="bg-canvas"></canvas>
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
    `);

    // Side rail
    document.body.insertAdjacentHTML('beforeend', `
      <nav id="side-rail">
        <a class="rail-item active" href="#works-section" id="rail-works">
          <div class="rail-dot"></div>
          <div class="rail-label">Works</div>
        </a>
        <div class="rail-line"></div>
        <a class="rail-item" href="#lab-section" id="rail-lab">
          <div class="rail-dot"></div>
          <div class="rail-label">The Lab</div>
        </a>
      </nav>
    `);

    // Header
    document.body.insertAdjacentHTML('beforeend', `
      <header>
        <div class="header-left">
          <a class="header-back" href="${d.backUrl || '../'}">${d.backLabel || 'Back'}</a>
          <span class="header-sep">·</span>
          <span class="header-title">Projects &amp; Lab</span>
        </div>
        <span id="count-label">— / —</span>
      </header>
    `);

    // Page content
    const pc = document.createElement('div');
    pc.className = 'page-content';
    pc.innerHTML = `
      ${renderWorksSection(d)}
      ${renderLabDivider(d)}
      ${renderLabSection(d)}
      <footer>
        <p>${d.footer?.copyright || ''}</p>
        <p>${d.footer?.tagline || ''}</p>
      </footer>
    `;
    document.body.appendChild(pc);

    // Lightbox shell
    document.body.insertAdjacentHTML('beforeend', `
      <div id="lightbox">
        <button id="lb-close"><svg viewBox="0 0 14 14"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg></button>
        <div id="lb-stage">
          <button class="lb-arrow" id="lb-prev"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
          <div id="lb-media-wrap"></div>
          <button class="lb-arrow" id="lb-next"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>
        </div>
        <div id="lb-counter"></div>
        <div id="lb-caption">
          <div id="lb-dots"></div>
          <div id="lb-title-wrap">
            <div id="lb-title"></div>
            <div id="lb-sub"></div>
            <div id="lb-desc"></div>
          </div>
        </div>
        <div id="lb-hint">← swipe or use arrow keys →</div>
      </div>
    `);
  }

  // ── Works section ──
  function renderWorksSection(d) {
    const h = d.worksHero;
    const filterBtns = (d.filters || [])
      .map(f => `<button class="filter-btn" data-filter="${f.value}">${f.label}</button>`)
      .join('');
    const cards = (d.projects || [])
      .map((p, i) => renderProjectCard(p, i))
      .join('');

    return `
      <section id="works-section">
        <div id="hero">
          <div id="hero-number">${h.number || ''}</div>
          <h1>${h.title || ''}</h1>
          <p id="hero-sub">${h.sub || ''}</p>
        </div>
        <div id="filters">
          <button class="filter-btn active" data-filter="all">All</button>
          ${filterBtns}
        </div>
        <div id="gallery-wrap">
          <div class="gallery" id="gallery">${cards}</div>
        </div>
      </section>
    `;
  }

  function renderProjectCard(p, i) {
    const imgs = (p.images || [])
      .map((img, j) => `<img src="${img.src}" alt="${img.alt || ''}"${j === 0 ? ' class="active"' : ''}>`)
      .join('');
    return `
      <a href="${p.href}" class="gallery-item" data-category="${p.category || ''}">
        <div class="project-container hover-cycle">
          <div class="image-stack">${imgs}</div>
          <div class="img-overlay"></div>
          <span class="cat-pill">${p.pill || ''}</span>
          <div class="project-info">
            <div class="project-title">${p.title || ''}</div>
            <div class="work-description">${p.desc || ''}</div>
          </div>
        </div>
      </a>
    `;
  }

  // ── Lab divider ──
  function renderLabDivider(d) {
    const l = d.labDivider || {};
    return `
      <div id="lab-divider">
        <div id="lab-divider-inner">
          <div id="lab-divider-accent"></div>
          <div id="lab-text">
            <h2>${l.title || 'The Lab.'}</h2>
            <p>${l.sub || ''}</p>
          </div>
        </div>
        <div id="lab-ghost-num">∞</div>
      </div>
    `;
  }

  // ── Lab section ──
  function renderLabSection(d) {
    const items = (d.lab || []).map(item => {
      const media = item.type === 'video'
        ? `<video src="${item.src}" autoplay muted loop playsinline></video>
           <span class="lab-vid-badge">Video</span>`
        : `<img src="${item.src}" alt="${item.title || ''}">`;
      return `
        <div class="lm-wrap">
          <div class="lab-card" data-title="${item.title || ''}" data-sub="${item.sub || ''}" data-desc="${item.desc || ''}" data-type="${item.type || 'image'}">
            ${media}
            <div class="lab-overlay"></div>
            <div class="lab-info">
              <div class="lab-title">${item.title || ''}</div>
              <div class="lab-sub">${item.sub || ''}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section id="lab-section">
        <div id="lab-grid-wrap">
          <div class="lab-masonry cols-4" id="lab-masonry">${items}</div>
        </div>
      </section>
    `;
  }

  /* ══════════════════════════════════════════════════════
     2. CURSOR
     ══════════════════════════════════════════════════════ */
  function initCursor() {
    const curDot = document.getElementById('cur-dot');
    const curRing = document.getElementById('cur-ring');
    if (!curDot || !curRing) return;
    let mX = innerWidth / 2, mY = innerHeight / 2, rX = mX, rY = mY;
    let lastMX = mX, lastMY = mY, mouseVel = 0, dotScale = 0.167, ringScale = 1;
    document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
    document.addEventListener('mouseover', e => {
      document.body.classList.toggle('hovering', !!e.target.closest('a,button'));
    });
    (function anim(t) {
      const s = Math.sqrt((mX - lastMX) ** 2 + (mY - lastMY) ** 2);
      lastMX = mX; lastMY = mY;
      mouseVel += (s - mouseVel) * 0.18;
      dotScale += (0.167 + Math.min(mouseVel * 0.055, 0.833) - dotScale) * 0.10;
      const ip = 1 + Math.sin(t * 0.0018) * 0.18, vs = 1 + Math.min(mouseVel * 0.06, 0.7);
      ringScale += ((mouseVel > 0.5 ? vs : ip) - ringScale) * 0.07;
      rX += (mX - rX) * 0.11; rY += (mY - rY) * 0.11;
      curDot.style.cssText = `left:${mX}px;top:${mY}px;transform:translate(-50%,-50%) scale(${dotScale.toFixed(3)})`;
      curRing.style.cssText = `left:${rX}px;top:${rY}px;transform:translate(-50%,-50%) scale(${ringScale.toFixed(3)})`;
      requestAnimationFrame(anim);
    })(performance.now());
  }

  /* ══════════════════════════════════════════════════════
     3. AMBIENT CANVAS
     ══════════════════════════════════════════════════════ */
  function initAmbient() {
    const cv = document.getElementById('bg-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d'); let W, H;
    const r = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    r(); window.addEventListener('resize', r);
    const orbs = [210, 190, 240, 200, 220].map(h => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: 200 + Math.random() * 350, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.12,
      h, a: 0.03 + Math.random() * 0.04,
    }));
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.h},30%,55%,${o.a})`);
        g.addColorStop(1, 'hsla(0,0%,0%,0)');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ══════════════════════════════════════════════════════
     4. SIDE RAIL
     ══════════════════════════════════════════════════════ */
  function initRail() {
    const railWorks = document.getElementById('rail-works');
    const railLab = document.getElementById('rail-lab');
    const labSection = document.getElementById('lab-section');
    if (!railWorks || !railLab || !labSection) return;
    function update() {
      const inLab = labSection.getBoundingClientRect().top < innerHeight * 0.5;
      railWorks.classList.toggle('active', !inLab);
      railLab.classList.toggle('active', inLab);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════════════════
     5. FILTERS + COUNT
     ══════════════════════════════════════════════════════ */
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const countLabel = document.getElementById('count-label');

    function updateCount() {
      const v = [...galleryItems].filter(e => !e.classList.contains('hide')).length;
      if (countLabel) countLabel.textContent = `${v} work${v !== 1 ? 's' : ''}`;
    }
    updateCount();

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        galleryItems.forEach(item => {
          const cats = item.dataset.category.split(' ');
          item.classList.toggle('hide', f !== 'all' && !cats.includes(f));
        });
        updateCount();
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     6. IMAGE FLIPBOOK
     ══════════════════════════════════════════════════════ */
  function initFlipbook() {
    document.querySelectorAll('.hover-cycle').forEach(container => {
      const imgs = container.querySelectorAll('.image-stack img');
      if (imgs.length < 2) return;
      let idx = 0, iv;
      container.addEventListener('mouseenter', () => {
        iv = setInterval(() => {
          imgs[idx].classList.remove('active');
          idx = (idx + 1) % imgs.length;
          imgs[idx].classList.add('active');
        }, 800);
      });
      container.addEventListener('mouseleave', () => {
        clearInterval(iv);
        imgs[idx].classList.remove('active');
        idx = 0; imgs[0].classList.add('active');
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     7. LAB MASONRY
     ══════════════════════════════════════════════════════ */
  function initMasonry() {
    const GAP = 3;
    function colsForGrid(grid) {
      const w = window.innerWidth;
      if (w <= 700) return 1;
      if (w <= 1100) return 2;
      for (let n = 6; n >= 1; n--) if (grid.classList.contains('cols-' + n)) return n;
      return 4;
    }
    function layoutGrid(grid) {
      const wraps = Array.from(grid.querySelectorAll(':scope > .lm-wrap'));
      if (!wraps.length) return;
      const cols = colsForGrid(grid), total = grid.offsetWidth;
      const colW = (total - GAP * (cols - 1)) / cols, colY = new Array(cols).fill(0);
      wraps.forEach(w => { w.style.width = colW + 'px'; });
      wraps.forEach((wrap, idx) => {
        const col = idx % cols;
        wrap.style.left = (col * (colW + GAP)) + 'px';
        wrap.style.top = colY[col] + 'px';
        colY[col] += wrap.offsetHeight + GAP;
      });
      grid.style.height = Math.max(...colY) - GAP + 'px';
      grid.classList.add('laid-out');
    }
    function layoutAll() { document.querySelectorAll('.lab-masonry').forEach(layoutGrid); }
    layoutAll(); requestAnimationFrame(layoutAll);
    setTimeout(layoutAll, 300); setTimeout(layoutAll, 900);
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(layoutAll, 80); });
    document.querySelectorAll('.lab-masonry img').forEach(img => { if (!img.complete) img.addEventListener('load', layoutAll); });
    document.querySelectorAll('.lab-masonry video').forEach(v => { v.addEventListener('loadedmetadata', layoutAll); v.addEventListener('canplay', layoutAll); });
  }

  /* ══════════════════════════════════════════════════════
     8. LIGHTBOX
     ══════════════════════════════════════════════════════ */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbWrap = document.getElementById('lb-media-wrap');
    const lbDots = document.getElementById('lb-dots');
    const lbTitle = document.getElementById('lb-title');
    const lbSub = document.getElementById('lb-sub');
    const lbDesc = document.getElementById('lb-desc');
    const lbCount = document.getElementById('lb-counter');
    const btnP = document.getElementById('lb-prev');
    const btnN = document.getElementById('lb-next');
    const btnC = document.getElementById('lb-close');
    const hint = document.getElementById('lb-hint');
    if (!lb) return;

    const cards = Array.from(document.querySelectorAll('.lab-masonry .lab-card'));
    const items = cards.map(c => ({
      type:  c.dataset.type || (c.querySelector('video') ? 'video' : 'image'),
      src:   (c.querySelector('video') || c.querySelector('img') || {}).src || '',
      title: c.dataset.title || '',
      sub:   c.dataset.sub || '',
      desc:  c.dataset.desc || '',
    })).filter(i => i.src);

    let cur = 0;
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'lb-dot'; d.type = 'button';
      d.addEventListener('click', e => { e.stopPropagation(); show(i); });
      lbDots.appendChild(d);
    });

    function show(i) {
      if (!items.length) return;
      cur = ((i % items.length) + items.length) % items.length;
      const item = items[cur]; lbWrap.innerHTML = '';
      let el;
      if (item.type === 'video') {
        el = document.createElement('video');
        el.src = item.src; el.autoplay = true; el.muted = true; el.loop = true;
        el.setAttribute('playsinline', '');
        el.addEventListener('canplay', () => el.classList.add('ready'), { once: true });
      } else {
        el = document.createElement('img');
        el.src = item.src; el.alt = item.title;
        el.addEventListener('load', () => el.classList.add('ready'), { once: true });
        if (el.complete) el.classList.add('ready');
      }
      lbWrap.appendChild(el);
      lbTitle.textContent = item.title; lbSub.textContent = item.sub;
      if (lbDesc) lbDesc.textContent = item.desc;
      lbCount.textContent = (cur + 1) + ' / ' + items.length;
      lbDots.querySelectorAll('.lb-dot').forEach((d, j) => d.classList.toggle('active', j === cur));
      document.body.style.overflow = 'hidden';
      lb.classList.add('open');
      setTimeout(() => hint && hint.classList.add('gone'), 2400);
    }

    function close() {
      lb.classList.remove('open'); document.body.style.overflow = '';
      setTimeout(() => { lbWrap.innerHTML = ''; }, 350);
    }

    cards.forEach((c, i) => c.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); show(i); }));
    btnP.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
    btnN.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
    btnC.addEventListener('click', e => { e.stopPropagation(); close(); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'Escape') close();
    });
    let tx = 0;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) show(dx < 0 ? cur + 1 : cur - 1); });
  }

  /* ══════════════════════════════════════════════════════
     9. BOOT
     ══════════════════════════════════════════════════════ */
  function boot() {
    if (typeof PROJECTS_DATA === 'undefined') {
      console.error('[projects-core] PROJECTS_DATA is not defined. Load projects.data.js first.');
      return;
    }
    renderPage(PROJECTS_DATA);
    initCursor();
    initAmbient();
    initRail();
    initFilters();
    initFlipbook();
    initMasonry();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();