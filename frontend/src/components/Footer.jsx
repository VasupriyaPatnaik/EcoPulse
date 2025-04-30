// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white text-center py-4">
      <p>© {new Date().getFullYear()} EcoPulse. All rights reserved.</p>
    </footer>
  );
}
