import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon pack (optional)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change this based on your auth logic

  const navLinkClass =
    "block py-2 px-4 hover:text-green-200 transition duration-150";

  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">EcoPulse</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={({ isActive }) => `${navLinkClass} ${isActive ? "underline" : ""}`}>
            Home
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={({ isActive }) => `${navLinkClass} ${isActive ? "underline" : ""}`}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => `${navLinkClass} ${isActive ? "underline" : ""}`}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  // Implement logout logic here
                }}
                className={navLinkClass}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  // Implement logout logic here
                }}
                className={navLinkClass}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
