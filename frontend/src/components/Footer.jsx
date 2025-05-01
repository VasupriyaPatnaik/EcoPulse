// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white text-center py-6">
      <div className="flex justify-center space-x-4 mb-4">
        {/* Social Media Links */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
          Twitter
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
          LinkedIn
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
          Instagram
        </a>
      </div>

      <p>© {new Date().getFullYear()} EcoPulse. All rights reserved.</p>
    </footer>
  );
}
