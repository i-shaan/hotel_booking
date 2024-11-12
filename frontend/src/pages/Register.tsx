import React from 'react';
import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client'
export type RegisterFormData = {
  firstName: string,
  lastName:string,
  email:string,
  password:string,
  confirmPassword:string
}

const Register = () => {
  const {register,watch,handleSubmit,formState:{errors}} = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.register,{
    onSuccess:async ()=>{
      await queryClient.invalidateQueries("validateToken")
      console.log("registeration successful");
      navigate("/");
    },
    onError:(error:Error)=>{
      console.log(error.message);
    }
  });
  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data);
    console.log(data)
  })
  return (
    <form className="p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-sm" onSubmit={onSubmit}>
      <h1 className="font-bold text-3xl mb-4 md:text-4xl lg:text-5xl text-center">
        Create an Account
      </h1>
      
      <div className="w-full flex flex-col gap-4">
        
        {/* First and Last Name Fields */}
        <div className="flex flex-col sm:flex-row gap-4 sm:w-full">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium" >First Name</label>
            <input 
              className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396]" 
              {...register("firstName",{required:"This field is required"})}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Last Name</label>
            <input 
              className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396]" 
              {...register("lastName",{required:"This field is required"})}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium">Email</label>
          <input 
            type="email" 
            className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full" 
            {...register("email",{required:"This field is required"})}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium">Password</label>
          <input 
            type="password" 
            className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full" 
            {...register("password",{required:"This field is required",minLength:{
              value:6,
              message:"Password must be atleast 6 characters"
            }})}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium">Confirm Password</label>
          <input 
            type="password" 
            className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full" 
            {...register("confirmPassword",{
              validate:(val)=>{ 
                if(!val){
                  return "This field is required"
                } else if(watch("password")!==val){
                  return "Your passwords do not match"
                }
              }
          })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-6 bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold py-2 px-6 rounded w-full">
        Register
      </button>
    </form>
  );
}

export default Register;

