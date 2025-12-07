# ZONIX Developer Guide

Complete guide for developers working on the ZONIX trading platform.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Creating New Features](#creating-new-features)
5. [Working with the API](#working-with-the-api)
6. [Component Development](#component-development)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Best Practices](#best-practices)
10. [Common Patterns](#common-patterns)

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/zonix.git
cd zonix

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

---

## Project Structure

### Key Directories

```
/components      - React components
/hooks           - Custom React hooks
/services        - API services and business logic
/contexts        - React Context providers
/types           - TypeScript type definitions
/constants       - Application constants
/config          - Configuration files
/utils           - Utility functions
/styles          - Global styles
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `DistrictCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Services**: camelCase with '.service' suffix (e.g., `auth.service.ts`)
- **Types**: camelCase with '.types' suffix (e.g., `api.types.ts`)
- **Utils**: camelCase (e.g., `formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE or camelCase (e.g., `API_ENDPOINTS`)

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/new-feature-name
```

### 2. Develop with Mock Data

Set in `.env.local`:
```env
VITE_ENABLE_MOCK_DATA=true
```

This allows development without backend dependency.

### 3. Test Locally

```bash
npm run dev
```

### 4. Build & Test

```bash
npm run build
npm run preview
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature-name
```

---

## Creating New Features

### Step-by-Step Guide

#### 1. Define Types

Create types in `/types/api.types.ts`:

```typescript
export interface NewFeature {
  id: string;
  name: string;
  // ... other fields
}

export interface NewFeatureRequest {
  // ... request fields
}
```

#### 2. Add API Endpoints

In `/constants/api.constants.ts`:

```typescript
export const NEW_FEATURE_ENDPOINTS = {
  LIST: '/new-features',
  DETAIL: (id: string) => `/new-features/${id}`,
  CREATE: '/new-features',
} as const;
```

#### 3. Create Service

Create `/services/newFeature.service.ts`:

```typescript
import { ApiClient } from './api/client';
import { NEW_FEATURE_ENDPOINTS, ENABLE_MOCK_DATA } from '../constants/api.constants';
import { NewFeature, NewFeatureRequest } from '../types/api.types';

export const getNewFeatures = async (): Promise<NewFeature[]> => {
  if (ENABLE_MOCK_DATA) {
    return [/* mock data */];
  }
  
  return ApiClient.get(NEW_FEATURE_ENDPOINTS.LIST);
};

export const createNewFeature = async (data: NewFeatureRequest): Promise<NewFeature> => {
  if (ENABLE_MOCK_DATA) {
    return { id: 'mock', ...data };
  }
  
  return ApiClient.post(NEW_FEATURE_ENDPOINTS.CREATE, data);
};
```

#### 4. Create Custom Hook

Create `/hooks/useNewFeature.ts`:

```typescript
import { useState, useEffect, useCallback } from 'react';
import * as newFeatureService from '../services/newFeature.service';
import { NewFeature } from '../types/api.types';

export const useNewFeature = () => {
  const [features, setFeatures] = useState<NewFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatures = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await newFeatureService.getNewFeatures();
      setFeatures(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  return {
    features,
    isLoading,
    error,
    refetch: fetchFeatures,
  };
};
```

#### 5. Create Component

Create `/components/NewFeatureList.tsx`:

```typescript
import React from 'react';
import { useNewFeature } from '../hooks/useNewFeature';

export const NewFeatureList: React.FC = () => {
  const { features, isLoading, error } = useNewFeature();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {features.map((feature) => (
        <div key={feature.id}>{feature.name}</div>
      ))}
    </div>
  );
};
```

#### 6. Add Route (if needed)

In `App.tsx`:

```typescript
import { NewFeatureList } from './components/NewFeatureList';

// Add to routes
<Route path="/new-feature" element={<NewFeatureList />} />
```

---

## Working with the API

### Making API Calls

Always use the `ApiClient` from `/services/api/client.ts`:

```typescript
import { ApiClient } from './services/api/client';

// GET request
const data = await ApiClient.get('/endpoint');

// POST request
const result = await ApiClient.post('/endpoint', { data });

// PUT request
const updated = await ApiClient.put('/endpoint', { data });

// DELETE request
await ApiClient.delete('/endpoint');

// File upload
const uploaded = await ApiClient.uploadFile(
  '/upload',
  file,
  'fieldName',
  { additionalData },
  (progress) => console.log(progress)
);
```

### Error Handling

```typescript
try {
  const data = await ApiClient.get('/endpoint');
  // Success
} catch (error) {
  // Error is already formatted by interceptors
  console.error(error.message);
  toast.error(error.message);
}
```

### Mock Data

For development, add mock data in service:

```typescript
if (ENABLE_MOCK_DATA) {
  return [
    { id: '1', name: 'Mock Item 1' },
    { id: '2', name: 'Mock Item 2' },
  ];
}
```

---

## Component Development

### Component Template

```typescript
import React from 'react';

interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  prop1, 
  prop2 = 0 
}) => {
  // State
  const [state, setState] = React.useState();

  // Effects
  React.useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Component Best Practices

1. **Keep Components Small**: One responsibility per component
2. **Use TypeScript**: Always define prop types
3. **Extract Logic**: Move complex logic to hooks
4. **Memoize When Needed**: Use `React.memo` for expensive components
5. **Use Fragments**: Avoid unnecessary wrapper divs

### Example

```typescript
// ❌ Bad: Too much logic in component
const BadComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{/* render data */}</div>;
};

// ✅ Good: Logic in hook
const GoodComponent = () => {
  const { data, isLoading } = useData();
  
  if (isLoading) return <Spinner />;
  
  return <div>{/* render data */}</div>;
};
```

---

## State Management

### Local State

Use `useState` for component-specific state:

```typescript
const [count, setCount] = useState(0);
```

### Global State (Context)

Use Context for app-wide state:

```typescript
// Create context
const MyContext = createContext();

// Provider
<MyContext.Provider value={value}>
  <App />
</MyContext.Provider>

// Consume
const value = useContext(MyContext);
```

### Server State (Custom Hooks)

Use custom hooks for API data:

```typescript
const { data, isLoading, error, refetch } = useApiData();
```

### When to Use What

- **useState**: Component-specific UI state
- **Context**: Global app state (theme, auth)
- **Custom Hooks**: Server data, complex logic
- **URL State**: Navigation, filters (use router)

---

## Styling Guidelines

### Tailwind CSS

ZONIX uses Tailwind CSS v4. Follow these guidelines:

#### ✅ Do's

```tsx
// Use utility classes
<div className="bg-white rounded-lg p-4 shadow-md">

// Use responsive modifiers
<div className="w-full md:w-1/2 lg:w-1/3">

// Use hover/focus states
<button className="bg-blue-500 hover:bg-blue-600">

// Group related utilities
<div className="flex items-center justify-between gap-4">
```

#### ❌ Don'ts

```tsx
// Don't use font-size classes unless specifically needed
<h1 className="text-2xl">  // ❌ We have global typography

// Don't use arbitrary values without reason
<div className="w-[247px]">  // ❌ Use standard spacing

// Don't mix Tailwind and inline styles
<div className="p-4" style={{ padding: '16px' }}>  // ❌
```

### Theme Colors

Access theme colors via CSS variables:

```tsx
<div className="bg-primary text-primary-foreground">
```

Available theme variables (defined in `globals.css`):
- `--primary`
- `--secondary`
- `--accent`
- `--muted`
- `--background`
- `--foreground`

### Glassmorphism Effect

For the signature ZONIX look:

```tsx
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
```

---

## Best Practices

### 1. Type Safety

Always use TypeScript:

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

const getUser = (id: string): Promise<User> => {
  // ...
};

// ❌ Bad
const getUser = (id) => {
  // ...
};
```

### 2. Error Handling

Always handle errors:

```typescript
// ✅ Good
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}

// ❌ Bad
const data = await fetchData();  // Unhandled promise rejection
```

### 3. Performance

Use React performance tools:

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  // handler
}, [dependencies]);

// Memoize components
export default React.memo(ExpensiveComponent);
```

### 4. Accessibility

Always consider accessibility:

```tsx
// ✅ Good
<button aria-label="Close dialog" onClick={handleClose}>
  <X />
</button>

// Use semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Bad
<div onClick={handleClose}>  // Not keyboard accessible
```

### 5. Code Organization

Keep code organized:

```typescript
// ✅ Good file organization
/components
  /Dashboard
    Dashboard.tsx
    DashboardStats.tsx
    DashboardChart.tsx
    index.ts

// index.ts
export { Dashboard } from './Dashboard';
export { DashboardStats } from './DashboardStats';
```

---

## Common Patterns

### 1. Fetch Data on Mount

```typescript
const Component = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>{data}</div>;
};
```

### 2. Form Handling

```typescript
const FormComponent = () => {
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
    await submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 3. Conditional Rendering

```typescript
const Component = () => {
  const { data, isLoading, error } = useData();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;

  return <DataView data={data} />;
};
```

### 4. List Rendering

```typescript
const List = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

### 5. Debounced Search

```typescript
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useMemo(
    () => debounce((q) => search(q).then(setResults), 300),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
```

---

## Debugging

### React DevTools

Install React DevTools browser extension for debugging.

### Console Logging

Use structured logging:

```typescript
// Development only
if (import.meta.env.DEV) {
  console.log('[Component]', 'State updated:', state);
}
```

### Error Boundaries

Wrap components in error boundaries:

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

---

## Testing

### Unit Tests

Test utilities and hooks:

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';

test('useAuth returns user when authenticated', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.isAuthenticated).toBe(true);
});
```

### Integration Tests

Test component integration:

```typescript
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

test('renders dashboard with data', async () => {
  render(<Dashboard />);
  expect(await screen.findByText('Portfolio')).toBeInTheDocument();
});
```

---

## Deployment

### Build Process

```bash
# Build for production
npm run build

# Output in /dist folder
# Deploy /dist to your hosting service
```

### Environment Variables

Set production variables in hosting platform:

```
VITE_API_BASE_URL=https://api.zonix.in/v1
VITE_ENABLE_MOCK_DATA=false
```

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)

---

## Getting Help

- Check `/README.md` for overview
- Read `/ARCHITECTURE.md` for architecture details
- See `/INTEGRATION_GUIDE.md` for backend integration
- Review `/API_DOCUMENTATION.md` for API specs

For issues or questions:
- Email: dev@zonix.in
- Slack: #zonix-dev

Happy coding! 🚀
