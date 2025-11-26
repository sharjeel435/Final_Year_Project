import { useState, useEffect } from 'react';

interface UserData {
  email: string;
  contactNumber: string;
  firstName: string;
  lastName?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const userData = localStorage.getItem('cryptoquest_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cryptoquest_user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return { user, loading, isAuthenticated, logout, checkAuth };
};
