import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} FABRIQ AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
