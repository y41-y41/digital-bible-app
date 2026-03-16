

export type HighlightColorName = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

export type ColorThemeName = 
  | 'midnight' 
  | 'linen' 
  | 'amethyst' 
  | 'parchment' 
  | 'forest' 
  | 'slate' 
  | 'rose' 
  | 'ocean' 
  | 'amber'
  | 'mint'
  | 'crimson'
  | 'teal'
  | 'indigo'
  | 'olive'
  | 'graphite';

export type Translation = 'kjv';

export type BackgroundMode = 'light' | 'dark';

export type FontFamily = 'Serif' | 'Sans-serif' | 'Monospace';

export type View = 'home' | 'books' | 'chapters' | 'reading' | 'settings' | 'search' | 'history' | 'favorites' | 'highlights';

export interface Book {
  name: string;
  chapters: number;
  testament: 'Old' | 'New';
}

export interface BibleVerse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ChapterData {
  reference: string;
  verses: BibleVerse[];
}

export interface SearchParams {
    query: string;
    testament: 'any' | 'Old' | 'New';
    book: string;
    chapter: string;
}

export interface SearchResult {
    reference: string;
    book: Book;
    chapter: number;
    verse: number;
    text: string;
}

// Format: 'translation:BookName:chapter:verse' e.g. 'kjv:Genesis:1:1'
export type FavoriteVerseRef = `${Translation}:${string}:${number}:${number}`;

export interface ReadingHistoryEntry {
    bookName: string;
    chapter: number;
    timestamp: number;
}

export interface ResolvedFavorite {
    ref: FavoriteVerseRef;
    bookName: string;
    chapter: number;
    reference: string; // Human-readable e.g., "Genesis 1:1"
    text: string;
}

export interface VerseHighlight {
    ref: FavoriteVerseRef;
    color: HighlightColorName;
}

export interface ResolvedHighlight {
    ref: FavoriteVerseRef;
    color: HighlightColorName;
    bookName: string;
    chapter: number;
    reference: string;
    text: string;
}