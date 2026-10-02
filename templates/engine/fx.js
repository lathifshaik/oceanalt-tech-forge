(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Today's row in any hours list.
  var today = new Date().getDay();
  document.querySelectorAll('[data-day="' + today + '"]').forEach(function (el) {
    el.classList.add('is-today'); el.setAttribute('aria-current', 'date');
  });

  // 3D tilt with a light glare that follows the pointer.
  if (!reduce) {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 10;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        el.classList.add('is-tilting');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
        el.classList.remove('is-tilting');
      });
    });
  }

  // Flip cards (gift vouchers, menus): a real button toggles the back face.
  document.querySelectorAll('[data-flip-toggle]').forEach(function (btn) {
    var card = document.getElementById(btn.getAttribute('data-flip-toggle'));
    if (!card) return;
    btn.addEventListener('click', function () {
      var on = card.classList.toggle('is-flipped');
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  });

  // Open / closed sign driven by the real opening hours.
  function mins(t) {
    var m = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i.exec(String(t).trim());
    if (!m) return null;
    var h = parseInt(m[1], 10) % 12 + (m[3].toLowerCase() === 'pm' ? 12 : 0);
    return h * 60 + (m[2] ? parseInt(m[2], 10) : 0);
  }
  document.querySelectorAll('[data-sign]').forEach(function (sign) {
    var hours; try { hours = JSON.parse(sign.getAttribute('data-sign')); } catch (e) { return; }
    function update() {
      var now = new Date(), d = hours[now.getDay()];
      var cur = now.getHours() * 60 + now.getMinutes();
      var open = !!(d && d[0] && mins(d[0]) !== null && cur >= mins(d[0]) && cur < mins(d[1]));
      sign.classList.toggle('is-closed', !open);
      sign.setAttribute('aria-label', open ? 'Open now' : 'Closed now');
    }
    update(); setInterval(update, 60000);
  });
})();
