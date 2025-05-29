import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';
import useOnlineStatus from '../hooks/useOnlineStatus';

/**
 * UserInfo component nâng cao
 * Hiển thị thông tin user với trạng thái online/offline
 */
function UserInfo() {  const { user, isLoggedIn } = useAuth();
  const { isOnline } = useOnlineStatus();
  const { showInfo, showWarning } = useNotification();

  if (!isLoggedIn) {
    return (
      <div className="user-info not-logged-in">
        <div className="login-prompt">
          <h2>👤 Thông tin người dùng</h2>
          <p>Vui lòng đăng nhập để xem thông tin cá nhân</p>
          <div className="feature-list">
            <div className="feature-item">✨ Lưu cài đặt cá nhân</div>
            <div className="feature-item">🎨 Tùy chỉnh giao diện</div>
            <div className="feature-item">📱 Đồng bộ trên nhiều thiết bị</div>
          </div>
        </div>
      </div>
    );
  }

  const loginTime = new Date(user.loginTime || Date.now()).toLocaleString('vi-VN');

  return (
    <div className="user-info">
      <h2>👤 Thông tin người dùng</h2>
      
      <div className="user-profile">
        <div className="user-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        
        <div className="user-details">
          <p className="user-welcome">
            Chào mừng, <strong>{user.username}</strong>! 🎉
          </p>
          
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-label">Trạng thái:</span>
              <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
                {isOnline ? '🟢 Online' : '🔴 Offline'}
              </span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Đăng nhập lúc:</span>
              <span className="stat-value">{loginTime}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Phiên làm việc:</span>
              <span className="stat-value">Đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>      <div className="user-actions">
        <button 
          className="action-button primary"
          onClick={() => showInfo('Tính năng chỉnh sửa hồ sơ sẽ được cập nhật trong phiên bản tới!')}
        >
          📝 Chỉnh sửa hồ sơ
        </button>
        <button 
          className="action-button secondary"
          onClick={() => showWarning('Tính năng đổi mật khẩu đang được phát triển!')}
        >
          🔒 Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
