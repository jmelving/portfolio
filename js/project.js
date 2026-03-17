/* ─────────────────────────────────────────────────────────
   project-core.js  —  Renderer + all interactive logic

   Usage:
     1. Define PROJECT_DATA in your .data.js file (see schema below)
     2. In your HTML <head>:
          <script src="your-project.data.js"></script>
          <script src="project-core.js"></script>

   Supported section types in PROJECT_DATA.sections[]:
     { type: "text",       eyebrow, title, body }
     { type: "gallery",   cols (2|3|4), items: [{ src, title, sub, desc, type }] }
     { type: "subsection",heading, subTitle, body }
     { type: "video",     embedUrl, platform ("youtube"|"vimeo") }
     { type: "spotify",   embedUrl }
     { type: "learnings", blocks: [{ label, tag, items: [] }] }
     { type: "rule" }   — horizontal divider

   You can mix types freely and repeat them in any order.
   E.g. two galleries back-to-back, or gallery → text → gallery.
   ───────────────────────────────────────────────────────── */

(function () {
  /* ══════════════════════════════════════════════════════
     1. HELPERS
     ══════════════════════════════════════════════════════ */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function attr(e, obj) { Object.entries(obj).forEach(([k, v]) => e.setAttribute(k, v)); return e; }

  /* ══════════════════════════════════════════════════════
     2. PAGE SHELL (grain, canvas, cursor, side-rail, header,
                    page-content wrapper, video modal, lightbox)
     ══════════════════════════════════════════════════════ */
  function buildShell(data) {
    document.title = `${data.title} — ${data.author || 'Portfolio'}`;

    // Meta description
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = data.metaDescription || data.title;
    document.head.appendChild(metaDesc);

    document.body.innerHTML = '';

    // Static decorators
    document.body.insertAdjacentHTML('afterbegin', `
      <div id="grain"></div>
      <canvas id="bg-canvas"></canvas>
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
    `);

    // Side rail
    const rail = el('nav', null);
    rail.id = 'side-rail';
    const navSections = data.sections
      .filter(s => s.id && s.navLabel)
      .map((s, i) => {
        const isFirst = i === 0;
        return `<a class="rail-item${isFirst ? ' active' : ''}" href="#${s.id}" data-section="${s.id}">
          <div class="rail-dot"></div>
          <div class="rail-label">${s.navLabel}</div>
        </a><div class="rail-line"></div>`;
      }).join('');
    rail.innerHTML = navSections.replace(/<div class="rail-line"><\/div>$/, '');
    document.body.appendChild(rail);

    // Header
    const header = el('header');
    header.innerHTML = `
      <div class="header-left">
        <a class="header-back" href="${data.backUrl || '../../projects/'}">Projects</a>
        <span class="header-sep">·</span>
        <span class="header-title">${data.title}</span>
      </div>
      <span class="header-meta">${data.headerMeta || ''}</span>
    `;
    document.body.appendChild(header);

    // Page content wrapper
    const pageContent = el('div', 'page-content');
    pageContent.id = 'page-content';
    document.body.appendChild(pageContent);

    // Video modal
    document.body.insertAdjacentHTML('beforeend', `
      <div id="vimeo-modal">
        <button id="vimeo-close">✕</button>
        <div id="vimeo-wrap">
          <iframe id="vimeo-iframe" src="" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `);

    // Lightbox
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
      </div>
    `);

    return pageContent;
  }

  /* ══════════════════════════════════════════════════════
     3. SECTION RENDERERS
     ══════════════════════════════════════════════════════ */

  // ── Hero ──
  function renderHero(data, container) {
    const hero = el('section');
    hero.id = 'hero';
    if (data.hero.videoSrc) attr(hero, { 'data-video-src': data.hero.videoSrc });

    const slidesHtml = (data.hero.slides || []).map((src, i) =>
      `<div class="hero-slide${i === 0 ? ' active' : ''}" style="background-image:url('${src}')"></div>`
    ).join('');

    hero.innerHTML = `
      <video id="hero-video" autoplay muted loop playsinline></video>
      <div class="hero-slideshow" id="hero-slideshow">${slidesHtml}</div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">${data.hero.eyebrow || ''}</div>
        <h1 class="hero-title">${data.hero.title || data.title}</h1>
        <p class="hero-sub">${data.hero.sub || ''}</p>
      </div>
      <div class="hero-play-hint">
        <div class="hero-play-circle">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
        <span class="hero-play-label">${data.hero.playLabel || 'Watch'}</span>
      </div>
    `;

    if (data.hero.videoId) {
      hero.onclick = () => openVideoModal(data.hero.videoId, data.hero.platform);
    }

    container.appendChild(hero);
  }

  // ── Details bar ──
  function renderDetails(data, container) {
    const details = el('div');
    details.id = 'details';

    const items = (data.details || []).map(d => {
      const valueHtml = Array.isArray(d.value)
        ? d.value.map(v => v.href
            ? `<a href="${v.href}" target="_blank">${v.label}</a>`
            : v
          ).join('<br>')
        : d.value;

      return `<div class="detail-item">
        <div class="detail-label">${d.label}</div>
        <div class="detail-value">${valueHtml}</div>
        ${d.secondary ? `<div class="detail-secondary">${d.secondary}</div>` : ''}
      </div>`;
    }).join('');

    details.innerHTML = items;
    container.appendChild(details);
  }

  // ── Text section ──
  function renderText(section, sectionEl) {
    sectionEl.insertAdjacentHTML('beforeend', `
      <div class="section-eyebrow">${section.eyebrow || ''}</div>
      <h2 class="section-title">${section.title}</h2>
      <p class="section-body">${section.body}</p>
    `);
  }

  // ── Subsection (sub-rule + sub-heading + body) ──
  function renderSubsection(section, sectionEl) {
    sectionEl.insertAdjacentHTML('beforeend', `
      <div class="sub-rule"></div>
      ${section.heading ? `<div class="sub-heading">${section.heading}</div>` : ''}
      ${section.subTitle ? `<div class="sub-title">${section.subTitle}</div>` : ''}
      ${section.body ? `<p class="section-body" style="margin-bottom:0">${section.body}</p>` : ''}
    `);
  }

  // ── Gallery ──
  function renderGallery(section, sectionEl) {
    const cols = section.cols || 3;
    const grid = el('div', `media-masonry cols-${cols}`);

    (section.items || []).forEach(item => {
      const wrap = el('div', 'mc-wrap');
      const mediaTag = item.type === 'video'
        ? `<video src="${item.src}" autoplay muted loop playsinline></video>`
        : `<img src="${item.src}" alt="${item.title || ''}">`;

      wrap.innerHTML = `
        <div class="media-card"
          data-title="${item.title || ''}"
          data-sub="${item.sub || ''}"
          data-type="${item.type || 'image'}"
          data-desc="${item.desc || ''}">
          ${mediaTag}
          <div class="mc-overlay"></div>
          <div class="mc-info">
            <div class="mc-title">${item.title || ''}</div>
            <div class="mc-sub">${item.sub || ''}</div>
          </div>
        </div>
        <div class="mc-label">
          <div class="mc-label-title">${item.labelTitle || ''}</div>
          <div class="mc-label-sub">${item.labelSub || ''}</div>
          <div class="mc-label-desc">${item.labelDesc || ''}</div>
        </div>
      `;
      grid.appendChild(wrap);
    });

    sectionEl.appendChild(grid);
  }

  // ── Video embed ──
  function renderVideo(section, sectionEl) {
    sectionEl.insertAdjacentHTML('beforeend', `
      <div class="video-embed">
        <iframe src="${section.embedUrl}" title="${section.title || ''}" allowfullscreen></iframe>
      </div>
    `);
  }

  // ── Spotify embed ──
  function renderSpotify(section, sectionEl) {
    sectionEl.insertAdjacentHTML('beforeend', `
      <div class="spotify-embed">
        <iframe style="border-radius:0" src="${section.embedUrl}" width="100%" height="352"
          frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    `);
  }

  // ── Learnings ──
  function renderLearnings(section, sectionEl) {
    const wrap = el('div', 'learnings-wrap');
    (section.blocks || []).forEach(block => {
      const itemsHtml = (block.items || [])
        .map(i => `<div class="learning-item">${i}</div>`)
        .join('');
      const blockEl = el('div', 'learning-block');
      blockEl.innerHTML = `
        <div class="learning-block-header">
          <div class="learning-block-label">${block.label}</div>
          ${block.tag ? `<div class="learning-block-tag">${block.tag}</div>` : ''}
        </div>
        <div class="learning-block-body">${itemsHtml}</div>
      `;
      wrap.appendChild(blockEl);
    });
    sectionEl.appendChild(wrap);
  }

  // ── Rule ──
  function renderRule(sectionEl) {
    sectionEl.insertAdjacentHTML('beforeend', `<div class="sub-rule"></div>`);
  }

  // ── Dispatch ──
  function renderSectionContent(section, sectionEl) {
    switch (section.type) {
      case 'text':       renderText(section, sectionEl);       break;
      case 'subsection': renderSubsection(section, sectionEl); break;
      case 'gallery':    renderGallery(section, sectionEl);    break;
      case 'video':      renderVideo(section, sectionEl);      break;
      case 'spotify':    renderSpotify(section, sectionEl);    break;
      case 'learnings':  renderLearnings(section, sectionEl);  break;
      case 'rule':       renderRule(sectionEl);                break;
      default:
        console.warn(`[project-core] Unknown section type: "${section.type}"`);
    }
  }

  /* ══════════════════════════════════════════════════════
     4. MAIN RENDER
     ══════════════════════════════════════════════════════ */
  function renderPage(data) {
    const pageContent = buildShell(data);

    // Hero
    if (data.hero) renderHero(data, pageContent);

    // Details bar
    if (data.details && data.details.length) renderDetails(data, pageContent);

    // Sections — group consecutive non-wrapper blocks into <section> elements.
    // Each section with id/navLabel becomes its own <section>; bare content
    // blocks (gallery, rule, subsection, video, spotify, learnings) that
    // follow a "text" section are appended into that same <section>.
    let currentSection = null;
    let sectionIndex = 0;

    (data.sections || []).forEach(block => {
      const needsOwnSection = ['text'].includes(block.type) || block.id;

      if (needsOwnSection || currentSection === null) {
        currentSection = el('section', 'project-section');
        currentSection.style.scrollMarginTop = '74px';
        if (block.id) currentSection.id = block.id;

        sectionIndex++;
        if (block.eyebrow === undefined && block.type === 'text') {
          block.eyebrow = `${String(sectionIndex).padStart(2, '0')} — ${block.navLabel || ''}`;
        }

        pageContent.appendChild(currentSection);
      }

      renderSectionContent(block, currentSection);
    });

    // Footer
    const footer = el('footer');
    footer.innerHTML = `
      <p>${data.footer?.copyright || `© ${data.author || ''} — ${new Date().getFullYear()}`}</p>
      <p>${data.footer?.tagline || ''}</p>
    `;
    pageContent.appendChild(footer);
  }

  /* ══════════════════════════════════════════════════════
     5. CURSOR
     ══════════════════════════════════════════════════════ */
  function initCursor() {
    const curDot = document.getElementById('cur-dot');
    const curRing = document.getElementById('cur-ring');
    if (!curDot || !curRing) return;
    let mX = innerWidth / 2, mY = innerHeight / 2, rX = mX, rY = mY;
    let lastMX = mX, lastMY = mY, mouseVel = 0, dotScale = 0.167, ringScale = 1;
    document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
    document.addEventListener('mouseover', e => {
      document.body.classList.toggle('hovering', !!e.target.closest('a,button,#hero,.media-card,.video-embed'));
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
     6. AMBIENT CANVAS
     ══════════════════════════════════════════════════════ */
  function initAmbient() {
    const cv = document.getElementById('bg-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H;
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const orbs = [210, 195, 228, 205, 218].map(h => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: 260 + Math.random() * 400, vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.10, h, a: 0.02 + Math.random() * 0.03
    }));
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.h},28%,50%,${o.a})`);
        g.addColorStop(1, 'hsla(0,0%,0%,0)');
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ══════════════════════════════════════════════════════
     7. HERO — video/slideshow
     ══════════════════════════════════════════════════════ */
  function initHero() {
    const hero = document.getElementById('hero');
    const vid = document.getElementById('hero-video');
    const ss = document.getElementById('hero-slideshow');
    if (!hero) return;
    const src = (hero.dataset.videoSrc || '').trim();
    if (src) {
      vid.src = src; vid.classList.add('active'); if (ss) ss.style.display = 'none';
    } else {
      if (vid) vid.style.display = 'none';
      if (ss) {
        const slides = ss.querySelectorAll('.hero-slide');
        let i = 0;
        setInterval(() => {
          slides[i].classList.remove('active');
          i = (i + 1) % slides.length;
          slides[i].classList.add('active');
        }, 3800);
      }
    }
  }

  /* ══════════════════════════════════════════════════════
     8. SIDE RAIL — active state on scroll
     ══════════════════════════════════════════════════════ */
  function initRail() {
    const railItems = document.querySelectorAll('.rail-item[data-section]');
    const sects = Array.from(railItems)
      .map(i => document.getElementById(i.dataset.section))
      .filter(Boolean);
    function updateRail() {
      let a = sects[0];
      sects.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.5) a = s; });
      railItems.forEach(i => i.classList.toggle('active', i.dataset.section === a?.id));
    }
    window.addEventListener('scroll', updateRail, { passive: true });
    updateRail();
  }

  /* ══════════════════════════════════════════════════════
     9. VIDEO MODAL
     ══════════════════════════════════════════════════════ */
  window.openVideoModal = function (videoId, platform) {
    const vm = document.getElementById('vimeo-modal');
    const vi = document.getElementById('vimeo-iframe');
    if (!vm || !vi || !videoId) return;
    const src = platform === 'vimeo'
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    vi.src = src;
    vm.classList.add('open');
  };

  window.closeVideoModal = function () {
    const vm = document.getElementById('vimeo-modal');
    const vi = document.getElementById('vimeo-iframe');
    if (!vm || !vi) return;
    vm.classList.remove('open'); vi.src = '';
  };

  function initVideoModal() {
    const vm = document.getElementById('vimeo-modal');
    const closeBtn = document.getElementById('vimeo-close');
    if (!vm) return;
    closeBtn?.addEventListener('click', closeVideoModal);
    vm.addEventListener('click', e => { if (e.target === vm) closeVideoModal(); });
  }

  /* ══════════════════════════════════════════════════════
     10. MASONRY LAYOUT
     ══════════════════════════════════════════════════════ */
  function initMasonry() {
    const GAP = 3;

    function colsForGrid(grid) {
      const w = window.innerWidth;
      if (w <= 1200) return 1;
      for (let n = 4; n >= 1; n--) {
        if (grid.classList.contains('cols-' + n)) return n;
      }
      return 3;
    }

    function layoutGrid(grid) {
      const wraps = Array.from(grid.querySelectorAll(':scope > .mc-wrap'));
      if (!wraps.length) return;
      const cols = colsForGrid(grid);
      const total = grid.offsetWidth;
      const colW = (total - GAP * (cols - 1)) / cols;
      const colY = new Array(cols).fill(0);
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

    function layoutAll() {
      document.querySelectorAll('.media-masonry').forEach(layoutGrid);
    }

    layoutAll();
    requestAnimationFrame(layoutAll);
    setTimeout(layoutAll, 300);
    setTimeout(layoutAll, 900);

    let t;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(layoutAll, 80); });

    document.querySelectorAll('.media-masonry img').forEach(img => {
      if (!img.complete) img.addEventListener('load', layoutAll);
    });
    document.querySelectorAll('.media-masonry video').forEach(v => {
      v.addEventListener('loadedmetadata', layoutAll);
      v.addEventListener('canplay', layoutAll);
    });
  }

  /* ══════════════════════════════════════════════════════
     11. LIGHTBOX
     ══════════════════════════════════════════════════════ */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbW = document.getElementById('lb-media-wrap');
    const lbDots = document.getElementById('lb-dots');
    const lbTitle = document.getElementById('lb-title');
    const lbSub = document.getElementById('lb-sub');
    const lbDesc = document.getElementById('lb-desc');
    const lbCount = document.getElementById('lb-counter');
    const btnP = document.getElementById('lb-prev');
    const btnN = document.getElementById('lb-next');
    const btnC = document.getElementById('lb-close');
    if (!lb) return;

    const cards = Array.from(document.querySelectorAll('.media-card'));
    const items = cards.map(c => {
      const img = c.querySelector('img'), vid = c.querySelector('video');
      return {
        type: c.dataset.type || (vid ? 'video' : 'image'),
        src: vid ? (vid.src || vid.getAttribute('src')) : (img ? img.src : ''),
        title: c.dataset.title || '', sub: c.dataset.sub || '', desc: c.dataset.desc || ''
      };
    }).filter(i => i.src);

    let cur = 0;
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'lb-dot'; d.type = 'button';
      d.addEventListener('click', e => { e.stopPropagation(); show(i); });
      lbDots.appendChild(d);
    });

    function show(i) {
      cur = ((i % items.length) + items.length) % items.length;
      const item = items[cur]; lbW.innerHTML = '';
      let mediaEl;
      if (item.type === 'video') {
        mediaEl = document.createElement('video');
        mediaEl.src = item.src; mediaEl.autoplay = true; mediaEl.muted = true;
        mediaEl.loop = true; mediaEl.setAttribute('playsinline', '');
        mediaEl.addEventListener('canplay', () => mediaEl.classList.add('ready'), { once: true });
      } else {
        mediaEl = document.createElement('img');
        mediaEl.src = item.src; mediaEl.alt = item.title;
        mediaEl.addEventListener('load', () => mediaEl.classList.add('ready'), { once: true });
        if (mediaEl.complete) mediaEl.classList.add('ready');
      }
      lbW.appendChild(mediaEl);
      lbTitle.textContent = item.title; lbSub.textContent = item.sub; lbDesc.textContent = item.desc;
      lbCount.textContent = (cur + 1) + ' / ' + items.length;
      lbDots.querySelectorAll('.lb-dot').forEach((d, j) => d.classList.toggle('active', j === cur));
      document.body.style.overflow = 'hidden';
      lb.classList.add('open');
    }

    function close() {
      lb.classList.remove('open'); document.body.style.overflow = '';
      setTimeout(() => { lbW.innerHTML = ''; }, 350);
    }

    cards.forEach((c, i) => c.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); show(i); }));
    btnP?.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
    btnN?.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
    btnC?.addEventListener('click', e => { e.stopPropagation(); close(); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); closeVideoModal(); return; }
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
    let tx = 0;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) show(dx < 0 ? cur + 1 : cur - 1);
    });
  }

  /* ══════════════════════════════════════════════════════
     12. BOOT
     ══════════════════════════════════════════════════════ */
  function boot() {
    if (typeof PROJECT_DATA === 'undefined') {
      console.error('[project-core] PROJECT_DATA is not defined. Load your .data.js before project-core.js.');
      return;
    }

    renderPage(PROJECT_DATA);

    // Init all interactive systems after DOM is built
    initCursor();
    initAmbient();
    initHero();
    initRail();
    initVideoModal();
    initMasonry();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();