/**
 * API Constants
 * 
 * Centralized API endpoint definitions and configuration constants
 */

// API Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.zonix.in/v1';
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'wss://ws.zonix.in';

// API Timeout
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Mock Data Flag
export const ENABLE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
} as const;

// District Endpoints
export const DISTRICT_ENDPOINTS = {
  LIST: '/districts',
  DETAIL: (id: string) => `/districts/${id}`,
  CHART: (id: string) => `/districts/${id}/chart`,
  BUY: (id: string) => `/districts/${id}/buy`,
  SELL: (id: string) => `/districts/${id}/sell`,
  TRENDING: '/districts/trending',
  TOP_GAINERS: '/districts/top-gainers',
  TOP_LOSERS: '/districts/top-losers',
  SEARCH: '/districts/search',
} as const;

// State Endpoints
export const STATE_ENDPOINTS = {
  LIST: '/states',
  DETAIL: (id: string) => `/states/${id}`,
  ETF: (id: string) => `/states/${id}/etf`,
  CHART: (id: string) => `/states/${id}/chart`,
  DISTRICTS: (id: string) => `/states/${id}/districts`,
} as const;

// Mutual Fund Endpoints
export const MUTUAL_FUND_ENDPOINTS = {
  LIST: '/mutual-funds',
  DETAIL: (id: string) => `/mutual-funds/${id}`,
  INVEST: (id: string) => `/mutual-funds/${id}/invest`,
  REDEEM: (id: string) => `/mutual-funds/${id}/redeem`,
  PERFORMANCE: (id: string) => `/mutual-funds/${id}/performance`,
  HOLDINGS: (id: string) => `/mutual-funds/${id}/holdings`,
} as const;

// Portfolio Endpoints
export const PORTFOLIO_ENDPOINTS = {
  OVERVIEW: '/portfolio',
  HOLDINGS: '/portfolio/holdings',
  TRANSACTIONS: '/portfolio/transactions',
  PERFORMANCE: '/portfolio/performance',
  ANALYTICS: '/portfolio/analytics',
} as const;

// Watchlist Endpoints
export const WATCHLIST_ENDPOINTS = {
  LIST: '/watchlist',
  ADD: '/watchlist',
  REMOVE: (id: string) => `/watchlist/${id}`,
  REORDER: '/watchlist/reorder',
} as const;

// Market Data Endpoints
export const MARKET_ENDPOINTS = {
  LIVE_PRICES: '/market/live-prices',
  INSIGHTS: '/market/insights',
  STATUS: '/market/status',
  TRENDING: '/market/trending',
  NEWS: '/market/news',
} as const;

// User Endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  KYC: '/user/kyc',
  VERIFY_KYC: '/user/kyc/verify',
  PREFERENCES: '/user/preferences',
  NOTIFICATIONS: '/user/notifications',
  MARK_NOTIFICATION_READ: (id: string) => `/user/notifications/${id}/read`,
} as const;

// Transaction Endpoints
export const TRANSACTION_ENDPOINTS = {
  LIST: '/transactions',
  DETAIL: (id: string) => `/transactions/${id}`,
  RECEIPT: (id: string) => `/transactions/${id}/receipt`,
  DOWNLOAD: (id: string) => `/transactions/${id}/download`,
} as const;

// TradingView Endpoints
export const TRADINGVIEW_ENDPOINTS = {
  CONFIG: '/tradingview/config',
  SYMBOLS: '/tradingview/symbols',
  HISTORY: '/tradingview/history',
  STREAMING: '/tradingview/streaming',
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  PRICE_UPDATE: 'price_update',
  MARKET_STATUS: 'market_status',
  NOTIFICATION: 'notification',
  PORTFOLIO_UPDATE: 'portfolio_update',
  ORDER_UPDATE: 'order_update',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  
  // Authorization
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  KYC_NOT_COMPLETED: 'KYC_NOT_COMPLETED',
  
  // Trading
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  MARKET_CLOSED: 'MARKET_CLOSED',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  PRICE_OUT_OF_RANGE: 'PRICE_OUT_OF_RANGE',
  
  // General
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;

// Request Headers
export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  X_REQUEST_ID: 'X-Request-ID',
  X_API_VERSION: 'X-API-Version',
  X_DEVICE_ID: 'X-Device-ID',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const;

// Cache Keys
export const CACHE_KEYS = {
  DISTRICTS: 'districts',
  STATES: 'states',
  MUTUAL_FUNDS: 'mutual_funds',
  PORTFOLIO: 'portfolio',
  WATCHLIST: 'watchlist',
  USER_PROFILE: 'user_profile',
  MARKET_STATUS: 'market_status',
} as const;

// Cache TTL (in milliseconds)
export const CACHE_TTL = {
  SHORT: 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;
