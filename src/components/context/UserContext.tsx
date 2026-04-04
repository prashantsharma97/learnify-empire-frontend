import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string | null;
  name: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User;
  updateUser: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {

  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: null,
          name: '',
          email: '',
          role: '',
          isAuthenticated: false,
        };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      id: null,
      name: '',
      email: '',
      role: '',
      isAuthenticated: false,
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if using token
  };

  const value = {
    user,
    updateUser,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};