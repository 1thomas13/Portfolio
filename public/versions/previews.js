/* Project previews on the old editions. Each one configures it with window.TB_PREVIEWS before
   loading the script:
   { base, title: "title selector", up: levels up to the card, projects: { "Title": { video | image, url, note } } } */
;(function () {
  var config = window.TB_PREVIEWS
  if (!config) return
  var touch = !window.matchMedia("(hover: hover)").matches

  var WIDTH = 460
  var style = document.createElement("style")
  style.textContent =
    ".tb-pv{position:fixed;z-index:2147483646;width:" + WIDTH + "px;pointer-events:none;opacity:0;transform:translateY(8px) scale(.98);transform-origin:left center;" +
    "transition:opacity .2s,transform .2s;background:#fff;border-radius:10px;overflow:hidden;" +
    "box-shadow:0 24px 60px -14px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.08);font:12px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;color:#555}" +
    ".tb-pv.is-on{opacity:1;transform:none}" +
    ".tb-pv *{box-sizing:border-box;margin:0}" +
    ".tb-pv .tb-pv-bar{display:flex;align-items:center;gap:6px;height:28px;padding:0 10px;background:#ececec;border-bottom:1px solid #ddd}" +
    ".tb-pv .tb-pv-bar i{width:9px;height:9px;border-radius:50%;background:#ff5f57}" +
    ".tb-pv .tb-pv-bar i+i{background:#febc2e}.tb-pv .tb-pv-bar i+i+i{background:#28c840}" +
    ".tb-pv .tb-pv-bar span{flex:1;margin-left:8px;padding:3px 10px;border-radius:5px;background:#fff;color:#888;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    ".tb-pv img,.tb-pv video{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;background:#111}" +
    ".tb-pv p{padding:8px 12px}" +
    ".tb-pv-in{width:100%;margin:14px 0 4px;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px -12px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.08);background:#fff;font:12px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;color:#555;text-align:left}" +
    ".tb-pv-in img,.tb-pv-in video{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;background:#111}" +
    ".tb-pv-in p{margin:0;padding:8px 12px}"
  document.head.appendChild(style)

  function media(project) {
    var base = config.base
    return project.video
      ? '<video src="' + base + project.video + '.mp4" poster="' + base + project.video + '-poster.jpg" muted loop playsinline preload="none"></video>'
      : '<img src="' + base + project.image + '" alt="" loading="lazy">'
  }

  // Touch: the preview sits inside the card; the video only plays while on screen
  var watcher = touch && "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.play().catch(function () {})
          else entry.target.pause()
        })
      }, { threshold: 0.6 })
    : null
  function inline(project, title) {
    var box = document.createElement("div")
    box.className = "tb-pv-in"
    box.setAttribute("aria-hidden", "true")
    box.innerHTML = media(project) + (project.note ? "<p>" + project.note + "</p>" : "")
    title.parentElement.appendChild(box)
    var video = box.querySelector("video")
    if (video && watcher) watcher.observe(video)
  }

  var card = document.createElement("div")
  card.className = "tb-pv"
  card.setAttribute("aria-hidden", "true")
  document.body.appendChild(card)

  function show(project, target) {
    card.innerHTML =
      '<div class="tb-pv-bar"><i></i><i></i><i></i><span>' + (project.url || "") + "</span></div>" +
      media(project).replace("<video ", "<video autoplay ").replace(' preload="none"', "") +
      (project.note ? "<p>" + project.note + "</p>" : "")

        var rect = target.getBoundingClientRect()
    var height = card.offsetHeight || 340
    var left = rect.right + 16
    if (left + WIDTH > innerWidth - 12) left = Math.max(12, rect.left - WIDTH - 16)
    var top = Math.min(Math.max(12, rect.top + rect.height / 2 - height / 2), innerHeight - height - 12)
    card.style.left = left + "px"
    card.style.top = top + "px"
    card.classList.add("is-on")
  }

  function hide() {
    card.classList.remove("is-on")
  }

  var bound = {}
  var total = Object.keys(config.projects).length
  function bind() {
    document.querySelectorAll(config.title).forEach(function (title) {
      var name = title.textContent.trim()
      if (!config.projects[name] || bound[name]) return
      var target = title
      for (var i = 0; i < (config.up || 0) && target; i++) target = target.parentElement
      if (!target) return
      bound[name] = true
      if (touch) return inline(config.projects[name], title)
      target.addEventListener("mouseenter", function () {
        show(config.projects[name], target)
      })
      target.addEventListener("mouseleave", hide)
    })
    return Object.keys(bound).length === total
  }

  // Cards rendered after load (React) are looked for until all are found
  if (!bind()) {
    var observer = new MutationObserver(function () {
      if (bind()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
  if (!touch) addEventListener("scroll", hide, { passive: true })
})()
