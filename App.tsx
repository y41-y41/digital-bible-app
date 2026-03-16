
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ScriptureDisplay } from './components/ScriptureDisplay';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import { Book, BackgroundMode, ColorThemeName, View, FontFamily, SearchResult, FavoriteVerseRef, ReadingHistoryEntry, ResolvedFavorite, SearchParams, VerseHighlight, ResolvedHighlight, HighlightColorName } from './types';
import { Footer } from './components/Footer';
import { themes } from './themes';
import * as db from './services/db';
import * as bibleService from './services/bibleService';
import { FavoritesView } from './components/FavoritesView';
import { HighlightsView } from './components/HighlightsView';

const bibleBooks: Book[] = [
  { name: 'Genesis', chapters: 50, testament: 'Old' }, { name: 'Exodus', chapters: 40, testament: 'Old' },
  { name: 'Leviticus', chapters: 27, testament: 'Old' }, { name: 'Numbers', chapters: 36, testament: 'Old' },
  { name: 'Deuteronomy', chapters: 34, testament: 'Old' }, { name: 'Joshua', chapters: 24, testament: 'Old' },
  { name: 'Judges', chapters: 21, testament: 'Old' }, { name: 'Ruth', chapters: 4, testament: 'Old' },
  { name: '1 Samuel', chapters: 31, testament: 'Old' }, { name: '2 Samuel', chapters: 24, testament: 'Old' },
  { name: '1 Kings', chapters: 22, testament: 'Old' }, { name: '2 Kings', chapters: 25, testament: 'Old' },
  { name: '1 Chronicles', chapters: 29, testament: 'Old' }, { name: '2 Chronicles', chapters: 36, testament: 'Old' },
  { name: 'Ezra', chapters: 10, testament: 'Old' }, { name: 'Nehemiah', chapters: 13, testament: 'Old' },
  { name: 'Esther', chapters: 10, testament: 'Old' }, { name: 'Job', chapters: 42, testament: 'Old' },
  { name: 'Psalms', chapters: 150, testament: 'Old' }, { name: 'Proverbs', chapters: 31, testament: 'Old' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'Old' }, { name: 'Song of Solomon', chapters: 8, testament: 'Old' },
  { name: 'Isaiah', chapters: 66, testament: 'Old' }, { name: 'Jeremiah', chapters: 52, testament: 'Old' },
  { name: 'Lamentations', chapters: 5, testament: 'Old' }, { name: 'Ezekiel', chapters: 48, testament: 'Old' },
  { name: 'Daniel', chapters: 12, testament: 'Old' }, { name: 'Hosea', chapters: 14, testament: 'Old' },
  { name: 'Joel', chapters: 3, testament: 'Old' }, { name: 'Amos', chapters: 9, testament: 'Old' },
  { name: 'Obadiah', chapters: 1, testament: 'Old' }, { name: 'Jonah', chapters: 4, testament: 'Old' },
  { name: 'Micah', chapters: 7, testament: 'Old' }, { name: 'Nahum', chapters: 3, testament: 'Old' },
  { name: 'Habakkuk', chapters: 3, testament: 'Old' }, { name: 'Zephaniah', chapters: 3, testament: 'Old' },
  { name: 'Haggai', chapters: 2, testament: 'Old' }, { name: 'Zechariah', chapters: 14, testament: 'Old' },
  { name: 'Malachi', chapters: 4, testament: 'Old' },
  { name: 'Matthew', chapters: 28, testament: 'New' }, { name: 'Mark', chapters: 16, testament: 'New' },
  { name: 'Luke', chapters: 24, testament: 'New' }, { name: 'John', chapters: 21, testament: 'New' },
  { name: 'Acts', chapters: 28, testament: 'New' }, { name: 'Romans', chapters: 16, testament: 'New' },
  { name: '1 Corinthians', chapters: 16, testament: 'New' }, { name: '2 Corinthians', chapters: 13, testament: 'New' },
  { name: 'Galatians', chapters: 6, testament: 'New' }, { name: 'Ephesians', chapters: 6, testament: 'New' },
  { name: 'Philippians', chapters: 4, testament: 'New' }, { name: 'Colossians', chapters: 4, testament: 'New' },
  { name: '1 Thessalonians', chapters: 5, testament: 'New' }, { name: '2 Thessalonians', chapters: 3, testament: 'New' },
  { name: '1 Timothy', chapters: 6, testament: 'New' }, { name: '2 Timothy', chapters: 4, testament: 'New' },
  { name: 'Titus', chapters: 3, testament: 'New' }, { name: 'Philemon', chapters: 1, testament: 'New' },
  { name: 'Hebrews', chapters: 13, testament: 'New' }, { name: 'James', chapters: 5, testament: 'New' },
  { name: '1 Peter', chapters: 5, testament: 'New' }, { name: '2 Peter', chapters: 3, testament: 'New' },
  { name: '1 John', chapters: 5, testament: 'New' }, { name: '2 John', chapters: 1, testament: 'New' },
  { name: '3 John', chapters: 1, testament: 'New' }, { name: 'Jude', chapters: 1, testament: 'New' },
  { name: 'Revelation', chapters: 22, testament: 'New' }
];

const SettingsIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const App: React.FC = () => {
  // Appearance State
  const [colorTheme, setColorTheme] = useState<ColorThemeName>('midnight');
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('dark');
  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>('Serif');
  
  // App Data State
  const [favoriteVerses, setFavoriteVerses] = useState<FavoriteVerseRef[]>([]);
  const [resolvedFavorites, setResolvedFavorites] = useState<ResolvedFavorite[]>([]);
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [resolvedHighlights, setResolvedHighlights] = useState<ResolvedHighlight[]>([]);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryEntry[]>([]);
  const [searchResults, setSearchResults] = useState<{ query: string, results: SearchResult[] }>({ query: '', results: [] });
  
  // Navigation State
  const [navigationStack, setNavigationStack] = useState<View[]>(['home']);
  const currentView = navigationStack[navigationStack.length - 1];
  const [selectedTestament, setSelectedTestament] = useState<'Old' | 'New' | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const handleNextChapter = () => {
    if (!selectedBook || selectedChapter === null) return;
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      const currentIndex = bibleBooks.findIndex(b => b.name === selectedBook.name);
      if (currentIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentIndex + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (!selectedBook || selectedChapter === null) return;
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      const currentIndex = bibleBooks.findIndex(b => b.name === selectedBook.name);
      if (currentIndex > 0) {
        const prevBook = bibleBooks[currentIndex - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chapters);
      }
    }
  };

  const navigateTo = (view: View) => setNavigationStack(prev => [...prev, view]);
  
  const handleSidebarNavigate = (view: View) => {
    if (view === 'home') {
      setNavigationStack(['home']);
    } else if (view === 'favorites') {
      handleShowFavorites();
    } else if (view === 'highlights') {
      handleShowHighlights();
    } else {
      setNavigationStack(['home', view]);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
        const savedMode = localStorage.getItem('backgroundMode') as BackgroundMode;
        const effectiveMode = savedMode || 'dark';
        setBackgroundMode(effectiveMode);

        const savedTheme = localStorage.getItem('colorTheme') as ColorThemeName;
        if (savedTheme && themes[savedTheme] && themes[savedTheme].type === effectiveMode) {
            setColorTheme(savedTheme);
        } else {
            const firstThemeForMode = (Object.keys(themes) as ColorThemeName[]).find(t => themes[t].type === effectiveMode);
            if (firstThemeForMode) setColorTheme(firstThemeForMode);
        }
        
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) setFontSize(Number(savedFontSize));

        const savedFontFamily = localStorage.getItem('fontFamily') as FontFamily;
        if (savedFontFamily) setFontFamily(savedFontFamily);

        const favorites = await db.getFavorites();
        setFavoriteVerses(favorites);

        const loadedHighlights = await db.getHighlights();
        setHighlights(loadedHighlights);

        const history = await db.getHistory();
        setReadingHistory(history);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const theme = themes[colorTheme];
    if (theme) {
      Object.entries(theme.cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      localStorage.setItem('colorTheme', colorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem('backgroundMode', backgroundMode);
  }, [backgroundMode]);
  
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-reading', `${fontSize}px`);
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    let fontFamilyValue = '';
    switch (fontFamily) {
        case 'Serif': fontFamilyValue = "serif"; break;
        case 'Sans-serif': fontFamilyValue = "sans-serif"; break;
        case 'Monospace': fontFamilyValue = "monospace"; break;
        default: fontFamilyValue = "serif";
    }
    document.documentElement.style.setProperty('--font-family-reading', fontFamilyValue);
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  const handleClearUserData = async () => {
    await db.clearHistory();
    await db.clearFavorites();
    await db.clearHighlights();
    setReadingHistory([]);
    setFavoriteVerses([]);
    setHighlights([]);
    alert('Your reading history, favorites, and highlights have been cleared.');
  }

  const handleSearch = async (params: SearchParams) => {
    if (!params.query.trim()) return;
    
    const displayQueryParts = [`“${params.query}”`];
    if (params.book !== 'any') {
        displayQueryParts.push(`in ${params.book}`);
    } else if (params.testament !== 'any') {
        displayQueryParts.push(`in the ${params.testament} Testament`);
    }
    if (params.chapter) {
        displayQueryParts.push(`ch. ${params.chapter}`);
    }
    const displayQuery = displayQueryParts.join(' ');

    setSearchResults({ query: displayQuery, results: [] });
    navigateTo('search');
    const results = await bibleService.search(params, bibleBooks);
    setSearchResults({ query: displayQuery, results });
  }

  const handleSelectSearchResult = (result: SearchResult) => {
    setSelectedBook(result.book);
    setSelectedChapter(result.chapter);
    navigateTo('reading');
  }

  const handleToggleFavorite = async (verseRef: FavoriteVerseRef) => {
    const index = favoriteVerses.findIndex(f => f === verseRef);
    let newFavorites: FavoriteVerseRef[];

    if (index > -1) {
      // Verse is already favorited, so remove it.
      newFavorites = favoriteVerses.filter(f => f !== verseRef);
    } else {
      // Verse is not favorited, so add it.
      newFavorites = [...favoriteVerses, verseRef];
    }
    
    setFavoriteVerses(newFavorites);
    await db.setFavorites(newFavorites);
    
    // If we're on the favorites view, we need to refresh the resolved list
    if (currentView === 'favorites') {
        const newResolved = await bibleService.resolveFavorites(newFavorites);
        setResolvedFavorites(newResolved);
    }
  };

  const handleSetHighlight = async (verseRef: FavoriteVerseRef, color: HighlightColorName | null) => {
    let newHighlights = highlights.filter(h => h.ref !== verseRef);
    if (color) {
        newHighlights.push({ ref: verseRef, color });
    }
    setHighlights(newHighlights);
    await db.setHighlights(newHighlights);

    if (currentView === 'highlights') {
        const newResolved = await bibleService.resolveHighlights(newHighlights);
        setResolvedHighlights(newResolved);
    }
  }
  
  const handleAddToHistory = useCallback(async (book: Book, chapter: number) => {
    const newEntry: ReadingHistoryEntry = { bookName: book.name, chapter, timestamp: Date.now() };
    setReadingHistory(prevHistory => {
        const updatedHistory = [newEntry, ...prevHistory.filter(h => !(h.bookName === book.name && h.chapter === chapter))].slice(0, 5);
        // Persist to DB
        db.setHistory(updatedHistory);
        return updatedHistory;
    });
  }, []); // Empty dependency array makes this function stable across re-renders
  
  const handleHistorySelect = (entry: ReadingHistoryEntry) => {
      const book = bibleBooks.find(b => b.name === entry.bookName);
      if (book) {
          handleSelectBook(book);
          handleSelectChapter(entry.chapter);
      }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    navigateTo('chapters');
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    navigateTo('reading');
  };

  const handleOpenSettings = () => {
    navigateTo('settings');
  };

  const handleShowFavorites = async () => {
      const resolved = await bibleService.resolveFavorites(favoriteVerses);
      setResolvedFavorites(resolved);
      navigateTo('favorites');
  }

  const handleShowHighlights = async () => {
      const resolved = await bibleService.resolveHighlights(highlights);
      setResolvedHighlights(resolved);
      navigateTo('highlights');
  }
  
  const handleSelectFavorite = (favorite: ResolvedFavorite) => {
    const book = bibleBooks.find(b => b.name === favorite.bookName);
    if(book) {
      setSelectedBook(book);
      handleSelectChapter(favorite.chapter);
    }
  }

  const handleSelectHighlight = (highlight: ResolvedHighlight) => {
    const book = bibleBooks.find(b => b.name === highlight.bookName);
    if(book) {
      setSelectedBook(book);
      handleSelectChapter(highlight.chapter);
    }
  }

  const handleBack = () => {
    if (navigationStack.length > 1) {
        setNavigationStack(prev => prev.slice(0, -1));
    }
  };

  const handleHome = () => {
    setNavigationStack(['home']);
    setSelectedBook(null);
    setSelectedChapter(null);
    setSelectedTestament(null);
  };
  
  const NavCard: React.FC<{title: string, onClick: () => void, subtext?: string, icon?: string, children?: React.ReactNode}> = ({title, onClick, subtext, icon, children}) => (
    <div
      onClick={onClick}
      className="bg-[var(--color-card-bg-translucent)] backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl border-2 border-[var(--color-text-header)] hover:border-[var(--color-accent)] transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="flex items-center space-x-4">
        {icon && <span className="material-symbols-outlined text-3xl text-[var(--color-accent)]">{icon}</span>}
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text-header)]">{title}</h3>
          {subtext && <p className="text-[var(--color-text-muted)] text-sm mt-1">{subtext}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  const HomeSearch: React.FC<{onSearch: (params: SearchParams) => void;}> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [selectedTestament, setSelectedTestament] = useState<'any' | 'Old' | 'New'>('any');
    const [selectedBook, setSelectedBook] = useState('any'); // 'any' or book name
    const [chapter, setChapter] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(bibleBooks);

    useEffect(() => {
        if (selectedTestament === 'any') {
            setFilteredBooks(bibleBooks);
        } else {
            setFilteredBooks(bibleBooks.filter(b => b.testament === selectedTestament));
        }
        setSelectedBook('any'); // Reset book selection when testament changes
    }, [selectedTestament]);

    useEffect(() => {
        if (selectedBook === 'any') {
            setChapter('');
        }
    }, [selectedBook]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch({ query, testament: selectedTestament, book: selectedBook, chapter });
    }
    
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[var(--color-text-header)] drop-shadow-lg mb-4 text-center">Search the Bible (KJV)</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[var(--color-card-bg-translucent)] backdrop-blur-sm p-6 rounded-xl shadow-md border-2 border-[var(--color-text-header)] flex flex-col gap-6">
          <div>
            <label htmlFor="search-query" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Search for a word or phrase</label>
            <input 
              id="search-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., God created"
              className="w-full pl-3 pr-4 py-2 text-base bg-[var(--color-input-bg)] text-[var(--color-text)] border-2 border-[var(--color-text-header)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>
          
          <fieldset>
            <legend className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Refine your search (optional)</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search-testament" className="sr-only">Testament</label>
                  <select
                      id="search-testament"
                      value={selectedTestament}
                      onChange={e => setSelectedTestament(e.target.value as 'any' | 'Old' | 'New')}
                      className="w-full px-3 py-2 text-base bg-[var(--color-input-bg)] text-[var(--color-text)] border-2 border-[var(--color-text-header)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                      <option value="any">Any Testament</option>
                      <option value="Old">Old Testament</option>
                      <option value="New">New Testament</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="search-book" className="sr-only">Book</label>
                  <select
                      id="search-book"
                      value={selectedBook}
                      onChange={e => setSelectedBook(e.target.value)}
                      className="w-full px-3 py-2 text-base bg-[var(--color-input-bg)] text-[var(--color-text)] border-2 border-[var(--color-text-header)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                      <option value="any">Any Book</option>
                      {filteredBooks.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="search-chapter" className="sr-only">Chapter</label>
                  <input
                      id="search-chapter"
                      type="text"
                      pattern="\d*"
                      value={chapter}
                      onChange={e => setChapter(e.target.value.replace(/\D/g, ''))}
                      placeholder="Chapter (e.g., 1)"
                      className="w-full px-3 py-2 text-base bg-[var(--color-input-bg)] text-[var(--color-text)] border-2 border-[var(--color-text-header)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      disabled={selectedBook === 'any'}
                  />
                </div>
            </div>
          </fieldset>

          <button type="submit" className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md font-semibold hover:opacity-90 transition-opacity">
              Search
          </button>
        </form>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text-header)] mb-4">The Holy Bible</h1>
                <p className="text-xl text-[var(--color-text-muted)] italic">King James Version</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <NavCard title="Old Testament" onClick={() => { setSelectedTestament('Old'); navigateTo('books'); }} icon="" subtext="" />
               <NavCard title="New Testament" onClick={() => { setSelectedTestament('New'); navigateTo('books'); }} icon="" subtext="" />
             </div>
             
             <div className="mt-12">
                <h2 className="text-2xl font-bold text-[var(--color-text-header)] mb-6 text-center">Search the Bible (KJV)</h2>
                <HomeSearch onSearch={handleSearch} />
             </div>
          </div>
        );
      case 'books':
        return (
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-8">{selectedTestament} Testament</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {bibleBooks.filter(b => b.testament === selectedTestament).map(book => (
                <NavCard key={book.name} title={book.name} subtext={`${book.chapters} Chapters`} onClick={() => handleSelectBook(book)} />
              ))}
            </div>
          </div>
        );
      case 'chapters':
        if (!selectedBook) return null;
        return (
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-2">{selectedBook.name}</h1>
            <p className="text-center text-[var(--color-text-muted)] mb-8">
              Select a chapter to read.
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3">
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(chapter => {
                return (
                    <div
                        key={chapter}
                        onClick={() => handleSelectChapter(chapter)}
                        className="flex items-center justify-center aspect-square p-2 rounded-lg shadow-md ring-1 text-[var(--color-text)] font-semibold transition-all duration-200 bg-[var(--color-card-bg)] ring-[var(--color-card-ring)] hover:ring-[var(--color-accent)] cursor-pointer transform hover:-translate-y-0.5"
                    >
                        {chapter}
                    </div>
                );
              })}
            </div>
          </div>
        );
      case 'reading':
        if (!selectedBook || !selectedChapter) return null;
        return <ScriptureDisplay 
            book={selectedBook} 
            chapter={selectedChapter}
            onAddToHistory={handleAddToHistory}
            favoriteVerses={favoriteVerses}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePrevChapter}
        />;
      case 'search':
            return (
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-2">Search Results</h1>
                    <p className="text-center text-[var(--color-text-muted)] mb-8">Found {searchResults.results.length} results for {searchResults.query}</p>
                    <div className="space-y-4">
                        {searchResults.results.map((result, index) => (
                            <div key={index} onClick={() => handleSelectSearchResult(result)} className="bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)] hover:ring-[var(--color-accent)] cursor-pointer transition-all">
                                <p className="font-bold text-[var(--color-accent)]">{result.reference}</p>
                                <p className="mt-1 text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: result.text }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            );
       case 'history':
          return (
             <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-8">Reading History</h1>
                 {readingHistory.length === 0 ? (
                    <p className="text-center text-[var(--color-text-muted)]">Your recent chapters will appear here.</p>
                 ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {readingHistory.map(entry => (
                            <div key={entry.timestamp} onClick={() => handleHistorySelect(entry)} className="text-left bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md hover:shadow-xl ring-1 ring-[var(--color-card-ring)] hover:ring-[var(--color-accent)] transition-all duration-300 cursor-pointer">
                                <h4 className="font-semibold text-[var(--color-text-header)]">{entry.bookName} {entry.chapter}</h4>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
          )
      case 'favorites':
        return <FavoritesView
            favorites={resolvedFavorites}
            onRemoveFavorite={handleToggleFavorite}
            onSelectFavorite={handleSelectFavorite}
        />
      case 'highlights':
        return <HighlightsView
            highlights={resolvedHighlights}
            onRemoveHighlight={(ref) => handleSetHighlight(ref, null)}
            onSelectHighlight={handleSelectHighlight}
        />
      case 'settings':
        return <Settings 
          colorTheme={colorTheme} setColorTheme={setColorTheme}
          backgroundMode={backgroundMode} setBackgroundMode={setBackgroundMode}
          fontSize={fontSize} setFontSize={setFontSize}
          fontFamily={fontFamily} setFontFamily={setFontFamily}
          onClearUserData={handleClearUserData}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[var(--color-text)] bg-[var(--color-bg)] transition-colors duration-300">
        <Header 
          currentView={currentView}
          onBack={handleBack}
          onHome={handleHome}
        />
        <div className="flex flex-grow">
          <Sidebar currentView={currentView} onNavigate={handleSidebarNavigate} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-5xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        {currentView !== 'reading' && <Footer />}
        {currentView !== 'settings' && (
          <button
              onClick={handleOpenSettings}
              className="fixed bottom-6 right-6 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-full p-4 shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:ring-[var(--color-accent)] transition-transform transform hover:scale-110 z-30"
              aria-label="Open settings"
          >
              <SettingsIcon className="w-6 h-6" />
          </button>
        )}
    </div>
  );
};

export default App;