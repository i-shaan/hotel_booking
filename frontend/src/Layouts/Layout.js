import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Layout = ({ children }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex flex-col min-h-screen" },
            React.createElement(Header, null),
            React.createElement("div", { className: "container mx-auto py-10 flex-1" }, children),
            React.createElement(Footer, null))));
};
export default Layout;
