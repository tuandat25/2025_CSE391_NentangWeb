import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ThemeToggle from './components/ThemeToggle';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import './App.css';

/**
 * Main App component
 * Sets up context providers and renders components
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>React Context & Hooks Demo</h1>
            <ThemeToggle />
          </header>
          
          <main className="app-main">
            <div className="app-section">
              <LoginForm />
            </div>
            
            <div className="app-section">
              <UserInfo />
            </div>
          </main>
          
          <footer className="app-footer">
            <p>Created with React Context API and Custom Hooks</p>
          </footer>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
