/* Notice on an old edition's project pages. Loaded with
   <script src="/versions/detour.js" data-year="2021" data-back="/v1/#proyectos" defer></script> */
;(function () {
  var script = document.currentScript
  var year = (script && script.dataset.year) || ""
  var back = (script && script.dataset.back) || "/"

  // Copy comes from i18n, injected at build time by src/pages/versions/detour.js.ts
  var COPY = __DATA__.copy

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
  var t = COPY[lang].detour
  var href = back.replace(/(#.*)?$/, function (hash) {
    return "?lang=" + lang + hash
  })

  var style = document.createElement("style")
  style.textContent =
    "@font-face{font-family:'Unique';src:url('/fonts/unique/Unique-Bold.woff2') format('woff2');font-weight:700;font-display:swap}" +
    ".tb-detour{position:fixed;left:16px;bottom:16px;z-index:2147483647;width:min(320px,calc(100vw - 40px));padding:16px 18px 18px;" +
    "background:#f1e9da;color:#3b2216;border:2px solid #3b2216;box-shadow:6px 6px 0 #3b2216;font:400 14px/1.45 system-ui,-apple-system,'Segoe UI',sans-serif}" +
    ".tb-detour *{box-sizing:border-box;margin:0;font-family:inherit}" +
    ".tb-detour p.tb-y{display:flex;gap:8px;align-items:center;font:500 11px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;opacity:.75}" +
    ".tb-detour p.tb-y i{width:7px;height:7px;border-radius:50%;background:#e5463a}" +
    ".tb-detour p.tb-h{margin-top:12px;font:700 40px/1.05 'Unique','Arial Narrow',sans-serif!important;text-transform:uppercase}" +
    ".tb-detour p.tb-h span{background:#3b2216;color:#f1e9da;padding:.04em .16em 0 .06em;-webkit-box-decoration-break:clone;box-decoration-break:clone}" +
    ".tb-detour p.tb-b{margin-top:10px;font-size:15px}" +
    // The old pages color all text (e.g. *{color:#fff}), so colors are forced
    ".tb-detour,.tb-detour p.tb-y,.tb-detour p.tb-b{color:#3b2216!important}" +
    ".tb-detour p.tb-h span,.tb-detour a{color:#f1e9da!important}" +
    ".tb-detour a{display:block;margin-top:14px;padding:10px 12px;text-align:center;background:#3b2216;color:#f1e9da;border:2px solid #3b2216;text-decoration:none;" +
    "font:600 12px/1.2 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em;text-transform:uppercase;transition:background .15s}" +
    ".tb-detour a:hover{background:#e5463a;border-color:#e5463a}"
  document.head.appendChild(style)

  var box = document.createElement("aside")
  box.className = "tb-detour"
  box.setAttribute("role", "note")
  box.innerHTML =
    '<p class="tb-y"><i></i>' + year + "</p>" +
    '<p class="tb-h"><span>' + t.head + "</span></p>" +
    '<p class="tb-b">' + t.body.replace("{year}", year) + "</p>" +
    '<a href="' + href + '">&larr; ' + t.back + "</a>"
  document.body.appendChild(box)
})()
