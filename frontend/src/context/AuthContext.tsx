import  { createContext, useContext} from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

// Define types for the context
type AppContextType = {
  isLoggedIn: boolean;

};

// Create a context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component to wrap your app with
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  // Check token validity with react-query's useQuery
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
 
  });

  // Manually refresh auth status


 

  return (
    <AppContext.Provider value={{ isLoggedIn:!isError}}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context in components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
