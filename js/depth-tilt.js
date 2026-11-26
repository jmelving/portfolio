/* depth-tilt.js — the first picture of a project card tilts with the pointer through its depth map,
   like a lenticular card, and pushes in through that depth when the card's slideshow moves on.

   DepthTilt.attach(card, colorSrc, depthSrc, focus?) → { push(), back() } or null
     card      the .gallery-item; its .image-stack gets the canvas while hovered
     focus     the depth the picture tilts around (0 far … 1 near); default: the map's average

   One shared WebGL canvas moves into whichever card is hovered, so the page never holds more than one
   context, and the pictures are only uploaded while they're shown.
   Touch screens: no pointer to follow, so the card nearest the middle of the screen takes the canvas and
   tilts up and down as it scrolls past. Reduced motion gets the plain pictures. */
(() => {
  const STRENGTH = 0.03, VERTICAL = 1, EASE = 0.08, PUSH_MS = 450, HOVER_SCALE = 1.045;
  window.DepthTilt = { attach: () => null };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const touch = !matchMedia('(hover:hover) and (pointer:fine)').matches;

  const canvas = document.createElement('canvas');
  canvas.className = 'depth-layer';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;

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
  const shader = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
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
  const zoom = 1 + STRENGTH * 1.2;                      // a little crop so shifted edges never show
  // …taken back in CSS, so it lines up with the picture underneath (hovered and scaled up on desktop, still on touch)
  canvas.style.setProperty('--fit', ((touch ? 1 : HOVER_SCALE) / zoom).toFixed(4));

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

  let owner = null, gen = 0, raf = 0, ready = false, aspect = 16 / 9, focus = 0.5, pushT0 = 0, push = 0;
  const target = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  function frame() {
    raf = 0;
    if (!owner || !ready) return;
    tilt.x += (target.x - tilt.x) * EASE; tilt.y += (target.y - tilt.y) * EASE;
    let moving = Math.abs(target.x - tilt.x) + Math.abs(target.y - tilt.y) > 0.0005;
    if (pushT0) {
      const t = Math.min(1, (performance.now() - pushT0) / PUSH_MS);
      push = t * t * (3 - 2 * t);
      if (t < 1) moving = true;
    }
    const a = canvas.width / canvas.height;
    gl.uniform2f(U('uCover'), ...(a > aspect ? [1, aspect / a] : [a / aspect, 1]));
    gl.uniform2f(U('uTilt'), -tilt.x, -tilt.y * VERTICAL);
    gl.uniform1f(U('uStrength'), STRENGTH);
    gl.uniform1f(U('uFocus'), focus);
    gl.uniform1f(U('uZoom'), zoom);
    gl.uniform1f(U('uPush'), push);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (moving) kick();
  }
  const fit = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.offsetHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const upload = (unit, img) => {
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, textures[unit]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
  };
  // jump between states without the CSS transition (e.g. back from the pushed-in look)
  const snap = fn => { canvas.style.transition = 'none'; fn(); void canvas.offsetWidth; canvas.style.transition = ''; };

  // hand the canvas to a card: load its pictures, draw once, then show it
  async function take(api) {
    const my = ++gen;
    owner = api; ready = false; pushT0 = 0; push = 0;
    if (!touch) tilt.x = tilt.y = target.x = target.y = 0;
    snap(() => canvas.classList.remove('on', 'leaving'));
    api.stack.appendChild(canvas);
    let c, d;
    try { [c, d] = await Promise.all([load(api.colorSrc), load(api.depthSrc)]); } catch { return; }
    if (my !== gen) return;                             // it moved on while loading
    upload(0, c); upload(1, d);
    aspect = c.naturalWidth / c.naturalHeight;
    focus = api.pinnedFocus ?? (d._mean ??= meanDepth(d));
    fit(); ready = true;
    if (touch) scrollTilt(true);
    frame();                                            // draw once before it shows
    if (api.first) canvas.classList.add('on');
  }

  /* touch: the card nearest the middle owns the canvas; its place on screen is the tilt */
  const all = [];
  function scrollTilt(jump) {
    if (!owner) return;
    const r = owner.card.getBoundingClientRect();
    target.x = 0;
    target.y = Math.max(-1, Math.min(1, ((r.top + r.bottom) / 2 - innerHeight / 2) / (innerHeight / 2)));
    if (jump) tilt.y = target.y;
    kick();
  }
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
    if (best && best !== owner) take(best);
    else scrollTilt();
  }
  if (touch) {
    const queue = () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); } };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', () => { if (ready) fit(); queue(); });
    setTimeout(queue, 300);
  }

  window.DepthTilt.attach = (card, colorSrc, depthSrc, pinnedFocus) => {
    const stack = card.querySelector('.image-stack');
    if (!stack || !depthSrc) return null;
    const api = {
      card, stack, colorSrc, depthSrc, pinnedFocus, first: true,
      push() {
        api.first = false;
        if (owner !== api || !ready) return;
        pushT0 = performance.now();
        canvas.classList.remove('on'); canvas.classList.add('leaving');
        kick();
      },
      back() {
        api.first = true;
        if (owner !== api || !ready) return;
        pushT0 = 0; push = 0;
        snap(() => canvas.classList.remove('leaving'));
        canvas.classList.add('on');
        kick();
      }
    };
    if (touch) { all.push(api); return api; }
    card.addEventListener('pointerenter', () => take(api));
    card.addEventListener('pointermove', e => {
      if (owner !== api) return;
      const r = card.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width * 2 - 1;
      target.y = (e.clientY - r.top) / r.height * 2 - 1;
      kick();
    });
    card.addEventListener('pointerleave', () => {
      if (owner !== api) return;
      owner = null; gen++;
      canvas.classList.remove('on', 'leaving');
    });
    return api;
  };
})();
