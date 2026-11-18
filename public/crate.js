// /designs/: the record shop, enhanced. The page works without this file
// (every cover links to its live design). With it, clicking a cover lifts the
// record out into a panel, Shuffle picks one at random, the crates flick with
// buttons, and the arrow keys move through the crate the record came from.
// No dependencies. Motion stops for prefers-reduced-motion.
(function () {
  var dataEl = document.getElementById("sp-crate-data");
  var dlg = document.querySelector(".sp-lift");
  if (!dataEl || !dlg || typeof dlg.showModal !== "function") return;
  var DATA = JSON.parse(dataEl.textContent);
  var D = DATA.designs;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  var EASE = "cubic-bezier(.32,.72,0,1)";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var stage = $(".sp-stage", dlg), sleeve = $(".sp-sleeve", dlg), disc = $(".sp-disc", dlg);
  var h = $("#sp-lift-h"), kind = $(".sp-lift-kind", dlg);
  var shot = $(".sp-lift-shot", dlg), go = $(".sp-lift-go", dlg);
  var more = $(".sp-lift-more", dlg), moreList = $("ul", more), pos = $(".sp-lift-nav p", dlg);

  var lists = { all: D.map(function (_, i) { return i; }) };
  Object.keys(DATA.crates).forEach(function (c) {
    lists[c] = lists.all.filter(function (i) { return D[i].c === c; });
  });

  var cur = -1, list = "all", opener = null, lifted = null, busy = 0;
  var img = function (p) { return "/previews/" + p + ".webp"; };
  var short = function (b) { return b.split(",")[0]; };
  var where = function (b) { var i = b.indexOf(","); return i < 0 ? "" : b.slice(i + 1).trim(); };

  function fill(i) {
    var d = D[i];
    cur = i;
    sleeve.querySelector("img").src = img(d.p);
    disc.querySelector("img").src = img(d.p);
    disc.querySelector("b").textContent = short(d.b);
    disc.querySelector("small").textContent = d.t;
    h.textContent = short(d.b);
    kind.textContent = d.k + (where(d.b) ? ", " + where(d.b) : "");
    $('[data-f="theme"]', dlg).textContent = d.t;
    $('[data-f="crate"]', dlg).textContent = DATA.crates[d.c] || "";
    shot.href = go.href = "/work/" + d.p + "/";
    shot.querySelector("img").src = img(d.p);
    go.setAttribute("aria-label", "Open the live design: " + short(d.b) + ", " + d.t + " (opens in a new tab)");
    // The same business in its other styles.
    var sibs = lists.all.filter(function (j) { return D[j].b === d.b; });
    more.hidden = sibs.length < 2;
    moreList.innerHTML = "";
    sibs.forEach(function (j) {
      var li = document.createElement("li"), b = document.createElement("button"), im = document.createElement("img");
      b.type = "button";
      b.setAttribute("aria-label", D[j].t + " style");
      if (j === i) b.setAttribute("aria-current", "true");
      im.src = img(D[j].p); im.alt = ""; im.width = 1200; im.height = 750;
      b.appendChild(im);
      b.addEventListener("click", function () { if (j !== cur) swap(j); });
      li.appendChild(b); moreList.appendChild(li);
    });
    var L = lists[list], n = L.indexOf(i);
    pos.textContent = (n + 1) + " of " + L.length + (list === "all" ? ", newest first" : " in " + DATA.crates[list]);
    try { history.replaceState(null, "", "#" + d.p); } catch (e) {}
  }

  function discIn() {
    disc.classList.add("no-t");
    disc.classList.remove("is-out");
    void disc.offsetWidth;
    disc.classList.remove("no-t");
  }
  function discOut() {
    if (calm.matches) { disc.classList.add("is-out"); return; }
    requestAnimationFrame(function () { requestAnimationFrame(function () { disc.classList.add("is-out"); }); });
  }

  // The cover the record came from, in whichever view is showing.
  function coverFor(i) {
    var wall = $("#sp-v-wall").checked;
    return $((wall ? ".sp-wall" : ".sp-crates") + ' a[data-i="' + i + '"]');
  }

  function open(i, from, l) {
    list = l || D[i].c;
    opener = from || document.activeElement;
    discIn();
    fill(i);
    dlg.classList.remove("is-leaving");
    dlg.showModal();
    h.focus({ preventScroll: true });
    var cover = from && from.querySelector(".sp-cover");
    if (calm.matches || !cover || !cover.getBoundingClientRect().width) { discOut(); return; }
    // Lift: a copy of the cover flies from the crate to the sleeve's place.
    var a = cover.getBoundingClientRect(), b = sleeve.getBoundingClientRect();
    if (!b.width) { discOut(); return; }
    var fly = document.createElement("img");
    fly.className = "sp-fly"; fly.alt = ""; fly.src = img(D[i].p);
    fly.style.cssText = "left:" + b.left + "px;top:" + b.top + "px;width:" + b.width + "px;height:" + b.height + "px";
    dlg.appendChild(fly);
    sleeve.classList.add("is-hidden");
    disc.style.visibility = "hidden";
    lifted = from.closest(".sp-rec"); lifted.classList.add("is-lifted");
    var anim = fly.animate([
      { transform: "translate(" + (a.left - b.left) + "px," + (a.top - b.top) + "px) scale(" + (a.width / b.width) + ")" },
      { transform: "none" },
    ], { duration: 720, easing: EASE });
    var done = function () { sleeve.classList.remove("is-hidden"); disc.style.visibility = ""; fly.remove(); discOut(); };
    anim.onfinish = done; anim.oncancel = done;
  }

  // Flip to another record without closing: the disc goes back in, the
  // sleeve changes, the new disc comes out.
  function swap(i) {
    if (calm.matches) { fill(i); return; }
    var t = ++busy;
    disc.classList.add("is-back");
    disc.classList.remove("is-out");
    setTimeout(function () {
      if (t !== busy) return;
      disc.classList.remove("is-back");
      discIn();
      fill(i);
      sleeve.animate([{ opacity: .4, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: EASE });
      discOut();
    }, 300);
  }

  function step(dir) {
    var L = lists[list], n = L.indexOf(cur);
    swap(L[(n + dir + L.length) % L.length]);
  }

  function close() {
    if (!dlg.open || dlg.classList.contains("is-leaving")) return;
    var finish = function () {
      dlg.classList.remove("is-leaving");
      dlg.close();
      if (lifted) { lifted.classList.remove("is-lifted"); lifted = null; }
      // Return focus to the cover of the record now showing, if it's there.
      var back = coverFor(cur) || opener;
      if (back && back.focus) {
        back.focus({ preventScroll: true });
        if (back.scrollIntoView) back.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    };
    if (calm.matches) return finish();
    dlg.classList.add("is-leaving");
    setTimeout(finish, 220);
  }

  // Covers: a plain click lifts the record; modified clicks open the link.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".sp-rec a[data-i]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(+a.dataset.i, a, a.dataset.list);
  });

  dlg.addEventListener("cancel", function (e) { e.preventDefault(); close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  $(".sp-lift-x", dlg).addEventListener("click", close);
  dlg.querySelectorAll("[data-step]").forEach(function (b) {
    b.addEventListener("click", function () { step(+b.dataset.step); });
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); step(e.key === "ArrowRight" ? 1 : -1); }
  });

  // Shuffle: pull a random record from the view that's showing.
  var dig = $(".sp-dig");
  dig.hidden = false;
  dig.addEventListener("click", function () {
    var i = Math.floor(Math.random() * D.length);
    if (i === cur && D.length > 1) i = (i + 1) % D.length;
    var a = coverFor(i);
    if (a) a.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
    open(i, a, a ? a.dataset.list : D[i].c);
  });

  // Crate buttons: flick the row along by most of a screen.
  document.querySelectorAll(".sp-crate").forEach(function (crate) {
    var row = $(".sp-row", crate), flick = $(".sp-flick", crate);
    var btns = flick.querySelectorAll("button");
    var sync = function () {
      btns[0].disabled = row.scrollLeft < 4;
      btns[1].disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 4;
      flick.hidden = row.scrollWidth <= row.clientWidth + 4;
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        row.scrollBy({ left: +b.dataset.dir * row.clientWidth * .8, behavior: calm.matches ? "auto" : "smooth" });
      });
    });
    row.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  });

  // A shared link (#little-tern-coffee) opens that record.
  var hash = decodeURIComponent(location.hash.slice(1));
  var start = D.findIndex(function (d) { return d.p === hash; });
  if (start > -1) open(start, null, D[start].c);
})();
