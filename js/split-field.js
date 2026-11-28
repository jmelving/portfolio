/* ─────────────────────────────────────────────────────────
   split-field.js — the liquid black/white split, shared by the
   redesigned sub-pages (projects, project detail, curiosities).

   A fixed WebGL canvas draws a wavy seam (black to the right),
   lava blobs the cursor drags across it, and bubbles that rise
   off the edge. Everything works in viewport coordinates, so the
   seam stays put while the page scrolls underneath.

   Usage:
     const field = SplitField.init({ split: 0.24, splitMobile: 0.1 });
     field.setBias(-1)        // nudge the seam (negative = more black)
     field.setInkAlpha(0)     // make the black see-through (to show media behind)
     field.side(x, y)         // 'ink' | 'paper' for a viewport point

   Option lavaOver: true adds a second canvas above the page content that draws
   only the paper (seam + white lava). Content on the ink side can run under the
   wavy edge and gets cut by it; white lava flows over images, and black lava
   opens the paper up to reveal what lies beneath.
   Text (.ink-text) sits above both and inverts against whatever passes.
   Option inkOver: true is the opposite, for pages whose work sits on the paper:
   the overlay draws only the black, so ink pulled across flows over the images.

     const show = SplitField.slideshow(document.getElementById('project-bg'));
     show.images([...]); show.video(src); show.stop();
   ───────────────────────────────────────────────────────── */

(() => {
  // phones, tablets and anything touch-only get the stacked layout, whatever its width
  window.PHONE_LAYOUT = window.PHONE_LAYOUT || (() => matchMedia('(max-width:1024px), (hover:none) and (pointer:coarse)').matches);
  const PAPER = '#eeebe5', INK = '#0c0c0c';
  const MAX_BLOBS = 48;

  const wave = (s, t) =>
      0.62 * Math.sin(s * 5.2  + t * 0.32)
    + 0.38 * Math.sin(s * 11.3 - t * 0.47 + 1.7)
    + 0.18 * Math.sin(s * 2.1  + t * 0.19 + 4.0);

  const FS = `
    #extension GL_OES_standard_derivatives : enable
    precision highp float;
    uniform vec2  uView;
    uniform float uDpr, uTime, uCenter, uAmp, uSoft, uPull, uPullAt, uReach;
    uniform vec4  uBlobs[${MAX_BLOBS}];   // x, y, radius, signed weight
    uniform vec3  uPaper, uInk;
    uniform float uInkAlpha;
    uniform float uMode;      // 0 = seam only, 1 = seam + lava, 2 = paper-only overlay, 3 = ink-only overlay
    uniform float uHoriz;     // 1 = horizontal seam (paper above, ink below), used on mobile
    uniform vec4  uSlit;      // a slit cut into the seam (the film's window): x, y (viewport px), radius, neck width
    uniform vec3  uSlit2;     // its smear along the line, rim wobble, on (0/1)
    uniform float uSlitSnap;  // 0 = the drop sits where it's put (springing, leaning), 1 = pinned onto the line
    uniform float uVeil;      // the ink side's dimming outside the slit (what shows through stays bright inside it)

    float smin(float a, float b, float k){ if (k <= 0.0) return min(a, b); float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }

    float wave(float s){
      return 0.62 * sin(s * 5.2  + uTime * 0.32)
           + 0.38 * sin(s * 11.3 - uTime * 0.47 + 1.7)
           + 0.18 * sin(s * 2.1  + uTime * 0.19 + 4.0);
    }
    float tanh_(float x){ x = clamp(x, -9.0, 9.0); float e = exp(2.0 * x); return (e - 1.0) / (e + 1.0); }

    void main(){
      vec2 p = vec2(gl_FragCoord.x, uView.y * uDpr - gl_FragCoord.y) / uDpr;
      float along = mix(p.y, p.x, uHoriz);
      float cross = mix(p.x, p.y, uHoriz);
      float len   = mix(uView.y, uView.x, uHoriz);
      float g = exp(-pow((along - uPullAt) / uReach, 2.0));
      float edge = uCenter + uAmp * wave(along / len) + uPull * g;
      float I0 = 0.5 + 0.5 * tanh_((cross - edge) / uSoft);
      float I = I0;

      if (uMode > 0.5) {
        for (int i = 0; i < ${MAX_BLOBS}; i++) {
          vec4 b = uBlobs[i];
          if (b.z <= 0.0) continue;
          vec2 q = (p - b.xy) / b.z;
          float x = dot(q, q);
          if (x < 1.0) { float k = 1.0 - x; I += b.w * k * k; }
        }
      }

      #ifdef GL_OES_standard_derivatives
        float w = max(fwidth(I), 1e-4) * 0.8;
      #else
        float w = 0.03;
      #endif
      float a = smoothstep(0.5 - w, 0.5 + w, I);

      // the slit: a drop sitting on the line, joined to it by a smooth neck and a thin smear along it —
      // computed from the same edge as the seam, so it can never drift off the line
      float hole = 0.0;
      if (uSlit2.z > 0.5) {
        float bAlong = mix(uSlit.y, uSlit.x, uHoriz);
        float bEdge = uCenter + uAmp * wave(bAlong / len) + uPull * exp(-pow((bAlong - uPullAt) / uReach, 2.0));
        vec2 bc = mix(uSlit.xy, mix(vec2(bEdge, bAlong), vec2(bAlong, bEdge), uHoriz), uSlitSnap);
        vec2 q = p - bc;
        float an = atan(q.y, q.x);
        float rr = uSlit.z * (1.0 + uSlit2.y * (0.035 * sin(3.0 * an + uTime * 0.9) + 0.025 * sin(5.0 * an - uTime * 1.3)));
        float db = length(q) - rr;
        float near = exp(-dot(q, q) / pow(max(uSlit.w, 1.0) * 3.2 + uSlit.z * 1.6, 2.0));
        float ds = abs(cross - edge) - uSlit2.x * near;
        float d = uSlit.w > 0.5 ? smin(db, ds + (1.0 - near) * 400.0, uSlit.w) : db;
        #ifdef GL_OES_standard_derivatives
          float aw = max(fwidth(d), 0.5);
        #else
          float aw = 1.0;
        #endif
        hole = smoothstep(aw, -aw, d);
      }

      if (uMode > 2.5) {
        // overlay, drawn above the page content: only the ink.
        // For pages whose work sits on the paper: black pulled across flows over it.
        gl_FragColor = vec4(uInk * a, a);
        return;
      }
      if (uMode > 1.5) {
        // overlay, drawn above the page content: only the paper.
        // Black is the background here, so black lava doesn't paint over anything —
        // it opens holes in the paper and shows whatever lies underneath.
        float paper = (1.0 - a) * (1.0 - hole);
        gl_FragColor = vec4(uPaper * paper, paper);
        return;
      }
      float ink = a * max(uInkAlpha, uVeil);
      gl_FragColor = vec4(uPaper * (1.0 - a) + uInk * ink, (1.0 - a) + ink) * (1.0 - hole);
    }`;

  function init(opts = {}) {
    const o = Object.assign({
      split: 0.5, splitMobile: null,  // where the seam rests, as a fraction of viewport width
      mobileAxis: 'x',                // 'y' = on mobile the seam runs horizontally; splitMobile is then a fraction of the height
      enterFrom: 0.5,                 // seam starts here and eases to `split` (feels like a page transition)
      inkAlpha: 1,
      lava: true, ambient: true,
      lavaOver: false,                // draw the lava above the page content
      inkOver: false,                 // draw the black (seam + black lava) above the page content instead
    }, opts);
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // arriving by a swipe on the front page (phones): start the seam exactly where it was left there,
    // wave and all, and glide on to this page's own rest from that spot
    let hand = null;
    try {
      const h = JSON.parse(sessionStorage.getItem('seam-handoff') || 'null');
      sessionStorage.removeItem('seam-handoff');
      if (h && Date.now() - h.at < 5000 && h.to === location.pathname && PHONE_LAYOUT() && o.mobileAxis === 'y') hand = h;
    } catch {}
    if (hand) o.enterFrom = Math.min(0.95, Math.max(0.05, hand.y));
    if (hand) document.documentElement.classList.add('seam-handoff');   // css: the page's words come in with it, not after
    if (hand) {
      // words and work come in together, once the pictures in view are ready (or after 0.8 s at most)
      const veil = Object.assign(document.createElement('div'), { className: 'handoff-veil' });
      document.body.appendChild(veil);
      const reveal = () => {
        document.documentElement.classList.add('handoff-in');
        veil.addEventListener('transitionend', () => veil.remove(), { once: true });
        setTimeout(() => veil.remove(), 1200);
      };
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const inView = [...document.querySelectorAll('main img')].filter(im => {
          const r = im.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width;
        });
        Promise.race([
          Promise.all(inView.map(im => (im.decode ? im.decode() : Promise.resolve()).catch(() => {}))),
          new Promise(r => setTimeout(r, 800)),
        ]).then(reveal);
      }));
    }
    const waveOff = hand ? hand.t + (Date.now() - hand.at) / 1000 : 0;

    // one WebGL layer per canvas; with lavaOver there are two (seam below, lava above the content)
    function layer(cls, mode) {
      const cv = document.createElement('canvas');
      cv.className = cls;
      cv.setAttribute('aria-hidden', 'true');
      document.body.prepend(cv);
      const gl = cv.getContext('webgl', { premultipliedAlpha: true, antialias: false });
      if (!gl) return null;
      gl.getExtension('OES_standard_derivatives');
      const sh = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src); gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s);
        return s;
      };
      try {
        const prog = gl.createProgram();
        gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }'));
        gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(prog);
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        const U = {};
        ['uView','uDpr','uTime','uCenter','uAmp','uSoft','uPull','uPullAt','uReach','uBlobs','uPaper','uInk','uInkAlpha','uMode','uHoriz','uSlit','uSlit2','uVeil','uSlitSnap']
          .forEach(n => U[n] = gl.getUniformLocation(prog, n));
        const hex = h => [1,3,5].map(i => parseInt(h.substr(i, 2), 16) / 255);
        gl.uniform3fv(U.uPaper, hex(PAPER));
        gl.uniform3fv(U.uInk, hex(INK));
        gl.uniform1f(U.uMode, mode);
        return { cv, gl, U };
      } catch (err) { console.warn(err); return null; }
    }
    // the seam layer always includes the lava, so where a blob crosses the seam there is no
    // original edge left underneath to shimmer through; the overlay only adds it over content
    const layers = [layer('field', 1)];
    if (o.lavaOver && o.lava) layers.push(layer('field over', 2));
    else if (o.inkOver) layers.push(layer('field over', 3));
    const U = layers.every(Boolean) ? layers[0].U : null;
    if (!U) document.body.classList.add('nogl');

    let W, H, dpr = 1, mobile = false, horiz = false;
    const restTarget = () => (mobile && o.splitMobile != null) ? o.splitMobile : o.split;
    let restNow = null, seamYShown = -1;                // eases toward restTarget (setSplitMobile moves it)
    const restFrac = () => restNow ?? restTarget();
    function resize() {
      W = innerWidth; H = innerHeight;
      mobile = PHONE_LAYOUT();
      horiz = mobile && o.mobileAxis === 'y';
      document.body.classList.toggle('seam-horizontal', horiz);
      document.documentElement.style.setProperty('--seam-y', horiz ? (restFrac() * 100).toFixed(2) + 'svh' : '0px');
      dpr = Math.min(devicePixelRatio || 1, 1.25);
      if (U) layers.forEach(L => {
        L.cv.width = Math.round(W * dpr); L.cv.height = Math.round(H * dpr);
        L.gl.viewport(0, 0, L.cv.width, L.cv.height);
      });
      document.documentElement.style.setProperty('--seam', (restFrac() * 100).toFixed(2) + 'vw');
    }
    resize();
    addEventListener('resize', resize);

    /* pointer (viewport coords) */
    const ptr = { x: -1e4, y: -1e4, hx: -1e4, hy: -1e4, vx: 0, vy: 0, k: 0, kT: 0, seen: false };
    let lastX = 0, lastY = 0, speed = 0;
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      if (!ptr.seen) { ptr.hx = lastX = e.clientX; ptr.hy = lastY = e.clientY; ptr.seen = true; }
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.kT = 1;
    });
    document.addEventListener('pointerleave', () => ptr.kT = 0);
    // phones: the finger stirs the lava like the cursor does; lifting it lets things settle
    const touchAt = e => { const tp = e.touches[0]; if (tp) { ptr.x = tp.clientX; ptr.y = tp.clientY; ptr.kT = 1; } };
    addEventListener('touchstart', e => {
      const tp = e.touches[0]; if (!tp) return;
      ptr.hx = lastX = tp.clientX; ptr.hy = lastY = tp.clientY; ptr.seen = true; charge = 0;
      touchAt(e);
    }, { passive: true });
    addEventListener('touchmove', touchAt, { passive: true });
    addEventListener('touchend', () => { ptr.kT = 0; }, { passive: true });
    addEventListener('touchcancel', () => { ptr.kT = 0; }, { passive: true });

    /* lava */
    let charge = 0, spawnX = 0, spawnY = 0, nextBubble = 2.5;
    const blobs = [], blobData = new Float32Array(MAX_BLOBS * 4);
    const rand = (a, b) => a + Math.random() * (b - a);
    const addBlob = b => {
      if (blobs.length < MAX_BLOBS - 1)
        blobs.push(Object.assign({ vx: 0, vy: 0, grow: 0, life: 1, span: rand(5, 8) }, b));
    };

    let bias = 0, biasT = 0, inkA = o.inkAlpha, inkT = o.inkAlpha;
    let center = W * o.enterFrom;
    const t0 = performance.now();
    let prev = t0;
    const ease = x => 1 - Math.pow(1 - x, 4);
    const state = { edgeAt: y => center };
    const slit = { x: 0, y: 0, r: 0, k: 0, th: 0, wob: 1, on: 0, snap: 0 }; let veil = 0;   // set by the page (setSlit / setVeil)

    function frame(now) {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      const t = still ? 0 : (now - t0) / 1000;
      const tw = still ? 0 : t + waveOff;                // the wave's clock (continues the front page's on a handoff)
      const intro = still ? 1 : ease(Math.min(1, Math.max(0, (t - (hand ? 0 : 0.1)) / 1.4)));

      bias += (biasT - bias) * 0.05;
      ptr.k += (ptr.kT - ptr.k) * 0.06;
      inkA += (inkT - inkA) * (inkT < inkA ? 0.09 : 0.05);

      // span = across the seam, len = along it
      const span = horiz ? H : W, len = horiz ? W : H;
      const pAlong = horiz ? ptr.x : ptr.y, pCross = horiz ? ptr.y : ptr.x;
      restNow = restNow == null ? restTarget() : restNow + (restTarget() - restNow) * 0.07;
      if (horiz) {
        const sy = Math.round(restNow * H);
        if (sy !== seamYShown) { seamYShown = sy; document.documentElement.style.setProperty('--seam-y', sy + 'px'); }
      }
      const amp = Math.min(W, H) * 0.028;
      const from = span * o.enterFrom, to = span * restFrac();
      center = from + (to - from) * intro + bias * span * 0.045;

      const pull = Math.max(-1, Math.min(1, (pCross - center) / (span * 0.35))) * span * 0.03 * ptr.k;
      const reach = len * 0.22;
      const ampNow = amp * (hand ? 1 : 0.4 + 0.6 * intro);
      const edgeAt = a => center + ampNow * wave(a / len, tw) + pull * Math.exp(-Math.pow((a - pAlong) / reach, 2));
      state.edgeAt = edgeAt;
      const sideDist = (x, y) => horiz ? y - edgeAt(x) : x - edgeAt(y);

      if (!still && o.lava) {
        if (ptr.seen) {
          const dx = ptr.x - lastX, dy = ptr.y - lastY, d = Math.hypot(dx, dy);
          lastX = ptr.x; lastY = ptr.y;
          ptr.vx += (dx / Math.max(dt, 1e-3) - ptr.vx) * 0.25;
          ptr.vy += (dy / Math.max(dt, 1e-3) - ptr.vy) * 0.25;
          speed = Math.hypot(ptr.vx, ptr.vy);
          const under = sideDist(ptr.x, ptr.y) > 0 ? 1 : -1;
          if (charge === 0) charge = under;
          charge += (under - charge) * (1 - Math.exp(-(d * 0.0016 + dt * 0.45)));
          ptr.hx += (ptr.x - ptr.hx) * 0.3;
          ptr.hy += (ptr.y - ptr.hy) * 0.3;
          if (Math.hypot(ptr.x - spawnX, ptr.y - spawnY) > 15 && ptr.k > 0.5 && charge * under < 0.6) {
            spawnX = ptr.x; spawnY = ptr.y;
            addBlob({ x: ptr.x, y: ptr.y, vx: ptr.vx * 0.12, vy: ptr.vy * 0.12,
                      r: 44 + Math.min(30, speed * 0.025), s: charge, grow: 1,
                      lift: rand(25, 70), drift: rand(-6, 6) });
          }
        }
        if (o.ambient && t > nextBubble && intro > 0.99) {
          nextBubble = t + rand(2.4, 5);
          const s = Math.random() < 0.5 ? 1 : -1;            // +1: black into the paper, -1: paper into the black
          if (horiz) {
            // horizontal seam: black rises up into the paper, paper sinks down into the black
            const x = rand(0.08, 0.92) * W;
            addBlob({ x, y: edgeAt(x) - s * 18, r: rand(26, 44), s, lift: s * rand(10, 22), drift: rand(-4, 4) });
          } else {
            const y = rand(0.45, 1.0) * H;
            addBlob({ x: edgeAt(y) - s * 18, y, r: rand(34, 56), s, lift: rand(12, 26), drift: -s * rand(8, 16) });
          }
        }
        for (let i = blobs.length - 1; i >= 0; i--) {
          const b = blobs[i];
          b.grow = Math.min(1, b.grow + dt / 1.6);
          b.vx += b.drift * dt; b.vy -= b.lift * dt;
          const drag = Math.exp(-dt * 1.4);
          b.vx *= drag; b.vy *= drag;
          b.vx += Math.sin(t * 0.9 + i * 1.7) * 4 * dt;
          b.x += b.vx * dt; b.y += b.vy * dt;
          const sd = sideDist(b.x, b.y);
          let decay = dt / b.span;
          if (Math.sign(sd) === Math.sign(b.s) && Math.abs(sd) > b.r) decay *= 4;
          if (b.y < -b.r || b.y > H + b.r) decay = 1;
          b.life -= decay;
          if (b.life <= 0) blobs.splice(i, 1);
        }
      }

      if (U) {
        blobData.fill(0);
        blobData[0] = ptr.hx; blobData[1] = ptr.hy;
        blobData[2] = 58 + Math.min(40, speed * 0.04);
        blobData[3] = (still || !o.lava) ? 0 : charge * 1.4 * ptr.k;
        blobs.forEach((b, i) => {
          const k = (i + 1) * 4, fade = Math.min(1, b.life * 3);
          blobData[k] = b.x; blobData[k + 1] = b.y;
          blobData[k + 2] = b.r * (0.45 + 0.55 * b.life) * (0.3 + 0.7 * ease(b.grow));
          blobData[k + 3] = b.s * 1.5 * fade;
        });
        layers.forEach(({ gl, U }) => {
          gl.uniform2f(U.uView, W, H);
          gl.uniform1f(U.uDpr, dpr);
          gl.uniform1f(U.uTime, tw);
          gl.uniform1f(U.uCenter, center);
          gl.uniform1f(U.uAmp, ampNow);
          gl.uniform1f(U.uSoft, 70);
          gl.uniform1f(U.uPull, pull);
          gl.uniform1f(U.uPullAt, pAlong);
          gl.uniform1f(U.uHoriz, horiz ? 1 : 0);
          gl.uniform1f(U.uReach, reach);
          gl.uniform4fv(U.uBlobs, blobData);
          gl.uniform1f(U.uInkAlpha, inkA);
          gl.uniform4f(U.uSlit, slit.x, slit.y, slit.r, slit.k);
          gl.uniform3f(U.uSlit2, slit.th, slit.wob, slit.on && slit.r + slit.th > 0.5 ? 1 : 0);
          gl.uniform1f(U.uVeil, veil);
          gl.uniform1f(U.uSlitSnap, slit.snap);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        });
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    requestAnimationFrame(() => document.body.classList.add('ready'));

    return {
      setBias: v => { biasT = v; },
      setInkAlpha: a => { inkT = a; },
      side: (x, y) => ((horiz ? y - state.edgeAt(x) : x - state.edgeAt(y)) > 0 ? 'ink' : 'paper'),
      edgeAt: a => state.edgeAt(a),   // vertical seam: x at height a · horizontal seam: y at x = a
      horizontal: () => horiz,
      setSplitMobile: v => { o.splitMobile = v; },     // move the mobile seam (eases there)
      setSlit: s => { Object.assign(slit, s); },        // cut a slit into the seam (x, y viewport px; snap 1 pins it onto the line)
      setVeil: v => { veil = v; },
    };
  }

  /* ── Slideshow: punch in fast → slow drift → shoot out while the next fades in on top ── */
  function slideshow(root, { slideMs = 2600 } = {}) {
    const slots = [document.createElement('img'), document.createElement('img')];
    const vid = Object.assign(document.createElement('video'), { muted: true, loop: true, playsInline: true, preload: 'none' });
    slots.forEach(s => { s.alt = ''; root.appendChild(s); });
    root.appendChild(vid);
    let slot = 0, token = 0, timer = null;

    function show(src) {
      const tk = ++token;
      const next = slots[slot ^ 1], cur = slots[slot];
      const go = () => {
        if (tk !== token) return;
        slot ^= 1;
        const cs = getComputedStyle(cur);
        const op = cs.opacity, tf = cs.transform === 'none' ? 'scale(1.16)' : cs.transform;
        cur.getAnimations().forEach(a => a.cancel());
        cur.animate([
          { transform: tf, opacity: op, easing: 'cubic-bezier(.5,0,.8,.45)' },
          { transform: 'scale(1)', opacity: op, offset: 0.999 },
          { transform: 'scale(1)', opacity: 0 },
        ], { duration: 660, fill: 'forwards' });
        next.getAnimations().forEach(a => a.cancel());
        next.style.zIndex = 2; cur.style.zIndex = 1;
        const len = slideMs * 2.2;
        next.animate([
          { transform: 'scale(1.34)', opacity: 0, easing: 'cubic-bezier(.2,.75,.45,.95)' },
          { opacity: 1, offset: 300 / len },
          { transform: 'scale(1.2)', offset: 0.13, easing: 'linear' },
          { transform: 'scale(1.16)', opacity: 1 },
        ], { duration: len, delay: 360, fill: 'both' });
      };
      if (next.getAttribute('src') !== src) next.src = src;
      (next.decode ? next.decode() : Promise.resolve()).then(go, go);
    }

    let gen = 0;                                        // bumped on every change, so a late 'canplay' can't override it
    const api = {
      resume(list) {                                    // carry on from the picture that's showing (no jump back to the first)
        gen++; clearInterval(timer);
        if (root.classList.contains('is-video')) return;
        const cur = slots[slot].getAttribute('src');
        let i = Math.max(0, list.indexOf(cur));
        if (list.length > 1) timer = setInterval(() => show(list[++i % list.length]), slideMs);
      },
      images(list) {
        gen++;
        root.classList.remove('is-video');
        vid.pause();
        list.forEach(s => { const im = new Image(); im.src = s; im.decode && im.decode().catch(() => {}); });
        let i = 0;
        clearInterval(timer);
        show(list[0]);
        if (list.length > 1) timer = setInterval(() => show(list[++i % list.length]), slideMs);
      },
      video(src) {
        clearInterval(timer);
        if (vid.getAttribute('src') !== src) vid.src = src;
        vid.currentTime = 0;
        vid.play().catch(() => {});
        root.classList.add('is-video');
      },
      // stills first, then fade to the clip once it can play — a slow connection just keeps the slideshow
      imagesThenVideo(list, src) {
        api.images(list);
        const g = gen;
        if (vid.getAttribute('src') !== src) { vid.preload = 'auto'; vid.src = src; vid.load(); }
        const go = () => { if (g === gen) api.video(src); };
        if (vid.readyState >= 3) go(); else vid.addEventListener('canplay', go, { once: true });
      },
      stop() { gen++; clearInterval(timer); vid.pause(); },
    };
    return api;
  }

  /* ── Video modal (YouTube / Vimeo) ── */
  function modal() {
    const m = document.createElement('div');
    m.className = 'split-modal';
    m.innerHTML = '<button type="button">Close</button><div><iframe allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><video controls playsinline hidden></video></div>';
    document.body.appendChild(m);
    const frame = m.querySelector('iframe'), film = m.querySelector('video');
    // closing: the film freezes on the frame it's at and fades out like that; the player is only emptied once it's
    // out of sight (emptying it earlier made it jump to a blank/first frame while still fading)
    const close = () => {
      if (!m.classList.contains('open')) return;
      try { frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*'); frame.contentWindow.postMessage({ method: 'pause' }, '*'); } catch {}
      m.classList.remove('open'); film.pause();
      setTimeout(() => {
        if (m.classList.contains('open') || armed) return;              // (opened again meanwhile: leave the new film alone)
        frame.src = ''; film.removeAttribute('src'); film.load();
      }, 1300);
    };
    m.querySelector('button').addEventListener('click', close);
    m.addEventListener('click', e => { if (e.target === m) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) { close(); disarm(); } });
    const embed = src => { film.hidden = true; frame.hidden = false; frame.src = src; m.classList.add('open'); };
    // prepare → start → reveal: the player loads early (prepare: on the way to the button), starts playing silently
    // and out of sight the moment it's chosen (start), and when it's shown (reveal) it goes back to the beginning
    // and gets its sound — already running, so there is no black frame and no wait
    let armed = null, armedId = null, kicks = [], isPlaying = false, revealed = false;
    const send = (yt, vimeo) => {
      if (!armed || armed === 'file') return;
      try { frame.contentWindow.postMessage(armed === 'vimeo' ? vimeo : JSON.stringify({ event: 'command', func: yt[0], args: yt[1] || [] }), '*'); } catch {}
    };
    const play = () => send(['playVideo'], { method: 'play' });
    const hush = () => send(['mute'], { method: 'setVolume', value: 0 });
    const sound = () => send(['unMute'], { method: 'setVolume', value: 1 });
    const repeat = (fn, ms) => { kicks.forEach(clearTimeout); kicks = ms.map(t => setTimeout(fn, t)); };
    frame.addEventListener('load', () => {
      // ask the player to tell us how it's doing (YouTube / Vimeo talk back through postMessage)
      try { frame.contentWindow.postMessage(armed === 'vimeo' ? { method: 'addEventListener', value: 'play' } : JSON.stringify({ event: 'listening', id: 1 }), '*'); } catch {}
    });
    let showAnyway = 0;
    const show = () => { clearTimeout(showAnyway); m.classList.add('playing'); };
    const playing = () => {
      if (isPlaying) return;
      isPlaying = true; kicks.forEach(clearTimeout); kicks = [];
      if (revealed) show();
    };
    addEventListener('message', e => {
      if (!armed || e.source !== frame.contentWindow) return;
      let d = e.data; if (typeof d === 'string') { try { d = JSON.parse(d); } catch { return; } }
      if (!d) return;
      if (d.event === 'infoDelivery' && d.info && d.info.playerState === 1) playing();   // YouTube: playing
      if (d.event === 'onStateChange' && d.info === 1) playing();
      if (d.event === 'play' || d.method === 'play') playing();                          // Vimeo
    });
    film.addEventListener('playing', () => { if (armed === 'file') playing(); });
    const disarm = () => {
      clearTimeout(showAnyway); kicks.forEach(clearTimeout); kicks = [];
      armed = armedId = null; isPlaying = revealed = false;
      setTimeout(() => { if (!m.classList.contains('open')) m.classList.remove('soft', 'playing'); }, 1100);   // (soft stays through the fade-out)
    };
    m.querySelector('button').addEventListener('click', disarm);
    m.addEventListener('click', e => { if (e.target === m) disarm(); });
    return {
      youtube(id) { embed(`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`); },
      vimeo(id)   { embed(`https://player.vimeo.com/video/${id}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`); },
      file(src)   { frame.hidden = true; film.hidden = false; film.src = src; m.classList.add('open'); film.play().catch(() => {}); },   // a video hosted on this site
      prepare(id, platform) {                      // load it, paused (does nothing if it's already loaded)
        platform = platform || 'youtube';
        if (armedId === id && armed) return;
        disarm();
        armedId = id;
        if (platform === 'file') { frame.hidden = true; film.hidden = false; film.src = id; film.preload = 'auto'; armed = 'file'; return; }
        film.hidden = true; frame.hidden = false; armed = platform === 'vimeo' ? 'vimeo' : 'youtube';
        frame.src = armed === 'vimeo'
          ? `https://player.vimeo.com/video/${id}?autoplay=0&api=1&muted=1&color=ffffff&title=0&byline=0&portrait=0`
          : `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&mute=1&enablejsapi=1&playsinline=1&rel=0&origin=${encodeURIComponent(location.origin)}`;
      },
      start() {                                    // chosen: play silently, out of sight, so it's running by the time it shows
        if (armed === 'file') { film.muted = true; film.play().catch(() => {}); return; }
        hush(); play();
        repeat(() => { hush(); play(); }, [250, 600, 1000, 1500, 2200, 3000]);
      },
      reveal() {                                   // soft: over what's already on screen, not out of black
        revealed = true;
        m.classList.add('soft', 'open');
        const fromTheTop = () => {
          if (armed === 'file') { film.currentTime = 0; film.muted = false; film.play().catch(() => {}); return; }
          send(['seekTo', [0, true]], { method: 'setCurrentTime', value: 0 }); sound(); play();
        };
        if (isPlaying) { fromTheTop(); setTimeout(show, 160); }      // already running: back to the start, sound on, show it
        else repeat(() => { sound(); play(); }, [0, 300, 700, 1200, 1800, 2600]);   // still loading: it shows once it plays
        showAnyway = setTimeout(show, 4500);       // (no word from the player: show it anyway, with its own play button)
      },
      close: () => { disarm(); close(); },
      element: m,
    };
  }

  window.SplitField = { init, slideshow, modal };
})();
