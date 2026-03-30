import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import ResumeResult from './pages/ResumeResult';
import CapsuleDashboard from './pages/CapsuleDashboard';
import CapsuleCreate from './pages/CapsuleCreate';
import CapsuleView from './pages/CapsuleView';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="resume-upload" element={<ResumeUpload />} />
                <Route path="resume-result" element={<ResumeResult />} />
                <Route path="capsule-dashboard" element={<CapsuleDashboard />} />
                <Route path="capsule-create" element={<CapsuleCreate />} />
                <Route path="capsule-view/:id" element={<CapsuleView />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
