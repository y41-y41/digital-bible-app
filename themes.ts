import { ColorThemeName } from "./types";

type ThemeDefinition = {
  name: string;
  type: 'light' | 'dark';
  cssVars: Record<string, string>;
};

export const themes: Record<ColorThemeName, ThemeDefinition> = {
  midnight: {
    name: 'Midnight',
    type: 'dark',
    cssVars: {
      '--color-bg': '#111827',
      '--color-bg-translucent': 'rgba(17, 24, 39, 0.9)',
      '--color-header-bg': 'rgba(17, 24, 39, 0.85)',
      '--color-text': '#d1d5db',
      '--color-text-header': '#f9fafb',
      '--color-text-muted': '#6b7280',
      '--color-accent': '#60a5fa', // blue-400
      '--color-accent-text': '#eff6ff',
      '--color-accent-bg': 'rgba(96, 165, 250, 0.2)',
      '--color-favorite-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-border': '#1f2937',
      '--color-card-bg': '#1f2937',
      '--color-card-bg-translucent': 'rgba(31, 41, 55, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#1f2937',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#374151',
      '--color-skeleton-highlight': '#1f2937',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  amethyst: {
    name: 'Amethyst',
    type: 'dark',
    cssVars: {
      '--color-bg': '#2e1065', // violet-950
      '--color-bg-translucent': 'rgba(46, 16, 101, 0.9)',
      '--color-header-bg': 'rgba(46, 16, 101, 0.85)',
      '--color-text': '#ddd6fe', // violet-200
      '--color-text-header': '#f5f3ff', // violet-50
      '--color-text-muted': '#a78bfa', // violet-400
      '--color-accent': '#c4b5fd', // violet-300
      '--color-accent-text': '#3b0764',
      '--color-accent-bg': 'rgba(196, 181, 253, 0.15)',
      '--color-favorite-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-border': '#4c1d95', // violet-900
      '--color-card-bg': '#3b0764',
      '--color-card-bg-translucent': 'rgba(59, 7, 100, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#4c1d95',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#4c1d95',
      '--color-skeleton-highlight': '#3b0764',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(196, 181, 253, 0.2)',
    }
  },
  amber: {
    name: 'Amber',
    type: 'dark',
    cssVars: {
      '--color-bg': '#422006',
      '--color-bg-translucent': 'rgba(66, 32, 6, 0.9)',
      '--color-header-bg': 'rgba(66, 32, 6, 0.85)',
      '--color-text': '#fde68a', // amber-200
      '--color-text-header': '#fefce8', // amber-50
      '--color-text-muted': '#fbbf24', // amber-400
      '--color-accent': '#fcd34d', // amber-300
      '--color-accent-text': '#78350f', // amber-900
      '--color-accent-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-favorite-bg': 'rgba(161, 98, 7, 0.25)',
      '--color-border': '#78350f', // amber-900
      '--color-card-bg': '#5f330d',
      '--color-card-bg-translucent': 'rgba(120, 53, 15, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#78350f',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#78350f',
      '--color-skeleton-highlight': '#5f330d',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.25)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  forest: {
    name: 'Forest',
    type: 'dark',
    cssVars: {
      '--color-bg': '#1a2e28',
      '--color-bg-translucent': 'rgba(26, 46, 40, 0.9)',
      '--color-header-bg': 'rgba(26, 46, 40, 0.85)',
      '--color-text': '#b8d2c9',
      '--color-text-header': '#e6f0eb',
      '--color-text-muted': '#8aa89d',
      '--color-accent': '#6ee7b7', // emerald-300
      '--color-accent-text': '#042f1c',
      '--color-accent-bg': 'rgba(110, 231, 183, 0.2)',
      '--color-favorite-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-border': '#25423a',
      '--color-card-bg': '#25423a',
      '--color-card-bg-translucent': 'rgba(37, 66, 58, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#25423a',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#25423a',
      '--color-skeleton-highlight': '#1a2e28',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  slate: {
    name: 'Slate',
    type: 'dark',
    cssVars: {
      '--color-bg': '#334155',
      '--color-bg-translucent': 'rgba(51, 65, 85, 0.9)',
      '--color-header-bg': 'rgba(51, 65, 85, 0.85)',
      '--color-text': '#cbd5e1',
      '--color-text-header': '#f1f5f9',
      '--color-text-muted': '#94a3b8',
      '--color-accent': '#f87171', // red-400
      '--color-accent-text': '#450a0a',
      '--color-accent-bg': 'rgba(248, 113, 113, 0.2)',
      '--color-favorite-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-border': '#475569',
      '--color-card-bg': '#475569',
      '--color-card-bg-translucent': 'rgba(71, 85, 105, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#475569',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#475569',
      '--color-skeleton-highlight': '#334155',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  crimson: {
    name: 'Crimson',
    type: 'dark',
    cssVars: {
      '--color-bg': '#450a0a',
      '--color-bg-translucent': 'rgba(69, 10, 10, 0.9)',
      '--color-header-bg': 'rgba(69, 10, 10, 0.85)',
      '--color-text': '#fecaca',
      '--color-text-header': '#fef2f2',
      '--color-text-muted': '#f87171',
      '--color-accent': '#ef4444',
      '--color-accent-text': '#fef2f2',
      '--color-accent-bg': 'rgba(239, 68, 68, 0.2)',
      '--color-favorite-bg': 'rgba(252, 211, 77, 0.15)',
      '--color-border': '#7f1d1d',
      '--color-card-bg': '#7f1d1d',
      '--color-card-bg-translucent': 'rgba(127, 29, 29, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#7f1d1d',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#7f1d1d',
      '--color-skeleton-highlight': '#450a0a',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  teal: {
    name: 'Teal',
    type: 'dark',
    cssVars: {
      '--color-bg': '#134e4a',
      '--color-bg-translucent': 'rgba(19, 78, 74, 0.9)',
      '--color-header-bg': 'rgba(19, 78, 74, 0.85)',
      '--color-text': '#99f6e4',
      '--color-text-header': '#f0fdfa',
      '--color-text-muted': '#5eead4',
      '--color-accent': '#2dd4bf',
      '--color-accent-text': '#042f2e',
      '--color-accent-bg': 'rgba(45, 212, 191, 0.2)',
      '--color-favorite-bg': 'rgba(250, 204, 21, 0.2)',
      '--color-border': '#115e59',
      '--color-card-bg': '#0f766e',
      '--color-card-bg-translucent': 'rgba(15, 118, 110, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#115e59',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#115e59',
      '--color-skeleton-highlight': '#134e4a',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.25)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.25)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  graphite: {
    name: 'Graphite',
    type: 'dark',
    cssVars: {
      '--color-bg': '#171717',
      '--color-bg-translucent': 'rgba(23, 23, 23, 0.9)',
      '--color-header-bg': 'rgba(23, 23, 23, 0.85)',
      '--color-text': '#a3a3a3',
      '--color-text-header': '#f5f5f5',
      '--color-text-muted': '#737373',
      '--color-accent': '#e5e5e5',
      '--color-accent-text': '#262626',
      '--color-accent-bg': 'rgba(229, 229, 229, 0.15)',
      '--color-favorite-bg': 'rgba(250, 204, 21, 0.15)',
      '--color-border': '#404040',
      '--color-card-bg': '#262626',
      '--color-card-bg-translucent': 'rgba(38, 38, 38, 0.7)',
      '--color-card-ring': 'rgba(255, 255, 255, 0.1)',
      '--color-input-bg': '#404040',
      '--color-bg-hover': 'rgba(255, 255, 255, 0.05)',
      '--color-skeleton-base': '#404040',
      '--color-skeleton-highlight': '#262626',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.2)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.2)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.2)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.2)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.2)',
    }
  },
  linen: {
    name: 'Linen',
    type: 'light',
    cssVars: {
      '--color-bg': '#e7e5e4', // stone-200
      '--color-bg-translucent': 'rgba(245, 245, 244, 0.8)',
      '--color-header-bg': 'rgba(245, 245, 244, 0.95)',
      '--color-text': '#374151',
      '--color-text-header': '#1f2937',
      '--color-text-muted': '#6b7280',
      '--color-accent': '#0ea5e9', // sky-500
      '--color-accent-text': '#f0f9ff',
      '--color-accent-bg': 'rgba(14, 165, 233, 0.1)',
      '--color-favorite-bg': 'rgba(234, 179, 8, 0.2)',
      '--color-border': '#d6d3d1', // stone-300
      '--color-card-bg': '#f5f5f4', // stone-100
      '--color-card-bg-translucent': 'rgba(245, 245, 244, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#f5f5f4',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#d6d3d1',
      '--color-skeleton-highlight': '#e7e5e4',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.3)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.3)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.3)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.3)',
    }
  },
  parchment: {
    name: 'Parchment',
    type: 'light',
    cssVars: {
      '--color-bg': '#fbf1e0',
      '--color-bg-translucent': 'rgba(253, 246, 231, 0.9)',
      '--color-header-bg': 'rgba(253, 246, 231, 0.95)',
      '--color-text': '#574021',
      '--color-text-header': '#422f18',
      '--color-text-muted': '#7a6c58',
      '--color-accent': '#994625', // brown
      '--color-accent-text': '#fef3c7',
      '--color-accent-bg': 'rgba(153, 70, 37, 0.1)',
      '--color-favorite-bg': 'rgba(217, 119, 6, 0.2)',
      '--color-border': '#f2e4ca',
      '--color-card-bg': '#fdf6e7',
      '--color-card-bg-translucent': 'rgba(255, 252, 245, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#fdf6e7',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#f2e4ca',
      '--color-skeleton-highlight': '#fbf1e0',
      '--color-highlight-yellow': 'rgba(252, 211, 77, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.3)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.3)',
      '--color-highlight-pink': 'rgba(219, 39, 119, 0.2)',
      '--color-highlight-purple': 'rgba(147, 51, 234, 0.2)',
    }
  },
  rose: {
    name: 'Rose',
    type: 'light',
    cssVars: {
      '--color-bg': '#fce7f3', // pink-100
      '--color-bg-translucent': 'rgba(253, 242, 248, 0.9)',
      '--color-header-bg': 'rgba(253, 242, 248, 0.95)',
      '--color-text': '#831843', // rose-800
      '--color-text-header': '#500724', // rose-950
      '--color-text-muted': '#9d174d', // rose-700
      '--color-accent': '#db2777', // pink-600
      '--color-accent-text': '#fff1f2',
      '--color-accent-bg': 'rgba(219, 39, 119, 0.1)',
      '--color-favorite-bg': 'rgba(250, 204, 21, 0.25)',
      '--color-border': '#f9a8d4', // pink-300
      '--color-card-bg': '#fdf2f8', // pink-50
      '--color-card-bg-translucent': 'rgba(253, 242, 248, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#fdf2f8',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#f9a8d4',
      '--color-skeleton-highlight': '#fce7f3',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.3)',
      '--color-highlight-blue': 'rgba(59, 130, 246, 0.3)',
      '--color-highlight-pink': 'rgba(236, 72, 153, 0.3)',
      '--color-highlight-purple': 'rgba(168, 85, 247, 0.3)',
    }
  },
  ocean: {
    name: 'Ocean',
    type: 'light',
    cssVars: {
      '--color-bg': '#e0f2fe', // sky-100
      '--color-bg-translucent': 'rgba(240, 249, 255, 0.9)',
      '--color-header-bg': 'rgba(240, 249, 255, 0.95)',
      '--color-text': '#0c4a6e', // sky-800
      '--color-text-header': '#082f49', // sky-950
      '--color-text-muted': '#0284c7', // sky-600
      '--color-accent': '#0ea5e9', // sky-500
      '--color-accent-text': '#f0f9ff',
      '--color-accent-bg': 'rgba(14, 165, 233, 0.1)',
      '--color-favorite-bg': 'rgba(250, 204, 21, 0.25)',
      '--color-border': '#bae6fd', // sky-200
      '--color-card-bg': '#f0f9ff', // sky-50
      '--color-card-bg-translucent': 'rgba(255, 255, 255, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#f0f9ff',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#bae6fd',
      '--color-skeleton-highlight': '#e0f2fe',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.3)',
      '--color-highlight-blue': 'rgba(59, 130, 246, 0.3)',
      '--color-highlight-pink': 'rgba(236, 72, 153, 0.2)',
      '--color-highlight-purple': 'rgba(168, 85, 247, 0.2)',
    }
  },
  mint: {
    name: 'Mint',
    type: 'light',
    cssVars: {
      '--color-bg': '#dcfce7', // green-100
      '--color-bg-translucent': 'rgba(240, 253, 244, 0.9)',
      '--color-header-bg': 'rgba(240, 253, 244, 0.95)',
      '--color-text': '#166534', // green-800
      '--color-text-header': '#052e16', // green-950
      '--color-text-muted': '#15803d', // green-700
      '--color-accent': '#16a34a', // green-600
      '--color-accent-text': '#f0fdf4',
      '--color-accent-bg': 'rgba(22, 163, 74, 0.1)',
      '--color-favorite-bg': 'rgba(234, 179, 8, 0.25)',
      '--color-border': '#bbf7d0', // green-200
      '--color-card-bg': '#f0fdf4', // green-50
      '--color-card-bg-translucent': 'rgba(255, 255, 255, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#f0fdf4',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#bbf7d0',
      '--color-skeleton-highlight': '#dcfce7',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.4)',
      '--color-highlight-blue': 'rgba(59, 130, 246, 0.25)',
      '--color-highlight-pink': 'rgba(236, 72, 153, 0.25)',
      '--color-highlight-purple': 'rgba(168, 85, 247, 0.25)',
    }
  },
  indigo: {
    name: 'Indigo',
    type: 'light',
    cssVars: {
      '--color-bg': '#e0e7ff',
      '--color-bg-translucent': 'rgba(224, 231, 255, 0.9)',
      '--color-header-bg': 'rgba(224, 231, 255, 0.95)',
      '--color-text': '#3730a3',
      '--color-text-header': '#1e1b4b',
      '--color-text-muted': '#4f46e5',
      '--color-accent': '#4338ca',
      '--color-accent-text': '#eef2ff',
      '--color-accent-bg': 'rgba(67, 56, 202, 0.1)',
      '--color-favorite-bg': 'rgba(250, 204, 21, 0.25)',
      '--color-border': '#c7d2fe',
      '--color-card-bg': '#eef2ff',
      '--color-card-bg-translucent': 'rgba(238, 242, 255, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#eef2ff',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#c7d2fe',
      '--color-skeleton-highlight': '#e0e7ff',
      '--color-highlight-yellow': 'rgba(250, 204, 21, 0.3)',
      '--color-highlight-green': 'rgba(74, 222, 128, 0.3)',
      '--color-highlight-blue': 'rgba(96, 165, 250, 0.3)',
      '--color-highlight-pink': 'rgba(244, 114, 182, 0.3)',
      '--color-highlight-purple': 'rgba(167, 139, 250, 0.3)',
    }
  },
  olive: {
    name: 'Olive',
    type: 'light',
    cssVars: {
      '--color-bg': '#f0f4e8',
      '--color-bg-translucent': 'rgba(240, 244, 232, 0.9)',
      '--color-header-bg': 'rgba(240, 244, 232, 0.95)',
      '--color-text': '#365314',
      '--color-text-header': '#1a2e05',
      '--color-text-muted': '#65a30d',
      '--color-accent': '#4d7c0f',
      '--color-accent-text': '#f7fee7',
      '--color-accent-bg': 'rgba(132, 204, 22, 0.1)',
      '--color-favorite-bg': 'rgba(234, 179, 8, 0.25)',
      '--color-border': '#d9e1c9',
      '--color-card-bg': '#f7fee7',
      '--color-card-bg-translucent': 'rgba(247, 254, 231, 0.7)',
      '--color-card-ring': 'rgba(0, 0, 0, 0.05)',
      '--color-input-bg': '#f7fee7',
      '--color-bg-hover': 'rgba(0, 0, 0, 0.03)',
      '--color-skeleton-base': '#d9e1c9',
      '--color-skeleton-highlight': '#f0f4e8',
      '--color-highlight-yellow': 'rgba(234, 179, 8, 0.3)',
      '--color-highlight-green': 'rgba(101, 163, 13, 0.3)',
      '--color-highlight-blue': 'rgba(59, 130, 246, 0.25)',
      '--color-highlight-pink': 'rgba(236, 72, 153, 0.25)',
      '--color-highlight-purple': 'rgba(168, 85, 247, 0.25)',
    }
  },
};