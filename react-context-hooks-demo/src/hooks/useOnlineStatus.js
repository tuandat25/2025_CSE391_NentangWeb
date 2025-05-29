import { useState, useEffect } from 'react';

/**
 * Custom hook để theo dõi trạng thái online/offline
 */
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusText = () => {
    if (isOnline) {
      return 'Đang kết nối';
    } else {
      return `Mất kết nối lúc ${lastOnlineTime.toLocaleTimeString()}`;
    }
  };

  const getStatusColor = () => {
    return isOnline ? '#28a745' : '#dc3545';
  };

  return {
    isOnline,
    lastOnlineTime,
    getStatusText,
    getStatusColor
  };
}

export default useOnlineStatus;
