# ZONIX - Trade the Heartbeat of Bharat

A premium trading platform for India that allows users to invest in district tokens, state indices, and AI-powered mutual funds.

## 🚀 Features

- **District Tokens**: Invest in individual districts across India
- **State ETFs**: Trade state-level indices with F&O capabilities
- **AI Mutual Funds**: Smart, AI-powered investment portfolios
- **Real-time Charts**: TradingView-powered advanced charting
- **Smart Receipts**: Track and analyze all transactions
- **Live Market Data**: Real-time price updates via WebSocket
- **Multi-theme Support**: 4 premium themes (Yellow, Green, Purple, Navy)
- **Glassmorphism UI**: Modern, futuristic design with smooth animations

## 📁 Project Structure

```
zonix/
├── components/          # React components
│   ├── charts/         # Chart components (TradingView)
│   ├── ui/             # Shadcn UI components
│   └── ...             # Feature components
├── config/             # Configuration files
├── constants/          # App-wide constants
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API services and business logic
│   └── api/           # API client configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and themes
```

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TradingView** - Advanced charting
- **Axios** - HTTP client
- **Recharts** - Dashboard charts
- **Framer Motion** - Animations
- **Shadcn/ui** - UI components

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zonix.git
   cd zonix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration

4. **Setup TradingView Charting Library**
   
   Download TradingView Charting Library from https://www.tradingview.com/
   
   Extract to `public/charting_library/`

5. **Run development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### API Integration

The platform is designed to work with any backend. Update `VITE_API_BASE_URL` in `.env.local`:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

### Mock Data vs Real API

Toggle between mock data and real API:

```env
VITE_ENABLE_MOCK_DATA=false  # Set to false to use real API
```

### WebSocket for Real-time Updates

Configure WebSocket endpoint:

```env
VITE_WS_URL=wss://your-websocket-domain.com
```

## 🔌 Backend Integration

### Required API Endpoints

The platform expects the following REST API endpoints:

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user

#### Districts
- `GET /districts` - List all districts
- `GET /districts/:id` - Get district details
- `GET /districts/:id/chart` - Get chart data
- `POST /districts/:id/buy` - Buy district token
- `POST /districts/:id/sell` - Sell district token

#### States
- `GET /states` - List all states
- `GET /states/:id` - Get state details
- `GET /states/:id/etf` - Get state ETF data

#### Mutual Funds
- `GET /mutual-funds` - List all funds
- `GET /mutual-funds/:id` - Get fund details
- `POST /mutual-funds/:id/invest` - Invest in fund

#### Portfolio
- `GET /portfolio` - Get user portfolio
- `GET /portfolio/holdings` - Get holdings
- `GET /portfolio/transactions` - Get transaction history

#### Watchlist
- `GET /watchlist` - Get user watchlist
- `POST /watchlist` - Add to watchlist
- `DELETE /watchlist/:id` - Remove from watchlist

#### Market Data
- `GET /market/live-prices` - Get live prices
- `GET /market/insights` - Get market insights

### WebSocket Events

The platform listens for these WebSocket events:

```typescript
// Price updates
{
  "event": "price_update",
  "data": {
    "districtId": "MH-MUM",
    "price": 1245.50,
    "change": 2.5,
    "timestamp": 1699523400000
  }
}

// Market status
{
  "event": "market_status",
  "data": {
    "isOpen": true,
    "nextEvent": "close",
    "timestamp": 1699523400000
  }
}
```

## 🎨 Theming

The platform supports 4 themes. Users can switch themes in Settings:

- Yellow (Default) - `#FCD34D`, `#FBBF24`
- Green - `#10B981`, `#059669`
- Purple - `#A78BFA`, `#8B5CF6`
- Navy - `#3B82F6`, `#2563EB`

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in `Authorization` header for all requests
5. Auto-refresh token before expiry

## 📊 TradingView Integration

Charts are powered by TradingView Charting Library:

1. Download library from TradingView
2. Place in `public/charting_library/`
3. Configure datafeed URL in `.env.local`
4. Backend must implement TradingView UDF API

## 🚦 Development Guidelines

### Adding New Features

1. Create types in `/types`
2. Create service in `/services`
3. Create custom hook in `/hooks`
4. Create component in `/components`
5. Update routes in `App.tsx`

### Code Style

- Use TypeScript strict mode
- Follow React best practices
- Use custom hooks for data fetching
- Keep components small and focused
- Use Tailwind for styling

### Performance

- Use `React.memo` for expensive components
- Implement virtual scrolling for large lists
- Lazy load routes with `React.lazy`
- Optimize images with proper formats
- Use hardware acceleration for animations

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📝 API Response Format

All API responses follow this format:

```typescript
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "timestamp": 1699523400000
}

// Error response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  },
  "timestamp": 1699523400000
}
```

## 🔒 Security

- All API calls use HTTPS
- JWT tokens for authentication
- CSRF protection
- XSS protection
- Input validation
- Rate limiting (backend)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Proprietary - All rights reserved

## 👥 Team

Built with ❤️ by the ZONIX team

## 🆘 Support

For support, email support@zonix.in or join our Slack channel.

---

**Note**: This is a production-ready frontend. Ensure your backend implements all required endpoints and follows the API contract specified above.
