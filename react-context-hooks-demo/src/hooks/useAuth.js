import { useAuth as useAuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to use auth context
 * This is a convenience wrapper around the useAuth from AuthContext
 * @returns {Object} Auth context with user, isLoggedIn, login, and logout
 */
function useAuth() {
  return useAuthContext();
}

export default useAuth;
