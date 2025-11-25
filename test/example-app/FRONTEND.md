# Frontend Implementation

## Overview

A complete frontend has been added to interact with the Clean Architecture backend. The frontend is a single-page application (SPA) that demonstrates all use cases.

## Files Added

### Server & Wiring
- `server.ts` - Express HTTP server that wires routes to HTTP handlers
- `app-wiring.ts` - Dependency injection container (creates and wires all layers)

### Frontend Files
- `public/index.html` - Main HTML page with forms for all operations
- `public/styles.css` - Modern, responsive CSS styling
- `public/app.js` - Frontend JavaScript that communicates with REST API

## Architecture Compliance

### ✅ Interface Layer (Express Server)

The Express server (`server.ts`) is in the **Interface layer** and:
- ✅ Wires HTTP routes to Application use cases via HTTP handlers
- ✅ Does NOT contain business logic
- ✅ Serves static files (frontend)
- ✅ Handles CORS for development

**Location:** `test/server.ts` (Interface layer - entry point)

### ✅ HTTP Handlers (Already Existed)

The HTTP handlers were already implemented in:
- `IdentityContext/Interface/Adapters/HttpHandlers.ts`
- `OrdersContext/Interface/Adapters/HttpHandlers.ts`

These handlers:
- ✅ Translate HTTP requests → Commands/Queries
- ✅ Call Application use cases
- ✅ Map results → HTTP responses
- ✅ No business logic (pure translation)

### ✅ Dependency Injection

`app-wiring.ts` creates and wires all layers:
- Creates repositories (Infrastructure)
- Creates use cases (Application)
- Creates HTTP handlers (Interface)
- Wires cross-context dependencies (IdentityPort)

## Frontend Features

### Identity Management
- **Register User**: Create new user accounts
- **Authenticate**: Login and receive authentication token
- **User Info Display**: Shows logged-in user ID

### Order Management
- **Place Order**: Create orders with multiple items
  - Dynamic item addition
  - Product ID, quantity, unit price per item
  - Auto-fills user ID from login
- **View Order**: Get order summary
  - Shows order ID, status, total amount, item count
  - Requires user ID for authorization
- **Cancel Order**: Cancel existing orders
  - Enforces authorization (user can only cancel own orders)

### Domain Events
- **Event Log**: Shows published domain events (OrderPlaced)
- Real-time event display when orders are placed
- Clear log functionality

## API Endpoints Used

The frontend communicates with these REST endpoints:

```
POST   /api/identity/register
POST   /api/identity/authenticate
POST   /api/orders
GET    /api/orders/:orderId?userId=...
DELETE /api/orders/:orderId
GET    /api/health
```

## User Flow Example

1. **Register**: `user@example.com` / `password123`
2. **Login**: Same credentials → Get user ID and token
3. **Place Order**:
   - User ID auto-filled
   - Add items: `prod_1` (qty: 2, price: $10.00)
   - Place order → Get order ID
4. **View Order**: Order ID auto-filled → See summary
5. **Cancel Order**: Order ID auto-filled → Cancel
6. **View Events**: See OrderPlaced event in log

## Styling & UX

- **Modern Design**: Clean, card-based layout
- **Responsive**: Works on mobile and desktop
- **Accessible**: Semantic HTML, proper labels, keyboard navigation
- **Feedback**: Clear success/error messages
- **Auto-fill**: User ID and Order ID auto-populate after actions

## Running

```bash
# Install dependencies
npm install

# Build
npm run build

# Start server
npm start

# Open http://localhost:3000 in browser
```

## Architecture Notes

- **No Framework in Domain/Application**: Express is only in Interface layer (server.ts)
- **Clean Separation**: Frontend is pure HTML/CSS/JS, backend is TypeScript
- **CORS Enabled**: For development (allows frontend to call API)
- **Static File Serving**: Express serves `public/` folder
- **Type Safety**: Backend is fully typed TypeScript, frontend is vanilla JS

## Next Steps (Optional Enhancements)

- Add JWT token validation in HTTP handlers
- Add authentication middleware for protected routes
- Add real-time updates via WebSockets for events
- Add form validation on frontend
- Add loading states and better error handling
- Add order history/list view
- Add user profile management

