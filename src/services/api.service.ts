// ============================================================================
// ZONIX Trading Platform - API Service Layer
// Core HTTP client with interceptors, error handling, and retry logic
// ============================================================================

import { APIResponse } from '../types';
import { ENV, HTTP_CONFIG, ERROR_CODES, STORAGE_KEYS, buildApiUrl } from '../config/api.config';

// ============================================================================
// HTTP CLIENT CLASS
// ============================================================================

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: Array<(config: RequestConfig) => RequestConfig> = [];
  private responseInterceptors: Array<(response: any) => any> = [];
  private errorInterceptors: Array<(error: any) => any> = [];

  constructor() {
    this.baseURL = ENV.API_BASE_URL;
    this.defaultHeaders = { ...HTTP_CONFIG.DEFAULT_HEADERS };
    this.setupDefaultInterceptors();
  }

  /**
   * Setup default interceptors
   */
  private setupDefaultInterceptors() {
    // Add auth token to requests
    this.addRequestInterceptor((config) => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    });

    // Handle 401 Unauthorized
    this.addErrorInterceptor(async (error) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          try {
            // Attempt to refresh token
            const response = await this.post('/auth/refresh', { refreshToken });
            if (response.success && response.data) {
              localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
              localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
              
              // Retry original request
              return this.request(error.config);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            this.clearAuth();
            window.location.href = '/login';
          }
        } else {
          this.clearAuth();
          window.location.href = '/login';
        }
      }
      throw error;
    });
  }

  /**
   * Clear authentication data
   */
  private clearAuth() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: (response: any) => any) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: (error: any) => any) {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Execute request interceptors
   */
  private async executeRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let finalConfig = config;
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }
    return finalConfig;
  }

  /**
   * Execute response interceptors
   */
  private async executeResponseInterceptors(response: any): Promise<any> {
    let finalResponse = response;
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(finalResponse);
    }
    return finalResponse;
  }

  /**
   * Execute error interceptors
   */
  private async executeErrorInterceptors(error: any): Promise<any> {
    let finalError = error;
    for (const interceptor of this.errorInterceptors) {
      try {
        finalError = await interceptor(finalError);
      } catch (e) {
        finalError = e;
      }
    }
    return finalError;
  }

  /**
   * Core request method with retry logic
   */
  async request<T = any>(config: RequestConfig, retryCount = 0): Promise<APIResponse<T>> {
    try {
      // Execute request interceptors
      const finalConfig = await this.executeRequestInterceptors(config);

      // Build URL
      const url = finalConfig.url.startsWith('http') 
        ? finalConfig.url 
        : buildApiUrl(finalConfig.url);

      // Build fetch options
      const options: RequestInit = {
        method: finalConfig.method || 'GET',
        headers: {
          ...this.defaultHeaders,
          ...finalConfig.headers,
        },
        signal: AbortSignal.timeout(HTTP_CONFIG.TIMEOUT),
      };

      // Add body for POST, PUT, PATCH
      if (finalConfig.data && ['POST', 'PUT', 'PATCH'].includes(options.method || '')) {
        options.body = JSON.stringify(finalConfig.data);
      }

      // Make request
      const response = await fetch(url, options);

      // Parse response
      let data: APIResponse<T>;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = {
          success: response.ok,
          data: (await response.text()) as any,
        };
      }

      // Check for errors
      if (!response.ok) {
        const error = {
          status: response.status,
          message: data.error?.message || response.statusText,
          code: data.error?.code || ERROR_CODES.INTERNAL_ERROR,
          data: data,
          config: finalConfig,
        };
        
        // Execute error interceptors
        await this.executeErrorInterceptors(error);
        
        throw error;
      }

      // Execute response interceptors
      const finalData = await this.executeResponseInterceptors(data);

      return finalData;
    } catch (error: any) {
      // Retry logic for network errors
      if (
        retryCount < HTTP_CONFIG.RETRY_ATTEMPTS &&
        (error.name === 'AbortError' || error.code === ERROR_CODES.NETWORK_ERROR)
      ) {
        await this.delay(HTTP_CONFIG.RETRY_DELAY * (retryCount + 1));
        return this.request<T>(config, retryCount + 1);
      }

      // Execute error interceptors
      try {
        await this.executeErrorInterceptors(error);
      } catch (interceptorError) {
        throw interceptorError;
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: Partial<RequestConfig>): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PATCH', data });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<APIResponse<T>> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// REQUEST CONFIG INTERFACE
// ============================================================================

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  data?: any;
  params?: Record<string, any>;
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const httpClient = new HttpClient();
export default httpClient;
