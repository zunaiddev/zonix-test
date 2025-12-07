# ZONIX Backend Integration Guide

This guide will help you integrate ZONIX with your backend API quickly and efficiently.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration](#configuration)
3. [Switching from Mock to Real API](#switching-from-mock-to-real-api)
4. [Service Layer](#service-layer)
5. [Custom Hooks](#custom-hooks)
6. [Context Providers](#context-providers)
7. [WebSocket Integration](#websocket-integration)
8. [TradingView Integration](#tradingview-integration)
9. [Error Handling](#error-handling)
10. [Testing](#testing)

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API endpoints:

```env
# Your API Base URL
VITE_API_BASE_URL=https://your-api.com/v1

# Enable/Disable Mock Data
VITE_ENABLE_MOCK_DATA=false

# WebSocket URL
VITE_WS_URL=wss://your-websocket.com

# TradingView Configuration
VITE_TRADINGVIEW_LIBRARY_PATH=/charting_library/
VITE_TRADINGVIEW_DATAFEED_URL=https://your-api.com/v1/tradingview
```

### 3. Start Development Server

```bash
npm run dev
```

---

## Configuration

### API Configuration

The API client is automatically configured using environment variables. All configuration is centralized in:

- `/constants/api.constants.ts` - API endpoints and constants
- `/constants/app.constants.ts` - Application constants
- `/config/api.config.ts` - API client configuration
- `/services/api/client.ts` - Axios instance and interceptors

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Your API base URL | `https://api.zonix.in/v1` |
| `VITE_API_TIMEOUT` | Request timeout in ms | `30000` |
| `VITE_ENABLE_MOCK_DATA` | Use mock data | `true` |
| `VITE_WS_URL` | WebSocket URL | `wss://ws.zonix.in` |
| `VITE_AUTH_TOKEN_KEY` | LocalStorage key for token | `zonix_auth_token` |

---

## Switching from Mock to Real API

ZONIX is built with a dual-mode architecture that allows you to:

1. **Develop with mock data** (no backend needed)
2. **Switch to real API** with a single configuration change

### Step 1: Disable Mock Data

In `.env.local`:

```env
VITE_ENABLE_MOCK_DATA=false
```

### Step 2: Verify API Endpoints

Check `/constants/api.constants.ts` to ensure all endpoints match your backend:

```typescript
export const DISTRICT_ENDPOINTS = {
  LIST: '/districts',
  DETAIL: (id: string) => `/districts/${id}`,
  CHART: (id: string) => `/districts/${id}/chart`,
  // ...
};
```

### Step 3: Test the Integration

```bash
# Start the app
npm run dev

# Try logging in
# Email: test@zonix.in (for mock) or your real user
```

---

## Service Layer

### Architecture

```
Component
    ↓
Custom Hook (useDistricts, useAuth, etc.)
    ↓
Service Layer (district.service.ts)
    ↓
API Client (client.ts)
    ↓
Interceptors (interceptors.ts)
    ↓
Backend API
```

### Using Services

#### Example: Fetch Districts

```typescript
import * as districtService from './services/district.service';

// In your component or hook
const districts = await districtService.getDistricts();
const detail = await districtService.getDistrictDetail('MH-MUM');
```

### Service Files

All services are in `/services`:

- `auth.service.ts` - Authentication
- `district.service.ts` - District data
- `portfolio.service.ts` - Portfolio management
- `watchlist.service.ts` - Watchlist operations
- `transaction.service.ts` - Transaction history

### Enhanced Services

We've created enhanced versions with proper typing:

- `auth.service.enhanced.ts` - Uses new API client

**Migration Path:**
1. Test enhanced services in parallel
2. Gradually replace old services
3. Update imports in components

---

## Custom Hooks

### Available Hooks

Located in `/hooks`:

#### useAuth
```typescript
import { useAuth } from './hooks';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Login
  await login({ email: 'user@example.com', password: 'pass' });
  
  // Logout
  await logout();
}
```

#### useDistricts
```typescript
import { useDistricts, useDistrictDetail } from './hooks';

function DistrictList() {
  const { districts, isLoading, fetchDistricts } = useDistricts();
  
  useEffect(() => {
    fetchDistricts();
  }, []);
}

function DistrictPage({ id }) {
  const { district, isLoading } = useDistrictDetail(id);
}
```

#### usePortfolio
```typescript
import { usePortfolio } from './hooks';

function Portfolio() {
  const { overview, holdings, refresh } = usePortfolio();
  
  // Auto-fetches on mount
  // Call refresh() to update
}
```

#### useWatchlist
```typescript
import { useWatchlist } from './hooks';

function WatchlistButton({ assetId, assetType }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  
  const inWatchlist = isInWatchlist(assetId);
  
  return (
    <button onClick={() => toggleWatchlist(assetId, assetType)}>
      {inWatchlist ? 'Remove' : 'Add'}
    </button>
  );
}
```

---

## Context Providers

### AuthContext

Wrap your app with AuthProvider for global auth state:

```typescript
import { AuthProvider, useAuthContext } from './contexts/AuthContext';

// In your root App.tsx
function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

// In any component
function UserProfile() {
  const { user, logout } = useAuthContext();
  // ...
}
```

### ThemeContext

Manage global theme state:

```typescript
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';

// In your root App.tsx
function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// In any component
function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  
  return (
    <button onClick={() => setTheme('green')}>
      Switch to Green Theme
    </button>
  );
}
```

---

## WebSocket Integration

### Real-time Price Updates

The platform supports WebSocket for live data:

#### 1. Configure WebSocket URL

```env
VITE_WS_URL=wss://your-websocket-server.com
```

#### 2. WebSocket Events

Your backend should emit these events:

**Price Update:**
```json
{
  "event": "price_update",
  "data": {
    "assetId": "MH-MUM",
    "assetType": "district",
    "price": 1245.50,
    "change": 12.30,
    "changePercent": 2.5,
    "timestamp": 1699523400000
  }
}
```

**Market Status:**
```json
{
  "event": "market_status",
  "data": {
    "isOpen": true,
    "nextEvent": "close",
    "timestamp": 1699523400000
  }
}
```

#### 3. Subscribe to Updates

The app automatically subscribes when viewing:
- District detail pages
- Portfolio
- Watchlist
- TradingView charts

---

## TradingView Integration

### Setup

#### 1. Download TradingView Library

Download from: https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/

#### 2. Extract to Public Folder

```
public/
  └── charting_library/
      ├── charting_library.min.js
      ├── datafeed-api.d.ts
      └── ...
```

#### 3. Configure Datafeed URL

```env
VITE_TRADINGVIEW_DATAFEED_URL=https://your-api.com/v1/tradingview
```

#### 4. Implement TradingView API

Your backend must implement the UDF (Universal Data Feed) API:

**Required Endpoints:**

- `GET /tradingview/config` - Configuration
- `GET /tradingview/symbols?symbol=MH-MUM` - Symbol info
- `GET /tradingview/history?symbol=MH-MUM&from=...&to=...&resolution=D` - Historical data

**Example Response:**

```json
{
  "s": "ok",
  "t": [1699523400, 1699609800],
  "o": [1230.00, 1235.00],
  "h": [1250.00, 1255.00],
  "l": [1225.00, 1230.00],
  "c": [1245.50, 1248.00],
  "v": [150000, 160000]
}
```

### Using TradingView Component

```typescript
import TradingViewChart from './components/charts/TradingViewChart';

function ChartPage() {
  return (
    <TradingViewChart
      symbol="MH-MUM"
      assetType="district"
      theme="yellow"
      interval="D"
      height="600px"
    />
  );
}
```

---

## Error Handling

### API Error Format

All errors follow this structure:

```typescript
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human-readable message',
    details: { /* additional info */ }
  },
  timestamp: 1699523400000
}
```

### Interceptor Handling

The API client automatically handles:

- **401 Unauthorized** - Refreshes token and retries
- **429 Rate Limit** - Waits and retries
- **Network errors** - Retries once after 2 seconds
- **500+ Server errors** - Shows appropriate message

### Custom Error Handling

```typescript
import { ApiErrorHandler } from './services/api/client';

try {
  const data = await ApiClient.get('/endpoint');
} catch (error) {
  // Errors are already formatted
  console.error(error.message);
  // Show to user via toast, etc.
}
```

---

## Testing

### Mock Data Testing

Enable mock data:

```env
VITE_ENABLE_MOCK_DATA=true
```

Test credentials:
- Email: `test@zonix.in`
- Password: `Test@123`

### API Testing

1. **Postman Collection**: Import from `/postman/ZONIX.postman_collection.json` (create this)
2. **API Documentation**: See `/API_DOCUMENTATION.md`
3. **Integration Tests**: Add tests in `/tests` folder

### Testing Checklist

- [ ] Authentication (login, signup, logout)
- [ ] District listing and details
- [ ] State ETF data
- [ ] Mutual fund data
- [ ] Portfolio operations
- [ ] Watchlist management
- [ ] Transaction history
- [ ] WebSocket connection
- [ ] TradingView charts
- [ ] Error scenarios

---

## Common Integration Issues

### Issue: CORS Errors

**Solution:** Configure your backend to allow requests from your frontend domain:

```javascript
// Express example
app.use(cors({
  origin: 'https://your-frontend.com',
  credentials: true
}));
```

### Issue: Token Not Sent

**Solution:** Ensure cookies are enabled or check Authorization header:

```typescript
// Automatic in interceptors
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Issue: WebSocket Not Connecting

**Solution:** Check WebSocket URL and ensure your backend supports WS protocol:

```env
# Ensure correct protocol (ws:// or wss://)
VITE_WS_URL=wss://your-domain.com
```

---

## Production Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Create production environment file:

```env
VITE_API_BASE_URL=https://api.zonix.in/v1
VITE_ENABLE_MOCK_DATA=false
VITE_WS_URL=wss://ws.zonix.in
# ... other variables
```

### Performance Optimization

The app includes:
- Code splitting
- Lazy loading
- Hardware acceleration
- Virtual scrolling
- Debounced search
- Optimized re-renders

---

## Support & Resources

- **API Documentation**: `/API_DOCUMENTATION.md`
- **Guidelines**: `/guidelines/Guidelines.md`
- **Code Examples**: `/examples` (create folder with examples)

---

## Next Steps

1. **Configure environment variables**
2. **Test with mock data**
3. **Implement backend API**
4. **Switch to real API**
5. **Test all features**
6. **Deploy to production**

---

For support, contact: dev@zonix.in
