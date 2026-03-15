/**
 * masonry-gallery.js
 * Self-contained masonry layout engine + lightbox.
 *
 * Usage
 * ─────
 *   <!-- 1. link the stylesheet -->
 *   <link rel="stylesheet" href="masonry-gallery.css">
 *
 *   <!-- 2. author your grid markup (see markup contract below) -->
 *   <div class="media-masonry cols-3">
 *     <div class="mc-wrap">
 *       <div class="media-card"
 *            data-title="My Image"
 *            data-sub="Project · Year"
 *            data-desc="Optional longer description shown in lightbox.">
 *         <img src="./img/photo.webp" alt="My Image">
 *         <div class="mc-overlay"></div>
 *         <div class="mc-info">
 *           <div class="mc-title">My Image</div>
 *           <div class="mc-sub">Project · Year</div>
 *         </div>
 *       </div>
 *       <!-- optional below-card label -->
 *       <div class="mc-label">
 *         <div class="mc-label-title">1</div>
 *         <div class="mc-label-sub"></div>
 *         <div class="mc-label-desc">Caption text here.</div>
 *       </div>
 *     </div>
 *     <!-- repeat .mc-wrap blocks … -->
 *   </div>
 *
 *   <!-- 3. load this script (defer or at end of body) -->
 *   <script src="masonry-gallery.js" defer></script>
 *
 * Column classes
 * ──────────────
 *   .cols-1  .cols-2  .cols-3  .cols-4
 *   At ≤ 1200 px all grids collapse to 1 column.
 *   At ≤ 1100 px grids wider than 2 columns collapse to 2.
 *
 * Card data attributes
 * ─────────────────────
 *   data-title   Title shown in lightbox caption.
 *   data-sub     Sub-line shown in lightbox caption.
 *   data-desc    Longer description shown in lightbox caption.
 *   data-type    "image" | "video"  (auto-detected from child element if absent)
 *
 * Video cards
 * ───────────
 *   Use a <video> element inside .media-card instead of <img>.
 *   Add a <span class="mc-badge">Video</span> for the corner badge.
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     1.  LIGHTBOX — inject HTML, wire events
     ══════════════════════════════════════════════════════════════════════════ */

  /** Inject the lightbox skeleton once into <body>. */
  function injectLightbox () {
    if (document.getElementById('mg-lightbox')) return; // already present
    const html = `
<div id="mg-lightbox">
  <button id="mg-lb-close" type="button">
    <svg viewBox="0 0 14 14"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
  </button>
  <div id="mg-lb-stage">
    <button class="mg-lb-arrow" id="mg-lb-prev" type="button">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div id="mg-lb-media-wrap"></div>
    <button class="mg-lb-arrow" id="mg-lb-next" type="button">
      <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
    </button>
  </div>
  <div id="mg-lb-counter"></div>
  <div id="mg-lb-caption">
    <div id="mg-lb-dots"></div>
    <div id="mg-lb-title-wrap">
      <div id="mg-lb-title"></div>
      <div id="mg-lb-sub"></div>
      <div id="mg-lb-desc"></div>
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     2.  MASONRY LAYOUT ENGINE
     ══════════════════════════════════════════════════════════════════════════ */

  const GAP = 3; // px — matches --gap default in the CSS

  /** Return the active column count for a given grid element. */
  function colsForGrid (grid) {
    const w = window.innerWidth;
    if (w <= 1200) return 1;
    if (w <= 1100) {
      for (let n = 4; n >= 1; n--) {
        if (grid.classList.contains('cols-' + n)) return Math.min(n, 2);
      }
    }
    for (let n = 4; n >= 1; n--) {
      if (grid.classList.contains('cols-' + n)) return n;
    }
    return 3;
  }

  /** Lay out one masonry grid. */
  function layoutGrid (grid) {
    const wraps = Array.from(grid.querySelectorAll(':scope > .mc-wrap'));
    if (!wraps.length) return;

    const cols  = colsForGrid(grid);
    const total = grid.offsetWidth;
    const colW  = (total - GAP * (cols - 1)) / cols;
    const colY  = new Array(cols).fill(0); // running Y per column

    // First pass: fix width so height measurement is stable
    wraps.forEach(w => { w.style.width = colW + 'px'; });

    // Second pass: position left → right, column by column
    wraps.forEach((wrap, idx) => {
      const col      = idx % cols;
      wrap.style.left = (col * (colW + GAP)) + 'px';
      wrap.style.top  = colY[col] + 'px';
      colY[col]      += wrap.offsetHeight + GAP;
    });

    grid.style.height = Math.max(...colY) - GAP + 'px';
    grid.classList.add('laid-out');
  }

  /** Re-layout every masonry grid on the page. */
  function layoutAll () {
    document.querySelectorAll('.media-masonry').forEach(layoutGrid);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     3.  LIGHTBOX CONTROLLER
     ══════════════════════════════════════════════════════════════════════════ */

  function initLightbox () {
    const lb      = document.getElementById('mg-lightbox');
    const lbWrap  = document.getElementById('mg-lb-media-wrap');
    const lbDots  = document.getElementById('mg-lb-dots');
    const lbTitle = document.getElementById('mg-lb-title');
    const lbSub   = document.getElementById('mg-lb-sub');
    const lbDesc  = document.getElementById('mg-lb-desc');
    const lbCount = document.getElementById('mg-lb-counter');
    const btnP    = document.getElementById('mg-lb-prev');
    const btnN    = document.getElementById('mg-lb-next');
    const btnC    = document.getElementById('mg-lb-close');

    // Collect every .media-card on the page
    const cards = Array.from(document.querySelectorAll('.media-card'));
    const items = cards.map(card => {
      const img  = card.querySelector('img');
      const vid  = card.querySelector('video');
      const type = card.dataset.type || (vid ? 'video' : 'image');
      const src  = vid
        ? (vid.src || vid.getAttribute('src') || '')
        : (img ? img.src : '');
      return {
        type,
        src,
        title: card.dataset.title || '',
        sub:   card.dataset.sub   || '',
        desc:  card.dataset.desc  || '',
      };
    }).filter(i => i.src);

    if (!items.length) return;

    let cur = 0;

    // Build dot navigation
    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'mg-lb-dot';
      dot.type      = 'button';
      dot.addEventListener('click', e => { e.stopPropagation(); show(i); });
      lbDots.appendChild(dot);
    });

    /** Show item at index i (wraps around). */
    function show (i) {
      cur = ((i % items.length) + items.length) % items.length;
      const item = items[cur];

      lbWrap.innerHTML = '';

      let el;
      if (item.type === 'video') {
        el             = document.createElement('video');
        el.src         = item.src;
        el.autoplay    = true;
        el.muted       = true;
        el.loop        = true;
        el.setAttribute('playsinline', '');
        el.addEventListener('canplay', () => el.classList.add('ready'), { once: true });
      } else {
        el      = document.createElement('img');
        el.src  = item.src;
        el.alt  = item.title;
        el.addEventListener('load', () => el.classList.add('ready'), { once: true });
        if (el.complete) el.classList.add('ready');
      }

      lbWrap.appendChild(el);

      lbTitle.textContent = item.title;
      lbSub.textContent   = item.sub;
      lbDesc.textContent  = item.desc;
      lbCount.textContent = (cur + 1) + ' / ' + items.length;

      lbDots.querySelectorAll('.mg-lb-dot').forEach((d, j) => {
        d.classList.toggle('active', j === cur);
      });

      document.body.style.overflow = 'hidden';
      lb.classList.add('open');
    }

    /** Close the lightbox. */
    function close () {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lbWrap.innerHTML = ''; }, 350);
    }

    // Wire card clicks
    cards.forEach((card, i) => {
      card.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        show(i);
      });
    });

    // Arrow buttons
    btnP.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
    btnN.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
    btnC.addEventListener('click', e => { e.stopPropagation(); close(); });

    // Click outside media → close
    lb.addEventListener('click', e => { if (e.target === lb) close(); });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); return; }
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft')  show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });

    // Swipe support
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) show(dx < 0 ? cur + 1 : cur - 1);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     4.  INITIALISE
     ══════════════════════════════════════════════════════════════════════════ */

  function init () {
    injectLightbox();

    // Initial layout passes (multiple to catch fonts / slow resources)
    layoutAll();
    requestAnimationFrame(layoutAll);
    setTimeout(layoutAll, 300);
    setTimeout(layoutAll, 900);

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 80);
    });

    // Re-layout when media finishes loading
    document.querySelectorAll('.media-masonry img').forEach(img => {
      if (!img.complete) img.addEventListener('load', layoutAll);
    });
    document.querySelectorAll('.media-masonry video').forEach(vid => {
      vid.addEventListener('loadedmetadata', layoutAll);
      vid.addEventListener('canplay',        layoutAll);
    });

    initLightbox();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();