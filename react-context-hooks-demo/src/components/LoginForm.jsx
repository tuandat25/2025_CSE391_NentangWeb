import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

/**
 * LoginForm component
 * Renders a form for users to login (simulated)
 */
function LoginForm() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, isLoggedIn, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    const success = login(username);
    if (!success) {
      setError('Login failed. Please try again.');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="logout-container">
        <p>You are logged in!</p>
        <button 
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default LoginForm;
