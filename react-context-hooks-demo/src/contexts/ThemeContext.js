import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create a context for theme management
const ThemeContext = createContext();

/**
 * ThemeProvider component to manage light/dark theme
 * Uses localStorage to persist theme preference
 */
export function ThemeProvider({ children }) {
  // Use our custom hook to persist theme in localStorage
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Value to be provided to consuming components
  const value = {
    theme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${theme}-theme`}>
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


