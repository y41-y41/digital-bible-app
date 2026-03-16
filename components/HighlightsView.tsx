
import React from 'react';
import { ResolvedHighlight, FavoriteVerseRef } from '../types';

interface HighlightsViewProps {
    highlights: ResolvedHighlight[];
    onRemoveHighlight: (ref: FavoriteVerseRef) => void;
    onSelectHighlight: (highlight: ResolvedHighlight) => void;
}

export const HighlightsView: React.FC<HighlightsViewProps> = ({ highlights, onRemoveHighlight, onSelectHighlight }) => {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)] mb-8">Highlighted Verses</h1>
            {highlights.length === 0 ? (
                <div className="text-center bg-[var(--color-card-bg)] p-8 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)]">
                    <span className="material-symbols-outlined text-5xl text-[var(--color-text-muted)] mb-4">
                        format_paint
                    </span>
                    <h3 className="text-xl font-semibold text-[var(--color-text-header)]">No Highlights Yet</h3>
                    <p className="text-[var(--color-text-muted)] mt-2">
                        You can highlight verses with different colors while reading a chapter.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {highlights.map((highlight) => (
                        <div 
                            key={highlight.ref} 
                            className="p-4 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)]"
                            style={{ backgroundColor: `var(--color-highlight-${highlight.color})`}}
                        >
                            <blockquote className="border-l-4 pl-4" style={{borderColor: `var(--color-accent)`}}>
                                <p className="text-[var(--color-text)] leading-relaxed">"{highlight.text}"</p>
                            </blockquote>
                            <div className="flex justify-between items-center mt-3">
                                <p className="font-bold text-[var(--color-accent)]">{highlight.reference}</p>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => onSelectHighlight(highlight)} className="p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] transition-colors" aria-label="Go to chapter">
                                        <span className="material-symbols-outlined text-base">menu_book</span>
                                    </button>
                                     <button onClick={() => onRemoveHighlight(highlight.ref)} className="p-2 rounded-full text-red-500/70 hover:bg-red-500/10 transition-colors" aria-label="Remove highlight">
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