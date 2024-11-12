import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AuthContext';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { refreshAuthStatus } = useAppContext();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            console.log("Login successful");
            navigate("/"); // Redirect to home page after successful login
        },
        onError: (error) => {
            console.log(error.message);
        }
    });
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
        console.log(data); // For debugging
    });
    return (React.createElement("form", { className: "p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center w-full max-w-lg mx-auto border border-gray-300 rounded-lg shadow-sm", onSubmit: onSubmit },
        React.createElement("h1", { className: "font-bold text-3xl mb-4 md:text-4xl lg:text-5xl text-center" }, "Login to Your Account"),
        React.createElement("div", { className: "w-full flex flex-col gap-4" },
            React.createElement("div", { className: "flex flex-col w-full" },
                React.createElement("label", { className: "mb-1 font-medium" }, "Email"),
                React.createElement("input", { type: "email", className: "text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full", ...register("email", { required: "This field is required" }) }),
                errors.email && React.createElement("p", { className: "text-red-500 text-sm" }, errors.email.message)),
            React.createElement("div", { className: "flex flex-col w-full" },
                React.createElement("label", { className: "mb-1 font-medium" }, "Password"),
                React.createElement("input", { type: "password", className: "text border-2 border-[#005F73] px-2 py-1 rounded focus:outline-none focus:border-[#0A9396] w-full", ...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    }) }),
                errors.password && React.createElement("p", { className: "text-red-500 text-sm" }, errors.password.message))),
        React.createElement("button", { type: "submit", className: "mt-6 bg-[#005F73] hover:bg-[#0A9396] text-white font-semibold py-2 px-6 rounded w-full" }, "Login"),
        React.createElement("div", { className: "mt-4 text-center" },
            React.createElement("p", { className: "text-sm" },
                "Don't have an account?",
                " ",
                React.createElement(Link, { to: "/register", className: "text-[#0A9396] hover:text-[#005F73]" }, "Register here")))));
};
export default Login;
