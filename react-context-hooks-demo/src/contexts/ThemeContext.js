import React, { createContext, useContext } from 'react';
import usePreferences from '../hooks/usePreferences';

// Create a context for theme management
const ThemeContext = createContext();

/**
 * ThemeProvider component to manage light/dark theme với preferences nâng cao
 * Uses localStorage to persist theme preference và các settings khác
 */
export function ThemeProvider({ children }) {
  const { preferences, updatePreference, togglePreference } = usePreferences();

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    updatePreference('theme', newTheme);
  };

  // Function to set specific theme
  const setTheme = (theme) => {
    updatePreference('theme', theme);
  };

  // Function to toggle animations
  const toggleAnimations = () => {
    togglePreference('animations');
  };

  // Function to set font size
  const setFontSize = (size) => {
    updatePreference('fontSize', size);
  };

  // Value to be provided to consuming components
  const value = {
    theme: preferences.theme,
    animations: preferences.animations,
    fontSize: preferences.fontSize,
    toggleTheme,
    setTheme,
    toggleAnimations,
    setFontSize,
    isLight: preferences.theme === 'light',
    isDark: preferences.theme === 'dark',
    preferences
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${preferences.theme}-theme ${preferences.animations ? 'animations-enabled' : 'animations-disabled'} font-${preferences.fontSize}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 * @returns {Object} Theme context value
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;


