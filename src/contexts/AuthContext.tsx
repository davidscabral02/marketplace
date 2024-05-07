import { ReactNode, createContext, useEffect, useState } from 'react';

import { api } from '@services/api';

import { UserDTO } from '@dtos/UserDTO';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState<boolean>(false);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions/', { email, password });

      if (data.user && data.token && data.refresh_token) {
        setUser(data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        setIsLoadingUserStorageData(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
