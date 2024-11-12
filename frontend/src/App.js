import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/Layout';
import React from 'react';
import Register from "../src/pages/Register";
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/SignIn';
function App() {
    return (React.createElement(Router, null,
        React.createElement(ToastContainer, null),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Layout, null,
                    React.createElement("p", null, "Home Page")) }),
            React.createElement(Route, { path: "/search", element: React.createElement(Layout, null,
                    React.createElement("p", null, "Search Page")) }),
            React.createElement(Route, { path: "/register", element: React.createElement(Layout, null,
                    React.createElement(Register, null)) }),
            React.createElement(Route, { path: "/sign-in", element: React.createElement(Layout, null,
                    React.createElement(Login, null)) }),
            React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/" }) }))));
}
export default App;
