// ============================================================================
// ZONIX Trading Platform - API Configuration
// Centralized configuration for all API endpoints and settings
// ============================================================================

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

export const ENV = {
  // API Base URL - Change this to your backend URL
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // WebSocket URL - For real-time updates
  WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000/ws',
  
  // TradingView Datafeed URL
  TRADINGVIEW_DATAFEED_URL: import.meta.env.VITE_TRADINGVIEW_DATAFEED_URL || 'http://localhost:3000/api/tradingview',
  
  // App Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  
  // Feature Flags
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true' || true,
  ENABLE_WEBSOCKET: import.meta.env.VITE_ENABLE_WEBSOCKET === 'true' || false,
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false,
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },
  
  // District Tokens
  DISTRICTS: {
    LIST: '/districts',
    DETAIL: (id: string) => `/districts/${id}`,
    CHART: (id: string) => `/districts/${id}/chart`,
    STATS: '/districts/stats',
    SEARCH: '/districts/search',
    TRENDING: '/districts/trending',
  },
  
  // State ETFs/Indices
  STATES: {
    LIST: '/states',
    DETAIL: (id: string) => `/states/${id}`,
    CHART: (id: string) => `/states/${id}/chart`,
    ETFS: '/states/etfs',
    ETF_DETAIL: (id: string) => `/states/etfs/${id}`,
  },
  
  // Mutual Funds
  MUTUAL_FUNDS: {
    LIST: '/mutual-funds',
    DETAIL: (id: string) => `/mutual-funds/${id}`,
    CHART: (id: string) => `/mutual-funds/${id}/chart`,
    CATEGORIES: '/mutual-funds/categories',
    AI_RECOMMENDED: '/mutual-funds/ai-recommended',
  },
  
  // Portfolio
  PORTFOLIO: {
    GET: '/portfolio',
    ASSETS: '/portfolio/assets',
    ASSET_DETAIL: (id: string) => `/portfolio/assets/${id}`,
    PERFORMANCE: '/portfolio/performance',
    SUMMARY: '/portfolio/summary',
  },
  
  // Transactions
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    DETAIL: (id: string) => `/transactions/${id}`,
    CANCEL: (id: string) => `/transactions/${id}/cancel`,
    RECEIPT: (id: string) => `/transactions/${id}/receipt`,
  },
  
  // Orders (Buy/Sell)
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    PENDING: '/orders/pending',
  },
  
  // Watchlist
  WATCHLIST: {
    GET: '/watchlist',
    ADD: '/watchlist',
    REMOVE: (id: string) => `/watchlist/${id}`,
    UPDATE_ALERT: (id: string) => `/watchlist/${id}/alert`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id: string) => `/notifications/${id}`,
    PREFERENCES: '/notifications/preferences',
  },
  
  // KYC
  KYC: {
    GET: '/kyc',
    SUBMIT: '/kyc/submit',
    UPLOAD_DOCUMENT: '/kyc/upload',
    STATUS: '/kyc/status',
  },
  
  // Market Data
  MARKET: {
    SUMMARY: '/market/summary',
    GAINERS: '/market/gainers',
    LOSERS: '/market/losers',
    TRENDING: '/market/trending',
    LIVE_PRICES: '/market/live-prices',
  },
  
  // Search
  SEARCH: {
    GLOBAL: '/search',
    DISTRICTS: '/search/districts',
    STATES: '/search/states',
    MUTUAL_FUNDS: '/search/mutual-funds',
  },
  
  // User Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    UPDATE_THEME: '/settings/theme',
    UPDATE_NOTIFICATIONS: '/settings/notifications',
    UPDATE_PRIVACY: '/settings/privacy',
  },
  
  // Analytics
  ANALYTICS: {
    TRACK_EVENT: '/analytics/event',
    TRACK_PAGE_VIEW: '/analytics/pageview',
  },
};

// ============================================================================
// HTTP CONFIGURATION
// ============================================================================

export const HTTP_CONFIG = {
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// ============================================================================
// WEBSOCKET CONFIGURATION
// ============================================================================

export const WS_CONFIG = {
  // Reconnection settings
  RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 3000,
  
  // Heartbeat
  HEARTBEAT_INTERVAL: 30000,
  
  // Channels
  CHANNELS: {
    PRICE_UPDATES: 'price_updates',
    NOTIFICATIONS: 'notifications',
    ORDER_UPDATES: 'order_updates',
    PORTFOLIO_UPDATES: 'portfolio_updates',
  },
};

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_CONFIG = {
  // Cache durations in milliseconds
  DISTRICT_LIST: 5 * 60 * 1000, // 5 minutes
  DISTRICT_DETAIL: 2 * 60 * 1000, // 2 minutes
  CHART_DATA: 1 * 60 * 1000, // 1 minute
  PORTFOLIO: 30 * 1000, // 30 seconds
  MARKET_SUMMARY: 1 * 60 * 1000, // 1 minute
  USER_SETTINGS: 10 * 60 * 1000, // 10 minutes
  
  // Enable/disable cache
  ENABLED: true,
};

// ============================================================================
// TRADINGVIEW CONFIGURATION
// ============================================================================

export const TRADINGVIEW_CONFIG = {
  // Library path (CDN or local)
  LIBRARY_PATH: '/charting_library/',
  
  // Chart settings
  DEFAULT_INTERVAL: '1D',
  SUPPORTED_RESOLUTIONS: ['1', '5', '15', '30', '60', '240', 'D', 'W', 'M'],
  
  // Theme
  THEME: 'dark',
  
  // Features
  DISABLED_FEATURES: [
    'use_localstorage_for_settings',
    'header_symbol_search',
    'header_screenshot',
  ],
  ENABLED_FEATURES: [
    'study_templates',
    'side_toolbar_in_fullscreen_mode',
  ],
};

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  
  // Business logic errors
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  MARKET_CLOSED: 'MARKET_CLOSED',
  KYC_NOT_VERIFIED: 'KYC_NOT_VERIFIED',
  
  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  NETWORK_ERROR: 'NETWORK_ERROR',
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'zonix_access_token',
  REFRESH_TOKEN: 'zonix_refresh_token',
  USER_DATA: 'zonix_user_data',
  THEME: 'zonix_theme',
  SETTINGS: 'zonix_settings',
  WATCHLIST_CACHE: 'zonix_watchlist_cache',
  PORTFOLIO_CACHE: 'zonix_portfolio_cache',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = ENV.API_BASE_URL.endsWith('/') 
    ? ENV.API_BASE_URL.slice(0, -1) 
    : ENV.API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return ENV.NODE_ENV === 'development';
};

/**
 * Check if we're in production mode
 */
export const isProduction = (): boolean => {
  return ENV.NODE_ENV === 'production';
};

/**
 * Check if mock data should be used
 */
export const shouldUseMockData = (): boolean => {
  return ENV.ENABLE_MOCK_DATA || isDevelopment();
};
