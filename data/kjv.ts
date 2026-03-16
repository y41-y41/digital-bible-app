/**
 * This file is intentionally left with an empty export.
 * The `kjvBible` object is no longer used, as Bible data is now fetched on-demand
 * from individual JSON files. This approach dramatically improves the app's
 * initial load performance.
 * See `services/bibleService.ts` for the new data fetching logic.
 */
type BookData = Record<number, Record<number, string>>;

export const kjvBible: Record<string, BookData> = {};
