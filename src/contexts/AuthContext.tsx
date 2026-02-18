import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'admin' | 'parent' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  branch?: string;
  year?: string;
  rollNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'student@campusnxt.edu': {
    password: 'student123',
    user: {
      id: 'stu_001',
      name: 'Arjun Sharma',
      email: 'student@campusnxt.edu',
      role: 'student',
      branch: 'Computer Science',
      year: '1st Year',
      rollNumber: 'CS2024001',
    },
  },
  'admin@campusnxt.edu': {
    password: 'admin123',
    user: {
      id: 'adm_001',
      name: 'Dr. Priya Mehta',
      email: 'admin@campusnxt.edu',
      role: 'admin',
    },
  },
  'parent@campusnxt.edu': {
    password: 'parent123',
    user: {
      id: 'par_001',
      name: 'Rajesh Sharma',
      email: 'parent@campusnxt.edu',
      role: 'parent',
    },
  },
  'mentor@campusnxt.edu': {
    password: 'mentor123',
    user: {
      id: 'men_001',
      name: 'Prof. Kavita Singh',
      email: 'mentor@campusnxt.edu',
      role: 'mentor',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('campusnxt_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const record = DEMO_USERS[email.toLowerCase()];
    if (record && record.password === password) {
      setUser(record.user);
      localStorage.setItem('campusnxt_user', JSON.stringify(record.user));
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const demoUser = DEMO_USERS['student@campusnxt.edu'].user;
    setUser(demoUser);
    localStorage.setItem('campusnxt_user', JSON.stringify(demoUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusnxt_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
