
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('token');
    if (token) {
      // In real app, verify token with backend
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@college.edu',
        role: 'admin'
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@college.edu' && password === 'admin') {
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@college.edu',
          role: 'admin' as const
        };
        setUser(mockUser);
        localStorage.setItem('token', 'mock-token');
      } else if (email === 'faculty@college.edu' && password === 'faculty') {
        const mockUser = {
          id: '2',
          name: 'Faculty User',
          email: 'faculty@college.edu',
          role: 'faculty' as const
        };
        setUser(mockUser);
        localStorage.setItem('token', 'mock-token');
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
