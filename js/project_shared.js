/**
 * shared.js
 * Reusable components: grain · cursor · ambient canvas ·
 * side-rail scroll-spy · vimeo modal · hero slideshow.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Usage
 * ─────────────────────────────────────────────────────────────────────────────
 *   <link rel="stylesheet" href="../../shared/shared.css">
 *   <script src="../../shared/shared.js" defer></script>
 *
 * Every component auto-initialises. Behaviour is controlled entirely through
 * data-attributes and CSS custom properties in your HTML — you never need to
 * edit this file.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Configuration reference
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * GRAIN
 *   Injected automatically. Adjust intensity in your CSS:
 *     :root { --grain-opacity: 0.025; }
 *
 * AMBIENT CANVAS
 *   Injected automatically. Adjust intensity in your CSS:
 *     :root { --ambient-opacity: 0.45; }
 *
 *   Orb hue angles (comma-separated, 1–8 values) on <body>:
 *     <body data-ambient-hues="210,195,228,205,218">
 *
 * CURSOR
 *   Injected automatically, hidden on touch screens via CSS.
 *   Selector list for the "hovering" (enlarged) state on <body>:
 *     <body data-cursor-hover-selectors="a,button,#hero,.media-card,.video-embed">
 *
 * SIDE RAIL (scroll-spy)
 *   Markup stays in your HTML. Add data-section="<id>" to each .rail-item:
 *     <a class="rail-item" href="#overview" data-section="overview">…</a>
 *   The active class is updated automatically as the user scrolls.
 *
 * HERO
 *   On the hero <section>:
 *     data-video-src=""              — path to a looping bg video (optional)
 *     data-vimeo-id="1066698349"     — Vimeo ID opened by clicking the hero
 *     data-slideshow-interval="3800" — ms between slideshow slides (default 3800)
 *
 *   Expected child elements (optional — hero works without them):
 *     <video id="hero-video">
 *     <div id="hero-slideshow"> containing .hero-slide elements
 *
 * VIMEO MODAL
 *   Injected automatically. openVimeo() / closeVimeo() are attached to
 *   window so you can call them from any inline handler:
 *     <section id="hero" onclick="openVimeo()">…</section>
 *
 *   The video ID is read from the first element with data-vimeo-id on the page.
 *   You can also override it at call-time:
 *     openVimeo('9876543')
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     HELPERS
     ══════════════════════════════════════════════════════════════════════════ */

  /** Read a data attribute from an element, falling back to a default. */
  function dataset (el, key, fallback) {
    const val = el && el.dataset[key];
    return (val !== undefined && val !== '') ? val : fallback;
  }

  /** Inject an element into <body> once (idempotent). */
  function inject (html) {
    document.body.insertAdjacentHTML('beforeend', html);
  }


  /* ══════════════════════════════════════════════════════════════════════════
     1. GRAIN
     ══════════════════════════════════════════════════════════════════════════ */
  function initGrain () {
    if (document.getElementById('sh-grain')) return;
    inject('<div id="sh-grain"></div>');
  }


  /* ══════════════════════════════════════════════════════════════════════════
     2. CUSTOM CURSOR
     Config: data-cursor-hover-selectors on <body>
     ══════════════════════════════════════════════════════════════════════════ */
  function initCursor () {
    if (document.getElementById('sh-cur-dot')) return;
    inject('<div id="sh-cur-dot"></div><div id="sh-cur-ring"></div>');

    const dot    = document.getElementById('sh-cur-dot');
    const ring   = document.getElementById('sh-cur-ring');
    const sel    = dataset(document.body, 'cursorHoverSelectors',
                           'a,button,#hero,.media-card,.video-embed');

    let mX = innerWidth / 2, mY = innerHeight / 2;
    let rX = mX, rY = mY;
    let lastMX = mX, lastMY = mY;
    let mouseVel = 0, dotScale = 0.167, ringScale = 1;

    document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });

    document.addEventListener('mouseover', e => {
      document.body.classList.toggle('sh-hovering', !!e.target.closest(sel));
    });

    (function anim (t) {
      const speed = Math.sqrt((mX - lastMX) ** 2 + (mY - lastMY) ** 2);
      lastMX = mX; lastMY = mY;

      mouseVel  += (speed - mouseVel) * 0.18;
      dotScale  += (0.167 + Math.min(mouseVel * 0.055, 0.833) - dotScale) * 0.10;

      const idlePulse  = 1 + Math.sin(t * 0.0018) * 0.18;
      const velocityS  = 1 + Math.min(mouseVel * 0.06, 0.7);
      ringScale += ((mouseVel > 0.5 ? velocityS : idlePulse) - ringScale) * 0.07;

      rX += (mX - rX) * 0.11;
      rY += (mY - rY) * 0.11;

      dot.style.cssText  = `left:${mX}px;top:${mY}px;transform:translate(-50%,-50%) scale(${dotScale.toFixed(3)})`;
      ring.style.cssText = `left:${rX}px;top:${rY}px;transform:translate(-50%,-50%) scale(${ringScale.toFixed(3)})`;

      requestAnimationFrame(anim);
    })(performance.now());
  }


  /* ══════════════════════════════════════════════════════════════════════════
     3. AMBIENT CANVAS
     Config: data-ambient-hues on <body> (comma-separated HSL hue angles)
     ══════════════════════════════════════════════════════════════════════════ */
  function initAmbient () {
    if (document.getElementById('sh-bg-canvas')) return;
    inject('<canvas id="sh-bg-canvas"></canvas>');

    const cv  = document.getElementById('sh-bg-canvas');
    const ctx = cv.getContext('2d');
    let W, H;

    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Read hue list from data attribute, fall back to defaults
    const hueStr = dataset(document.body, 'ambientHues', '210,195,228,205,218');
    const hues   = hueStr.split(',').map(Number).filter(n => !isNaN(n));

    const orbs = hues.map(h => ({
      x:  Math.random() * innerWidth,
      y:  Math.random() * innerHeight,
      r:  260 + Math.random() * 400,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.10,
      h,
      a:  0.02 + Math.random() * 0.03,
    }));

    (function loop () {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r)   o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r)   o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;

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
  }


  /* ══════════════════════════════════════════════════════════════════════════
     4. SIDE RAIL SCROLL-SPY
     Reads .rail-item[data-section] — no config needed beyond the markup.
     ══════════════════════════════════════════════════════════════════════════ */
  function initRail () {
    const items = Array.from(document.querySelectorAll('.rail-item[data-section]'));
    if (!items.length) return;

    const sections = items
      .map(i => document.getElementById(i.dataset.section))
      .filter(Boolean);

    function update () {
      let active = sections[0];
      sections.forEach(s => {
        if (s.getBoundingClientRect().top < innerHeight * 0.5) active = s;
      });
      items.forEach(i => i.classList.toggle('active', i.dataset.section === active.id));
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }


  /* ══════════════════════════════════════════════════════════════════════════
     5. VIMEO MODAL
     Injected automatically.
     Config: data-vimeo-id on #hero (or any element on the page).
     window.openVimeo(id?) / window.closeVimeo() are exposed globally.
     ══════════════════════════════════════════════════════════════════════════ */
  function initVimeo () {
    if (document.getElementById('sh-vimeo-modal')) return;
    inject(`
<div id="sh-vimeo-modal">
  <button id="sh-vimeo-close" type="button">✕</button>
  <div id="sh-vimeo-wrap">
    <iframe id="sh-vimeo-iframe" src=""
      allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>`);

    const modal  = document.getElementById('sh-vimeo-modal');
    const iframe = document.getElementById('sh-vimeo-iframe');
    const btn    = document.getElementById('sh-vimeo-close');

    function getDefaultId () {
      const el = document.querySelector('[data-vimeo-id]');
      return el ? el.dataset.vimeoId : '';
    }

    /** Open the modal. Pass an explicit id, or it reads data-vimeo-id from the page. */
    window.openVimeo = function (idOrEvent) {
      // If called as an inline onclick handler, idOrEvent will be a MouseEvent
      const id = (idOrEvent && typeof idOrEvent === 'string') ? idOrEvent : getDefaultId();
      if (!id) return;
      if (idOrEvent && idOrEvent.stopPropagation) idOrEvent.stopPropagation();
      iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`;
      modal.classList.add('open');
    };

    window.closeVimeo = function () {
      modal.classList.remove('open');
      iframe.src = '';
    };

    btn.addEventListener('click', window.closeVimeo);
    modal.addEventListener('click', e => { if (e.target === modal) window.closeVimeo(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeVimeo(); });
  }


  /* ══════════════════════════════════════════════════════════════════════════
     6. HERO — slideshow + background video
     Config on <section id="hero">:
       data-vimeo-id="…"              Vimeo video opened on click
       data-video-src="./vid/bg.mp4"  Looping background video (overrides slideshow)
       data-slideshow-interval="3800" Ms between slide transitions
     ══════════════════════════════════════════════════════════════════════════ */
  function initHero () {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const vid       = document.getElementById('hero-video');
    const slideshow = document.getElementById('hero-slideshow');
    const videoSrc  = (dataset(hero, 'videoSrc', '')).trim();
    const interval  = parseInt(dataset(hero, 'slideshowInterval', '3800'), 10);

    if (videoSrc && vid) {
      // Background video mode
      vid.src = videoSrc;
      vid.classList.add('active');
      if (slideshow) slideshow.style.display = 'none';
    } else {
      // Slideshow mode
      if (vid) vid.style.display = 'none';
      if (slideshow) {
        const slides = slideshow.querySelectorAll('.hero-slide');
        if (slides.length > 1) {
          let idx = 0;
          setInterval(() => {
            slides[idx].classList.remove('active');
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add('active');
          }, interval);
        }
      }
    }
  }


  /* ══════════════════════════════════════════════════════════════════════════
     BOOT
     ══════════════════════════════════════════════════════════════════════════ */
  function init () {
    initGrain();
    initAmbient();
    initCursor();
    initRail();
    initVimeo();
    initHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();