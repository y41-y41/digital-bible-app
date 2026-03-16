
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onBack: () => void;
  onHome: () => void;
}

const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ 
  currentView,
  onBack, 
  onHome,
}) => {
  const showBackButton = currentView !== 'home';

  return (
    <header className="bg-[var(--color-header-bg)] backdrop-blur-lg sticky top-0 z-20 border-b-2 border-[var(--color-text-header)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            {showBackButton ? (
               <button onClick={onBack} className="p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:ring-[var(--color-accent)] transition-colors" aria-label="Go back">
                 <ArrowLeftIcon className="h-5 w-5" />
               </button>
            ) : (
              <button onClick={onHome} className="p-2 rounded-full text-[var(--color-text-header)]" aria-label="Go home">
                <span className="material-symbols-outlined text-[var(--color-accent)]">book_2</span>
              </button>
            )}
             <button onClick={onHome} className="font-bold text-lg text-[var(--color-text-header)]">Digital Bible</button>
          </div>
        </div>
      </div>
    </header>
  );
};
