// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Khởi tạo state với hàm callback để tránh đọc localStorage mỗi khi render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Kiểm tra xem có dữ liệu trong localStorage không
      const item = window.localStorage.getItem(key);
      // Parse JSON nếu có, nếu không thì dùng initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Dùng useEffect để cập nhật localStorage khi state thay đổi
  useEffect(() => {
    try {
      // Lưu state vào localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Chạy lại effect khi key hoặc storedValue thay đổi

  return [storedValue, setStoredValue];
}

export default useLocalStorage;