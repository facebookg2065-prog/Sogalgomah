import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { loginUserInDB, registerUserInDB } from '../utils/db';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for persisted session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('souq_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('souq_user');
      }
    }
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: 'u_google_' + Date.now(),
        name: 'مستخدم جوجل',
        email: `user_${Date.now()}@gmail.com`,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
        role: 'buyer'
      };

      setUser(mockUser);
      localStorage.setItem('souq_user', JSON.stringify(mockUser));
      
      // Also save to DB for persistence consistency
      await registerUserInDB(mockUser).catch(() => {}); // Ignore if exists
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake network delay
      const loggedInUser = await loginUserInDB(email, password);
      setUser(loggedInUser);
      localStorage.setItem('souq_user', JSON.stringify(loggedInUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake network delay
      const newUser: User = {
        id: 'u_' + Date.now(),
        name,
        email,
        role: 'buyer',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        password // In a real app, never store plain text passwords
      };
      
      const registeredUser = await registerUserInDB(newUser);
      setUser(registeredUser);
      localStorage.setItem('souq_user', JSON.stringify(registeredUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('souq_user');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, loginWithEmail, register, logout }}>
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