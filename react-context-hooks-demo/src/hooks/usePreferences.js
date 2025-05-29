
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook nâng cao để quản lý preferences của user
 * Bao gồm theme, language, notifications, v.v.
 */
function usePreferences() {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'vi',
    notifications: true,
    autoSave: true,
    fontSize: 'medium',
    animations: true
  });

  // Cập nhật một preference cụ thể
  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset về mặc định
  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      language: 'vi',
      notifications: true,
      autoSave: true,
      fontSize: 'medium',
      animations: true
    });
  };

  // Toggle boolean preferences
  const togglePreference = (key) => {
    updatePreference(key, !preferences[key]);
  };

  // Lấy preference cụ thể
  const getPreference = (key) => {
    return preferences[key];
  };

  // Kiểm tra xem có preference nào đã thay đổi so với mặc định không
  const hasChanges = () => {
    const defaults = {
      theme: 'light',
      language: 'vi',
      notifications: true,
      autoSave: true,
      fontSize: 'medium',
      animations: true
    };
    
    return JSON.stringify(preferences) !== JSON.stringify(defaults);
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
    togglePreference,
    getPreference,
    hasChanges
  };
}

export default usePreferences;
