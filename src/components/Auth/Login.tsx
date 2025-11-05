import React ,{ useContext} from 'react'
import { useForm }from 'react-hook-form';
import {type  TUserLogin , type TLoginResult} from '../../Types/auth.types';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext} from '../../Context/authContext';

const Login : React.FC = () => {
  const {
     register,
     handleSubmit,
     formState: {errors}
  }  = useForm<TUserLogin>();
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const onSubmit = async (userLoginData : TUserLogin) =>{
    try{ 
        console.log('User Login ::',userLoginData);
        const res : TLoginResult  = await authService.userLogin(userLoginData);
        if(res){
            context?.login(res.user);
            console.log('Login Result ::',res.user);
            localStorage.setItem('accessToken',res.accessToken);
             toast.success("Login successfully");
             navigate('/user/profile',{state:{user :res.user}});
            
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
        </div>
      </div>    
    </>
  )
}
export default Login
