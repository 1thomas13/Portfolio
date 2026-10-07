// Diary reminders: shows the notification and, when tapped, opens (or focuses) the diary
self.addEventListener("push", (event) => {
  const { title, body, url } = event.data ? event.data.json() : { title: "Diary", body: "", url: "/diary/" }
  event.waitUntil(self.registration.showNotification(title, { body, icon: "/diary/icon-192.png", badge: "/diary/badge.png", data: { url }, tag: "diary" }))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = new URL(event.notification.data?.url ?? "/diary/", self.location.origin).href
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => new URL(w.url).pathname.startsWith("/diary"))
      return open ? open.navigate(url).then((w) => w?.focus()) : self.clients.openWindow(url)
    }),
  )
})
