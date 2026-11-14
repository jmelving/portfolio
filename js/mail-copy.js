/* mail-copy.js — "Get in touch" for everyone.
   A mailto: link does nothing when the visitor has no mail app set up (common on Linux, or with webmail only).
   So a click copies the address, the link's text reads "Copied!" for a moment (keeping its width, so nothing
   around it moves), and the mail app opens right after. Works for links added later too. */
(function () {
  const HOLD = 2500;          // ms "Copied!" stays
  const OPEN_DELAY = 350;     // ms before the mail app opens, so the change is seen first

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(() => true, () => false);
    try {                                              // older browsers / plain http
      const t = document.createElement('textarea');
      t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(t); t.select();
      const ok = document.execCommand('copy');
      t.remove();
      return Promise.resolve(ok);
    } catch (e) { return Promise.resolve(false); }
  }

  // the text to swap: a tile's big line, or the link itself
  function label(a) { return a.querySelector('b') || a; }

  function show(el, text) {
    if (!el._mail) {                                   // first click: remember how it was
      el._mail = { html: el.innerHTML, minWidth: el.style.minWidth };
      // buttons and tiles keep their width; a link inside running text (imprint) just reflows
      if (getComputedStyle(el).display !== 'inline') el.style.minWidth = el.getBoundingClientRect().width + 'px';
    }
    clearTimeout(el._mail.timer);
    el.textContent = text;
    el._mail.timer = setTimeout(() => {
      el.innerHTML = el._mail.html;
      el.style.minWidth = el._mail.minWidth;
      el._mail = null;
    }, HOLD);
  }

  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    const addr = decodeURIComponent(href.slice(7).split('?')[0]);
    const el = label(a);
    show(el, 'Copied!');
    copy(addr).then(ok => { if (!ok) show(el, addr); });   // copying blocked: show the address instead
    setTimeout(() => { location.href = href; }, OPEN_DELAY);
  });
})();
