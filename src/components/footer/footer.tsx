import React from "react";
import "./footer.css";

// Stateless Functional Component
// A component without state which is built using a function instead of a class
// This function returns the HTML. This is the render.

export const Footer = () => {
    return (
        <div className="footer">
            <h6>All Rights Reserved &copy; {new Date().getFullYear()}</h6>
        </div>
    );
}