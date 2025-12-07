# ZONIX Quick Reference

Quick reference guide for common tasks and patterns.

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [API Calls](#api-calls)
3. [Using Hooks](#using-hooks)
4. [Using Context](#using-context)
5. [Creating Components](#creating-components)
6. [Styling](#styling)
7. [Error Handling](#error-handling)
8. [Common Patterns](#common-patterns)

---

## Environment Setup

### Development (Mock Data)

```env
VITE_API_BASE_URL=https://api.zonix.in/v1
VITE_ENABLE_MOCK_DATA=true
```

### Production (Real API)

```env
VITE_API_BASE_URL=https://your-api.com/v1
VITE_ENABLE_MOCK_DATA=false
VITE_WS_URL=wss://your-websocket.com
```

---

## API Calls

### Import

```typescript
import { ApiClient } from './services/api/client';
```

### GET Request

```typescript
const data = await ApiClient.get('/districts');
const detail = await ApiClient.get(`/districts/${id}`);
```

### POST Request

```typescript
const result = await ApiClient.post('/districts/buy', {
  quantity: 10,
  orderType: 'market'
});
```

### PUT Request

```typescript
const updated = await ApiClient.put(`/user/profile`, {
  name: 'New Name'
});
```

### DELETE Request

```typescript
await ApiClient.delete(`/watchlist/${id}`);
```

### File Upload

```typescript
await ApiClient.uploadFile(
  '/user/avatar',
  file,
  'avatar',
  { userId: '123' },
  (progress) => console.log(`${progress}%`)
);
```

---

## Using Hooks

### Authentication

```typescript
import { useAuth } from './hooks';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    isLoading 
  } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({ 
        email: 'user@example.com', 
        password: 'password' 
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  
  if (isLoading) return <Spinner />;
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Districts

```typescript
import { useDistricts, useDistrictDetail } from './hooks';

// List of districts
function DistrictList() {
  const { districts, isLoading, error } = useDistricts();
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return (
    <div>
      {districts.map(d => (
        <DistrictCard key={d.id} district={d} />
      ))}
    </div>
  );
}

// Single district detail
function DistrictPage({ id }) {
  const { district, isLoading, error } = useDistrictDetail(id);
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return <DistrictDetail district={district} />;
}
```

### Portfolio

```typescript
import { usePortfolio, useTransactions } from './hooks';

function Portfolio() {
  const { 
    overview, 
    holdings, 
    isLoading, 
    refresh 
  } = usePortfolio();
  
  const { transactions } = useTransactions();
  
  return (
    <div>
      <PortfolioOverview data={overview} />
      <HoldingsList holdings={holdings} />
      <TransactionHistory transactions={transactions} />
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

### Watchlist

```typescript
import { useWatchlist } from './hooks';

function WatchlistButton({ assetId, assetType }) {
  const { 
    isInWatchlist, 
    toggleWatchlist 
  } = useWatchlist();
  
  const inWatchlist = isInWatchlist(assetId);
  
  return (
    <button 
      onClick={() => toggleWatchlist(assetId, assetType)}
      className={inWatchlist ? 'active' : ''}
    >
      {inWatchlist ? '★' : '☆'}
    </button>
  );
}
```

---

## Using Context

### Auth Context

```typescript
import { useAuthContext } from './contexts/AuthContext';

function UserMenu() {
  const { user, logout } = useAuthContext();
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Theme Context

```typescript
import { useThemeContext } from './contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  
  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="purple">Purple</option>
      <option value="navy">Navy</option>
    </select>
  );
}
```

---

## Creating Components

### Component Template

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onAction 
}) => {
  const [state, setState] = React.useState('');
  
  React.useEffect(() => {
    // Effect logic
  }, []);
  
  const handleClick = () => {
    if (onAction) onAction();
  };
  
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};
```

### With Hook

```typescript
import React from 'react';
import { useData } from './hooks/useData';

export const DataComponent: React.FC = () => {
  const { data, isLoading, error } = useData();
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

---

## Styling

### Glassmorphism Card

```tsx
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
  {/* Content */}
</div>
```

### Gradient Text

```tsx
<h1 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
  ZONIX
</h1>
```

### Hover Effects

```tsx
<button className="bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-200">
  Click Me
</button>
```

### Responsive Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Common Patterns

```tsx
// Flex center
<div className="flex items-center justify-center">

// Flex between
<div className="flex items-center justify-between">

// Full width with max width
<div className="w-full max-w-7xl mx-auto">

// Shadow + hover
<div className="shadow-lg hover:shadow-xl transition-shadow">
```

---

## Error Handling

### Try-Catch Pattern

```typescript
async function handleAction() {
  try {
    setLoading(true);
    setError(null);
    
    const result = await ApiClient.post('/endpoint', data);
    
    // Success
    toast.success('Action completed');
    
  } catch (error: any) {
    setError(error.message);
    toast.error(error.message);
    
  } finally {
    setLoading(false);
  }
}
```

### Error Display

```typescript
{error && (
  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
    <p className="text-red-500">{error}</p>
  </div>
)}
```

---

## Common Patterns

### Loading State

```typescript
{isLoading ? (
  <div className="flex items-center justify-center p-8">
    <Spinner />
  </div>
) : (
  <Content />
)}
```

### Empty State

```typescript
{data.length === 0 ? (
  <div className="text-center p-8">
    <p className="text-white/60">No data found</p>
  </div>
) : (
  <List data={data} />
)}
```

### Conditional Rendering

```typescript
{isLoggedIn && <Dashboard />}
{!isLoggedIn && <Login />}

{status === 'success' && <Success />}
{status === 'error' && <Error />}
{status === 'pending' && <Pending />}
```

### List Rendering

```typescript
<ul>
  {items.map((item) => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

### Form Handling

```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await ApiClient.post('/submit', formData);
};

return (
  <form onSubmit={handleSubmit}>
    <input 
      name="name" 
      value={formData.name}
      onChange={handleChange}
    />
    <input 
      name="email" 
      value={formData.email}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
);
```

### Debounced Search

```typescript
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const debouncedSearch = debounce(async (q) => {
      if (q) {
        const data = await ApiClient.get(`/search?q=${q}`);
        setResults(data);
      }
    }, 300);
    
    debouncedSearch(query);
    
    return () => debouncedSearch.cancel();
  }, [query]);
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Infinite Scroll

```typescript
import { useState, useEffect } from 'react';

function InfiniteList() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    loadMore();
  }, [page]);
  
  const loadMore = async () => {
    const data = await ApiClient.get(`/items?page=${page}`);
    setItems([...items, ...data.items]);
    setHasMore(data.hasMore);
  };
  
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore) {
      setPage(page + 1);
    }
  };
  
  return (
    <div onScroll={handleScroll}>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {hasMore && <Spinner />}
    </div>
  );
}
```

---

## File Structure

```
New Feature:
  /components/FeatureName.tsx       # Component
  /hooks/useFeature.ts               # Hook
  /services/feature.service.ts       # Service
  /types/feature.types.ts            # Types (optional)
```

---

## Import Aliases

```typescript
// Components
import { Button } from './components/ui/button';
import { DistrictCard } from './components/DistrictCard';

// Hooks
import { useAuth, useDistricts } from './hooks';

// Services
import * as authService from './services/auth.service';
import { ApiClient } from './services/api/client';

// Constants
import { API_ENDPOINTS } from './constants/api.constants';
import { THEMES } from './constants/app.constants';

// Types
import type { District, User } from './types/api.types';

// Utils
import { formatCurrency } from './utils/formatters';
```

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview build

# Code Quality
npm run lint                   # Run ESLint
npm run type-check             # TypeScript check

# Git
git checkout -b feature/name   # New branch
git add .                      # Stage changes
git commit -m "message"        # Commit
git push origin branch-name    # Push
```

---

## Environment Variables

```env
# API
VITE_API_BASE_URL              # API base URL
VITE_ENABLE_MOCK_DATA          # true/false
VITE_API_TIMEOUT               # Timeout in ms

# WebSocket
VITE_WS_URL                    # WebSocket URL

# TradingView
VITE_TRADINGVIEW_LIBRARY_PATH  # Library path
VITE_TRADINGVIEW_DATAFEED_URL  # Datafeed URL

# Auth
VITE_AUTH_TOKEN_KEY            # Token storage key
VITE_AUTH_REFRESH_TOKEN_KEY    # Refresh token key
```

---

## TypeScript Tips

```typescript
// Type component props
interface Props {
  title: string;
  count?: number;  // Optional
}

// Type hook return
interface UseDataReturn {
  data: Data[];
  isLoading: boolean;
  error: string | null;
}

// Type async function
async function fetchData(): Promise<Data[]> {
  return ApiClient.get('/data');
}

// Type event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // ...
};
```

---

## Quick Debugging

```typescript
// Development only
if (import.meta.env.DEV) {
  console.log('Debug:', data);
}

// Log API calls
console.log('[API]', method, url, data);

// Log state changes
console.log('[State Updated]', prevState, '->', newState);

// Performance
console.time('operation');
// ... operation
console.timeEnd('operation');
```

---

## Best Practices

### ✅ Do's

```typescript
// Use TypeScript
interface User {
  id: string;
  name: string;
}

// Use const for constants
const API_URL = 'https://api.zonix.in';

// Use arrow functions
const handleClick = () => { };

// Use optional chaining
const name = user?.profile?.name;

// Use async/await
const data = await fetchData();
```

### ❌ Don'ts

```typescript
// Don't use any
const data: any = ...;  // ❌

// Don't mutate state
state.push(item);  // ❌

// Don't use var
var count = 0;  // ❌

// Don't forget error handling
await fetchData();  // ❌ No try-catch
```

---

## Resources

- **Docs**: `/README.md`, `/API_DOCUMENTATION.md`
- **React**: https://react.dev
- **TypeScript**: https://typescriptlang.org
- **Tailwind**: https://tailwindcss.com

---

**Print this page for quick reference! 📋**
