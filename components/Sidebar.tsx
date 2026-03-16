
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  React.useEffect(() => {
    console.log('Sidebar mounted');
  }, []);

  const navItems = [
    { view: 'home' as View, icon: 'home', label: 'Home' },
    { view: 'favorites' as View, icon: 'favorite', label: 'Favorites' },
    { view: 'highlights' as View, icon: 'format_paint', label: 'Highlights' },
    { view: 'history' as View, icon: 'history', label: 'History' },
    { view: 'search' as View, icon: 'search', label: 'Search' },
  ];

  return (
    <aside 
      className="sticky top-16 h-[calc(100vh-4rem)] w-16 min-w-[4rem] border-r-2 flex flex-col items-center py-6 space-y-8 z-30 shadow-sm"
      style={{ 
        backgroundColor: 'var(--color-header-bg, #1f2937)',
        borderColor: 'var(--color-text-header, rgba(255,255,255,0.2))'
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => onNavigate(item.view)}
          className={`p-3 rounded-xl transition-all duration-200 group relative ${
            currentView === item.view 
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-lg shadow-[var(--color-accent)]/20' 
              : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text)]'
          }`}
          title={item.label}
        >
          <span className="material-symbols-outlined text-2xl">
            {item.icon}
          </span>
          
          {/* Tooltip */}
          <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {item.label}
          </span>
        </button>
      ))}
    </aside>
  );
};
