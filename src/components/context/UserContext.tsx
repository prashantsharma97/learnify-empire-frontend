// import React, { createContext, useState, ReactNode } from 'react';

// // Define the User data type
// interface User {
//   id: string | null;
//   name: string;
//   email: string;
//   role: string;
//   isAuthenticated: boolean;
// }

// // Define the context type
// interface UserContextType {
//   user: User;
//   updateUser: (userData: User) => void;
//   logout: () => void;
// }

// // Create the context with a default value
// export const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserContextProviderProps {
//   children: ReactNode;
// }

// export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User>({
//     id: null,
//     name: '',
//     email: '',
//     role: '', // 'admin', 'instructor', 'student'
//     isAuthenticated: false,
//   });

//   const updateUser = (userData: User) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser({
//       id: null,
//       name: '',
//       email: '',
//       role: '',
//       isAuthenticated: false,
//     });
//   };

//   const value = {
//     user,
//     updateUser,
//     logout,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };


import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the User data type
interface User {
  id: string | null;
  name: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
}

// Define the context type
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

  // 🔥 Load user from localStorage
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

  // 🔥 Stop loading after checking storage
  useEffect(() => {
    setLoading(false);
  }, []);

  // 🔥 Save user to localStorage whenever it changes
  useEffect(() => {
    if (user?.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // 🔥 Update user (login)
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔥 Logout
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