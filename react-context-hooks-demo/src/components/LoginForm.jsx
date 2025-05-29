import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';

/**
 * LoginForm component nâng cao
 * Form đăng nhập với validation và UX tốt hơn
 */
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn, logout, user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!username.trim()) {
      setError('Tên đăng nhập không được để trống');
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự');
      setIsLoading(false);
      return;
    }    // Simulate loading time
    setTimeout(() => {
      const success = login(username);
      if (!success) {
        setError('Đăng nhập thất bại. Vui lòng thử lại.');
        showError('Đăng nhập thất bại. Vui lòng thử lại.');
      } else {
        setUsername('');
        setPassword('');
        showSuccess(`Chào mừng ${username}! Đăng nhập thành công.`);
      }
      setIsLoading(false);
    }, 1000);
  };
  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      showInfo('Đã đăng xuất thành công. Hẹn gặp lại!');
      setIsLoading(false);
    }, 500);
  };

  if (isLoggedIn) {
    return (
      <div className="logout-container">
        <div className="success-message">
          <h2>✅ Đăng nhập thành công!</h2>
          <p>Xin chào <strong>{user.username}</strong>!</p>
          <p className="login-time">
            Đăng nhập lúc: {new Date().toLocaleString('vi-VN')}
          </p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="logout-button"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Đang đăng xuất...' : '🚪 Đăng xuất'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>🔐 Đăng nhập</h2>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username">
          👤 Tên đăng nhập:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên đăng nhập (ít nhất 3 ký tự)"
          disabled={isLoading}
          className={error ? 'error' : ''}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          🔒 Mật khẩu:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu (demo - có thể bỏ trống)"
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        className="login-button"
        disabled={isLoading || !username.trim()}
      >
        {isLoading ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
      </button>

      <div className="form-footer">
        <p className="demo-note">
          💡 <strong>Demo:</strong> Chỉ cần nhập bất kỳ tên nào (ít nhất 3 ký tự) để đăng nhập
        </p>      </div>
    </form>
  );
}

export default LoginForm;
