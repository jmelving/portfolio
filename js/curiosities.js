/* ════════════════════════════════════════════════════════
   CURIOSITIES — MAIN LOGIC
   Reads CURIOSITIES_DATA (data.js) and builds the full DOM.
   You should not need to edit this file.
   Load order in index.html:  data.js → main.js
   ════════════════════════════════════════════════════════ */

(function () {
  const D = CURIOSITIES_DATA;

  /* ── helpers ── */
  const esc = s => String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const $   = id => document.getElementById(id);

  /* ─────────────────────────────────────────────────────
     SEO / TITLE
  ───────────────────────────────────────────────────── */
  document.title = `Curiosities — ${D.site.author}`;
  const addMeta = (n, c, prop = false) => {
    const m = document.createElement('meta');
    m.setAttribute(prop ? 'property' : 'name', n);
    m.setAttribute('content', c);
    document.head.appendChild(m);
  };
  addMeta('description', `Music, 3D Printing, Game Development, ComfyUI & AI, Photography by ${D.site.author}.`);
  addMeta('author', D.site.author);
  addMeta('og:type',  'website',                          true);
  addMeta('og:title', `Curiosities | ${D.site.author}`,   true);

  /* ─────────────────────────────────────────────────────
     FILTER ENABLED SECTIONS
  ───────────────────────────────────────────────────── */
  const sections = D.sections.filter(s => s.enabled);

  /* ─────────────────────────────────────────────────────
     SIDE RAIL
  ───────────────────────────────────────────────────── */
  const rail = $('side-rail');
  sections.forEach((s, i) => {
    if (i > 0) {
      const line = document.createElement('div');
      line.className = 'rail-line';
      rail.appendChild(line);
    }
    const a = document.createElement('a');
    a.className    = 'rail-item' + (i === 0 ? ' active' : '');
    a.href         = '#' + s.id;
    a.dataset.section = s.id;
    a.innerHTML    = `<div class="rail-dot"></div><div class="rail-label">${esc(s.navLabel)}</div>`;
    rail.appendChild(a);
  });

  /* ─────────────────────────────────────────────────────
     HEADER
  ───────────────────────────────────────────────────── */
  document.querySelector('header').innerHTML = `
    <div class="header-left">
      <a class="header-back" href="${D.site.backHref}">${esc(D.site.backLabel)}</a>
      <span class="header-sep">·</span>
      <span class="header-title">Curiosities</span>
    </div>
    <span class="header-meta">Outside the Pipeline</span>`;

  /* ─────────────────────────────────────────────────────
     PAGE CONTENT
  ───────────────────────────────────────────────────── */
  const main = $('main-content');
  const html = [];

  /* ── HERO ── */
  const h = D.hero;
  html.push(`
  <section id="hero">
    <div class="hero-ghost">${h.ghostChar}</div>
    <div class="hero-eyebrow">${esc(h.eyebrow)}</div>
    <h1 class="hero-title">${esc(h.titleLine1)}<br><em>${esc(h.titleLine2)}</em></h1>
    <p class="hero-desc">${esc(h.desc)}</p>
    <div class="hero-tags">
      ${h.tags.map(t => `<span class="hero-tag">${esc(t)}</span>`).join('\n      ')}
    </div>
  </section>`);

  /* ── SECTIONS ── */
  sections.forEach(s => {

    /* chapter divider */
    html.push(`
  <div class="chapter-divider">
    <div class="chapter-inner">
      <div class="chapter-accent"></div>
      <div>
        <div class="chapter-num">${esc(s.num)}</div>
        <h2 class="chapter-title">${esc(s.titlePlain)}${s.titleItalic ? `<br><em>${esc(s.titleItalic)}</em>` : ''}</h2>
        <p class="chapter-sub">${esc(s.subtitle)}</p>
      </div>
      <div class="chapter-ghost">${s.ghostChar}</div>
    </div>
  </div>`);

    /* section open */
    html.push(`  <section class="curiosity-section" id="${s.id}" style="scroll-margin-top:74px;">`);

    /* intro paragraph */
    if (s.intro) {
      html.push(`    <p class="section-intro">${esc(s.intro)}</p>`);
    }

    /* split layout: extra text paragraphs + optional Spotify embed */
    if (s.textParagraphs && s.textParagraphs.length) {
      html.push(`    <div class="split-layout">`);
      html.push(`      <div class="split-text">`);
      s.textParagraphs.forEach(p => html.push(`        <p>${esc(p)}</p>`));
      html.push(`      </div>`);
      if (s.spotifyEmbedSrc) {
        html.push(`      <div>
        <div class="spotify-embed">
          <iframe style="border-radius:0"
            src="${s.spotifyEmbedSrc}"
            width="100%" height="352" frameBorder="0" allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"></iframe>
        </div>
      </div>`);
      } else {
        html.push(`      <div></div>`);
      }
      html.push(`    </div>`);
    }

    /* print / feature card */
    if (s.featureCard) {
      const fc = s.featureCard;
      html.push(`
    <div class="print-feature">
      <div class="print-feature-img">
        <img src="${fc.imgSrc}" alt="${esc(fc.imgAlt)}">
      </div>
      <div class="print-feature-text">
        <div class="eyebrow">${esc(fc.eyebrow)}</div>
        <h3>${esc(fc.titlePlain)}<br><em>${esc(fc.titleItalic)}</em></h3>
        <p>${esc(fc.desc)}</p>
      </div>
    </div>`);
    }

    /* stat blocks */
    if (s.stats && s.stats.length) {
      html.push(`    <div class="stat-row">`);
      s.stats.forEach(st => html.push(`
      <div class="stat-block">
        <div class="stat-num">${esc(st.num)}</div>
        <div class="stat-label">${esc(st.label)}</div>
      </div>`));
      html.push(`    </div>`);
    }

    /* game cards */
    if (s.gameCards && s.gameCards.length) {
      html.push(`    <div class="game-grid">`);
      s.gameCards.forEach(gc => html.push(`
      <div class="game-card" data-title="${esc(gc.title)}" data-sub="${esc(gc.tag)}" data-desc="${esc(gc.desc || '')}">
        <img src="${gc.imgSrc}" alt="${esc(gc.imgAlt)}">
        <div class="game-overlay"></div>
        <div class="game-info">
          <span class="game-tag">${esc(gc.tag)}</span>
          <div class="game-title">${gc.title}</div>
          <div class="game-desc">${esc(gc.desc)}</div>
        </div>
      </div>`));
      html.push(`    </div>`);
    }

    /* pull quote */
    if (s.pullQuote) {
      html.push(`
    <div class="pull-quote">
      <p>${s.pullQuote.text}</p>
      <cite>${esc(s.pullQuote.cite)}</cite>
    </div>`);
    }

    /* gallery / masonry */
    if (s.gallery && s.gallery.items && s.gallery.items.length) {
      const g = s.gallery;
      if (g.subHeading) {
        html.push(`
    <div class="sub-rule"></div>
    <div class="sub-heading">§ ${esc(g.subHeading)}</div>
    <div class="sub-title">${esc(g.subTitle)}</div>`);
      }
      html.push(`    <div class="media-masonry cols-${g.cols}">`);
      g.items.forEach(item => html.push(`
      <div class="mc-wrap">
        <div class="media-card"
          data-title="${esc(item.title)}"
          data-sub="${esc(item.sub)}"
          data-desc="${esc(item.desc || '')}">
          <img src="${item.src}" alt="${esc(item.title)}">
          <div class="mc-overlay"></div>
          <div class="mc-info">
            <div class="mc-title">${esc(item.title)}</div>
            <div class="mc-sub">${esc(item.sub)}</div>
          </div>
        </div>
        <div class="mc-label">
          <div class="mc-label-header">
            <div class="mc-label-title">${esc(item.title)}</div>
            <div class="mc-label-sub">${esc(item.sub)}</div>
          </div>
          <div class="mc-label-desc">${esc(item.desc || '')}</div>
        </div>
      </div>`));
      html.push(`    </div>`);
    }

    html.push(`  </section>`);
  });

  /* ── FOOTER ── */
  html.push(`
  <footer>
    <p>© ${esc(D.site.author)} — ${esc(D.site.year)}</p>
    <p>${esc(D.site.role)} · ${esc(D.site.location)}</p>
  </footer>`);

  main.innerHTML = html.join('\n');

  /* ─────────────────────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────────────────────── */
  const curDot  = $('cur-dot');
  const curRing = $('cur-ring');
  let mX = innerWidth / 2, mY = innerHeight / 2;
  let rX = mX, rY = mY, lastMX = mX, lastMY = mY;
  let mouseVel = 0, dotScale = 0.167, ringScale = 1;

  document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
  document.addEventListener('mouseover', e => {
    document.body.classList.toggle(
      'hovering',
      !!e.target.closest('a,button,.media-card,.game-card,.print-feature-img,.spotify-embed')
    );
  });

  (function anim(t) {
    const s = Math.sqrt((mX - lastMX) ** 2 + (mY - lastMY) ** 2);
    lastMX = mX; lastMY = mY;
    mouseVel += (s - mouseVel) * 0.18;
    dotScale += (0.167 + Math.min(mouseVel * 0.055, 0.833) - dotScale) * 0.10;
    const ip = 1 + Math.sin(t * 0.0018) * 0.18;
    const vs = 1 + Math.min(mouseVel * 0.06, 0.7);
    ringScale += ((mouseVel > 0.5 ? vs : ip) - ringScale) * 0.07;
    rX += (mX - rX) * 0.11; rY += (mY - rY) * 0.11;
    curDot.style.cssText  = `left:${mX}px;top:${mY}px;transform:translate(-50%,-50%) scale(${dotScale.toFixed(3)})`;
    curRing.style.cssText = `left:${rX}px;top:${rY}px;transform:translate(-50%,-50%) scale(${ringScale.toFixed(3)})`;
    requestAnimationFrame(anim);
  })(performance.now());

  /* ─────────────────────────────────────────────────────
     AMBIENT CANVAS
  ───────────────────────────────────────────────────── */
  (function () {
    const cv = $('bg-canvas'), ctx = cv.getContext('2d');
    let W, H;
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [210, 195, 228, 205, 218].map(hue => ({
      x:  Math.random() * innerWidth,
      y:  Math.random() * innerHeight,
      r:  260 + Math.random() * 400,
      vx: (Math.random() - .5) * 0.12,
      vy: (Math.random() - .5) * 0.10,
      h:  hue,
      a:  0.02 + Math.random() * 0.03,
    }));

    (function loop() {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;  if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;  if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.h},28%,50%,${o.a})`);
        g.addColorStop(1, 'hsla(0,0%,0%,0)');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  })();

  /* ─────────────────────────────────────────────────────
     SIDE RAIL — ACTIVE STATE ON SCROLL
  ───────────────────────────────────────────────────── */
  const railItems = document.querySelectorAll('.rail-item[data-section]');
  const sects     = Array.from(railItems)
    .map(i => document.getElementById(i.dataset.section))
    .filter(Boolean);

  function updateRail() {
    let active = sects[0];
    sects.forEach(s => {
      if (s.getBoundingClientRect().top < innerHeight * 0.5) active = s;
    });
    railItems.forEach(i => i.classList.toggle('active', i.dataset.section === active?.id));
  }
  window.addEventListener('scroll', updateRail, { passive: true });
  updateRail();

  /* ─────────────────────────────────────────────────────
     MASONRY LAYOUT
  ───────────────────────────────────────────────────── */
  (function () {
    const GAP = 3;

    function colsForGrid(grid) {
      const w = window.innerWidth;
      if (w <= 700) return 1;
      if (w <= 1200) {
        for (let n = 4; n >= 1; n--) if (grid.classList.contains('cols-' + n)) return Math.min(n, 2);
      }
      for (let n = 6; n >= 1; n--) if (grid.classList.contains('cols-' + n)) return n;
      return 3;
    }

    function layoutGrid(grid) {
      const wraps = Array.from(grid.querySelectorAll(':scope > .mc-wrap'));
      if (!wraps.length) return;
      const cols  = colsForGrid(grid);
      const total = grid.offsetWidth;
      const colW  = (total - GAP * (cols - 1)) / cols;
      const colY  = new Array(cols).fill(0);
      wraps.forEach(w => { w.style.width = colW + 'px'; });
      wraps.forEach((wrap, idx) => {
        const col = idx % cols;
        wrap.style.left = (col * (colW + GAP)) + 'px';
        wrap.style.top  = colY[col] + 'px';
        colY[col] += wrap.offsetHeight + GAP;
      });
      grid.style.height = Math.max(...colY) - GAP + 'px';
      grid.classList.add('laid-out');
    }

    function layoutAll() {
      document.querySelectorAll('.media-masonry').forEach(layoutGrid);
    }

    layoutAll();
    requestAnimationFrame(layoutAll);
    setTimeout(layoutAll, 300);
    setTimeout(layoutAll, 900);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 80);
    });

    document.querySelectorAll('.media-masonry img').forEach(img => {
      if (!img.complete) img.addEventListener('load', layoutAll);
    });
    document.querySelectorAll('.media-masonry video').forEach(v => {
      v.addEventListener('loadedmetadata', layoutAll);
      v.addEventListener('canplay', layoutAll);
    });
  })();

  /* ─────────────────────────────────────────────────────
     LIGHTBOX
  ───────────────────────────────────────────────────── */
  (function () {
    const lb    = $('lightbox');
    const lbW   = $('lb-media-wrap');
    const dots  = $('lb-dots');
    const title = $('lb-title');
    const sub   = $('lb-sub');
    const desc  = $('lb-desc');
    const count = $('lb-counter');
    const prev  = $('lb-prev');
    const next  = $('lb-next');
    const cls   = $('lb-close');

    /* collect all clickable cards */
    const allCards = Array.from(document.querySelectorAll('.media-card, .game-card'));
    const items = allCards.map(c => {
      const img = c.querySelector('img');
      const vid = c.querySelector('video');
      return {
        type:  vid ? 'video' : 'image',
        src:   vid ? (vid.src || vid.getAttribute('src')) : (img ? img.src : ''),
        title: c.dataset.title || '',
        sub:   c.dataset.sub   || '',
        desc:  c.dataset.desc  || '',
      };
    }).filter(i => i.src);

    let cur = 0;

    /* build dot strip */
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'lb-dot';
      d.type = 'button';
      d.addEventListener('click', e => { e.stopPropagation(); show(i); });
      dots.appendChild(d);
    });

    function show(i) {
      cur = ((i % items.length) + items.length) % items.length;
      const item = items[cur];
      lbW.innerHTML = '';

      let el;
      if (item.type === 'video') {
        el = document.createElement('video');
        el.src = item.src;
        el.autoplay = true;
        el.muted    = true;
        el.loop     = true;
        el.setAttribute('playsinline', '');
        el.addEventListener('canplay', () => el.classList.add('ready'), { once: true });
      } else {
        el = document.createElement('img');
        el.src = item.src;
        el.alt = item.title;
        el.addEventListener('load', () => el.classList.add('ready'), { once: true });
        if (el.complete) el.classList.add('ready');
      }

      lbW.appendChild(el);
      title.textContent = item.title;
      sub.textContent   = item.sub;
      desc.textContent  = item.desc || '';
      count.textContent = (cur + 1) + ' / ' + items.length;
      dots.querySelectorAll('.lb-dot').forEach((d, j) => d.classList.toggle('active', j === cur));
      document.body.style.overflow = 'hidden';
      lb.classList.add('open');
    }

    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lbW.innerHTML = ''; }, 350);
    }

    allCards.forEach((c, i) => c.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      show(i);
    }));

    prev.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
    next.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
    cls.addEventListener('click',  e => { e.stopPropagation(); close(); });
    lb.addEventListener('click',   e => { if (e.target === lb) close(); });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape')      { close(); return; }
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft')   show(cur - 1);
      if (e.key === 'ArrowRight')  show(cur + 1);
    });

    /* swipe support */
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) show(dx < 0 ? cur + 1 : cur - 1);
    });
  })();

})();