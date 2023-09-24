import { ChildProcessWithoutNullStreams } from 'child_process';
import React, { createContext, useContext, useState } from 'react';

interface User {
  userName: string | null;
  userId: string | null;
  accessToken: string | null;
}

const initialState: User = {
  userName: null,
  userId: null,
  accessToken: null,
};

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

type UserProviderProps = {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};