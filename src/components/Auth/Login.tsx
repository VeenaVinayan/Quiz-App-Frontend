import React  from 'react'
import { useForm }from 'react-hook-form';
import {type  TUserLogin , type TLoginResult} from '../../Types/auth.types';
import authService from '../../services/authService';
import { useNavigate , Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthContext from '../../customHook/Auth';

const Login : React.FC = () => {
  const {
     register,
     handleSubmit,
     formState: {errors}
  }  = useForm<TUserLogin>();
  const navigate = useNavigate();
  const context = useAuthContext();

  const onSubmit = async (userLoginData : TUserLogin) =>{
    try{ 
        console.log('User Login ::',userLoginData);
        const res : TLoginResult  = await authService.userLogin(userLoginData);
        if(res){
            console.log("Login Result ::",res);
            context?.login(res.user);
            localStorage.setItem("accessToken",res.accessToken);
            toast.success("Login successfully");
            const user = (res.user.email).split('@')[0];
            if(user === "admin"){
                navigate('/admin/dashboard',{replace:true}) ;
            }else{
                navigate('/user/profile',{replace:true});
            }
        }else{
            toast.error('error')
        }
    }catch(err){
        console.log('Error in Login',err);
    }
  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login  | Quiz Master
        </h2>
         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                },
                })}

              placeholder="Eamil ID"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.email && ( <p  className="text-red-500 text-sm mt-1">{ errors.email.message} </p>)}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password",{
                 required:"Password is required",
                 pattern:{
                     value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                     message:'Enter a Valid Password !',
                 }
              })}
              placeholder="Enter strong password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {
              errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>
            }
          </div>
           <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            LogIn
          </button>
         </form>
         <p className='text-amber-800 text-sm justify-end'>Won't Login?
             <Link to='/signup' className='text-amber-600'>  Register </Link>
         </p>   
        </div>
       
      </div>    
    </>
  )
}
export default Login
