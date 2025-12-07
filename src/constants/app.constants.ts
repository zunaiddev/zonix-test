/**
 * Application Constants
 * 
 * General application-wide constants
 */

// App Info
export const APP_NAME = 'ZONIX';
export const APP_TAGLINE = 'Trade the Heartbeat of Bharat';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A premium trading platform for India';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN_KEY || 'zonix_auth_token',
  REFRESH_TOKEN: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'zonix_refresh_token',
  USER_DATA: 'zonix_user_data',
  THEME: 'zonix_theme',
  SIDEBAR_COLLAPSED: 'zonix_sidebar_collapsed',
  RECENT_SEARCHES: 'zonix_recent_searches',
  CHART_PREFERENCES: 'zonix_chart_preferences',
} as const;

// Theme Names
export const THEMES = {
  YELLOW: 'yellow',
  GREEN: 'green',
  PURPLE: 'purple',
  NAVY: 'navy',
} as const;

export const DEFAULT_THEME = THEMES.YELLOW;

// Market Hours (IST)
export const MARKET_HOURS = {
  PRE_OPEN_START: '09:00',
  PRE_OPEN_END: '09:15',
  MARKET_OPEN: '09:15',
  MARKET_CLOSE: '15:30',
  POST_MARKET_START: '15:40',
  POST_MARKET_END: '16:00',
} as const;

// Market Days
export const MARKET_DAYS = [1, 2, 3, 4, 5]; // Monday to Friday

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Chart Intervals
export const CHART_INTERVALS = {
  '1m': '1 Minute',
  '5m': '5 Minutes',
  '15m': '15 Minutes',
  '1h': '1 Hour',
  '1d': '1 Day',
  '1w': '1 Week',
  '1M': '1 Month',
} as const;

// Chart Types
export const CHART_TYPES = {
  CANDLESTICK: 'candlestick',
  LINE: 'line',
  AREA: 'area',
  BAR: 'bar',
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  DIVIDEND: 'dividend',
  FEE: 'fee',
} as const;

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// KYC Status
export const KYC_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

// Order Types
export const ORDER_TYPES = {
  MARKET: 'market',
  LIMIT: 'limit',
  STOP_LOSS: 'stop_loss',
  STOP_LOSS_LIMIT: 'stop_loss_limit',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  OPEN: 'open',
  PARTIALLY_FILLED: 'partially_filled',
  FILLED: 'filled',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  TRADE: 'trade',
  PRICE_ALERT: 'price_alert',
  SYSTEM: 'system',
} as const;

// Asset Types
export const ASSET_TYPES = {
  DISTRICT: 'district',
  STATE_ETF: 'state_etf',
  MUTUAL_FUND: 'mutual_fund',
} as const;

// Time Periods for Performance
export const TIME_PERIODS = {
  '1D': { label: '1 Day', days: 1 },
  '1W': { label: '1 Week', days: 7 },
  '1M': { label: '1 Month', days: 30 },
  '3M': { label: '3 Months', days: 90 },
  '6M': { label: '6 Months', days: 180 },
  '1Y': { label: '1 Year', days: 365 },
  'YTD': { label: 'Year to Date', days: null },
  'ALL': { label: 'All Time', days: null },
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/jpg'],
    DOCUMENT: ['application/pdf', 'image/jpeg', 'image/png'],
  },
} as const;

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PAN_REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  AADHAR_REGEX: /^\d{12}$/,
  IFSC_REGEX: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
} as const;

// Currency
export const CURRENCY = {
  SYMBOL: '₹',
  CODE: 'INR',
  LOCALE: 'en-IN',
} as const;

// Number Formatting
export const NUMBER_FORMAT = {
  DECIMAL_PLACES: 2,
  PRICE_DECIMAL_PLACES: 2,
  PERCENTAGE_DECIMAL_PLACES: 2,
  LARGE_NUMBER_THRESHOLD: 10000,
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Debounce/Throttle Delays (ms)
export const DELAYS = {
  SEARCH: 300,
  PRICE_UPDATE: 1000,
  AUTO_SAVE: 2000,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PORTFOLIO: '/dashboard/portfolio',
  WATCHLIST: '/dashboard/watchlist',
  EXPLORE: '/dashboard/explore',
  DISTRICT_DETAIL: '/dashboard/district/:id',
  STATE_FNO: '/dashboard/state-fno',
  STATE_DETAIL: '/dashboard/state/:id',
  MUTUAL_FUNDS: '/dashboard/mutual-funds',
  MUTUAL_FUND_DETAIL: '/dashboard/mutual-fund/:id',
  SMART_RECEIPT: '/dashboard/smart-receipt',
  RECEIPT_DETAIL: '/dashboard/receipt/:id',
  INSIGHTS: '/dashboard/insights',
  NOTIFICATIONS: '/dashboard/notifications',
  SETTINGS: '/dashboard/settings',
  KYC: '/dashboard/kyc',
  ABOUT: '/about',
  FEATURES: '/features',
  HOW_IT_WORKS: '/how-it-works',
  PRICING: '/pricing',
  CONTACT: '/contact',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  SUPPORT_EMAIL: 'support@zonix.in',
  TWITTER: 'https://twitter.com/zonixindia',
  LINKEDIN: 'https://linkedin.com/company/zonix',
  INSTAGRAM: 'https://instagram.com/zonixindia',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  HELP: '/help',
} as const;

// Feature Flags
export const FEATURES = {
  KYC: import.meta.env.VITE_ENABLE_KYC === 'true',
  STATE_FNO: import.meta.env.VITE_ENABLE_STATE_FNO === 'true',
  MUTUAL_FUNDS: import.meta.env.VITE_ENABLE_MUTUAL_FUNDS === 'true',
  SMART_RECEIPT: import.meta.env.VITE_ENABLE_SMART_RECEIPT === 'true',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  MARKET_CLOSED: 'Market is currently closed.',
  INSUFFICIENT_BALANCE: 'Insufficient balance to complete this transaction.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  SIGNUP: 'Account created successfully!',
  LOGOUT: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  KYC_SUBMITTED: 'KYC submitted successfully.',
  ORDER_PLACED: 'Order placed successfully.',
  ORDER_CANCELLED: 'Order cancelled successfully.',
  ADDED_TO_WATCHLIST: 'Added to watchlist.',
  REMOVED_FROM_WATCHLIST: 'Removed from watchlist.',
} as const;

// India States
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
] as const;
