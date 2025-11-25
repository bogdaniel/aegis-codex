# Quick Start Guide

## Prerequisites

- Node.js 20+ installed
- npm or pnpm

## Setup & Run

```bash
# Navigate to test folder
cd test

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start
```

The server will start on `http://localhost:3000`

## Using the Frontend

1. **Open your browser** and navigate to `http://localhost:3000`

2. **Register a User:**
   - Enter an email (e.g., `user@example.com`)
   - Enter a password (e.g., `password123`)
   - Click "Register"
   - Note: The password is hashed (simplified for demo)

3. **Authenticate:**
   - Use the same email and password you registered
   - Click "Login"
   - You'll receive a token and user ID
   - The user ID will be auto-filled in order forms

4. **Place an Order:**
   - User ID should be pre-filled from login
   - Add order items:
     - Product ID (e.g., `prod_1`)
     - Quantity (e.g., `2`)
     - Unit Price (e.g., `10.00`)
   - Click "Add Item" to add more items
   - Click "Place Order"
   - Note the Order ID that's returned

5. **View Order:**
   - Order ID should be pre-filled from placing order
   - User ID should be pre-filled from login
   - Click "Get Order Summary"
   - See order details: status, total amount, item count

6. **Cancel Order:**
   - Order ID should be pre-filled
   - User ID should be pre-filled
   - Click "Cancel Order"
   - Try viewing the order again to see status change

7. **View Events:**
   - The "Published Events" section shows domain events (OrderPlaced)
   - Events are logged when orders are placed

## API Endpoints

The frontend uses these REST endpoints:

- `POST /api/identity/register` - Register a new user
- `POST /api/identity/authenticate` - Authenticate and get token
- `POST /api/orders` - Place a new order
- `GET /api/orders/:orderId?userId=...` - Get order summary
- `DELETE /api/orders/:orderId` - Cancel an order
- `GET /api/health` - Health check

## Architecture Notes

- **IdentityContext (Tier H)**: Handles user registration and authentication
- **OrdersContext (Tier M)**: Handles order management
- **Cross-context**: OrdersContext validates user identity via IdentityPort (ACL)
- **Domain Events**: OrderPlaced events are published when orders are created
- **Clean Architecture**: All layers properly separated (Domain → Application → Interface/Infrastructure)

## Troubleshooting

**Server won't start:**
- Make sure port 3000 is not in use
- Run `npm install` to ensure all dependencies are installed
- Run `npm run build` to compile TypeScript

**Frontend can't connect:**
- Make sure the server is running (`npm start`)
- Check browser console for CORS errors
- Verify API_BASE in `public/app.js` matches your server URL

**Tests:**
- Run `npm test` to execute unit tests
- Tests use in-memory adapters (no database required)

