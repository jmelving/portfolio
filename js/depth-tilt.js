/* depth-tilt.js — the first picture of a project card tilts with the pointer through its depth map,
   like a lenticular card, and pushes in through that depth when the card's slideshow moves on.

   DepthTilt.attach(card, colorSrc, depthSrc, focus?) → { push(), back() } or null
     card      the .gallery-item; its .image-stack gets the canvas while hovered
     focus     the depth the picture tilts around (0 far … 1 near); default: the map's average

   Desktop: two WebGL canvases take turns. The card the pointer leaves keeps its canvas while the picture
   tilts back to rest and settles with the card, so the next card can already take the other one.
   Touch screens: no pointer to follow, so the card nearest the middle of the screen takes the one canvas and
   sways slowly left and right on its own until the page's slideshow starts. Reduced motion gets the plain pictures. */
(() => {
  const VERTICAL = 1, EASE = 0.08, PUSH_MS = 450, HOVER_SCALE = 1.045, SETTLE_MS = 700;
  window.DepthTilt = { attach: () => null };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const touch = !matchMedia('(hover:hover) and (pointer:fine)').matches;
  const STRENGTH = touch ? 0.065 : 0.03;                // phones: more (then evened out per picture, see gain)
  const zoom = 1 + STRENGTH * 1.2;                      // a little crop so shifted edges never show
  const PAN_MS = 5000;                                  // touch: one slow sway, left then right, per this long

  // Raymarch through the depth map (like parallax occlusion mapping): near things cover what's behind
  // them instead of showing up twice. uPush dollies forward: near layers move outward more than far ones.
  const VS = `attribute vec2 p; varying vec2 v; void main(){ v = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;
  const FS = `precision highp float;
    varying vec2 v;
    uniform sampler2D uColor, uDepth;
    uniform vec2 uTilt, uCover;
    uniform float uStrength, uFocus, uZoom, uPush;
    float depth(vec2 uv){ return texture2D(uDepth, uv).r; }
    void main(){
      vec2 uv = (v - 0.5) * uCover / uZoom + 0.5;
      uv.y = 1.0 - uv.y;
      uv = (uv - 0.5) / (1.0 + 0.10 * uPush) + 0.5;
      vec2 shift = uTilt * uStrength + (0.5 - uv) * 0.30 * uPush;
      const int N = 40;
      float prevH = 1.0, prevD = depth(uv + shift * (1.0 - uFocus));
      vec2 hit = uv + shift * (0.0 - uFocus);
      for (int i = 1; i <= N; i++) {
        float h = 1.0 - float(i) / float(N);
        vec2 s = uv + shift * (h - uFocus);
        float d = depth(s);
        if (d >= h) {
          float a = prevD - prevH, b = d - h;
          float hh = mix(prevH, h, clamp(a / max(a - b, 1e-4), 0.0, 1.0));
          hit = uv + shift * (hh - uFocus);
          break;
        }
        prevH = h; prevD = d;
      }
      gl_FragColor = vec4(texture2D(uColor, clamp(hit, 0.001, 0.999)).rgb, 1.0);
    }`;

  const cache = new Map();
  const load = src => {
    if (!cache.has(src)) cache.set(src, new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }));
    return cache.get(src);
  };
  const meanDepth = img => {                            // the map's average = the depth it tilts around
    const c = document.createElement('canvas'); c.width = 48; c.height = 27;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0, 48, 27);
    const px = x.getImageData(0, 0, 48, 27).data; let sum = 0;
    for (let i = 0; i < px.length; i += 4) sum += px[i];
    return sum / (px.length / 4) / 255;
  };
  // how far the map reaches from that depth (90th percentile): maps with a hard near/far split would
  // otherwise swing much harder than soft ones, so every picture is evened out to about the same movement
  const reach = (img, f) => {
    const c = document.createElement('canvas'); c.width = 48; c.height = 27;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0, 48, 27);
    const px = x.getImageData(0, 0, 48, 27).data, d = [];
    for (let i = 0; i < px.length; i += 4) d.push(Math.abs(px[i] / 255 - f));
    d.sort((a, b) => a - b);
    return d[Math.floor(d.length * 0.9)];
  };

  /* one canvas with its own WebGL context and its own state */
  function makeLayer() {
    const canvas = document.createElement('canvas');
    canvas.className = 'depth-layer';
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return null;
    const shader = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const textures = [0, 1].map(unit => {
      const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]])
        gl.texParameteri(gl.TEXTURE_2D, k, v);
      return t;
    });
    gl.uniform1i(U('uColor'), 0); gl.uniform1i(U('uDepth'), 1);
    // the crop is taken back in CSS, so the canvas lines up with the picture underneath:
    // hovered and scaled up on desktop (--fit), unhovered at rest (--rest), still on touch
    // (touch: the crop grows with the sway instead, so at rest the canvas matches the picture exactly)
    canvas.style.setProperty('--fit', touch ? '1' : (HOVER_SCALE / zoom).toFixed(4));
    canvas.style.setProperty('--rest', touch ? '1' : (1 / zoom).toFixed(4));

    const L = {
      canvas, owner: null, gen: 0, raf: 0, ready: false, settling: false, settleTimer: 0,
      aspect: 16 / 9, focus: 0.5, gain: 1, env: 0, pushT0: 0, push: 0, panT0: 0,
      target: { x: 0, y: 0 }, tilt: { x: 0, y: 0 }
    };
    const kick = L.kick = () => { if (!L.raf) L.raf = requestAnimationFrame(frame); };
    function frame() {
      L.raf = 0;
      if (!L.owner || !L.ready) return;
      const { tilt, target } = L;
      let moving = false;
      if (touch) {
        // the card in focus sways slowly on its own, left then right, until its slideshow moves on
        // it starts from rest and eases into the sway, so nothing jumps when the depth picture takes over
        const ms = L.panT0 ? performance.now() - L.panT0 : 0, t = ms / PAN_MS;
        const e = Math.min(1, ms / 2600), ease = e * e * (3 - 2 * e);   // the first swing stays small
        tilt.x = -Math.sin(t * Math.PI * 2) * ease; tilt.y = 0; L.env = ease;
        if (L.panT0 && L.owner.first) moving = true;
      } else {
        tilt.x += (target.x - tilt.x) * EASE; tilt.y += (target.y - tilt.y) * EASE;
        moving = Math.abs(target.x - tilt.x) + Math.abs(target.y - tilt.y) > 0.0005;
      }
      if (L.pushT0) {
        const t = Math.min(1, (performance.now() - L.pushT0) / PUSH_MS);
        L.push = t * t * (3 - 2 * t);
        if (t < 1) moving = true;
      }
      const a = canvas.width / canvas.height, as = L.aspect;
      gl.uniform2f(U('uCover'), ...(a > as ? [1, as / a] : [a / as, 1]));
      gl.uniform2f(U('uTilt'), -tilt.x, -tilt.y * VERTICAL);
      gl.uniform1f(U('uStrength'), STRENGTH * L.gain);
      gl.uniform1f(U('uFocus'), L.focus);
      gl.uniform1f(U('uZoom'), touch ? 1 + STRENGTH * 1.2 * L.env : zoom);
      gl.uniform1f(U('uPush'), L.push);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (moving) kick();
    }
    L.frame = frame;
    L.fit = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.offsetHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    L.upload = (unit, img) => {
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, textures[unit]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    };
    return L;
  }

  // jump between states without the CSS transition (e.g. back from the pushed-in look)
  const snap = (L, fn) => { L.canvas.style.transition = 'none'; fn(); void L.canvas.offsetWidth; L.canvas.style.transition = ''; };

  // hand a canvas to a card: load its pictures, draw once, then show it
  async function take(L, api) {
    const my = ++L.gen;
    clearTimeout(L.settleTimer);
    if (L.owner && L.owner !== api) L.owner.layer = null;
    L.owner = api; api.layer = L;
    L.ready = false; L.settling = false; L.pushT0 = 0; L.push = 0;
    if (!touch) L.tilt.x = L.tilt.y = L.target.x = L.target.y = 0;
    // desktop: it starts exactly like the picture underneath at rest (small, grey) and grows into the hover look
    // with the same timing as that picture, so taking over is as smooth as letting go
    snap(L, () => { L.canvas.classList.remove('on', 'leaving', 'out'); if (!touch) L.canvas.classList.add('out'); });
    api.stack.appendChild(L.canvas);
    let c, d;
    try { [c, d] = await Promise.all([load(api.colorSrc), load(api.depthSrc)]); } catch { return; }
    if (my !== L.gen) return;                           // it moved on while loading
    L.upload(0, c); L.upload(1, d);
    L.aspect = c.naturalWidth / c.naturalHeight;
    L.focus = api.pinnedFocus ?? (d._mean ??= meanDepth(d));
    L.gain = !touch ? 1 : Math.min(1.4, Math.max(0.5, 0.3 / Math.max(0.05, reach(d, L.focus))));
    L.fit(); L.ready = true;
    if (touch) L.panT0 = performance.now();
    L.frame();                                          // draw once before it shows
    if (L.settling) return;
    L.canvas.classList.remove('out');
    if (api.first) L.canvas.classList.add('on');
  }

  // desktop: the pointer left. The picture tilts back to rest and settles with the card, then fades out.
  function release(L) {
    const api = L.owner;
    if (!api) return;
    if (!L.ready || !L.canvas.classList.contains('on')) { drop(L); return; }   // nothing on show: just let go
    L.settling = true;
    L.target.x = L.target.y = 0; L.kick();
    L.canvas.classList.add('out');
    L.settleTimer = setTimeout(() => drop(L), SETTLE_MS);
  }
  function drop(L) {
    clearTimeout(L.settleTimer);
    if (L.owner) L.owner.layer = null;
    L.owner = null; L.gen++; L.settling = false;
    snap(L, () => L.canvas.classList.remove('on', 'leaving', 'out'));
  }

  const layers = [];
  for (let i = 0; i < (touch ? 1 : 2); i++) { const L = makeLayer(); if (L) layers.push(L); }
  if (!layers.length) return;

  /* touch: the card nearest the middle of the screen owns the canvas */
  const all = [];
  let scrollQueued = false;
  function onScroll() {
    scrollQueued = false;
    let best = null, bestD = Infinity;
    for (const api of all) {
      const r = api.card.getBoundingClientRect();
      if (!r.height || r.bottom < 0 || r.top > innerHeight) continue;
      const dist = Math.abs((r.top + r.bottom) / 2 - innerHeight / 2);
      if (dist < bestD) { bestD = dist; best = api; }
    }
    if (best && best !== layers[0].owner) take(layers[0], best);
  }
  if (touch) {
    const queue = () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); } };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', () => { if (layers[0].ready) layers[0].fit(); queue(); });
    setTimeout(queue, 300);
  }

  window.DepthTilt.attach = (card, colorSrc, depthSrc, pinnedFocus) => {
    const stack = card.querySelector('.image-stack');
    if (!stack || !depthSrc) return null;
    const api = {
      card, stack, colorSrc, depthSrc, pinnedFocus, first: true, layer: null,
      push() {
        api.first = false;
        const L = api.layer;
        if (!L || !L.ready || L.settling) return;
        L.pushT0 = performance.now();
        L.canvas.classList.remove('on'); L.canvas.classList.add('leaving');
        L.kick();
      },
      back() {
        api.first = true;
        const L = api.layer;
        if (!L || !L.ready || L.settling) return;
        L.pushT0 = 0; L.push = 0;
        if (touch) L.panT0 = performance.now();        // round again: pan again
        snap(L, () => L.canvas.classList.remove('leaving'));
        L.canvas.classList.add('on');
        L.kick();
      }
    };
    if (touch) { all.push(api); return api; }
    card.addEventListener('pointerenter', () => {
      const L = api.layer;
      if (L && L.settling) {                            // back in before it settled: carry on from here
        clearTimeout(L.settleTimer); L.settling = false;
        L.canvas.classList.remove('out');
        if (L.ready && api.first) L.canvas.classList.add('on');
        return;
      }
      if (L) return;
      // a free canvas, else the one that's been settling longest
      const free = layers.find(l => !l.owner) || layers.find(l => l.settling) || layers[0];
      take(free, api);
    });
    card.addEventListener('pointermove', e => {
      const L = api.layer;
      if (!L || L.settling) return;
      const r = card.getBoundingClientRect();
      L.target.x = (e.clientX - r.left) / r.width * 2 - 1;
      L.target.y = (e.clientY - r.top) / r.height * 2 - 1;
      L.kick();
    });
    card.addEventListener('pointerleave', () => { if (api.layer) release(api.layer); });
    return api;
  };
})();
