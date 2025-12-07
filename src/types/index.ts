// ============================================================================
// ZONIX Trading Platform - TypeScript Type Definitions
// Centralized type definitions for the entire application
// ============================================================================

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

// ============================================================================
// DISTRICT TOKEN TYPES
// ============================================================================

export interface DistrictToken {
  id: string;
  districtName: string;
  stateName: string;
  code: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  gdpGrowth: number;
  population: number;
  literacyRate: number;
  description?: string;
  icon?: string;
  lastUpdated: string;
}

export interface DistrictChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface DistrictStats {
  totalMarketCap: number;
  totalVolume24h: number;
  avgGrowth: number;
  topGainer: DistrictToken;
  topLoser: DistrictToken;
}

// ============================================================================
// STATE ETF/INDEX TYPES
// ============================================================================

export interface StateIndex {
  id: string;
  stateName: string;
  code: string;
  currentValue: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  constituents: number;
  description?: string;
  lastUpdated: string;
}

export interface StateETF {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  code: string;
  nav: number;
  change24h: number;
  changePercent24h: number;
  aum: number;
  expenseRatio: number;
  minInvestment: number;
  returns1y: number;
  returns3y: number;
  returns5y: number;
  riskLevel: 'low' | 'medium' | 'high';
  description?: string;
  lastUpdated: string;
}

// ============================================================================
// MUTUAL FUND TYPES
// ============================================================================

export interface MutualFund {
  id: string;
  name: string;
  category: 'equity' | 'debt' | 'hybrid' | 'ai_powered';
  nav: number;
  change24h: number;
  changePercent24h: number;
  aum: number;
  expenseRatio: number;
  minInvestment: number;
  returns1y: number;
  returns3y: number;
  returns5y: number;
  riskLevel: 'low' | 'medium' | 'high';
  manager: string;
  description?: string;
  holdings?: Holding[];
  lastUpdated: string;
}

export interface Holding {
  symbol: string;
  name: string;
  allocation: number;
  value: number;
}

// ============================================================================
// PORTFOLIO TYPES
// ============================================================================

export interface PortfolioAsset {
  id: string;
  userId: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  assetId: string;
  assetName: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
  purchaseDate: string;
  lastUpdated: string;
}

export interface Portfolio {
  userId: string;
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  assets: PortfolioAsset[];
  dayChange: number;
  dayChangePercent: number;
  lastUpdated: string;
}

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

export interface Transaction {
  id: string;
  userId: string;
  type: 'buy' | 'sell';
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  assetId: string;
  assetName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  fees: number;
  tax: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp: string;
  receiptId?: string;
}

export interface SmartReceipt {
  id: string;
  transactionId: string;
  userId: string;
  type: 'buy' | 'sell';
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  assetName: string;
  quantity: number;
  price: number;
  subtotal: number;
  fees: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// WATCHLIST TYPES
// ============================================================================

export interface WatchlistItem {
  id: string;
  userId: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  assetId: string;
  assetName: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  alertPrice?: number;
  addedAt: string;
}

export interface Watchlist {
  userId: string;
  items: WatchlistItem[];
  lastUpdated: string;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'price_alert' | 'transaction' | 'news' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
  createdAt: string;
}

// ============================================================================
// KYC TYPES
// ============================================================================

export interface KYCDocument {
  type: 'pan' | 'aadhaar' | 'address_proof' | 'bank_statement';
  documentId: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface KYCData {
  userId: string;
  fullName: string;
  dateOfBirth: string;
  panNumber: string;
  aadhaarNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountType: 'savings' | 'current';
  };
  documents: KYCDocument[];
  status: 'pending' | 'verified' | 'rejected' | 'not_started';
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

// ============================================================================
// MARKET DATA TYPES
// ============================================================================

export interface MarketSummary {
  totalMarketCap: number;
  totalVolume24h: number;
  topGainers: (DistrictToken | StateETF | MutualFund)[];
  topLosers: (DistrictToken | StateETF | MutualFund)[];
  trending: (DistrictToken | StateETF | MutualFund)[];
  lastUpdated: string;
}

export interface ChartTimeframe {
  label: string;
  value: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';
}

// ============================================================================
// SETTINGS TYPES
// ============================================================================

export interface UserSettings {
  userId: string;
  theme: 'yellow' | 'green' | 'purple' | 'navy';
  notifications: {
    email: boolean;
    push: boolean;
    priceAlerts: boolean;
    newsUpdates: boolean;
    transactionAlerts: boolean;
  };
  privacy: {
    showPortfolio: boolean;
    showActivity: boolean;
  };
  preferences: {
    defaultCurrency: 'INR' | 'USD';
    language: 'en' | 'hi';
    chartType: 'candlestick' | 'line' | 'area';
  };
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
    page?: number;
    totalPages?: number;
    totalItems?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchResult {
  id: string;
  type: 'district' | 'state_etf' | 'mutual_fund';
  name: string;
  code?: string;
  currentPrice: number;
  changePercent24h: number;
  icon?: string;
}

// ============================================================================
// LIVE UPDATES TYPES
// ============================================================================

export interface PriceUpdate {
  assetId: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  timestamp: string;
}

export interface WebSocketMessage {
  type: 'price_update' | 'notification' | 'order_update' | 'system';
  payload: any;
  timestamp: string;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export type Theme = 'yellow' | 'green' | 'purple' | 'navy';
export type AssetType = 'district' | 'state_etf' | 'mutual_fund';
export type TransactionType = 'buy' | 'sell';
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type RiskLevel = 'low' | 'medium' | 'high';
