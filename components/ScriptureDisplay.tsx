
import React, { useState, useEffect } from 'react';
import { Book, FavoriteVerseRef, BibleVerse, ChapterData } from '../types';
import { getChapter } from '../services/bibleService';

interface ScriptureDisplayProps {
  book: Book;
  chapter: number;
  onAddToHistory: (book: Book, chapter: number) => void;
  favoriteVerses: FavoriteVerseRef[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6 p-6 bg-[var(--color-card-bg)] rounded-lg shadow-md">
    <div className="h-6 bg-[var(--color-skeleton-base)] rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-[var(--color-skeleton-highlight)] rounded"></div>
      <div className="h-4 bg-[var(--color-skeleton-highlight)] rounded w-5/6"></div>
      <div className="h-4 bg-[var(--color-skeleton-highlight)] rounded w-4/6"></div>
      <div className="h-4 bg-[var(--color-skeleton-highlight)] rounded w-5/6"></div>
    </div>
    <div className="h-4 bg-[var(--color-skeleton-base)] rounded w-1/4 mt-4"></div>
  </div>
);

export const ScriptureDisplay: React.FC<ScriptureDisplayProps> = ({ 
    book, chapter, onAddToHistory,
    favoriteVerses,
    onNextChapter, onPrevChapter
}) => {
  const [data, setData] = useState<ChapterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    return () => {
    };
  }, [book, chapter]);

  useEffect(() => {
    const loadChapter = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);
      
      try {
        const chapterData = await getChapter(book.name, chapter);
        if (!chapterData) {
            setError(`Could not load the text for ${book.name} chapter ${chapter}. Please check your network connection or try again.`);
        } else {
            setData(chapterData);
            onAddToHistory(book, chapter);
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    if (book && chapter) {
      loadChapter();
    }
  }, [book, chapter, onAddToHistory]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 bg-[var(--color-card-bg)] border-l-4 border-[var(--color-accent)] rounded-r-lg shadow-md ring-1 ring-[var(--color-card-ring)]">
        <h3 className="font-bold text-[var(--color-text-header)] text-lg">Content Not Available</h3>
        <p className="mt-2 text-[var(--color-text)]">{error}</p>
      </div>
    );
  }

  if (!data) {
    return null; 
  }

  const getVerseRef = (verse: BibleVerse): FavoriteVerseRef => `kjv:${verse.book_name}:${verse.chapter}:${verse.verse}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-text-header)] mb-2 tracking-tight">
            {data.reference}
        </h2>
        <div className="h-1 w-16 bg-[var(--color-accent)] rounded-full mb-8"></div>
      </div>

      <div 
        className="relative leading-relaxed text-justify"
        style={{
            fontSize: 'var(--font-size-reading)',
            fontFamily: 'var(--font-family-reading)',
            lineHeight: '1.8'
        } as React.CSSProperties}
      >
        {data.verses.map((verse) => {
            const verseRef = getVerseRef(verse);
            const isFavorited = favoriteVerses.includes(verseRef);

            let decorationStyle: React.CSSProperties = {};
            if (isFavorited) {
                decorationStyle.borderBottom = '2px solid var(--color-accent)';
            }

            return (
              <span 
                key={verse.verse} 
                className="inline relative transition-all duration-200"
                style={decorationStyle}
              >
                <span className="font-bold text-[var(--color-accent)] select-none">{verse.verse}</span>
                <span className="text-[var(--color-text)]">{verse.text} </span>
              </span>
            )
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col items-center space-y-8">
        <div className="flex items-center justify-between w-full max-w-xs">
           <button 
            onClick={onPrevChapter}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-hover)] transition-all"
           >
              <span className="material-symbols-outlined">chevron_left</span>
              <span>Prev</span>
           </button>
           <button 
            onClick={onNextChapter}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-opacity-90 transition-all"
           >
              <span>Next</span>
              <span className="material-symbols-outlined">chevron_right</span>
           </button>
        </div>
      </div>
    </div>
  );
};