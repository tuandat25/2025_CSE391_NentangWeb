import { createContext, useContext, useState, useCallback } from 'react';

// Create notification context
const NotificationContext = createContext();

/**
 * NotificationProvider - Quản lý hệ thống thông báo toàn ứng dụng
 * Hỗ trợ nhiều loại thông báo: success, error, warning, info
 */
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  // Xóa thông báo theo ID
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  // Thêm thông báo mới
  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      timestamp: new Date(),
      duration
    };

    setNotifications(prev => [...prev, notification]);

    // Tự động xóa thông báo sau thời gian duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }    return id;
  }, [removeNotification]);

  // Xóa tất cả thông báo
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Các helper functions cho từng loại thông báo
  const showSuccess = useCallback((message, duration) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  const showError = useCallback((message, duration) => {
    return addNotification(message, 'error', duration);
  }, [addNotification]);

  const showWarning = useCallback((message, duration) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  const showInfo = useCallback((message, duration) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Custom hook để sử dụng notification system
 */
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;
