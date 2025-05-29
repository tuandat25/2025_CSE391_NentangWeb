import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';
import useOnlineStatus from '../hooks/useOnlineStatus';

/**
 * Component Settings nâng cao với nhiều tùy chọn
 */
function Settings() {
  const { 
    theme, 
    animations, 
    fontSize, 
    toggleTheme, 
    toggleAnimations, 
    setFontSize,
    preferences 
  } = useTheme();
  
  const { isOnline, getStatusText } = useOnlineStatus();
  const { showSuccess, showInfo, showError, showWarning } = useNotification();

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    showInfo(`Đã thay đổi kích thước chữ thành: ${event.target.value}`);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    showSuccess(`Đã chuyển sang ${newTheme === 'light' ? 'Light Mode' : 'Dark Mode'}!`);
  };
  const handleAnimationToggle = () => {
    toggleAnimations();
    showInfo(`Hiệu ứng animation đã được ${animations ? 'tắt' : 'bật'}`);
  };

  const testNotifications = () => {
    showSuccess('Đây là thông báo thành công!');
    setTimeout(() => showInfo('Đây là thông báo thông tin!'), 500);
    setTimeout(() => showWarning('Đây là thông báo cảnh báo!'), 1000);
    setTimeout(() => showError('Đây là thông báo lỗi!'), 1500);
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Cài đặt nâng cao</h2>
      
      {/* Online Status */}
      <div className="setting-item">
        <label>Trạng thái kết nối:</label>
        <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Theme Toggle */}      <div className="setting-item">
        <label>Giao diện:</label>
        <button 
          onClick={handleThemeToggle}
          className="setting-button"
        >
          {theme === 'light' ? '🌙 Chuyển Dark Mode' : '☀️ Chuyển Light Mode'}
        </button>
      </div>

      {/* Animation Toggle */}
      <div className="setting-item">
        <label>Hiệu ứng animation:</label>
        <button 
          onClick={handleAnimationToggle}
          className={`setting-toggle ${animations ? 'active' : ''}`}
        >
          {animations ? '✅ Bật' : '❌ Tắt'}
        </button>
      </div>

      {/* Font Size */}
      <div className="setting-item">
        <label htmlFor="fontSize">Kích thước chữ:</label>
        <select 
          id="fontSize"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="setting-select"
        >
          <option value="small">Nhỏ</option>
          <option value="medium">Vừa</option>
          <option value="large">Lớn</option>
        </select>      </div>

      {/* Test Notifications */}
      <div className="setting-item">
        <label>Test thông báo:</label>
        <button 
          onClick={testNotifications}
          className="setting-button"
        >
          🧪 Test tất cả thông báo
        </button>
      </div>

      {/* Preferences Summary */}
      <div className="preferences-summary">
        <h3>📊 Tóm tắt cài đặt</h3>
        <div className="preferences-grid">
          <div className="pref-item">
            <span className="pref-label">Theme:</span>
            <span className="pref-value">{preferences.theme}</span>
          </div>
          <div className="pref-item">
            <span className="pref-label">Animations:</span>
            <span className="pref-value">{preferences.animations ? 'Bật' : 'Tắt'}</span>
          </div>
          <div className="pref-item">
            <span className="pref-label">Font size:</span>
            <span className="pref-value">{preferences.fontSize}</span>
          </div>
          <div className="pref-item">
            <span className="pref-label">Language:</span>
            <span className="pref-value">{preferences.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
