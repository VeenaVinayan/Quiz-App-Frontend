import { createContext } from 'react';
import { type TUserData } from '../Types/auth.types';

interface IAuthContextType {
     isAuthenticated: boolean;
     login: (user : TUserData) => void;
     logout: () =>void;
     getUserData: () => TUserData | undefined;
}

export const AuthContext = createContext<IAuthContextType | undefined>(undefined);