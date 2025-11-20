import { createContext } from 'react';
import { type TUserData } from '../Types/auth.types';

export interface IAuthContextType {
     isAuthenticated: boolean;
     login: (user : TUserData) => void;
     userData : TUserData;
     logout: () =>void;
     getUserData: () => TUserData | undefined;
}

export const AuthContext = createContext<IAuthContextType | null>(null);