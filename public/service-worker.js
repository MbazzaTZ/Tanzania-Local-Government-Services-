const CACHE_NAME = "lg-portal-v2";
const OFFLINE_URLS = ["/", "/index.html", "/manifest.json"];
const API_URL = "https://YOUR_PROJECT.supabase.co/rest/v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(OFFLINE_URLS)));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((res) =>
      res ||
      fetch(req)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          return resp;
        })
        .catch(() => caches.match("/index.html"))
    )
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

/* Background Sync: send stored forms when back online */
self.addEventListener("sync", async (e) => {
  if (e.tag === "syncForms") {
    e.waitUntil(sendStoredForms());
  }
});

async function sendStoredForms() {
  const db = await new Promise((res) => {
    const req = indexedDB.open("LGPortalDB");
    req.onsuccess = () => res(req.result);
  });
  const tx = db.transaction("pendingForms", "readonly");
  const store = tx.objectStore("pendingForms");
  const req = store.getAll();
  req.onsuccess = async () => {
    const forms = req.result || [];
    for (const f of forms) {
      await fetch(`${API_URL}/citizen_verifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "YOUR_SUPABASE_ANON_KEY",
          Authorization: `Bearer YOUR_SUPABASE_ANON_KEY`,
        },
        body: JSON.stringify(f),
      });
    }
    const tx2 = db.transaction("pendingForms", "readwrite");
    tx2.objectStore("pendingForms").clear();
  };
}

/* Push Notification handler */
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Local Government Portal";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
