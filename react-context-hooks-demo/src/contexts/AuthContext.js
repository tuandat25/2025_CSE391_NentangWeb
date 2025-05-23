import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create a context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component for managing user authentication state
 * This is a simulated login system (no backend required)
 */
export function AuthProvider({ children }) {
  // Use our custom hook to persist auth state in localStorage
  const [user, setUser] = useLocalStorage('user', null);

  // Login function - in a real app, this would validate credentials
  const login = (username) => {
    // Simple validation
    if (!username || username.trim() === '') {
      return false;
    }
    
    // Set user info - in a real app, this would include more data
    setUser({ username });
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Value to be provided to consuming components
  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
