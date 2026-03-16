
import React from 'react';
import { ColorThemeName, BackgroundMode, FontFamily } from '../types';
import { themes } from '../themes';

interface SettingsProps {
  colorTheme: ColorThemeName;
  setColorTheme: (theme: ColorThemeName) => void;
  backgroundMode: BackgroundMode;
  setBackgroundMode: (background: BackgroundMode) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: FontFamily;
  setFontFamily: (family: FontFamily) => void;
  onClearUserData: () => void;
}

const SettingsCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-[var(--color-card-bg)] p-6 rounded-lg shadow-md ring-1 ring-[var(--color-card-ring)]">
        <h3 className="text-lg font-semibold text-[var(--color-text-header)] border-b border-[var(--color-border)] pb-3 mb-4">{title}</h3>
        {children}
    </div>
);

const OptionButton: React.FC<{onClick: () => void, label: string, isSelected: boolean}> = ({onClick, label, isSelected}) => (
    <button
       onClick={onClick}
       className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
         isSelected
           ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold'
           : 'bg-[var(--color-input-bg)] text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
       }`}
       role="radio"
       aria-checked={isSelected}
     >
       {label}
   </button>
 );

export const Settings: React.FC<SettingsProps> = ({
  colorTheme, setColorTheme,
  backgroundMode, setBackgroundMode,
  fontSize, setFontSize,
  fontFamily, setFontFamily,
  onClearUserData
}) => {
    
  const handleModeChange = (mode: BackgroundMode) => {
    setBackgroundMode(mode);
    const firstThemeForMode = (Object.keys(themes) as ColorThemeName[]).find(t => themes[t].type === mode);
    if (firstThemeForMode) {
      setColorTheme(firstThemeForMode);
    }
  };

  const availableThemes = (Object.keys(themes) as ColorThemeName[]).filter(
    themeKey => themes[themeKey].type === backgroundMode
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-text-header)]">Settings</h1>
      
      <SettingsCard title="Reading Experience">
        <div className="space-y-6">
            <div>
                <label htmlFor="font-size" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Font Size</label>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Aa</span>
                    <input
                        id="font-size"
                        type="range"
                        min="14"
                        max="28"
                        step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--color-input-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                    />
                    <span className="text-2xl">Aa</span>
                </div>
            </div>
            <div>
                <p className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Font Style</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <OptionButton onClick={() => setFontFamily('Serif')} label="Serif" isSelected={fontFamily === 'Serif'} />
                    <OptionButton onClick={() => setFontFamily('Sans-serif')} label="Sans-serif" isSelected={fontFamily === 'Sans-serif'} />
                    <OptionButton onClick={() => setFontFamily('Monospace')} label="Monospace" isSelected={fontFamily === 'Monospace'} />
                </div>
            </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Appearance">
        <div className="space-y-6">
          <div>
              <p className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Mode</p>
              <div className="grid grid-cols-2 gap-2">
                  <OptionButton onClick={() => handleModeChange('light')} label="Light" isSelected={backgroundMode === 'light'} />
                  <OptionButton onClick={() => handleModeChange('dark')} label="Dark" isSelected={backgroundMode === 'dark'} />
              </div>
          </div>
          <div>
            <p id="theme-group-label" className="block text-sm font-medium text-[var(--color-text-muted)] mb-3">Color Theme</p>
            <div role="radiogroup" aria-labelledby="theme-group-label" className="grid grid-cols-5 gap-4">
              {availableThemes.map(themeKey => {
                const theme = themes[themeKey];
                const isSelected = colorTheme === themeKey;
                return (
                  <div key={themeKey} className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setColorTheme(themeKey)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 focus:outline-none ${
                        isSelected ? 'ring-2 ring-offset-2 ring-offset-[var(--color-bg)] ring-[var(--color-accent)]' : 'ring-1 ring-inset ring-[var(--color-border)]'
                      }`}
                      style={{ backgroundColor: theme.cssVars['--color-accent'] }}
                      aria-label={theme.name}
                      role="radio"
                      aria-checked={isSelected}
                    >
                      {isSelected && (
                        <span 
                          className="material-symbols-outlined text-lg"
                          style={{ color: theme.cssVars['--color-accent-text'] }}
                        >
                          check
                        </span>
                      )}
                    </button>
                    <span className={`text-xs text-center transition-colors select-none ${isSelected ? 'text-[var(--color-text-header)] font-medium' : 'text-[var(--color-text-muted)]'}`}>
                      {theme.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="User Data">
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-muted)]">
                Manage your saved favorites, highlights, and reading history. This action cannot be undone.
            </p>
             <button
                onClick={onClearUserData}
                className="w-full sm:w-auto px-4 py-2 text-sm font-semibold bg-red-600/10 text-red-500 rounded-md hover:bg-red-600/20 transition-colors"
            >
                Clear History, Favorites & Highlights
            </button>
        </div>
      </SettingsCard>
    </div>
  );
};