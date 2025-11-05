import React from "react";
import { useForm } from "react-hook-form";
import { type TUserSignUp } from "../../Types/auth.types";
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {

 const {
      register,
      handleSubmit,
      formState: { errors},
  } = useForm<TUserSignUp>();
  const navigate = useNavigate();
  
  const onSubmit = async (userSignupData : TUserSignUp) => {
     console.log("Signup data:", userSignupData);
     const res = await authService.userSignUp (userSignupData);
     if(res === 200){
         navigate('/login');
         toast.success('Successfully Signup');
     }else{
        toast.error('Signup failed')
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name",{required:'Name is required '})}
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.name && (<p  className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
          </div>

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
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="number"
              {...register("phone",{
                  required:"Phone Number required",
                  pattern:{ 
                    value :/^[7-9][0-9]{9}$/,
                    message:"Invalid phone number",
                  },  
               })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
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
           <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
               {...register("conPassword",{
                 required:"Password is required",
                 pattern:{
                     value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                     message:'Enter a Valid Password !',
                 }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-amber-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
