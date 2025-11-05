import React, { useState } from 'react';
import { AuthContext} from './authContext';
import { type TUserData } from '../Types/auth.types';

export const AuthProvider : React.FC<{children : React.ReactNode}> = ({children}) =>{
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ userData, setUserData ] = useState<TUserData>();

    const login = (user : TUserData) => {
         setIsAuthenticated(true);
         setUserData(user);
     } 
    const logout = () => { 
        setIsAuthenticated(false);
        setUserData({
            id:"",
            name:"",
            phone:"",
            email:""
        });
    }  
    const getUserData = () => userData;
   
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,getUserData}} >
            {children}
        </AuthContext.Provider>
    )
}