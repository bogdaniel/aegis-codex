/**
 * HttpHandlers - Inbound Adapter (Interface Layer)
 * Translates HTTP requests into Application use cases.
 * In a real system, this would use Express/Fastify request/response objects.
 * For this example, we use simplified DTOs.
 */

import { RegisterUser } from '@identity/app/UseCases/RegisterUser.js';
import { AuthenticateUser } from '@identity/app/UseCases/AuthenticateUser.js';
import { RegisterUserCommand } from '@identity/app/Commands/RegisterUserCommand.js';
import { AuthenticateUserCommand } from '@identity/app/Commands/AuthenticateUserCommand.js';

export interface HttpRequest {
  body: Record<string, unknown>;
  headers: Record<string, string>;
}

export interface HttpResponse {
  statusCode: number;
  body: unknown;
}

export class IdentityHttpHandlers {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly authenticateUser: AuthenticateUser
  ) {}

  async handleRegister(req: HttpRequest): Promise<HttpResponse> {
    try {
      const command: RegisterUserCommand = {
        email: String(req.body.email || ''),
        password: String(req.body.password || ''),
      };

      await this.registerUser.execute(command);

      return {
        statusCode: 201,
        body: { message: 'User registered successfully' },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: 400,
        body: { error: message },
      };
    }
  }

  async handleAuthenticate(req: HttpRequest): Promise<HttpResponse> {
    try {
      const command: AuthenticateUserCommand = {
        email: String(req.body.email || ''),
        password: String(req.body.password || ''),
      };

      const token = await this.authenticateUser.execute(command);

      return {
        statusCode: 200,
        body: {
          token: token.getToken(),
          expiresAt: token.getExpiresAt().toISOString(),
          userId: token.getUserId(),
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: 401,
        body: { error: message },
      };
    }
  }
}

