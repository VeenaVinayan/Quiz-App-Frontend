import axiosInstance from "../apiStore/api";
import type { TUserSignUp , TUserLogin, TLoginResult ,TResponseType } from "../Types/auth.types";
import {AUTH_ROUTE} from '../constants/routes/auth';

class AuthService{
    async userSignUp(signupData : TUserSignUp):Promise<number>{ 
            const signupResponse = await axiosInstance.post(AUTH_ROUTE.SIGNUP,signupData);
            return signupResponse.status
    }
    async userLogin(loginData : TUserLogin):Promise<TLoginResult>{
        const loginResponse = await axiosInstance.post(AUTH_ROUTE.LOGIN,loginData);
        return loginResponse.data.userData;
    }
    async logout():Promise<TResponseType>{
         const { data } = await axiosInstance.post('/logout');
         return data;
    }
}

export default new AuthService;
