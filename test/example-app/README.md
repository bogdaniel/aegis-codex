# Example Application - Clean Architecture + DDD

This is a **reference implementation** demonstrating Clean Architecture, Hexagonal Architecture, DDD, and Trust Tiers.

## Overview

This example application implements:
- **IdentityContext** (Tier H): User management and authentication
- **OrdersContext** (Tier M): Order management with cross-context identity validation

## Architecture

See `ARCHITECTURE.md` for detailed architecture documentation.

## Quick Start

```bash
# Install dependencies
npm install

# Run type check
npm run type-check

# Run linter
npm run lint

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Structure

```
example-app/
├── IdentityContext/          # Tier H - Safety Kernel
│   ├── Domain/               # Entities, Value Objects, Ports
│   ├── Application/          # Use Cases, Commands, Queries
│   ├── Infrastructure/       # Adapters (InMemory, HTTP clients)
│   └── Interface/           # HTTP handlers
├── OrdersContext/            # Tier M - Business Core
│   ├── Domain/              # Entities, Value Objects, Events, Ports
│   ├── Application/         # Use Cases, Commands, Queries
│   ├── Infrastructure/      # Adapters (InMemory, ACL adapters)
│   └── Interface/           # HTTP handlers
├── public/                  # Frontend (HTML/CSS/JS)
├── server.ts                # Express server
├── app-wiring.ts            # Dependency injection
└── example-wiring.ts        # Example usage
```

## Key Features

- ✅ **Path Aliases**: All imports use `@identity/*` and `@orders/*` aliases
- ✅ **Public API Modules**: Cross-context imports use public API modules
- ✅ **ACL Pattern**: OrdersContext uses `IdentityValidationPort` (ACL) to call `IdentityPort` (canonical)
- ✅ **Type-Only Imports**: Use Cases use `import type` for Commands/Queries
- ✅ **Domain/Application Purity**: No framework dependencies in Domain/Application
- ✅ **ESLint Rules**: Architecture rules enforced via ESLint

## Documentation

- `ARCHITECTURE.md` - Architecture overview and patterns
- `QUICKSTART.md` - Quick start guide
- `FRONTEND.md` - Frontend documentation
- `PATH_ALIASES.md` - Path alias explanation
- `COMPLIANCE_SUMMARY.md` - Rule compliance summary

## Testing

Run tests:
```bash
npm test
```

Tests cover:
- User registration (happy path, duplicate email)
- Order placement (happy path, event publishing, validation)

## Frontend

The frontend is a simple HTML/CSS/JS application that demonstrates:
- User registration
- User authentication
- Order placement
- Order cancellation
- Order summary retrieval

Access at `http://localhost:3000` when the server is running.

## Compliance

This example application is **fully compliant** with all Aegis Codex rules:
- Path aliases required
- Public API modules for cross-context imports
- ACL pattern for cross-context communication
- Type-only imports for Commands/Queries
- Domain/Application framework-free
- ESLint rules enforced

See `COMPLIANCE_SUMMARY.md` for detailed compliance report.
