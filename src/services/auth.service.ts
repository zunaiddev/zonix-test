// ============================================================================
// ZONIX Trading Platform - Authentication Service
// API service for authentication operations
// ============================================================================

import {httpClient} from './api.service';
import {API_ENDPOINTS, shouldUseMockData, STORAGE_KEYS} from '../config/api.config';
import {APIResponse, AuthTokens, LoginCredentials, SignupData, User,} from '../types';

// ============================================================================
// AUTH SERVICE
// ============================================================================

class AuthService {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<APIResponse<{ user: User; tokens: AuthTokens }>> {
        if (shouldUseMockData()) {
            return this.mockLogin(credentials);
        }

        const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        if (response.success && response.data) {
            this.saveAuthData(response.data.user, response.data.tokens);
        }

        return response;
    }

    /**
     * Signup new user
     */
    async signup(data: SignupData): Promise<APIResponse<{ user: User; tokens: AuthTokens }>> {
        if (shouldUseMockData()) {
            return this.mockSignup(data);
        }

        const response = await httpClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);

        if (response.success && response.data) {
            this.saveAuthData(response.data.user, response.data.tokens);
        }

        return response;
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            if (!shouldUseMockData()) {
                await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
            }
        } finally {
            this.clearAuthData();
        }
    }

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<APIResponse<User>> {
        if (shouldUseMockData()) {
            return this.mockGetCurrentUser();
        }

        return httpClient.get(API_ENDPOINTS.AUTH.ME);
    }

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<APIResponse<AuthTokens>> {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        if (shouldUseMockData()) {
            return this.mockRefreshToken();
        }

        const response = await httpClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
            refreshToken
        });

        if (response.success && response.data) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
        }

        return response;
    }

    /**
     * Change password
     */
    async changePassword(oldPassword: string, newPassword: string): Promise<APIResponse<void>> {
        if (shouldUseMockData()) {
            return {success: true};
        }

        return httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
            oldPassword,
            newPassword,
        });
    }

    /**
     * Reset password
     */
    async resetPassword(email: string): Promise<APIResponse<void>> {
        if (shouldUseMockData()) {
            return {success: true};
        }

        return httpClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {email});
    }

    /**
     * Verify email
     */
    async verifyEmail(token: string): Promise<APIResponse<void>> {
        if (shouldUseMockData()) {
            return {success: true};
        }

        return httpClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {token});
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    /**
     * Get stored user data
     */
    getStoredUser(): User | null {
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Save authentication data
     */
    private saveAuthData(user: User, tokens: AuthTokens): void {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    }

    /**
     * Clear authentication data
     */
    private clearAuthData(): void {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.WATCHLIST_CACHE);
        localStorage.removeItem(STORAGE_KEYS.PORTFOLIO_CACHE);
    }

    // ============================================================================
    // MOCK DATA METHODS
    // ============================================================================

    private async mockLogin(credentials: LoginCredentials): Promise<APIResponse<{ user: User; tokens: AuthTokens }>> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock validation
        if (credentials.email === 'test@zonix.com' && credentials.password === 'password') {
            const user: User = {
                page: '1',
                email: credentials.email,
                name: 'Rajesh Kumar',
                phone: '+91 98765 43210',
                kycStatus: 'verified',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const tokens: AuthTokens = {
                accessToken: 'mock_access_token_' + Date.now(),
                refreshToken: 'mock_refresh_token_' + Date.now(),
                expiresIn: 3600,
            };

            this.saveAuthData(user, tokens);

            return {
                success: true,
                data: {user, tokens},
            };
        }

        return {
            success: false,
            error: {
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid email or password',
            },
        };
    }

    private async mockSignup(data: SignupData): Promise<APIResponse<{ user: User; tokens: AuthTokens }>> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const user: User = {
            page: Date.now().toString(),
            email: data.email,
            name: data.name,
            phone: data.phone,
            kycStatus: 'not_started',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const tokens: AuthTokens = {
            accessToken: 'mock_access_token_' + Date.now(),
            refreshToken: 'mock_refresh_token_' + Date.now(),
            expiresIn: 3600,
        };

        this.saveAuthData(user, tokens);

        return {
            success: true,
            data: {user, tokens},
        };
    }

    private async mockGetCurrentUser(): Promise<APIResponse<User>> {
        const user = this.getStoredUser();

        if (!user) {
            return {
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Not authenticated',
                },
            };
        }

        return {
            success: true,
            data: user,
        };
    }

    private async mockRefreshToken(): Promise<APIResponse<AuthTokens>> {
        const tokens: AuthTokens = {
            accessToken: 'mock_access_token_' + Date.now(),
            refreshToken: 'mock_refresh_token_' + Date.now(),
            expiresIn: 3600,
        };

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);

        return {
            success: true,
            data: tokens,
        };
    }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const authService = new AuthService();
export default authService;
