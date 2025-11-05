import axios ,{ type AxiosInstance} from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance : AxiosInstance = axios.create({
     baseURL:`${BASE_URL}/question`,
     timeout:10000,
     headers:{
        'Content-Type' : 'application/json',
     },
     withCredentials:true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>{
        if(error.message){
             const message = error.response?.data?.message || error.message || " UnExpected Error occured !!"
             console.log('Error is ::',message);
             toast.error(message);
         }
    }
)

export default axiosInstance;
