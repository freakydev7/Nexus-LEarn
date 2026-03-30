import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Home, FileText, Clock, LayoutDashboard, LogOut, User } from 'lucide-react';
import DarkVeil from '../components/DarkVeil';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/resume-upload', label: 'Resume Analyzer', icon: FileText },
    { path: '/capsule-dashboard', label: 'Time Capsules', icon: Clock },
  ];

  return (
    <div className="min-h-screen relative">
      {/* DarkVeil Background */}
      <DarkVeil />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="NexusLearn" 
              className="h-20 w-auto"
              style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))', animation: 'logoGlow 2s ease-in-out infinite' }}
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-text-dim hover:text-white transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-text-dim hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text-dim hover:text-white transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
