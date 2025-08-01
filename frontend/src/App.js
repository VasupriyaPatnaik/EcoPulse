import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HowItWorks from "./pages/HowItWorks";
import Community from "./pages/Community";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardProvider } from "./context/DashboardContext";
// import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };

  // Pages that have their own Navbar and shouldn't use the global one
  const pagesWithOwnNavbar = ['/', '/login', '/register', '/forgot-password'];
  const showGlobalNavbar = !pagesWithOwnNavbar.includes(location.pathname);
  
  // Pages that have their own Footer and shouldn't use the global one
  const pagesWithOwnFooter = ['/', '/login', '/register', '/forgot-password'];
  const showGlobalFooter = !pagesWithOwnFooter.includes(location.pathname);

  return (
    <DashboardProvider>
      <div className="min-h-screen flex flex-col">
        {showGlobalNavbar && (
          <Navbar onLoginClick={handleLoginClick} />
        )}
        
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}> {/* Add fallback UI */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Protected routes - add here if you need any truly protected routes later */}
              {/* 
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              */}
              
              {/* Add more routes as needed */}
            </Routes>
          </Suspense>
        </main>
        
        {showGlobalFooter && (
          <Footer />
        )}
      </div>
    </DashboardProvider>
  );
}

export default App;