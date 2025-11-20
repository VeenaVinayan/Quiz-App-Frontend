import { useContext } from 'react';
import { AuthContext , type IAuthContextType } from '../Context/authContext'

function useAuthContext():IAuthContextType| null{
     const context = useContext(AuthContext);
     if(!context){
         console.log("User not Authorized !!");
         return null;
     }
     return context;
}

export default useAuthContext;