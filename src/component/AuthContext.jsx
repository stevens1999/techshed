import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and storage changes
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const authUser = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
      
      if (authToken && authUser) {
        try {
          const userData = JSON.parse(authUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    // Check on mount
    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth:userChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth:userChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('userId');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('auth:userChange'));
  };

  const value = {
    user,
    isAuthenticated,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};