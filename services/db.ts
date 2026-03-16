import { FavoriteVerseRef, ReadingHistoryEntry, VerseHighlight } from '../types';

const DB_NAME = 'BibleAppDB';
const SCRIPTURE_STORE_NAME = 'scriptures';
const FAVORITE_STORE_NAME = 'favorites';
const HISTORY_STORE_NAME = 'history';
const HIGHLIGHT_STORE_NAME = 'highlights';
const DB_VERSION = 3; 

let db: IDBDatabase;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject('IndexedDB error');
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = () => {
      const dbInstance = request.result;
      if (!dbInstance.objectStoreNames.contains(SCRIPTURE_STORE_NAME)) {
        // This store is no longer actively used but is kept for schema compatibility
        // to avoid breaking existing user databases.
        dbInstance.createObjectStore(SCRIPTURE_STORE_NAME);
      }
      if (!dbInstance.objectStoreNames.contains(FAVORITE_STORE_NAME)) {
        dbInstance.createObjectStore(FAVORITE_STORE_NAME);
      }
      if (!dbInstance.objectStoreNames.contains(HISTORY_STORE_NAME)) {
        dbInstance.createObjectStore(HISTORY_STORE_NAME);
      }
      if (!dbInstance.objectStoreNames.contains(HIGHLIGHT_STORE_NAME)) {
        dbInstance.createObjectStore(HIGHLIGHT_STORE_NAME);
      }
    };
  });
};


// --- Favorite Store ---
const FAVORITES_KEY = 'user-favorites';
export const getFavorites = async (): Promise<FavoriteVerseRef[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(FAVORITE_STORE_NAME, 'readonly');
        const store = transaction.objectStore(FAVORITE_STORE_NAME);
        const request = store.get(FAVORITES_KEY);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const setFavorites = async (favorites: FavoriteVerseRef[]): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(FAVORITE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(FAVORITE_STORE_NAME);
        const request = store.put(favorites, FAVORITES_KEY);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const clearFavorites = async (): Promise<void> => {
    await setFavorites([]);
}

// --- History Store ---
const HISTORY_KEY = 'user-history';
export const getHistory = async (): Promise<ReadingHistoryEntry[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(HISTORY_STORE_NAME, 'readonly');
        const store = transaction.objectStore(HISTORY_STORE_NAME);
        const request = store.get(HISTORY_KEY);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

export const setHistory = async (history: ReadingHistoryEntry[]): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(HISTORY_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(HISTORY_STORE_NAME);
        const request = store.put(history, HISTORY_KEY);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const clearHistory = async (): Promise<void> => {
    await setHistory([]);
}

// --- Highlight Store ---
const HIGHLIGHTS_KEY = 'user-highlights';
export const getHighlights = async (): Promise<VerseHighlight[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(HIGHLIGHT_STORE_NAME, 'readonly');
        const store = transaction.objectStore(HIGHLIGHT_STORE_NAME);
        const request = store.get(HIGHLIGHTS_KEY);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
};

export const setHighlights = async (highlights: VerseHighlight[]): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(HIGHLIGHT_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(HIGHLIGHT_STORE_NAME);
        const request = store.put(highlights, HIGHLIGHTS_KEY);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const clearHighlights = async (): Promise<void> => {
    await setHighlights([]);
};