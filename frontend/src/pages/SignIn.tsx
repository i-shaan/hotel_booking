import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AuthContext';
export type LoginFormData = {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const {refreshAuthStatus} = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.login, {
    onSuccess: async() => {
    await  queryClient.invalidateQueries("validateToken");
      console.log("Login successful");

      navigate("/"); // Redirect to home page after successful login
    },
    onError: (error: Error) => {
      console.log(error.message);
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data); // For debugging
  });

  return (
    <form
      className="p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-sm"
      onSubmit={onSubmit}
    >
      <h1 className="font-bold text-3xl mb-4 md:text-4xl lg:text-5xl text-center">
        Login to Your Account
      </h1>

      <div className="w-full flex flex-col gap-4">

        {/* Email Field */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            className="text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold py-2 px-6 rounded w-full"
      >
        Login
      </button>

      {/* Redirect to Register if user doesn't have an account */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0A9396] hover:text-[#005F73]">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
