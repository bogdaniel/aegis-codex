import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { z } from 'zod';
import { randomUUID } from 'crypto';

// NOTE: In a real project, these would come from proper modules:
// - db client with timeouts
// - structured logger
// - metrics/tracing wired to your stack
const db = {
  async getUser(id: string) {
    return { id, name: 'Example User' };
  },
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

// Simple correlation ID + logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = (req.headers['x-request-id'] as string) || randomUUID();
  res.setHeader('x-request-id', requestId);
  (req as any).id = requestId;
  console.info(JSON.stringify({ level: 'INFO', event: 'request_started', requestId, method: req.method, path: req.path }));
  next();
});

// Input validation
const userIdSchema = z.string().min(1).max(100);

app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const requestId = (req as any).id as string | undefined;

  try {
    const validatedId = userIdSchema.parse(req.params.id);

    const user = await db.getUser(validatedId);
    if (!user) {
      console.warn(JSON.stringify({ level: 'WARN', event: 'user_not_found', requestId, userId: validatedId }));
      return res.status(404).json({ error: 'user_not_found', requestId });
    }

    console.info(JSON.stringify({
      level: 'INFO',
      event: 'user_fetched',
      requestId,
      userId: validatedId,
      durationMs: Date.now() - start,
    }));

    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn(JSON.stringify({ level: 'WARN', event: 'validation_failed', requestId, details: error.errors }));
      return res.status(400).json({ error: 'invalid_input', requestId, details: error.errors });
    }

    console.error(JSON.stringify({
      level: 'ERROR',
      event: 'get_user_failed',
      requestId,
      message: error instanceof Error ? error.message : String(error),
    }));

    next(error);
  }
});

// Minimal error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const requestId = (req as any).id as string | undefined;
  console.error(JSON.stringify({
    level: 'ERROR',
    event: 'unhandled_error',
    requestId,
    message: err.message,
  }));

  res.status(500).json({ error: 'internal_server_error', requestId });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.info(JSON.stringify({ level: 'INFO', event: 'server_started', port: PORT }));
  });
}

export default app;

