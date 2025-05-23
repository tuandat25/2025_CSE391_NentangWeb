import React from 'react';
import useAuth from '../hooks/useAuth';

/**
 * UserInfo component
 * Displays user information if logged in
 */
function UserInfo() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <p className="user-info not-logged-in">Please log in to see your information</p>;
  }

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p>Welcome, <strong>{user.username}</strong>!</p>
      <p>You are successfully logged in.</p>
    </div>
  );
}

export default UserInfo;
