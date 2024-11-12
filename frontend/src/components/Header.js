import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AuthContext';
import * as apiClient from '../api-client';
import { useMutation, useQueryClient } from "react-query";
const Header = () => {
    const { isLoggedIn, refreshAuthStatus } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            console.log("succuss in logging out");
        },
        onError: () => {
            console.log("error in logging out");
        }
    });
    const handleSignOut = async () => {
        mutation.mutate();
        navigate("/sign-in"); // Redirect to sign-in page
    };
    return (React.createElement("div", { className: "fade-in h-auto bg-[#0077B6] flex flex-col p-3 md:p-7 lg:p-9" },
        React.createElement("div", { className: 'flex items-center justify-between mb-4' },
            React.createElement("div", { className: "font-bold text-2xl text-[#90E0EF] animated-heading" },
                "HotelBooking",
                React.createElement("span", { className: "text-[#FF6B6B]" }, ".com")),
            React.createElement("div", null, isLoggedIn ? (React.createElement("div", { className: "flex items-center gap-4" },
                React.createElement(Link, { to: "/my-bookings", className: "text-white relative transition duration-300 hover:text-[#90E0EF] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#FF6B6B] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100" }, "My Bookings"),
                React.createElement(Link, { to: "/my-hotels", className: "text-white relative transition duration-300 hover:text-[#90E0EF] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#FF6B6B] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100" }, "My Hotels"),
                React.createElement("button", { onClick: handleSignOut, className: "text-[#0077B6] bg-[#90E0EF] p-2 border-2 border-[#00B4D8] rounded-md hover:bg-[#00B4D8] hover:text-white transition duration-300 transform hover:scale-105" }, "Sign Out"))) : (React.createElement(Link, { to: "/sign-in", className: "text-[#0077B6] bg-[#90E0EF] p-2 border-2 border-[#00B4D8] rounded-md hover:bg-[#00B4D8] hover:text-white transition duration-300 transform hover:scale-105" }, "Sign In")))),
        React.createElement("div", { className: "text-center text-white" },
            React.createElement("h1", { className: "font-extrabold  text-4xl mb-2 md:text-5xl lg:text-6xl transition-transform transform hover:scale-110 animated-text" }, "Find Your Next Stay"),
            React.createElement("p", { className: "font-light text-lg md:text-xl tracking-wider text-[#FF6B6B]" },
                "Search low prices on hotels for your dream vacation",
                React.createElement("span", { className: "dots" }, "."),
                React.createElement("span", { className: "dots" }, "."),
                React.createElement("span", { className: "dots" }, ".")))));
};
export default Header;
