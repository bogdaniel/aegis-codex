/**
 * AuthenticateUserCommand - Command DTO
 * Input for AuthenticateUser use case.
 */
export interface AuthenticateUserCommand {
  email: string;
  password: string;
}

