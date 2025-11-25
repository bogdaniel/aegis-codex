/**
 * HTTP Server - Interface Layer
 * Wires Express routes to Application use cases via HTTP handlers.
 * This is the entry point that brings together all layers.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import wiring (would normally use DI container)
import { createApp } from './app-wiring.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get project root (go up from dist/ if running compiled, or stay in root if running from source)
const isCompiled = __dirname.includes('dist');
const projectRoot = isCompiled ? join(__dirname, '..') : __dirname;
const publicPath = join(projectRoot, 'public');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Wire up handlers
const { identityHandlers, ordersHandlers } = createApp();

// Identity routes
app.post('/api/identity/register', async (req, res) => {
  const httpReq = {
    body: req.body,
    headers: req.headers as Record<string, string>,
  };
  const httpRes = await identityHandlers.handleRegister(httpReq);
  res.status(httpRes.statusCode).json(httpRes.body);
});

app.post('/api/identity/authenticate', async (req, res) => {
  const httpReq = {
    body: req.body,
    headers: req.headers as Record<string, string>,
  };
  const httpRes = await identityHandlers.handleAuthenticate(httpReq);
  res.status(httpRes.statusCode).json(httpRes.body);
});

// Orders routes
app.post('/api/orders', async (req, res) => {
  const httpReq = {
    body: req.body,
    headers: req.headers as Record<string, string>,
    params: {},
  };
  const httpRes = await ordersHandlers.handlePlaceOrder(httpReq);
  res.status(httpRes.statusCode).json(httpRes.body);
});

app.get('/api/orders/:orderId', async (req, res) => {
  const httpReq = {
    body: {},
    headers: req.headers as Record<string, string>,
    params: req.params,
    query: req.query as Record<string, unknown>,
  };
  const httpRes = await ordersHandlers.handleGetOrderSummary(httpReq);
  res.status(httpRes.statusCode).json(httpRes.body);
});

app.delete('/api/orders/:orderId', async (req, res) => {
  const httpReq = {
    body: req.body,
    headers: req.headers as Record<string, string>,
    params: req.params,
  };
  const httpRes = await ordersHandlers.handleCancelOrder(httpReq);
  res.status(httpRes.statusCode).json(httpRes.body);
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files and SPA
app.use(express.static(publicPath));

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (_req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📱 Frontend available at http://localhost:${PORT}`);
});

