// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">EcoPulse</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-green-200">Home</a>
        <a href="/login" className="hover:text-green-200">Login</a>
        <a href="/register" className="hover:text-green-200">Sign Up</a>
      </div>
    </nav>
  );
}
