/* ─────────────────────────────────────────────────────────
   project-page.js — renders a project page from window.PROJECT (project.data.js)

   A project folder only needs:
     index.html         the tiny shell (copy any project's)
     project.data.js    the content — see tools/PROJECT_DATA.md
     img/ vid/          the media the data points at

   Desktop: words on the paper (left), work in the ink (right), the hero's ink is a
   window onto the stills with a "Watch" lens on the seam.
   Phones/tablets: the split turns horizontal — words on top in short chunks,
   work below with a tilt-shift focus.
   ───────────────────────────────────────────────────────── */
window.PHONE_LAYOUT = window.PHONE_LAYOUT || (() => matchMedia('(max-width:1024px), (hover:none) and (pointer:coarse)').matches);

(() => {
  const P = window.PROJECT;
  if (!P) { console.error('project-page.js: window.PROJECT is missing — load project.data.js first'); return; }

  /* ── build the page ── */
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const text = h => String(h ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const PLAY = '<svg viewBox="0 0 20 22" aria-hidden="true"><path d="M2 1.5 L18.5 11 L2 20.5 Z"/></svg>';
  // a section is a list of rows (words + the work they talk about); old data with words/work counts as one row
  const rowsOf = s => s.rows || [{ words: s.words || [], work: s.work || [] }];
  const allMedia = (P.sections || []).flatMap(s => rowsOf(s).flatMap(r => r.work.flatMap(w => w.media || [])));
  const stills = (P.hero && P.hero.slides && P.hero.slides.length ? P.hero.slides : allMedia.filter(m => m.type !== 'video').map(m => m.src)).slice(0, 8);
  const poster = stills[0] || '';
  const film = P.hero && P.hero.video && P.hero.video.id ? P.hero.video : null;

  document.title = `${text(P.title)} — Jona Melvin Grobe`;

  const factValue = f => Array.isArray(f.value)
    ? f.value.map(v => v.href
        ? `<a href="${esc(v.href)}" target="_blank" rel="noopener" data-person data-photo="${esc(v.photo || '')}">${esc(v.label)}</a>`
        : esc(v.label)).join(', ')
    : (f.value || '') + (f.secondary ? `, ${f.secondary}` : '');

  const card = m => `<figure class="media media-card" data-title="${esc(m.title)}" data-sub="${esc(m.sub)}" data-desc="${esc(m.desc)}">${
      m.type === 'video'
        ? `<video src="${esc(m.src)}" muted loop playsinline preload="metadata" data-autoplay></video>`
        : `<img src="${esc(m.src)}" alt="${esc(m.title)}" loading="lazy">`
    }<div class="mc-overlay"></div><div class="mc-info"><div class="mc-title">${esc(m.title)}</div><div class="mc-sub">${esc(m.sub)}</div></div></figure>`;

  // "The USB Paradox — Complete Breakdown" → "Complete Breakdown": the project name is already on the page
  const filmLabel = l => {
    const t = text(l), name = text(P.title);
    return t.toLowerCase().startsWith(name.toLowerCase()) ? t.slice(name.length).replace(/^\s*[—–:-]\s*/, '') || t : t;
  };

  const workBlock = (w, sec) => {
    if (w.media) {
      const n = w.media.length;
      // grids always end in full rows: 3 → one row · uneven → one wide + pairs · divisible by 3 → threes · other even → pairs
      const auto = n === 3 ? 'row3' : n <= 2 || w.media.every(m => m.type === 'video') ? 'stack'
                 : n % 2 ? 'gallery' : n % 3 === 0 ? 'grid3' : 'grid2';
      const layout = w.layout || auto;
      const ratio = w.ratio ? ` style="--ratio:${esc(w.ratio)}"` : '';                // e.g. "4/5" for portrait photos
      const cls = { row3: 'gallery row3', grid3: 'gallery grid3', grid2: 'gallery grid2' }[layout] || layout;
      return `<div class="${cls}"${ratio}>${w.media.map(card).join('')}</div>`;
    }
    // the hero's "Watch" already plays the film — don't show the same film again further down
    if (w.video && film && w.video.id === film.id) return '';
    if (w.video) return `<button class="poster media" data-video-id="${esc(w.video.id)}" data-platform="${esc(w.video.platform || 'youtube')}" aria-label="Play ${esc(text(w.video.label || sec.title))}">
        <img src="${esc(w.video.poster || poster)}" alt="" loading="lazy">
        <span class="pbtn" aria-hidden="true">${PLAY}</span></button>`;
    if (w.spotify) return `<div class="media spotify"><iframe src="${esc(w.spotify)}" loading="lazy" allow="encrypted-media" style="width:100%;height:352px;border:0;border-radius:12px"></iframe></div>`;
    if (w.learn) return `<div class="learn">${w.learn.map(b => `<div><h4><b>${esc(b.label)}</b>${esc(b.tag)}</h4><ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
    return '';
  };

  // every row is its own split: its words sit right next to the work they belong to
  const section = s => rowsOf(s).map((r, k) => {
    const words = r.words.map(w => w.h3 != null
      ? `<h3>${w.h3}${w.small ? `<small>${w.small}</small>` : ''}</h3>`
      : `<p>${w.p}</p>`).join('\n      ');
    const work = r.work.map(w => workBlock(w, s)).join('');
    const textOnly = r.work.length > 0 && r.work.every(w => w.learn || w.spotify);
    const head = k === 0
      ? `${s.eyebrow ? `<p class="eyebrow">${esc(s.eyebrow)}</p>` : ''}<h2>${s.title || ''}</h2>`
      : `<h2 hidden>${s.title || ''}</h2>`;                    // continuation rows: title kept for the phone labels
    return `
  <section class="split${k ? ' cont' : ''}${work ? '' : ' no-work'}${textOnly ? ' quiet' : ''}" id="${esc(k ? `${s.id}-${k + 1}` : s.id)}" data-group="${esc(s.id)}">
    <div class="words ink-text"><div class="sticky">
      ${head}
      ${words}
    </div></div>
    <div class="work${textOnly ? ' ink-text' : ''}">${work}</div>
  </section>`;
  }).join('');

  document.body.innerHTML = `
  <div class="grain"></div>
  <div class="backdrop on" id="backdrop" aria-hidden="true"></div>
  <div class="backdrop on" id="watch-window" aria-hidden="true"></div>

  <header class="split hero">
    <div class="words ink-text fade-in">
      <a class="back" href="${esc(P.back || '../')}">← Back</a>
      ${P.meta ? `<p class="meta">${esc(P.meta)}</p>` : ''}
      <h1>${(P.heading || esc(P.title)).replace(/<br\s*\/?>/gi, ' ')}</h1>
      ${P.sub ? `<p class="sub">${esc(P.sub)}</p>` : ''}
      ${P.tagline ? `<p class="tagline">${esc(P.tagline)}</p>` : ''}
      <dl class="facts">${(P.facts || []).map(f => `<dt>${esc(f.label)}</dt><dd>${factValue(f)}</dd>`).join('')}</dl>
    </div>
    <div class="work">${poster ? `<img class="media hero-still" src="${esc(poster)}" alt="${esc(P.title)}">` : ''}</div>
  </header>

  <div id="m-top" class="ink-text"></div>
  <div id="person" aria-hidden="true"><img alt=""><div class="card"><small></small><b></b><span></span></div></div>
  <button id="watch" aria-label="Watch ${esc(text(P.title))}"${film ? '' : ' hidden'}>${PLAY}Watch</button>
  ${(P.sections || []).map(section).join('')}

  <div class="split next">
    <div class="words ink-text"><a class="back" href="${esc(P.back || '../')}">← All projects</a></div>
    <div class="work ink-text">${P.next ? `<a href="${esc(P.next.href)}"><span class="eyebrow">Next project</span><b>${esc(P.next.title)} →</b></a>` : ''}</div>
  </div>
  <footer class="ink-text">
    <a href="../../impressum/" style="text-decoration:none">Impressum</a>
    <span>© ${new Date().getFullYear()} JMG</span>
  </footer>

  <div id="lightbox" role="dialog" aria-label="Image">
    <button id="lb-close" type="button">Close</button>
    <div id="lb-count"></div>
    <button class="lb-arrow" id="lb-prev" type="button" aria-label="Previous">←</button>
    <div id="lb-stage"><div id="lb-media"></div></div>
    <button class="lb-arrow" id="lb-next" type="button" aria-label="Next">→</button>
    <div id="lb-caption"><div id="lb-title"></div><div id="lb-sub"></div><p id="lb-desc"></p></div>
  </div>`;

  /* long titles shrink so their longest word fits the paper column */
  function fitTitle() {
    const h = document.querySelector('.hero h1');
    if (!h) return;
    h.style.fontSize = '';
    if (PHONE_LAYOUT()) return;
    const col = h.parentElement.clientWidth - parseFloat(getComputedStyle(h.parentElement).paddingRight) - parseFloat(getComputedStyle(h.parentElement).paddingLeft);
    const words = h.textContent.trim().split(/\s+/);
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit';
    h.appendChild(probe);
    const widest = Math.max(...words.map(w => { probe.textContent = w; return probe.getBoundingClientRect().width; }));
    probe.remove();
    const room = col * 0.86;                                           // keep clear of the wave and the Watch bubble
    if (widest > room) h.style.fontSize = (parseFloat(getComputedStyle(h).fontSize) * room / widest) + 'px';
  }
  fitTitle();
  addEventListener('resize', fitTitle);
  document.fonts && document.fonts.ready.then(fitTitle);

  /* desktop: a section's work starts level with the first line of text under its heading */
  function alignWork() {
    document.querySelectorAll('section.split').forEach(sec => {
      const work = sec.querySelector(':scope > .work');
      if (!work) return;
      if (PHONE_LAYOUT()) { work.style.paddingTop = ''; return; }
      const firstText = sec.querySelector(':scope > .words .sticky > :not(.eyebrow):not(h2)');
      if (!firstText) return;
      work.style.paddingTop = (firstText.getBoundingClientRect().top - sec.getBoundingClientRect().top + 4) + 'px';
    });
  }
  alignWork();
  addEventListener('resize', alignWork);
  document.fonts && document.fonts.ready.then(alignWork);

  /* ── behaviour (same as the Echoes reference page) ── */
    const field = SplitField.init({ split: 0.42, splitMobile: 0.52, mobileAxis: 'y', enterFrom: 0.22, inkAlpha: 0, lavaOver: true });
    const modal = SplitField.modal();

    /* hero: the ink is a window onto the stills — until you scroll past it */
    const backdrop = document.getElementById('backdrop');
    const show = SplitField.slideshow(backdrop);
    const STILLS = stills;

    const hero = document.querySelector('.hero');
    const watch = document.getElementById('watch');
    const win = document.getElementById('watch-window');
    const winShow = SplitField.slideshow(win);          // same stills, same timing → stays in step
    // desktop: the stills are framed in a box that starts left of the seam (the collaborator box shares it),
    // but both layers stay full width and every picture is shown whole at the framed size and place —
    // so neither the Watch bubble nor a lava blob pulled far left ever reaches an edge
    const frame = document.getElementById('person');
    function fitStills() {
      const b = frame.getBoundingClientRect();
      [backdrop, win].forEach(box => box.querySelectorAll('img').forEach(im => {
        const off = PHONE_LAYOUT() || !im.naturalWidth;
        im.classList.toggle('framed', !off);
        const s = off ? 0 : Math.max(b.width / im.naturalWidth, b.height / im.naturalHeight);
        const w = im.naturalWidth * s, h = im.naturalHeight * s;
        Object.assign(im.style, off ? { inset: '', width: '', height: '', objectFit: '' } : {
          inset: 'auto', left: b.left + (b.width - w) / 2 + 'px', top: b.top + (b.height - h) / 2 + 'px',
          width: w + 'px', height: h + 'px', objectFit: 'fill'
        });
      }));
    }
    [backdrop, win].forEach(box => box.querySelectorAll('img').forEach(im => im.addEventListener('load', fitStills)));
    addEventListener('resize', fitStills);
    new IntersectionObserver(([e]) => {
      const inHero = e.isIntersecting;
      if (inHero) { show.images(STILLS); winShow.images(STILLS); } else { show.stop(); winShow.stop(); }
    }).observe(hero);

    /* the film bubble rides the seam, halfway down the hero; wobbly outline like the front page */
    let hover = false, rad = 0, personOn = false, personFade = 1;

    /* collaborators: hovering a name shows their card (or photo, once data-photo is set) on the ink side */
    const person = document.getElementById('person');
    const pImg = person.querySelector('img');
    document.querySelectorAll('a[data-person]').forEach(a => {
      a.addEventListener('pointerenter', () => {
        const photo = a.dataset.photo || '';
        pImg.setAttribute('src', photo);
        person.classList.toggle('has-photo', !!photo);
        person.querySelector('small').textContent = 'Collaborator';
        person.querySelector('b').textContent = a.textContent.trim();
        person.querySelector('span').textContent = new URL(a.href).hostname.replace(/^www\./, '') + ' ↗';
        personOn = true;
        document.body.classList.add('person-on');
      });
      a.addEventListener('pointerleave', () => {
        personOn = false;
        document.body.classList.remove('person-on');
      });
    });
    watch.addEventListener('pointerenter', () => { hover = true;  document.body.classList.add('watch-hover'); });
    watch.addEventListener('pointerleave', () => { hover = false; document.body.classList.remove('watch-hover'); });
    // phones: the hero's paper is as tall as its words (+ half the Watch bubble), so nothing ends up under the bubble
    let heroSplit = 0.52;
    function measureHero() {
      const pane = document.querySelector('#m-top .hero-pane');
      if (!pane || !PHONE_LAYOUT()) return;
      const kids = [...pane.children];
      const prev = pane.style.transform; pane.style.transform = 'none';
      const bottom = kids[kids.length - 1].getBoundingClientRect().bottom - pane.getBoundingClientRect().top;
      pane.style.transform = prev;
      const bubble = Math.min(64, innerWidth * 0.16);
      heroSplit = Math.min(0.72, Math.max(0.46, (bottom + bubble + 40) / innerHeight));
    }
    setTimeout(measureHero, 0);
    addEventListener('resize', measureHero);
    document.fonts && document.fonts.ready.then(measureHero);
    const t0 = performance.now();
    (function ride(now) {
      const t = (now - t0) / 1000 || 0;
      const mobile = PHONE_LAYOUT();
      const hr = hero.getBoundingClientRect();                       // rides along with the hero as it scrolls away
      const mx = innerWidth * 0.5;
      const y = mobile ? field.edgeAt(mx) : hr.top + Math.min(hr.height, innerHeight) * 0.5;   // mobile: stays on the seam, shrinks away instead of scrolling up
      // the ink closes up again as the hero scrolls away, so the stills never sit behind the next section
      // mobile: one scroll-linked progress drives the whole hero → first section handover:
      // the seam rises, the stills slide away (parallax) and the ink closes, all together
      const mp = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.55)));
      const me = mp * mp * (3 - 2 * mp);
      const ty = mobile ? -scrollY * 0.55 : 0;
      if (mobile) field.setSplitMobile(heroSplit - (heroSplit - 0.34) * me);
      backdrop.style.transform = ty ? `translateY(${ty.toFixed(1)}px)` : '';
      const open = mobile
        ? 1 - me
        : Math.min(1, Math.max(0, (hr.bottom - innerHeight * 0.4) / (innerHeight * 0.5)));
      field.setInkAlpha(1 - open);
      personFade += ((personOn ? 0 : 1) - personFade) * 0.15;      // bubble steps aside while a collaborator shows
      // never fade the bubble's content (it straddles paper and ink, so half-transparent shows a seam);
      // it shrinks away instead
      const vis = open * personFade;
      win.style.opacity = vis > 0.02 ? '1' : '0';
      watch.style.opacity = (open * personFade).toFixed(3);
      watch.style.pointerEvents = open > 0.3 && !personOn ? '' : 'none';
      const x = mobile ? mx : field.edgeAt(y);
      const base = mobile ? Math.min(64, innerWidth * 0.16) : Math.max(80, Math.min(innerWidth * 0.085, innerHeight * 0.17, 140));
      rad += ((hover ? base * 1.1 : base) * Math.min(1, open * personFade) - rad) * 0.12;
      watch.style.translate = `${x}px ${y}px`;
      watch.style.setProperty('--d', Math.round(rad * 2) + 'px');
      let d = '';
      for (let i = 0; i < 72; i++) {
        const a = i / 72 * Math.PI * 2;
        const rr = rad * (1 + 0.035 * Math.sin(3 * a + t * 0.9) + 0.025 * Math.sin(5 * a - t * 1.3));
        d += (i ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr).toFixed(1);
      }
      // lens: scale the window around the bubble centre, clip stays the bubble's size
      const Z = 1.14;
      const ly = y - ty;
      const lx = x - win.offsetLeft;                                  // the window may start at the seam (desktop)
      win.style.transformOrigin = `${lx}px ${ly}px`;
      win.style.transform = `translateY(${ty.toFixed(1)}px) scale(${Z})`;
      d = '';
      for (let i = 0; i < 72; i++) {
        const a = i / 72 * Math.PI * 2;
        const rr = rad / Z * (1 + 0.035 * Math.sin(3 * a + t * 0.9) + 0.025 * Math.sin(5 * a - t * 1.3));
        d += (i ? 'L' : 'M') + (lx + Math.cos(a) * rr).toFixed(1) + ' ' + (ly + Math.sin(a) * rr).toFixed(1);
      }
      win.style.clipPath = `path('${d}Z')`;
      requestAnimationFrame(ride);
    })();
    const play = (id, platform) => (platform === 'vimeo' ? modal.vimeo(id) : modal.youtube(id));
    if (film) watch.addEventListener('click', () => play(film.id, film.platform));
    document.querySelectorAll('[data-video-id]').forEach(b => b.addEventListener('click', () => play(b.dataset.videoId, b.dataset.platform)));

    /* videos only play while on screen */
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()), { threshold: 0.2 });
    document.querySelectorAll('video[data-autoplay]').forEach(v => io.observe(v));

    /* mirror strips next to the first-column images */
    function buildEchoes() {
      document.querySelectorAll('.echo').forEach(e => e.remove());
      if (PHONE_LAYOUT()) return;
      document.querySelectorAll('section.split > .work').forEach(work => {
        const items = [...work.querySelectorAll('.media-card, .poster')];
        if (!items.length) return;
        const wr = work.getBoundingClientRect();
        const minX = Math.min(...items.map(c => c.getBoundingClientRect().left));
        items.filter(c => c.getBoundingClientRect().left - minX < 2).forEach(c => {
          const r = c.getBoundingClientRect();
          const src = c.querySelector('img, video');
          if (!src) return;
          // pictures shown uncropped sit on black bars — mirroring them would put the photo where the bars are
          if (getComputedStyle(src).objectFit === 'contain') return;
          const echo = document.createElement('div');
          echo.className = 'echo';
          const reach = innerWidth * 0.2;                         // how far it runs in under the paper
          // lives inside the card's own block, so it travels with it when that block is sticky
          const box = c.parentElement.matches('.gallery, .stack') ? c.parentElement : work;
          const br = box.getBoundingClientRect();
          const gap = r.left - wr.left;                           // from the work column's edge to the card
          Object.assign(echo.style, { top: (r.top - br.top) + 'px', height: r.height + 'px',
                                      left: (wr.left - br.left - reach) + 'px', width: (gap + reach) + 'px' });
          const m = src.tagName === 'VIDEO'
            ? Object.assign(document.createElement('video'), { src: src.getAttribute('src'), muted: true, loop: true, playsInline: true, autoplay: true })
            : Object.assign(document.createElement('img'), { src: src.getAttribute('src'), alt: '' });
          m.style.width = Math.max(r.width, gap + reach) + 'px';
          if (m.tagName === 'VIDEO') m.addEventListener('loadeddata', () => { m.currentTime = src.currentTime || 0; }, { once: true });
          echo.appendChild(m);
          box.prepend(echo);
        });
      });
    }
    let et; const rebuild = () => { clearTimeout(et); et = setTimeout(buildEchoes, 120); };
    addEventListener('load', buildEchoes);
    addEventListener('resize', rebuild);
    document.fonts && document.fonts.ready.then(rebuild);

    /* ── mobile: words of the section in view sit in the paper on top ── */
    const mTop = document.getElementById('m-top');
    // each section's words are cut into chunks (a paragraph, or a sub-heading with its paragraph);
    // each chunk takes over the top when its share of the section's work reaches the seam
    const triggers = [];                 // { el, pane, hero }
    const makePane = (html, cls = '') => {
      const pane = document.createElement('div');
      pane.className = 'pane ' + cls;
      pane.innerHTML = html;
      pane.querySelectorAll('.fade-in').forEach(n => n.classList.remove('fade-in'));
      mTop.appendChild(pane);
      return pane;
    };
    const heroEl = document.querySelector('.hero');
    triggers.push({ el: heroEl, pane: makePane(heroEl.querySelector(':scope > .words').innerHTML, 'hero-pane'), hero: true });
    document.querySelectorAll('section.split').forEach(sec => {
      const kids = [...sec.querySelector(':scope > .words .sticky').children];
      const head = kids.filter(k => k.matches('.eyebrow, h2'));
      // long paragraphs are cut at sentence ends so every chunk fits the top (~5 lines)
      const MAX = 210;
      const rest = kids.filter(k => !k.matches('.eyebrow, h2')).flatMap(k => {
        if (!k.matches('p') || k.textContent.length <= MAX) return [k];
        const parts = [];
        (k.textContent.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [k.textContent]).forEach(sn => {
          if (parts.length && (parts[parts.length - 1] + sn).length <= MAX) parts[parts.length - 1] += sn;
          else parts.push(sn);
        });
        return parts.map(t => Object.assign(document.createElement('p'), { textContent: t.trim() }));
      });
      const chunks = [];
      rest.forEach(k => {
        if (k.matches('h3') || !chunks.length || chunks[chunks.length - 1].closed) chunks.push({ nodes: [k], closed: !k.matches('h3') });
        else { chunks[chunks.length - 1].nodes.push(k); chunks[chunks.length - 1].closed = true; }
      });
      if (!chunks.length) chunks.push({ nodes: [] });
      const label = sec.querySelector('h2').innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const items = [...sec.querySelectorAll(':scope > .work .media-card, :scope > .work .poster')];   // text-only work (Learnings) stays one block
      const anchors = items.length ? items : [sec.querySelector(':scope > .work')];
      chunks.forEach((c, i) => {
        const top = i === 0 ? head.map(n => n.outerHTML).join('') : `<p class="eyebrow">${label}</p>`;
        const pane = makePane(top + c.nodes.map(n => n.outerHTML).join(''), i === 0 ? '' : 'cont');
        const from = Math.min(anchors.length - 1, Math.floor(i * anchors.length / chunks.length));
        const to = Math.max(from + 1, Math.floor((i + 1) * anchors.length / chunks.length));
        const group = anchors.slice(from, to);
        // mobile: one quiet heading where a section's work starts
        if (i === 0 && !sec.classList.contains('cont')) {
          const sep = document.createElement('div');
          sep.className = 'm-sep ink-text m-item m-head';   // sharp while its section is in focus
          sep.dataset.sec = sec.dataset.group || sec.id;
          sep.textContent = label;
          // always inside the work column (under the paper overlay); text-only work gets it as first child
          if (group[0].matches('.work')) group[0].prepend(sep); else group[0].before(sep);
        }
        group.forEach(g => { g.classList.add('m-item'); g.dataset.sec = sec.dataset.group || sec.id; });
        triggers.push({ el: group[0], pane, group });
      });
    });
    let activePane = null;
    function syncPane() {
      if (!PHONE_LAYOUT()) return;
      const line = innerHeight * 0.78;                          // as soon as the work comes into view from below
      let cur = triggers[0];
      triggers.forEach(t => { if (!t.hero && t.el.getBoundingClientRect().top < line) cur = t; });
      // the hero words leave early, before the rising seam starts cutting them
      if (cur.hero && scrollY > innerHeight * 0.22) cur = triggers[1];
      if (cur.pane !== activePane) {
        activePane?.classList.remove('on');
        activePane = cur.pane;
        // start the new chunk slightly below, then let it glide up into place
        activePane.classList.add('enter');
        void activePane.offsetWidth;
        activePane.classList.remove('enter');
        activePane.classList.add('on');
      }
    }
    /* continuous focus: sharp in the middle of the visible ink, blurring + darkening with distance */
    const focusItems = [...document.querySelectorAll('.m-item')];
    let focusQueued = false;
    function focusFlow() {
      focusQueued = false;
      if (!PHONE_LAYOUT()) { focusItems.forEach(el => { el.style.filter = el.style.opacity = el.style.transform = ''; }); return; }
      const top = field.edgeAt(innerWidth / 2);
      const mid = (top + innerHeight) / 2, half = (innerHeight - top) / 2;
      // 1) raw focus per piece of work: 0 = sharp … 1 = fully sunk back
      const raw = new Map(), best = {};
      focusItems.forEach(el => {
        if (el.classList.contains('m-head')) return;
        const r = el.getBoundingClientRect();
        const c = (r.top + r.bottom) / 2;
        // sharp band around the item's centre; tall blocks (Learnings) are sharp as soon as they cover the middle
        const d = Math.max(0, Math.abs(c - mid) - Math.max(r.height * 0.18, r.height / 2 - half * 0.35));
        let f = Math.min(1, d / (half * 0.55));
        f = f * f * (3 - 2 * f);                                  // smoothstep
        raw.set(el, f);
        const k = el.dataset.sec;
        best[k] = Math.min(best[k] ?? 1, f);
      });
      // 2) the section in focus holds together: its heading is as sharp as its sharpest piece,
      //    its other pieces only soften; other sections sink back fully
      const focusSec = Object.keys(best).reduce((a, k) => (best[k] < (best[a] ?? 1) ? k : a), null);
      const final = new Map(), sharpest = {};
      focusItems.forEach(el => {
        if (el.classList.contains('m-head')) return;
        const k = el.dataset.sec;
        const f = k === focusSec ? raw.get(el) * 0.28              // within the focused section: only a hint
                : Math.max(raw.get(el), best[k] ?? 1);
        final.set(el, f);
        sharpest[k] = Math.min(sharpest[k] ?? 1, f);
      });
      focusItems.forEach(el => {
        // a heading is never blurrier than the sharpest piece of its section
        const f = el.classList.contains('m-head') ? (sharpest[el.dataset.sec] ?? 1) : final.get(el);
        el.style.filter = f < 0.01 ? '' : `blur(${(f * 6).toFixed(2)}px) grayscale(${(f * 0.7).toFixed(2)}) brightness(${(1 - f * 0.3).toFixed(3)})`;
        el.style.opacity = (1 - f * 0.62).toFixed(3);
        el.style.transform = `scale(${(1 - f * 0.05).toFixed(4)})`;
      });
    }
    /* section headings span the full width of the work column */
    function fitHeads() {
      if (!PHONE_LAYOUT()) return;
      document.querySelectorAll('.m-sep').forEach(h => {
        const cs = getComputedStyle(h);
        const avail = h.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const tf = h.style.transform;
        h.style.transform = 'none';                              // measure without the focus scaling
        h.style.fontSize = '100px';
        const rg = document.createRange(); rg.selectNodeContents(h);
        const w = rg.getBoundingClientRect().width;              // the text itself, not the box
        h.style.fontSize = Math.floor(100 * avail / w * 0.97) + 'px';   /* centred, so any rounding is split evenly */
        h.style.transform = tf;
      });
    }
    fitHeads();
    addEventListener('resize', fitHeads);
    document.fonts && document.fonts.ready.then(fitHeads);

    const queueFocus = () => { if (!focusQueued) { focusQueued = true; requestAnimationFrame(focusFlow); } };
    addEventListener('scroll', queueFocus, { passive: true });
    addEventListener('resize', queueFocus);
    (function keep() { queueFocus(); setTimeout(keep, 200); })();     // the seam drifts, keep focus in step

    addEventListener('scroll', syncPane, { passive: true });
    addEventListener('resize', syncPane);
    syncPane();

    /* lightbox over all media cards */
    const cards = [...document.querySelectorAll('.media-card')];
    const lb = document.getElementById('lightbox'), lbMedia = document.getElementById('lb-media');
    let cur = 0;
    function openLb(i) {
      cur = (i + cards.length) % cards.length;
      const c = cards[cur], src = c.querySelector('img, video');
      lbMedia.innerHTML = '';
      const el = src.tagName === 'VIDEO'
        ? Object.assign(document.createElement('video'), { src: src.getAttribute('src'), autoplay: true, loop: true, controls: true, playsInline: true })
        : Object.assign(document.createElement('img'), { src: src.getAttribute('src'), alt: src.alt });
      el.addEventListener(el.tagName === 'VIDEO' ? 'canplay' : 'load', () => el.classList.add('ready'), { once: true });
      if (el.complete) el.classList.add('ready');
      lbMedia.appendChild(el);
      document.getElementById('lb-title').textContent = c.dataset.title || '';
      document.getElementById('lb-sub').textContent = c.dataset.sub || '';
      document.getElementById('lb-desc').textContent = c.dataset.desc || '';      // what I did on this one
      lb.classList.toggle('has-desc', !!c.dataset.desc);                         // (the picture makes room for it)
      document.getElementById('lb-count').textContent = `${cur + 1} / ${cards.length}`;
      document.body.style.overflow = 'hidden';
      lb.classList.add('open');
    }
    function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; setTimeout(() => lbMedia.innerHTML = '', 350); }
    cards.forEach((c, i) => c.addEventListener('click', () => openLb(i)));
    document.getElementById('lb-prev').addEventListener('click', () => openLb(cur - 1));
    document.getElementById('lb-next').addEventListener('click', () => openLb(cur + 1));
    document.getElementById('lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lb-stage') closeLb(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') openLb(cur - 1);
      if (e.key === 'ArrowRight') openLb(cur + 1);
      if (e.key === 'Escape') closeLb();
    });


})();
