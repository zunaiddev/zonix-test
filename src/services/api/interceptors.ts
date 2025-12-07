/**
 * API Interceptors
 * 
 * Request and response interceptors for axios
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { TokenManager } from './client';
import { HEADERS } from '../../constants/api.constants';

// Request ID generator
let requestIdCounter = 0;
const generateRequestId = (): string => {
  requestIdCounter = (requestIdCounter + 1) % 1000000;
  return `req_${Date.now()}_${requestIdCounter}`;
};

/**
 * Setup request interceptor
 */
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: any) => {
      // Add authorization header
      const token = TokenManager.getAccessToken();
      if (token) {
        config.headers[HEADERS.AUTHORIZATION] = `Bearer ${token}`;
      }

      // Add request ID for tracking
      config.headers[HEADERS.X_REQUEST_ID] = generateRequestId();

      // Add API version
      config.headers[HEADERS.X_API_VERSION] = '1.0';

      // Add device ID (if available)
      const deviceId = getDeviceId();
      if (deviceId) {
        config.headers[HEADERS.X_DEVICE_ID] = deviceId;
      }

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data,
          params: config.params,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );
};

/**
 * Setup response interceptor
 */
export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
      }

      // Extract data from standard API response format
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data && 'data' in response.data) {
          // Return the data property for easier access
          return {
            ...response,
            data: response.data.data,
          };
        }
      }

      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Log error in development
      if (import.meta.env.DEV) {
        console.error('[API Response Error]', {
          url: originalRequest?.url,
          method: originalRequest?.method,
          status: error.response?.status,
          data: error.response?.data,
        });
      }

      // Handle token expiration and retry with refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = TokenManager.getRefreshToken();
          if (refreshToken) {
            // Call refresh endpoint
            const response = await instance.post('/auth/refresh', {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            // Update tokens
            TokenManager.setTokens(accessToken, newRefreshToken);

            // Retry original request with new token
            originalRequest.headers[HEADERS.AUTHORIZATION] = `Bearer ${accessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          TokenManager.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Handle rate limiting with retry
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        if (retryAfter && !originalRequest._retryCount) {
          originalRequest._retryCount = 1;
          const delay = parseInt(retryAfter) * 1000;
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return instance(originalRequest);
        }
      }

      // Handle network errors with retry
      if (!error.response && !originalRequest._networkRetry) {
        originalRequest._networkRetry = true;
        
        // Wait 2 seconds and retry
        await new Promise(resolve => setTimeout(resolve, 2000));
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Get or generate device ID
 */
const getDeviceId = (): string => {
  const DEVICE_ID_KEY = 'zonix_device_id';
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
};
