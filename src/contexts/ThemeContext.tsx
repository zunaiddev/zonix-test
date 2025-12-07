/**
 * Theme Context
 * 
 * Global theme state management
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, DEFAULT_THEME, STORAGE_KEYS } from '../constants/app.constants';

type ThemeName = typeof THEMES[keyof typeof THEMES];

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (savedTheme as ThemeName) || DEFAULT_THEME;
  });

  // Update theme in localStorage and apply to document
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const themeColors: Record<ThemeName, string> = {
      yellow: '#FBBF24',
      green: '#10B981',
      purple: '#A78BFA',
      navy: '#3B82F6',
    };
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors[theme]);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const themes = Object.values(THEMES);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeState(themes[nextIndex] as ThemeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
