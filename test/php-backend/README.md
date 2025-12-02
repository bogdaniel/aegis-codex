# PHP Backend - User Registration & Order Placement

Minimal PHP 8.2+ backend implementing Clean Architecture + Hexagonal + DDD patterns.

## Features

- User registration (email/password)
- Order placement (userId, amount)
- Product listing and detail pages
- Clean Architecture with bounded contexts (IdentityContext, OrdersContext, ProductsContext)
- Framework-free Domain/Application layers
- SQLite database (easily swappable to MySQL/PostgreSQL)

## Requirements

- Docker and Docker Compose

## Quick Start

### 1. Setup Database and Install Dependencies

```bash
cd test/php-backend
docker compose --profile setup run --rm setup
```

This installs Composer dependencies and creates `data/database.sqlite` with the schema.

### 2. Start Server

```bash
docker compose up
```

The API will be available at `http://localhost:8000`

### 3. Run Tests

```bash
docker compose --profile test run --rm test
```

## Docker Commands

**Start server:**
```bash
docker compose up
```

**Start server in background:**
```bash
docker compose up -d
```

**Stop server:**
```bash
docker compose down
```

**Run tests:**
```bash
docker compose --profile test run --rm test
```

**Setup database (if needed again):**
```bash
docker compose --profile setup run --rm setup
```

**Add products table (if database already exists):**
```bash
docker compose exec app php scripts/add-products-table.php
```

**Seed sample products:**
```bash
docker compose exec app php scripts/seed-products.php
```

**Access container shell:**
```bash
docker compose exec app sh
```

## API Endpoints

### Register User

```bash
POST http://localhost:8000/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "uuid": "user-uuid-here",
  "message": "User registered successfully"
}
```

### Place Order

```bash
POST http://localhost:8000/orders
Content-Type: application/json

{
  "userId": "user-uuid-here",
  "amount": 99.99
}
```

**Response:**
```json
{
  "uuid": "order-uuid-here",
  "message": "Order placed successfully"
}
```

### List Products

```bash
GET http://localhost:8000/products
```

**Response:**
```json
{
  "products": [
    {
      "uuid": "product-uuid-here",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "createdAt": "2024-01-01 12:00:00"
    }
  ]
}
```

### Get Product Detail

```bash
GET http://localhost:8000/products/{uuid}
```

**Response:**
```json
{
  "product": {
    "uuid": "product-uuid-here",
    "name": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "createdAt": "2024-01-01 12:00:00"
  }
}
```

## UI Pages

- **Home page** (`http://localhost:8000/`): User registration, order placement, and lists of users, orders, and products
- **Product detail page** (`http://localhost:8000/product-detail.html?uuid={product-uuid}`): Detailed view of a single product

## Architecture

- **IdentityContext**: User registration and management
- **OrdersContext**: Order placement and management
- **ProductsContext**: Product catalog (list and detail)
- **Layers**: Domain (entities, value objects), Application (use cases), Infrastructure (persistence), Interface (HTTP controllers)
- **Cross-context**: OrdersContext validates users via UserValidator port

## Security

- Password hashing: bcrypt via `password_hash()`
- SQL injection prevention: PDO prepared statements
- Input validation: Domain value objects (Email, HashedPassword)
- Error handling: No stack traces exposed to clients

## Testing

Tests cover:
- Domain value objects (Email, HashedPassword)
- Domain entities (User, Order, Product)
- Application use cases (RegisterUser, PlaceOrder, ListProducts, GetProductDetail)
- Happy paths and failure scenarios

## Seeding Sample Data

To populate the database with sample products for testing:

```bash
docker compose exec app php scripts/seed-products.php
```

This will insert 5 sample products into the database.
