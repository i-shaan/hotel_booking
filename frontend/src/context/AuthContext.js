import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
// Create a context with a default value
const AppContext = createContext(undefined);
// Provider component to wrap your app with
export const AppContextProvider = ({ children, }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Check token validity with react-query's useQuery
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
        onSuccess: () => setIsLoggedIn(true),
        onError: () => setIsLoggedIn(false),
    });
    // Manually refresh auth status
    const refreshAuthStatus = () => {
        apiClient.validateToken()
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    };
    useEffect(() => {
        refreshAuthStatus(); // Check token status on mount
    }, []);
    return (React.createElement(AppContext.Provider, { value: { isLoggedIn: !isError, refreshAuthStatus } }, children));
};
// Hook to use context in components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
