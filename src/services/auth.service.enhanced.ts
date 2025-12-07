/**
 * Enhanced Authentication Service
 *
 * Integrates with backend API using the new API client
 */

import {ApiClient, TokenManager} from './api/client';
import {AUTH_ENDPOINTS, ENABLE_MOCK_DATA} from '../constants/api.constants';
import {STORAGE_KEYS} from '../constants/app.constants';
import {
    ApiResponse,
    AuthResponse,
    ChangePasswordRequest,
    LoginRequest,
    RegisterRequest,
    UserProfile,
} from '../types/api.types';

// Mock data for development
const MOCK_USER: UserProfile = {
    page: 'usr_mock_123',
    name: 'Test User',
    email: 'test@zonix.in',
    phone: '9876543210',
    kycStatus: 'verified',
    preferences: {
        theme: 'yellow',
        notifications: {
            email: true,
            sms: true,
            push: true,
        },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    if (ENABLE_MOCK_DATA) {
        // Mock implementation
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (credentials.email === 'test@zonix.in' && credentials.password === 'Test@123') {
            const response: AuthResponse = {
                user: MOCK_USER,
                tokens: {
                    accessToken: `mock_token_${Date.now()}`,
                    refreshToken: `mock_refresh_${Date.now()}`,
                    expiresIn: 3600,
                },
            };

            TokenManager.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

            return response;
        }

        throw new Error('Invalid credentials. Use test@zonix.in / Test@123');
    }

    // Real API call
    const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
    );

    if (response.data) {
        TokenManager.setTokens(
            response.data.tokens.accessToken,
            response.data.tokens.refreshToken
        );
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
        return response.data;
    }

    throw new Error('Login failed');
};

/**
 * Register new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    if (ENABLE_MOCK_DATA) {
        // Mock implementation
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response: AuthResponse = {
            user: {
                ...MOCK_USER,
                page: `usr_${Date.now()}`,
                name: data.name,
                email: data.email,
                phone: data.phone,
                kycStatus: 'not_started',
            },
            tokens: {
                accessToken: `mock_token_${Date.now()}`,
                refreshToken: `mock_refresh_${Date.now()}`,
                expiresIn: 3600,
            },
        };

        TokenManager.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

        return response;
    }

    // Real API call
    const response = await ApiClient.post<ApiResponse<AuthResponse>>(
        AUTH_ENDPOINTS.REGISTER,
        data
    );

    if (response.data) {
        TokenManager.setTokens(
            response.data.tokens.accessToken,
            response.data.tokens.refreshToken
        );
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
        return response.data;
    }

    throw new Error('Registration failed');
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
    if (!ENABLE_MOCK_DATA) {
        try {
            await ApiClient.post(AUTH_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.error('Logout API error:', error);
        }
    }

    TokenManager.clearTokens();
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<UserProfile> => {
    if (ENABLE_MOCK_DATA) {
        // Return stored user or mock user
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return storedUser ? JSON.parse(storedUser) : MOCK_USER;
    }

    // Real API call
    const response = await ApiClient.get<ApiResponse<UserProfile>>(AUTH_ENDPOINTS.ME);

    if (response.data) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data));
        return response.data;
    }

    throw new Error('Failed to fetch user');
};

/**
 * Change password
 */
export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    if (ENABLE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
    }

    // Real API call
    await ApiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
};

/**
 * Forgot password
 */
export const forgotPassword = async (email: string): Promise<void> => {
    if (ENABLE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
    }

    // Real API call
    await ApiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {email});
};

/**
 * Reset password
 */
export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    if (ENABLE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
    }

    // Real API call
    await ApiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, {token, newPassword});
};

/**
 * Verify email
 */
export const verifyEmail = async (token: string): Promise<void> => {
    if (ENABLE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
    }

    // Real API call
    await ApiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, {token});
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return TokenManager.isAuthenticated();
};

/**
 * Get stored user
 */
export const getStoredUser = (): UserProfile | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
};
