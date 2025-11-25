/**
 * UserEmail - Value Object
 * Validates and encapsulates email addresses.
 */
export class UserEmail {
  private constructor(private readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error(`Invalid email format: ${value}`);
    }
  }

  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}

