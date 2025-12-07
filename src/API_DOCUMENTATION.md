# ZONIX API Documentation

This document provides a comprehensive guide for backend developers to implement the required API endpoints for the ZONIX trading platform.

## Table of Contents

1. [Authentication](#authentication)
2. [Districts](#districts)
3. [States](#states)
4. [Mutual Funds](#mutual-funds)
5. [Portfolio](#portfolio)
6. [Watchlist](#watchlist)
7. [Market Data](#market-data)
8. [User Management](#user-management)
9. [Transactions](#transactions)
10. [TradingView](#tradingview)
11. [WebSocket](#websocket)

---

## Base URL

```
https://api.zonix.in/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer {access_token}
```

### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "termsAccepted": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "kycStatus": "not_started",
      "avatar": null
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 3600
    }
  },
  "timestamp": 1699523400000
}
```

### POST /auth/login

Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "rememberMe": true
}
```

**Response:** Same as register

### POST /auth/logout

Logout current user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "timestamp": 1699523400000
}
```

### POST /auth/refresh

Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 3600
  },
  "timestamp": 1699523400000
}
```

### GET /auth/me

Get current authenticated user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "kycStatus": "verified",
    "avatar": "https://...",
    // ... other user fields
  },
  "timestamp": 1699523400000
}
```

---

## Districts

### GET /districts

Get list of all districts.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20, max: 100)
- `state` (optional): Filter by state code
- `sortBy` (optional): Sort field (price, change, volume, marketCap)
- `sortOrder` (optional): asc or desc

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "MH-MUM",
        "name": "Mumbai",
        "state": "Maharashtra",
        "stateCode": "MH",
        "price": 1245.50,
        "change": 12.30,
        "changePercent": 2.5,
        "marketCap": 125000000000,
        "volume": 1500000,
        "high24h": 1250.00,
        "low24h": 1230.00,
        "population": 12442373,
        "gdp": 250000000000,
        "growth": 7.5,
        "isInWatchlist": false
      }
      // ... more districts
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 765,
      "totalPages": 39,
      "hasNext": true,
      "hasPrevious": false
    }
  },
  "timestamp": 1699523400000
}
```

### GET /districts/:id

Get detailed information about a specific district.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "MH-MUM",
    "name": "Mumbai",
    "state": "Maharashtra",
    "stateCode": "MH",
    "price": 1245.50,
    "change": 12.30,
    "changePercent": 2.5,
    "marketCap": 125000000000,
    "volume": 1500000,
    "high24h": 1250.00,
    "low24h": 1230.00,
    "description": "Mumbai is the financial capital of India...",
    "metrics": {
      "pe": 25.5,
      "pb": 3.2,
      "dividendYield": 1.8,
      "eps": 48.84
    },
    "topSectors": [
      { "name": "Finance", "percentage": 35 },
      { "name": "Technology", "percentage": 25 },
      { "name": "Real Estate", "percentage": 20 }
    ],
    "news": [
      {
        "id": "news_1",
        "title": "Mumbai's economy grows...",
        "summary": "Short summary...",
        "source": "Economic Times",
        "publishedAt": "2025-11-09T10:00:00Z",
        "url": "https://..."
      }
    ]
  },
  "timestamp": 1699523400000
}
```

### GET /districts/:id/chart

Get historical chart data for a district.

**Query Parameters:**
- `from` (required): Start timestamp in milliseconds
- `to` (required): End timestamp in milliseconds
- `resolution` (required): Time interval (1, 5, 15, 30, 60, 240, D, W, M)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": 1699523400000,
      "open": 1230.00,
      "high": 1250.00,
      "low": 1225.00,
      "close": 1245.50,
      "volume": 150000
    }
    // ... more data points
  ],
  "timestamp": 1699523400000
}
```

### POST /districts/:id/buy

Buy district tokens.

**Request Body:**
```json
{
  "quantity": 10,
  "orderType": "market",
  "price": null
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ord_123",
    "status": "completed",
    "executedAt": "2025-11-09T10:30:00Z",
    "executedPrice": 1245.50,
    "executedQuantity": 10,
    "message": "Order executed successfully"
  },
  "timestamp": 1699523400000
}
```

### GET /districts/trending

Get trending districts.

**Response:** Array of district objects

### GET /districts/top-gainers

Get top gainers.

**Response:** Array of district objects

### GET /districts/top-losers

Get top losers.

**Response:** Array of district objects

### GET /districts/search

Search districts.

**Query Parameters:**
- `q`: Search query

**Response:** Array of district objects

---

## States

### GET /states

Get list of all states.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "MH",
      "name": "Maharashtra",
      "code": "MH",
      "price": 2500.50,
      "change": 25.30,
      "changePercent": 1.8,
      "volume": 5000000,
      "marketCap": 500000000000,
      "nav": 2500.50,
      "aum": 500000000000,
      "expenseRatio": 0.5,
      "districts": 36
    }
    // ... more states
  ],
  "timestamp": 1699523400000
}
```

### GET /states/:id

Get state details.

**Response:** Detailed state ETF information

### GET /states/:id/etf

Get state ETF specific data.

**Response:** ETF holdings, allocations, performance

### GET /states/:id/chart

Get state ETF chart data.

**Query Parameters:** Same as district chart

**Response:** OHLCV data points

### GET /states/:id/districts

Get all districts in a state.

**Response:** Array of district objects

---

## Mutual Funds

### GET /mutual-funds

Get list of all mutual funds.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "mf_123",
      "name": "ZONIX Smart Growth Fund",
      "category": "Equity",
      "type": "Growth",
      "nav": 125.50,
      "change": 1.25,
      "changePercent": 1.0,
      "aum": 10000000000,
      "expenseRatio": 1.5,
      "minInvestment": 5000,
      "returns1Y": 15.5,
      "returns3Y": 12.8,
      "returns5Y": 14.2,
      "riskLevel": "moderate"
    }
    // ... more funds
  ],
  "timestamp": 1699523400000
}
```

### GET /mutual-funds/:id

Get mutual fund details.

**Response:** Detailed fund information including holdings, performance

### POST /mutual-funds/:id/invest

Invest in mutual fund.

**Request Body:**
```json
{
  "amount": 10000,
  "sipEnabled": false,
  "sipDate": null
}
```

**Response:** Order confirmation

---

## Portfolio

### GET /portfolio

Get portfolio overview.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalValue": 500000,
    "totalInvested": 450000,
    "totalReturns": 50000,
    "totalReturnsPercent": 11.11,
    "dayChange": 5000,
    "dayChangePercent": 1.0,
    "availableBalance": 100000
  },
  "timestamp": 1699523400000
}
```

### GET /portfolio/holdings

Get all holdings.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "holding_1",
      "assetId": "MH-MUM",
      "assetType": "district",
      "assetName": "Mumbai",
      "quantity": 10,
      "avgPrice": 1200.00,
      "currentPrice": 1245.50,
      "invested": 12000,
      "currentValue": 12455,
      "returns": 455,
      "returnsPercent": 3.79,
      "dayChange": 125,
      "dayChangePercent": 1.0
    }
    // ... more holdings
  ],
  "timestamp": 1699523400000
}
```

### GET /portfolio/transactions

Get transaction history.

**Query Parameters:** Pagination params

**Response:** Paginated transaction list

### GET /portfolio/performance

Get portfolio performance metrics.

**Response:** Historical performance data

---

## Watchlist

### GET /watchlist

Get user's watchlist.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "watch_1",
      "assetId": "MH-MUM",
      "assetType": "district",
      "assetName": "Mumbai",
      "price": 1245.50,
      "change": 12.30,
      "changePercent": 2.5,
      "addedAt": "2025-11-01T10:00:00Z"
    }
    // ... more items
  ],
  "timestamp": 1699523400000
}
```

### POST /watchlist

Add item to watchlist.

**Request Body:**
```json
{
  "assetId": "MH-MUM",
  "assetType": "district"
}
```

**Response:** Success message

### DELETE /watchlist/:id

Remove item from watchlist.

**Response:** Success message

---

## Market Data

### GET /market/live-prices

Get live prices for all assets.

**Response:** Array of price updates

### GET /market/insights

Get market insights and news.

**Response:** Array of insights

### GET /market/status

Get current market status.

**Response:**
```json
{
  "success": true,
  "data": {
    "isOpen": true,
    "nextEvent": "close",
    "nextEventTime": "2025-11-09T15:30:00+05:30",
    "currentTime": "2025-11-09T14:25:00+05:30"
  },
  "timestamp": 1699523400000
}
```

---

## WebSocket

### Connection

```
wss://ws.zonix.in
```

### Events

**Subscribe to price updates:**
```json
{
  "event": "subscribe",
  "channels": ["price_district_MH-MUM", "price_state_MH"]
}
```

**Price update event:**
```json
{
  "event": "price_update",
  "data": {
    "assetId": "MH-MUM",
    "assetType": "district",
    "price": 1245.50,
    "change": 12.30,
    "changePercent": 2.5,
    "volume": 1500000,
    "timestamp": 1699523400000
  },
  "timestamp": 1699523400000
}
```

**Market status update:**
```json
{
  "event": "market_status",
  "data": {
    "isOpen": true,
    "nextEvent": "close",
    "nextEventTime": "2025-11-09T15:30:00+05:30",
    "timestamp": 1699523400000
  },
  "timestamp": 1699523400000
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details
    }
  },
  "timestamp": 1699523400000
}
```

### Common Error Codes

- `INVALID_CREDENTIALS` - Invalid login credentials
- `TOKEN_EXPIRED` - Access token expired
- `INVALID_TOKEN` - Invalid or malformed token
- `INSUFFICIENT_BALANCE` - Not enough balance for transaction
- `MARKET_CLOSED` - Market is closed
- `VALIDATION_ERROR` - Input validation failed
- `RESOURCE_NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## Rate Limiting

- 100 requests per minute per user for authenticated endpoints
- 20 requests per minute per IP for unauthenticated endpoints

Rate limit info in response headers:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## Testing

Use the following test credentials:

**Test User:**
- Email: test@zonix.in
- Password: Test@123

**Test API Key:** `test_api_key_123456`

---

## Support

For API integration support:
- Email: api@zonix.in
- Slack: #api-support
- Documentation: https://docs.zonix.in
