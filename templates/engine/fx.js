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

  // Same-day cutoff: "Order in the next 2h 14m for same-day delivery".
  // data-cutoff='{"time":"1pm","days":[1,2,3,4,5,6]}' (JS days, Sunday = 0).
  document.querySelectorAll('[data-cutoff]').forEach(function (el) {
    var cfg; try { cfg = JSON.parse(el.getAttribute('data-cutoff')); } catch (e) { return; }
    var out = el.querySelector('[data-cutoff-text]') || el;
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    function update() {
      var now = new Date(), d = now.getDay(), cur = now.getHours() * 60 + now.getMinutes(), cut = mins(cfg.time);
      if (cut === null) return;
      if (cfg.days.indexOf(d) >= 0 && cur < cut) {
        var left = cut - cur, h = Math.floor(left / 60), m = left % 60;
        // A countdown only means something in the last few hours.
        out.textContent = left > 180
          ? 'Order by ' + cfg.time + ' today for same-day delivery'
          : 'Order in the next ' + (h ? h + 'h ' : '') + m + 'm for same-day delivery';
        el.classList.add('is-live');
      } else {
        var n = 1; while (n < 8 && cfg.days.indexOf((d + n) % 7) < 0) n++;
        out.textContent = 'Order now for delivery ' + (n === 1 ? 'tomorrow' : names[(d + n) % 7]);
        el.classList.remove('is-live');
      }
    }
    update(); setInterval(update, 30000);
  });
})();
