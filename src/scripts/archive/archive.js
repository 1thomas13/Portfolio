/* "Archive" card shown over the old editions. Loaded from their index.html with
   <script src="/versions/archive.js" data-version="v1" defer></script> */
;(function () {
  var script = document.currentScript
  var id = (script && script.dataset.version) || "v1"

  // Copy comes from i18n, injected at build time by src/pages/versions/archive.js.ts
  var DATA = __DATA__
  var today = new Date()
  var nowMonths = Math.max(1, today.getFullYear() * 12 + today.getMonth() - (DATA.start.year * 12 + DATA.start.month))
  var VERSIONS = DATA.versions
  var COPY = DATA.copy

  var version = VERSIONS[id] || VERSIONS.v1
  // ?lang, the session's earlier choice, the referrer or the browser. Saved for detour.js
  function detectLang() {
    var param = new URLSearchParams(location.search).get("lang")
    if (param === "en" || param === "es") return param
    try {
      var saved = sessionStorage.getItem("archive-lang")
      if (saved === "en" || saved === "es") return saved
    } catch (e) {}
    if (document.referrer.indexOf(location.origin) === 0) return /\/en(\/|$)/.test(document.referrer.slice(location.origin.length)) ? "en" : "es"
    return /^en/i.test(navigator.language) ? "en" : "es"
  }
  var lang = detectLang()
  try {
    sessionStorage.setItem("archive-lang", lang)
  } catch (e) {}
  var t = COPY[lang]
  var v = version[lang]
  var home = lang === "en" ? "/en/" : "/"
  var todayText = nowMonths >= 24 ? "+" + Math.floor(nowMonths / 12) + " " + t.years : nowMonths + " " + t.months
  var percent = Math.max(3, Math.round((version.months / nowMonths) * 100))
  var thenText = version.months >= 24 ? Math.floor(version.months / 12) + " " + t.years : version.months + " " + t.months

  var KEY = "archive-minimized-" + id
  var minimized = false
  try {
    minimized = sessionStorage.getItem(KEY) === "1"
  } catch (e) {}

  var css =
    "@font-face{font-family:'Unique';src:url('/fonts/unique/Unique-Bold.woff2') format('woff2');font-weight:700;font-display:swap}" +
    ".tb-archive{--paper:#f1e9da;--ink:#3b2216;--red:#e5463a;position:fixed;z-index:2147483647;left:16px;bottom:16px;" +
    "color:var(--ink);background:var(--paper);border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink);" +
    "font:400 14px/1.45 system-ui,-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;" +
    "transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}" +
    ".tb-archive *{box-sizing:border-box;margin:0;font-family:inherit}" +
    ".tb-archive a,.tb-archive button{font:inherit;color:inherit;cursor:pointer;text-decoration:none}" +
    ".tb-card{position:relative;width:min(360px,calc(100vw - 40px));padding:18px 20px 20px}" +
    ".tb-label{font:500 11px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;display:flex;gap:8px;align-items:center;opacity:.75}" +
    ".tb-label i{width:7px;height:7px;border-radius:50%;background:var(--red)}" +
    ".tb-title{margin-top:14px;font:700 42px/1.05 'Unique','Arial Narrow',sans-serif;text-transform:uppercase}" +
    ".tb-title span{background:var(--ink);color:var(--paper);padding:.04em .16em 0 .06em;text-shadow:.04em .035em 0 rgba(229,70,58,.8);" +
    "-webkit-box-decoration-break:clone;box-decoration-break:clone}" +
    ".tb-head{margin-top:14px;font-size:16px;font-weight:700;line-height:1.3}" +
    ".tb-sub{margin-top:4px;opacity:.75}" +
    ".tb-xp{margin-top:16px;font:12px/1 ui-monospace,Menlo,Consolas,monospace}" +
    ".tb-row{display:flex;justify-content:space-between;opacity:.8}" +
    ".tb-bar{position:relative;height:8px;margin-top:8px;background:rgba(59,34,22,.12)}" +
    ".tb-bar span{position:absolute;inset:0 auto 0 0;background:var(--red);width:0;transition:width 1.2s .3s cubic-bezier(.16,1,.3,1)}" +
    ".tb-note{margin-top:12px;font-size:13px;opacity:.75}" +
    ".tb-actions{display:flex;gap:8px;margin-top:16px}" +
    ".tb-btn{flex:1;white-space:nowrap;text-align:center;padding:10px 10px;border:2px solid var(--ink);background:none;" +
    "font:600 12px/1.2 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em;text-transform:uppercase;transition:background .15s,color .15s}" +
    ".tb-btn:hover{background:var(--ink);color:var(--paper)}" +
    ".tb-btn.primary{background:var(--ink);color:var(--paper)}" +
    ".tb-btn.primary:hover{background:var(--red);border-color:var(--red)}" +
    ".tb-pill{display:flex;width:max-content;align-items:stretch;font:600 12px/1 ui-monospace,Menlo,Consolas,monospace;text-transform:uppercase;letter-spacing:.04em}" +
    ".tb-pill>*{display:flex;align-items:center;gap:8px;padding:10px 12px 9px;white-space:nowrap}" +
    ".tb-pill>*+*{border-left:2px solid var(--ink)}" +
    ".tb-pill a{transition:background .15s,color .15s}" +
    ".tb-pill a:hover{background:var(--ink);color:var(--paper)}" +
    ".tb-pill i{width:7px;height:7px;border-radius:50%;background:var(--red)}" +
    ".tb-pill b{font-weight:500;opacity:.75}" +
    ".tb-back{display:inline-block;margin-top:14px;font:600 12px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em;text-transform:uppercase;opacity:.7;transition:opacity .15s}" +
    ".tb-back:hover{opacity:1;text-decoration:underline!important;text-underline-offset:3px}" +
    ".tb-hidden{opacity:0;transform:translateY(12px)}" +
    "@media (prefers-reduced-motion:reduce){.tb-archive,.tb-bar span{transition:none}}"

  // The archive is browsed in order (1st → 2nd → 3rd) and the 3rd leads to the current edition
  var NEXT = { v1: "v2", v2: "v3", v3: null }
  var nextId = NEXT[id]
  var nextHref = !nextId ? home : nextId === "v3" && lang === "en" ? "/v3/en/?lang=en" : "/" + nextId + "/?lang=" + lang
  var nextLabel = nextId ? VERSIONS[nextId].edition[lang] : t.pill
  var short = function (label) {
    return label.split(" ")[0]
  }

  var style = document.createElement("style")
  style.textContent = css
  document.head.appendChild(style)

  var root = document.createElement("aside")
  root.className = "tb-archive tb-hidden"
  root.setAttribute("aria-label", t.label + " " + id)

  function card() {
    root.innerHTML =
      '<div class="tb-card">' +
      '<p class="tb-label"><i></i>' + version.year + "</p>" +
      '<p class="tb-title"><span>' + t.youAre + " " + version.edition[lang] + "</span></p>" +
      '<p class="tb-head">' + t.head.replace("{xp}", thenText) + "</p>" +
      '<p class="tb-sub">' + v.sub + "</p>" +
      '<div class="tb-xp">' +
      '<div class="tb-row"><span>' + t.then + ": " + thenText + "</span><span>" + t.today + ": " + todayText + "</span></div>" +
      '<div class="tb-bar"><span></span></div>' +
      "</div>" +
      '<p class="tb-note">' + (v.note || t.note) + "</p>" +
      '<div class="tb-actions">' +
      '<button type="button" class="tb-btn" data-min>' + t.look + "</button>" +
      '<a class="tb-btn primary" data-turn="corner" href="' + nextHref + '">' + nextLabel + " &rarr;</a>" +
      "</div>" +
      // On the 3rd the next one already is the current edition: no need to repeat the link
      (nextId ? '<a class="tb-back" href="' + home + '">&larr; ' + t.back + "</a>" : "") +
      "</div>"
    root.querySelector("[data-min]").addEventListener("click", function () {
      try {
        sessionStorage.setItem(KEY, "1")
      } catch (e) {}
      swap(pill)
    })
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var bar = root.querySelector(".tb-bar span")
        if (bar) bar.style.width = percent + "%"
      })
    })
  }

  function pill() {
    root.innerHTML =
      '<div class="tb-pill" role="navigation">' +
      (nextId ? '<a href="' + home + '" aria-label="' + t.back + '">&larr; ' + short(t.pill) + "</a>" : "") +
      "<span><i></i>" + version.edition[lang] + " <b>" + version.year + "</b></span>" +
      '<a data-turn="corner" href="' + nextHref + '" aria-label="' + nextLabel + '">' + short(nextLabel) + " &rarr;</a>" +
      "</div>"
  }

  function swap(render) {
    root.classList.add("tb-hidden")
    setTimeout(function () {
      render()
      root.classList.remove("tb-hidden")
    }, 250)
  }

  // Moving forward peels the corner ("corner"), see transition.css
  root.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("[data-turn]")
    if (!link) return
    try {
      sessionStorage.setItem("tb-turn", link.getAttribute("data-turn"))
    } catch (e) {}
  })

  ;(minimized ? pill : card)()
  document.body.appendChild(root)
  setTimeout(function () {
    root.classList.remove("tb-hidden")
  }, minimized ? 0 : 600)
})()
