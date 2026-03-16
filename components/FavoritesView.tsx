
import React from 'react';
import { ResolvedFavorite, FavoriteVerseRef } from '../types';

interface FavoritesViewProps {
    favorites: ResolvedFavorite[];
    onRemoveFavorite: (ref: FavoriteVerseRef) => void;
    onSelectFavorite: (favorite: ResolvedFavorite) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ favorites, onRemoveFavorite, onSelectFavorite }) => {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-8">Favorite Verses</h1>
            {favorites.length === 0 ? (
                <div className="text-center bg-[var(--color-card-bg)] p-8 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)]">
                    <span className="material-symbols-outlined text-5xl text-[var(--color-text-muted)] mb-4">
                        favorite
                    </span>
                    <h3 className="text-xl font-semibold text-[var(--color-text-header)]">No Favorites Yet</h3>
                    <p className="text-[var(--color-text-muted)] mt-2">
                        You can add verses to your favorites while reading a chapter.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {favorites.map((favorite) => (
                        <div key={favorite.ref} className="bg-[var(--color-card-bg)] p-4 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)]">
                            <blockquote className="border-l-4 border-[var(--color-accent)] pl-4">
                                <p className="text-[var(--color-text)] leading-relaxed">"{favorite.text}"</p>
                            </blockquote>
                            <div className="flex justify-between items-center mt-3">
                                <p className="font-bold text-[var(--color-accent)]">{favorite.reference}</p>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => onSelectFavorite(favorite)} className="p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] transition-colors" aria-label="Go to chapter">
                                        <span className="material-symbols-outlined text-base">menu_book</span>
                                    </button>
                                     <button onClick={() => onRemoveFavorite(favorite.ref)} className="p-2 rounded-full text-red-500/70 hover:bg-red-500/10 transition-colors" aria-label="Remove favorite">
                                        <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
