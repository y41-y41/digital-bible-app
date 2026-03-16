
import { ChapterData, SearchResult, Book, FavoriteVerseRef, ResolvedFavorite, BibleVerse, SearchParams, VerseHighlight, ResolvedHighlight } from '../types';
import { ntData } from '../data/nt-data';
import { ot1Data } from '../data/ot1-data';
import { ot2Data } from '../data/ot2-data';

// Consolidate all data into one searchable object
const bibleData: Record<string, any> = {
    ...ot1Data,
    ...ot2Data,
    ...ntData
};

// Helper to get sanitized book name for lookup
const getLookupName = (bookName: string): string => {
    return bookName.replace(/\s/g, '');
};

export const getChapter = async (bookName: string, chapter: number): Promise<ChapterData | null> => {
    try {
        const lookupName = getLookupName(bookName);
        const bookChapters = bibleData[lookupName];
        
        if (!bookChapters || !bookChapters[chapter]) {
             console.warn(`No chapter data found for ${bookName} ${chapter} in bundled data.`);
             return null;
        }

        const verseData: Record<string, string> = bookChapters[chapter];
        const verses: BibleVerse[] = Object.entries(verseData).map(([verseNum, text]) => ({
            book_name: bookName,
            chapter: chapter,
            verse: parseInt(verseNum, 10),
            text: text.replace(/\{.*?\}/g, '').replace(/\s+/g, ' ').trim(),
        }));

        const chapterData: ChapterData = {
            reference: `${bookName} ${chapter}`,
            verses: verses
        };
        
        return chapterData;
    } catch (error) {
        console.error(`Failed to get chapter data for ${bookName} ${chapter}:`, error);
        return null;
    }
};

export const search = async (params: SearchParams, bibleBooks: Book[]): Promise<SearchResult[]> => {
    const results: SearchResult[] = [];
    const { query, testament, book: bookName, chapter } = params;

    if (!query.trim()) return results;
    
    const queryLower = query.toLowerCase();
    const queryRegex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');

    let booksToSearch: Book[] = [];
    if (bookName !== 'any') {
        const bookMeta = bibleBooks.find(b => b.name === bookName);
        if (bookMeta) booksToSearch.push(bookMeta);
    } else if (testament !== 'any') {
        booksToSearch = bibleBooks.filter(b => b.testament === testament);
    } else {
        booksToSearch = bibleBooks;
    }

    const chapterToSearch = chapter.trim() ? parseInt(chapter, 10) : null;
    
    for (const book of booksToSearch) {
        const lookupName = getLookupName(book.name);
        const bookChapters = bibleData[lookupName];
        if (!bookChapters) continue;

        const chaptersToScan = chapterToSearch ? [String(chapterToSearch)] : Object.keys(bookChapters);
        
        for (const chapNum of chaptersToScan) {
            const chapterVerses = bookChapters[chapNum];
            if (!chapterVerses) continue;

            for (const verseNum in chapterVerses) {
                 const rawText = chapterVerses[verseNum];
                 const verseText = rawText.replace(/\{.*?\}/g, '').replace(/\s+/g, ' ').trim();
                 if (verseText.toLowerCase().includes(queryLower)) {
                     results.push({
                        reference: `${book.name} ${chapNum}:${verseNum}`,
                        book: book,
                        chapter: parseInt(chapNum, 10),
                        verse: parseInt(verseNum, 10),
                        text: verseText.replace(queryRegex, `<strong class="bg-[var(--color-accent-bg)] text-[var(--color-accent)] font-bold">$1</strong>`),
                     });
                 }
            }
        }
    }

    return results;
};


export const resolveFavorites = async (refs: FavoriteVerseRef[]): Promise<ResolvedFavorite[]> => {
    const resolvedFavorites: ResolvedFavorite[] = [];
    if (!refs || refs.length === 0) return [];
    
    for (const ref of refs) {
        try {
            const [_translation, bookName, chapterNumStr, verseNumStr] = ref.split(':');
            const lookupName = getLookupName(bookName);
            const bookChapters = bibleData[lookupName];
            
            if (bookChapters && bookChapters[chapterNumStr]) {
                const rawText = bookChapters[chapterNumStr][verseNumStr];
                if (rawText) {
                    const verseText = rawText.replace(/\{.*?\}/g, '').replace(/\s+/g, ' ').trim();
                    resolvedFavorites.push({
                        ref,
                        bookName,
                        chapter: parseInt(chapterNumStr, 10),
                        reference: `${bookName} ${chapterNumStr}:${verseNumStr}`,
                        text: verseText
                    });
                }
            }
        } catch(e) {
            console.error('Could not resolve favorite ref:', ref, e);
        }
    }

    return resolvedFavorites;
};

export const resolveHighlights = async (highlights: VerseHighlight[]): Promise<ResolvedHighlight[]> => {
    const resolvedHighlights: ResolvedHighlight[] = [];
    if (!highlights || highlights.length === 0) return [];

    for (const highlight of highlights) {
        try {
            const [, bookName, chapterNumStr, verseNumStr] = highlight.ref.split(':');
            const lookupName = getLookupName(bookName);
            const bookChapters = bibleData[lookupName];
            
            if (bookChapters && bookChapters[chapterNumStr]) {
                const rawText = bookChapters[chapterNumStr][verseNumStr];
                if (rawText) {
                    const verseText = rawText.replace(/\{.*?\}/g, '').replace(/\s+/g, ' ').trim();
                    resolvedHighlights.push({
                        ...highlight,
                        bookName,
                        chapter: parseInt(chapterNumStr, 10),
                        reference: `${bookName} ${chapterNumStr}:${verseNumStr}`,
                        text: verseText
                    });
                }
            }
        } catch (e) {
            console.error('Could not resolve highlight ref:', highlight.ref, e);
        }
    }

    return resolvedHighlights;
};
