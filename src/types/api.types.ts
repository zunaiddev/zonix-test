/**
 * API Request/Response Types
 * 
 * Type definitions for API communication
 */

// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: number;
}

// Error Response
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: number;
}

// Paginated Response
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Pagination Params
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Auth Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    kycStatus: string;
    avatar?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// District Request/Response Types
export interface District {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  high24h: number;
  low24h: number;
  population?: number;
  gdp?: number;
  growth?: number;
  isInWatchlist?: boolean;
}

export interface DistrictDetail extends District {
  description: string;
  metrics: {
    pe: number;
    pb: number;
    dividendYield: number;
    eps: number;
  };
  topSectors: Array<{
    name: string;
    percentage: number;
  }>;
  news: Array<{
    id: string;
    title: string;
    summary: string;
    source: string;
    publishedAt: string;
    url: string;
  }>;
}

export interface ChartDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartDataRequest {
  interval: string;
  from: number;
  to: number;
}

// Trade Request/Response Types
export interface TradeRequest {
  assetId: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop_loss' | 'stop_loss_limit';
  quantity: number;
  price?: number;
  stopLoss?: number;
  target?: number;
}

export interface TradeResponse {
  orderId: string;
  status: string;
  executedAt?: string;
  executedPrice?: number;
  executedQuantity?: number;
  message: string;
}

// Portfolio Request/Response Types
export interface PortfolioOverview {
  totalValue: number;
  totalInvested: number;
  totalReturns: number;
  totalReturnsPercent: number;
  dayChange: number;
  dayChangePercent: number;
  availableBalance: number;
}

export interface Holding {
  id: string;
  assetId: string;
  assetType: string;
  assetName: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  invested: number;
  currentValue: number;
  returns: number;
  returnsPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface Transaction {
  id: string;
  type: string;
  status: string;
  assetId: string;
  assetName: string;
  assetType: string;
  quantity: number;
  price: number;
  amount: number;
  fee: number;
  tax: number;
  total: number;
  timestamp: string;
  orderId?: string;
}

// Watchlist Request/Response Types
export interface WatchlistItem {
  id: string;
  assetId: string;
  assetType: string;
  assetName: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: string;
}

export interface AddToWatchlistRequest {
  assetId: string;
  assetType: string;
}

// State ETF Types
export interface StateETF {
  id: string;
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  nav: number;
  aum: number;
  expenseRatio: number;
  districts: number;
}

export interface StateETFDetail extends StateETF {
  description: string;
  topDistricts: Array<{
    id: string;
    name: string;
    weight: number;
    returns: number;
  }>;
  sectorAllocation: Array<{
    sector: string;
    percentage: number;
  }>;
  performance: {
    '1M': number;
    '3M': number;
    '6M': number;
    '1Y': number;
    '3Y': number;
  };
}

// Mutual Fund Types
export interface MutualFund {
  id: string;
  name: string;
  category: string;
  type: string;
  nav: number;
  change: number;
  changePercent: number;
  aum: number;
  expenseRatio: number;
  minInvestment: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

export interface MutualFundDetail extends MutualFund {
  description: string;
  fundManager: string;
  inceptionDate: string;
  exitLoad: string;
  holdings: Array<{
    assetId: string;
    assetName: string;
    assetType: string;
    percentage: number;
  }>;
  performance: {
    '1M': number;
    '3M': number;
    '6M': number;
    '1Y': number;
    '3Y': number;
    '5Y': number;
  };
}

export interface InvestMutualFundRequest {
  fundId: string;
  amount: number;
  sipEnabled?: boolean;
  sipDate?: number;
}

// Market Data Types
export interface MarketStatus {
  isOpen: boolean;
  nextEvent: 'open' | 'close';
  nextEventTime: string;
  currentTime: string;
}

export interface PriceUpdate {
  assetId: string;
  assetType: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

export interface MarketInsight {
  id: string;
  type: 'news' | 'analysis' | 'alert';
  title: string;
  content: string;
  source: string;
  relatedAssets: string[];
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

// User Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  kycStatus: string;
  pan?: string;
  dateOfBirth?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    accountHolderName: string;
  };
  preferences: {
    theme: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: File;
  dateOfBirth?: string;
  address?: UserProfile['address'];
}

export interface KYCRequest {
  pan: string;
  aadhar: string;
  panDocument: File;
  aadharFront: File;
  aadharBack: File;
  photo: File;
  signature: File;
}

// Notification Types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  priceAlerts: boolean;
  orderUpdates: boolean;
  newsUpdates: boolean;
  marketInsights: boolean;
}

// Search Types
export interface SearchRequest {
  query: string;
  filters?: {
    assetType?: string[];
    state?: string[];
    minPrice?: number;
    maxPrice?: number;
  };
  limit?: number;
}

export interface SearchResult {
  id: string;
  type: string;
  name: string;
  subtitle?: string;
  price?: number;
  change?: number;
  changePercent?: number;
  metadata?: Record<string, any>;
}

// TradingView Types
export interface TradingViewBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradingViewSymbol {
  symbol: string;
  ticker: string;
  name: string;
  description: string;
  type: string;
  session: string;
  timezone: string;
  minmov: number;
  pricescale: number;
  has_intraday: boolean;
  supported_resolutions: string[];
  data_status: string;
}

export interface TradingViewConfig {
  supported_resolutions: string[];
  exchanges: Array<{
    value: string;
    name: string;
    desc: string;
  }>;
  symbols_types: Array<{
    name: string;
    value: string;
  }>;
}

// WebSocket Types
export interface WebSocketMessage<T = any> {
  event: string;
  data: T;
  timestamp: number;
}

export interface SubscriptionRequest {
  event: 'subscribe' | 'unsubscribe';
  channels: string[];
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}
