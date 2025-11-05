/**
 * simple IndexedDB wrapper for offline form storage
 */
export const OfflineDB = {
  db: null,
  async open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("LGPortalDB", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("pendingForms", { keyPath: "id" });
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onerror = () => reject(req.error);
    });
  },
  async saveForm(form) {
    const tx = this.db.transaction("pendingForms", "readwrite");
    tx.objectStore("pendingForms").put(form);
    return tx.complete;
  },
  async getAll() {
    return new Promise((res, rej) => {
      const tx = this.db.transaction("pendingForms", "readonly");
      const req = tx.objectStore("pendingForms").getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },
  async clear() {
    const tx = this.db.transaction("pendingForms", "readwrite");
    tx.objectStore("pendingForms").clear();
  }
};
