/* VAWnet v3 — front-end behaviour. Each init scopes to its own elements, so blocks can repeat on a page. */
(function () {
  'use strict';

  /* Quick exit: button + double ESC */
  var EXIT_URL = 'https://weather.com';
  function quickExit() { window.location.replace(EXIT_URL); }
  document.querySelectorAll('[data-quick-exit]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); quickExit(); });
  });
  var escTimes = [];
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var now = Date.now();
    escTimes = escTimes.filter(function (t) { return now - t < 900; }).concat(now);
    if (escTimes.length >= 2) { escTimes = []; quickExit(); }
  });

  /* Mega menus */
  var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-menu-toggle]'));
  function setMenu(btn, open) {
    var menu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (menu) menu.hidden = !open;
  }
  function closeMenus(except) { toggles.forEach(function (b) { if (b !== except) setMenu(b, false); }); }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeMenus(btn);
      setMenu(btn, open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mega-menu') && !e.target.closest('[data-menu-toggle]')) closeMenus();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });

  /* Mobile nav */
  document.querySelectorAll('[data-nav-toggle]').forEach(function (btn) {
    var header = btn.closest('.site-header');
    btn.addEventListener('click', function () {
      var open = !header.classList.contains('is-nav-open');
      header.classList.toggle('is-nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeMenus();
    });
  });

  /* Search scope pills */
  document.querySelectorAll('[data-scope-group]').forEach(function (group) {
    var form = group.closest('form');
    var input = form && form.querySelector('[data-scope-input]');
    group.querySelectorAll('[data-scope]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        group.querySelectorAll('[data-scope]').forEach(function (p) { p.setAttribute('aria-pressed', p === pill ? 'true' : 'false'); });
        if (input) input.value = pill.getAttribute('data-scope');
      });
    });
  });

  /* Save / bookmark toggles */
  document.querySelectorAll('[data-save]').forEach(function (btn) {
    var label = btn.querySelector('[data-save-label]');
    var off = label ? label.textContent : '';
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (label) label.textContent = on ? (btn.getAttribute('data-save-on') || 'Saved') : off;
    });
  });

  /* Search results: active-filter chips, clear all, mobile facet toggle */
  document.querySelectorAll('.search-results').forEach(function (block) {
    var boxes = Array.prototype.slice.call(block.querySelectorAll('[data-facet]'));
    var chips = block.querySelector('[data-active-filters]');
    function render() {
      if (!chips) return;
      chips.innerHTML = '';
      boxes.filter(function (b) { return b.checked; }).forEach(function (b) {
        var chip = document.createElement('button');
        chip.type = 'button'; chip.className = 'active-filter';
        chip.setAttribute('aria-label', 'Remove filter: ' + b.value);
        chip.innerHTML = '<span></span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        chip.firstChild.textContent = b.value;
        chip.addEventListener('click', function () { b.checked = false; render(); });
        chips.appendChild(chip);
      });
    }
    boxes.forEach(function (b) { b.addEventListener('change', render); });
    block.querySelectorAll('[data-facets-clear]').forEach(function (btn) {
      btn.addEventListener('click', function () { boxes.forEach(function (b) { b.checked = false; }); render(); });
    });
    block.querySelectorAll('[data-facets-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = !block.classList.contains('is-facets-open');
        block.classList.toggle('is-facets-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    render();
  });
})();
