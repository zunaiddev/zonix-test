# ZONIX Architecture Documentation

## Overview

ZONIX is built with a modern, scalable architecture that separates concerns and makes backend integration seamless.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Components │  │  Pages       │  │  UI Components    │  │
│  │  - District │  │  - Landing   │  │  - shadcn/ui      │  │
│  │  - Portfolio│  │  - Dashboard │  │  - Custom         │  │
│  │  - Charts   │  │  - Detail    │  │  - TradingView    │  │
│  └─────────────┘  └──────────────┘  └───────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                        │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │  Contexts    │  │  Custom Hooks │  │  Local State    │  │
│  │  - Auth      │  │  - useAuth    │  │  - useState     │  │
│  │  - Theme     │  │  - useDistrict│  │  - useReducer   │  │
│  │              │  │  - usePortfoli│  │                 │  │
│  └──────────────┘  └───────────────┘  └─────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Service Modules (Business Logic)            │   │
│  │  ┌───────────┐ ┌────────────┐ ┌──────────────────┐  │   │
│  │  │   Auth    │ │  Districts │ │    Portfolio     │  │   │
│  │  │  Service  │ │   Service  │ │     Service      │  │   │
│  │  └───────────┘ └────────────┘ └──────────────────┘  │   │
│  │                                                       │   │
│  │  ┌───────────┐ ┌────────────┐ ┌──────────────────┐  │   │
│  │  │ Watchlist │ │Transaction │ │   Mutual Funds   │  │   │
│  │  │  Service  │ │  Service   │ │     Service      │  │   │
│  │  └───────────┘ └────────────┘ └──────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                        API LAYER                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   API Client (Axios)                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ Interceptors │  │  Error       │  │   Token    │ │   │
│  │  │ - Request    │  │  Handling    │  │  Manager   │ │   │
│  │  │ - Response   │  │  - Format    │  │  - Store   │ │   │
│  │  │ - Retry      │  │  - Transform │  │  - Refresh │ │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │  REST API  │  │  WebSocket │  │  TradingView API     │  │
│  │  Backend   │  │  Real-time │  │  Chart Datafeed      │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
zonix/
│
├── components/                 # React Components
│   ├── charts/                # Chart components
│   │   ├── TradingViewChart.tsx
│   │   └── TradingViewDatafeed.ts
│   ├── ui/                    # ShadCN UI components
│   ├── figma/                 # Figma integration components
│   └── [feature-components]/  # Feature-specific components
│
├── config/                    # Configuration files
│   ├── api.config.ts         # API configuration
│   └── tradingview.config.ts # TradingView setup
│
├── constants/                 # Application constants
│   ├── api.constants.ts      # API endpoints & codes
│   └── app.constants.ts      # App-wide constants
│
├── contexts/                  # React Context providers
│   ├── AuthContext.tsx       # Authentication state
│   └── ThemeContext.tsx      # Theme state
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useDistricts.ts       # Districts data hook
│   ├── usePortfolio.ts       # Portfolio hook
│   ├── useWatchlist.ts       # Watchlist hook
│   └── index.ts              # Hook exports
│
├── services/                  # Service layer
│   ├── api/                  # API client
│   │   ├── client.ts         # Axios instance
│   │   └── interceptors.ts   # Request/response interceptors
│   ├── auth.service.ts       # Auth service
│   ├── district.service.ts   # District service
│   ├── portfolio.service.ts  # Portfolio service
│   ├── watchlist.service.ts  # Watchlist service
│   └── transaction.service.ts # Transaction service
│
├── types/                     # TypeScript types
│   ├── index.ts              # General types
│   ├── api.types.ts          # API request/response types
│   └── tradingview.types.ts  # TradingView types
│
├── utils/                     # Utility functions
│   ├── animationConfig.ts    # Animation utilities
│   ├── performanceUtils.ts   # Performance optimization
│   ├── themeColors.ts        # Theme configurations
│   ├── indiaData.ts          # India districts data
│   ├── mockData.ts           # Mock data for development
│   └── livePriceUpdates.ts   # Live price simulation
│
├── styles/                    # Global styles
│   └── globals.css           # Tailwind & custom styles
│
├── .env.example              # Environment variables template
├── README.md                 # Project overview
├── API_DOCUMENTATION.md      # Backend API specs
├── INTEGRATION_GUIDE.md      # Integration instructions
└── ARCHITECTURE.md           # This file
```

## Data Flow

### Authentication Flow

```
┌─────────┐
│  Login  │
│  Form   │
└────┬────┘
     │
     ↓
┌────────────┐     ┌──────────────┐     ┌─────────┐
│  useAuth   │────→│ Auth Service │────→│   API   │
│    Hook    │     │              │     │ Backend │
└────┬───────┘     └──────────────┘     └────┬────┘
     │                                        │
     │                    ┌───────────────────┘
     │                    │
     ↓                    ↓
┌────────────┐     ┌──────────────┐
│   Auth     │←────│  Token       │
│  Context   │     │  Manager     │
└────┬───────┘     └──────────────┘
     │
     ↓
┌────────────┐
│  All       │
│Components  │
└────────────┘
```

### District Data Flow

```
┌──────────────┐
│   District   │
│    Page      │
└──────┬───────┘
       │
       ↓
┌──────────────────┐     ┌─────────────────┐
│ useDistrictDetail│────→│ District Service│
│      Hook        │     │                 │
└──────┬───────────┘     └────────┬────────┘
       │                          │
       ↓                          ↓
┌──────────────────┐     ┌─────────────────┐
│   Component      │     │   API Client    │
│   Re-renders     │     │                 │
└──────────────────┘     └────────┬────────┘
                                  │
                                  ↓
                         ┌─────────────────┐
                         │   Backend API   │
                         └─────────────────┘
```

### Real-time Updates Flow

```
┌──────────────┐
│  WebSocket   │
│  Connection  │
└──────┬───────┘
       │
       ↓
┌──────────────────┐     ┌─────────────────┐
│  Price Update    │────→│   TradingView   │
│   Event          │     │    Datafeed     │
└──────┬───────────┘     └────────┬────────┘
       │                          │
       ↓                          ↓
┌──────────────────┐     ┌─────────────────┐
│  LivePriceUpdate │     │   Chart Update  │
│    Component     │     │                 │
└──────────────────┘     └─────────────────┘
```

## Key Design Patterns

### 1. Repository Pattern

Services act as repositories for data:

```typescript
// Service handles data fetching
export const getDistricts = async (): Promise<District[]> => {
  if (ENABLE_MOCK_DATA) {
    return mockData;
  }
  return ApiClient.get(ENDPOINTS.DISTRICTS);
};

// Hook consumes service
export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  
  useEffect(() => {
    getDistricts().then(setDistricts);
  }, []);
  
  return { districts };
};
```

### 2. Provider Pattern

Global state via Context:

```typescript
// Provider wraps app
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>

// Components consume context
const { user, logout } = useAuthContext();
```

### 3. Interceptor Pattern

Centralized request/response handling:

```typescript
// Add token to all requests
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
axios.interceptors.response.use(
  response => response,
  error => handleError(error)
);
```

### 4. Adapter Pattern

TradingView Datafeed adapts API to TradingView format:

```typescript
class TradingViewDatafeed implements IBasicDataFeed {
  async getBars(...) {
    const apiData = await ApiClient.get(...);
    return this.transformToBars(apiData);
  }
}
```

## Mock vs Real API

### Development Mode (Mock Data)

```
Component → Hook → Service → Mock Data (return immediately)
```

### Production Mode (Real API)

```
Component → Hook → Service → API Client → Backend
```

### Toggle

```env
# .env.local
VITE_ENABLE_MOCK_DATA=false  # Use real API
```

## Authentication & Authorization

### Token Flow

```
1. User logs in
   ↓
2. Backend returns tokens
   ↓
3. Store in localStorage
   ↓
4. Add to all requests (interceptor)
   ↓
5. Token expires
   ↓
6. Interceptor catches 401
   ↓
7. Call refresh endpoint
   ↓
8. Get new token
   ↓
9. Retry original request
```

### Protected Routes

```typescript
// Check auth before rendering
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

## Performance Optimizations

### 1. Code Splitting

```typescript
// Lazy load routes
const Dashboard = React.lazy(() => import('./components/Dashboard'));
```

### 2. Memoization

```typescript
// Memo expensive components
export default React.memo(ExpensiveComponent);

// Memoize values
const expensiveValue = useMemo(() => calculate(), [deps]);
```

### 3. Virtual Scrolling

```typescript
// For large lists
<VirtualList
  items={largeArray}
  renderItem={renderItem}
/>
```

### 4. Debouncing

```typescript
// Search input
const debouncedSearch = useDebouncedCallback(
  (query) => search(query),
  300
);
```

## Error Handling Strategy

### Levels

1. **Component Level**: Try-catch in async functions
2. **Hook Level**: Error state in custom hooks
3. **Service Level**: Transform API errors
4. **Interceptor Level**: Global error handling
5. **User Level**: Toast notifications

### Example

```typescript
// Component
try {
  await login(credentials);
} catch (error) {
  toast.error(error.message);
}

// Hook
const [error, setError] = useState(null);
try {
  // ...
} catch (err) {
  setError(err.message);
}

// Service
try {
  return await ApiClient.get(url);
} catch (error) {
  throw new FormattedError(error);
}

// Interceptor
axios.interceptors.response.use(
  response => response,
  error => formatAndRethrow(error)
);
```

## Testing Strategy

### Unit Tests

- Services (with mocked API client)
- Utility functions
- Hooks (with React Testing Library)

### Integration Tests

- API integration
- Authentication flow
- Data fetching

### E2E Tests

- User workflows
- Critical paths
- Error scenarios

## Deployment Architecture

```
┌────────────────────────────────────────────┐
│           CDN / Static Hosting              │
│      (Vercel, Netlify, Cloudflare)         │
│  ┌────────────────────────────────────┐    │
│  │   React App (Built Static Files)   │    │
│  └────────────┬───────────────────────┘    │
└───────────────┼────────────────────────────┘
                │
                ↓
┌────────────────────────────────────────────┐
│          API Gateway / Load Balancer        │
└───────────────┬────────────────────────────┘
                │
        ┌───────┴───────┐
        ↓               ↓
┌──────────────┐  ┌─────────────┐
│  REST API    │  │  WebSocket  │
│   Server     │  │   Server    │
└──────┬───────┘  └──────┬──────┘
       │                 │
       ↓                 ↓
┌──────────────────────────────┐
│        Database              │
│  (PostgreSQL, MongoDB, etc)  │
└──────────────────────────────┘
```

## Security Considerations

1. **HTTPS Only**: All API calls over HTTPS
2. **JWT Tokens**: Secure token storage
3. **CORS**: Proper CORS configuration
4. **XSS Protection**: Input sanitization
5. **CSRF**: Token-based protection
6. **Rate Limiting**: Prevent abuse
7. **Input Validation**: Client & server side

## Scalability

### Frontend

- Code splitting
- Lazy loading
- CDN delivery
- Caching strategies
- Image optimization

### Backend Integration

- Connection pooling
- Request batching
- Caching layer
- Load balancing
- Horizontal scaling

## Monitoring & Analytics

### Frontend Monitoring

- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Feature usage

### API Monitoring

- Response times
- Error rates
- Success rates
- Rate limit hits

---

## Next Steps

1. **Review Architecture**: Understand the layers
2. **Study Data Flow**: Follow data through the system
3. **Explore Services**: Check service implementations
4. **Test Integration**: Use mock mode first
5. **Connect Backend**: Switch to real API
6. **Deploy**: Follow deployment guide

---

For questions or clarifications, refer to:
- `/README.md` - Project overview
- `/API_DOCUMENTATION.md` - API specs
- `/INTEGRATION_GUIDE.md` - Integration steps
