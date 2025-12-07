/**
 * useAuth Hook
 * 
 * Custom hook for authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { TokenManager } from '../services/api/client';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ChangePasswordRequest,
  UserProfile,
} from '../types/api.types';
import * as authService from '../services/auth.service';
import { STORAGE_KEYS } from '../constants/app.constants';

interface UseAuthReturn {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (TokenManager.isAuthenticated()) {
          // Try to fetch user profile
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        TokenManager.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login
  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response: AuthResponse = await authService.login(credentials);
      
      // Store tokens
      TokenManager.setTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
      
      // Store user data
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      setUser(response.user as UserProfile);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register
  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response: AuthResponse = await authService.register(data);
      
      // Store tokens
      TokenManager.setTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
      
      // Store user data
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      setUser(response.user as UserProfile);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      TokenManager.clearTokens();
      setUser(null);
      setIsLoading(false);
      window.location.href = '/login';
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (data: ChangePasswordRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.changePassword(data);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Failed to refresh user data');
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    changePassword,
    refreshUser,
    clearError,
  };
};
