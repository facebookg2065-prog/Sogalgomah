import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for persisted session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('souq_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulate API call to Python Backend / Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockUser: User = {
      id: 'u_123',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      role: 'seller'
    };

    setUser(mockUser);
    localStorage.setItem('souq_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('souq_user');
    // Using reload instead of window.location.href = '/' 
    // This ensures correct behavior when hosted in a subdirectory (like GitHub Pages)
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};