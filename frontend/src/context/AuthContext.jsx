import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginApi, registerApi, logoutApi, getProfileApi, updateProfileApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitmern_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfileApi();
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await loginApi({ email, password });
      setUser(data);
      localStorage.setItem('fitmern_user', JSON.stringify(data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await registerApi(userData);
      setUser(data);
      localStorage.setItem('fitmern_user', JSON.stringify(data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // Ignore logout API failure
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('fitmern_user');
  };

  const updateProfile = async (data) => {
    try {
      const { data: updated } = await updateProfileApi(data);
      setProfile(updated);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update profile',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        updateProfile,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
