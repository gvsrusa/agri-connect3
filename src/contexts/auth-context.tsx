
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { mockUser } from '@/data/mock-data'; // For simulation

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth status on load
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('agriconnect_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('agriconnect_user');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = useCallback(async () => {
    setIsLoading(true);
    // Simulate Google Login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    localStorage.setItem('agriconnect_user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('agriconnect_user');
    setIsLoading(false);
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
