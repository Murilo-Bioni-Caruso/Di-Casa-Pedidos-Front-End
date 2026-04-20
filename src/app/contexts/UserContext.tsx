// Controller: User Context for managing user data
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../models/types';

interface UserContextType {
  user: User | null;
  saveUser: (userData: User) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage
    const saved = localStorage.getItem('dicasa-user');
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('dicasa-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dicasa-user');
    }
  }, [user]);

  const saveUser = (userData: User) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('dicasa-user');
  };

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
