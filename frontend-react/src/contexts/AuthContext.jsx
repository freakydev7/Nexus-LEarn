import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { access_token, user } = response.data;
      localStorage.setItem('jwt_token', access_token);
      setToken(access_token);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const register = async (name, username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { 
        name, 
        username,
        email,
        password 
      });
      const { access_token, user } = response.data;
      localStorage.setItem('jwt_token', access_token);
      setToken(access_token);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const forgotPassword = async (username) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { username });
      return { success: true, message: response.data.message, devToken: response.data.dev_token };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Failed to send reset email' };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, new_password: newPassword });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Password reset failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    loading,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
