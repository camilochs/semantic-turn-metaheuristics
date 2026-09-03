(function () {
  'use strict';

  /* ── theme ─────────────────────────────────────────── */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('st-theme'); } catch (e) {}
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);
  function sysDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncIcon() {
    var t = root.getAttribute('data-theme');
    var dark = t === 'dark' || (!t && sysDark());
    root.classList.toggle('dark-pref', dark);
  }
  syncIcon();
  var btn = document.getElementById('theme');
  if (btn) btn.addEventListener('click', function () {
    var t = root.getAttribute('data-theme');
    var dark = t === 'dark' || (!t && sysDark());
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('st-theme', next); } catch (e) {}
    syncIcon();
  });

  /* ── helpers ───────────────────────────────────────── */
  function chClass(c) {
    var k = String(c).replace('†', '').trim();
    if (k === 'Numeric') return 'p-num';
    if (k === 'Symbolic') return 'p-sym';
    if (k === 'Linguistic') return 'p-lin';
    return 'p-oth';
  }
  function pill(c, extra) {
    var dag = /†/.test(c) ? '<span class="dg">†</span>' : '';
    var lab = String(c).replace('†', '');
    return '<span class="pill ' + chClass(c) + '"><code>' + lab + '</code>' + dag + '</span>' +
      (extra ? ' <span class="boundary">' + extra + '</span>' : '');
  }

  /* ── evidence table ────────────────────────────────── */
  var tEval = document.querySelector('#tbl-eval tbody');
  if (tEval && window.EVAL) {
    tEval.innerHTML = EVAL.map(function (r) {
      var tags = r[4].map(function (t) { return '<span class="tag t-' + t + '">' + t + '</span>'; }).join('');
      return '<tr>' +
        '<td class="m">' + r[0] + '</td>' +
        '<td>' + pill(r[1]) + '</td>' +
        '<td>' + r[2] + '</td>' +
        '<td>' + r[3] + '</td>' +
        '<td class="ev">' + tags + '</td>' +
        '<td class="r">' + r[5] + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ── audit table ───────────────────────────────────── */
  var tAudit = document.querySelector('#tbl-audit tbody');
  if (tAudit && window.AUDIT) {
    tAudit.innerHTML = AUDIT.map(function (r) {
      return '<tr>' +
        '<td class="m">' + r[0] + '</td>' +
        '<td>' + r[1] + '</td>' +
        '<td>' + pill(r[2], r[3]) + '</td>' +
        '<td class="r">' + r[4] + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ── coverage table + filters ──────────────────────── */
  var tCov = document.querySelector('#tbl-cov tbody');
  if (tCov && window.COVERAGE) {
    tCov.innerHTML = COVERAGE.map(function (r) {
      var group = (r[1] === 'Numeric' || r[1] === 'Symbolic' || r[1] === 'Linguistic') ? r[1] : 'other';
      return '<tr data-g="' + group + '">' +
        '<td class="m">' + r[0] + '</td>' +
        '<td>' + pill(r[1], r[2]) + '</td>' +
        '<td>' + (r[3] === '—' ? '<span class="boundary">—</span>' : '<code>' + r[3] + '</code>') + '</td>' +
        '<td class="r">' + r[4] + '</td>' +
        '</tr>';
    }).join('');

    var count = function (g) {
      return COVERAGE.filter(function (r) {
        var group = (r[1] === 'Numeric' || r[1] === 'Symbolic' || r[1] === 'Linguistic') ? r[1] : 'other';
        return g === 'all' || group === g;
      }).length;
    };
    var ids = { 'c-all': 'all', 'c-num': 'Numeric', 'c-sym': 'Symbolic', 'c-lin': 'Linguistic', 'c-oth': 'other' };
    Object.keys(ids).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = count(ids[id]);
    });

    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('is-on'); });
        c.classList.add('is-on');
        var f = c.getAttribute('data-f');
        Array.prototype.forEach.call(tCov.rows, function (row) {
          row.style.display = (f === 'all' || row.getAttribute('data-g') === f) ? '' : 'none';
        });
      });
    });
  }

  /* ── copy bibtex ───────────────────────────────────── */
  var copy = document.getElementById('copy');
  if (copy) copy.addEventListener('click', function () {
    var txt = document.getElementById('bibtex').innerText;
    var done = function () {
      copy.textContent = 'Copied';
      copy.classList.add('ok');
      setTimeout(function () { copy.textContent = 'Copy'; copy.classList.remove('ok'); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  });

  /* ── nav state + progress ──────────────────────────── */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  function onScroll() {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 8);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── reveal ────────────────────────────────────────── */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 55 + 'ms';
      io.observe(el);
    });
  }
})();
