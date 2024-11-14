import { RegisterFormData } from "./pages/Register";
import {showToast} from "../utilities/toast"
import { LoginFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://hotel-booking-1-x0qv.onrender.com";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        credentials:"include",//set cookies to browser
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    console.log("hi,",API_BASE_URL)
    const responseBody = await response.json();

    if (!response.ok) {
        showToast(responseBody.message || 'Registration failed', 'error');
        throw new Error(responseBody.message);
    }
    showToast('Registration successful', 'success');
    return responseBody; // Optional: Return the response body for further use
};
export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
       
        credentials:"include",//set cookies to browser
   
    });
    

    if (!response.ok) {
        
        throw new Error("Token Invalid");
    }
    return response.json();
   
 // Optional: Return the response body for further use
};
export const login = async (data: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const responseBody = await response.json();

    if (!response.ok) {
        showToast(responseBody.message || 'Logged In', 'error');
        throw new Error(responseBody.message);
    }
    showToast('Logged In', 'success');
    return responseBody; // Optional: Return the response body for further use
  };
  export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    });
    
    if(!response.ok){
        showToast("Error Signing out");
        throw new Error("Error during sign out");
        
    }
    showToast("Logged Out Successfully");

  }
  