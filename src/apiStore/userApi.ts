import axios, { type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const axiosInstance : AxiosInstance= axios.create({
    baseURL:`${BASE_URL}/user`,
    timeout:10000,
    headers:{
       'Content-Type':'application/json',
    },
    withCredentials:true,
});
axiosInstance.interceptors.request.use((config) =>{ 
    const token = localStorage.getItem("accessToken");
    if(token && config.headers){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},
 (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>{
        if(error.message){
                const message = error.response?.data?.message || error.message || "Unexpected Error occured"
                console.log("Error is ::",message);
                toast.error(message);
            }
        }
)