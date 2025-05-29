import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ThemeToggle from './components/ThemeToggle';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Settings from './components/Settings';
import NotificationContainer from './components/NotificationContainer';
import './App.css';

/**
 * Main App component nâng cao
 * Sets up context providers and renders components with improved layout
 */
function App() {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-container">
            <header className="app-header">
              <h1>DEMO3:  React Context & Hooks Demo</h1>
              <ThemeToggle />
            </header>
            
            <main className="app-main">
              <div className="app-section">
                <LoginForm />
              </div>
              
              <div className="app-section">
                <UserInfo />
              </div>
              
              <div className="app-section">
                <Settings />
              </div>
            </main>
            
            <footer className="app-footer">
              <p>
                Copyright © 2025 - React Context & Hooks Demo - To Le Tuan Dat
              </p>
              <p>
                Test Demo 3
              </p>
            </footer>
          </div>
          
          {/* Notification container for app-wide notifications */}
          <NotificationContainer />
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
}

export default App;
