import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await forgotPassword(username);
    
    if (result.success) {
      setSuccess(result.message);
      // In dev mode, show the token
      if (result.devToken) {
        console.log('[DEV] Reset token:', result.devToken);
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await resetPassword(token, newPassword);
    
    if (result.success) {
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Reset password form (when token is present)
  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <img 
                  src="/images/logo.png" 
                  alt="NexusLearn" 
                  className="h-16 w-auto mx-auto"
                />
              </Link>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-text-dim">Enter your new password</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-3 rounded-lg mb-6 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-dim w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-background border border-white/10 rounded-lg py-3 px-12 text-white placeholder-text-dim focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-dim hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-dim w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-background border border-white/10 rounded-lg py-3 px-12 text-white placeholder-text-dim focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-text-dim mt-6">
              <Link to="/login" className="text-primary hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Forgot password form (when no token)
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/images/logo.png" 
                alt="NexusLearn" 
                className="h-16 w-auto mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
            <p className="text-text-dim">Enter your username to receive a reset link</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-3 rounded-lg mb-6 text-sm">
              <CheckCircle className="w-5 h-5 inline mr-2" />
              {success}
            </div>
          )}

          <form onSubmit={handleForgotSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-dim w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-background border border-white/10 rounded-lg py-3 px-12 text-white placeholder-text-dim focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-text-dim mt-6">
            <Link to="/login" className="text-primary hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
