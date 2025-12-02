# Threat Model: IdentityContext

## Context
- **Bounded Context:** IdentityContext
- **Trust Tier:** H (High - Safety Kernel)
- **Purpose:** User authentication, identity management, credential handling

## Assets
- User identities (email addresses)
- Password hashes (bcrypt)
- Authentication tokens (future)
- User registration data

## Entry Points
- HTTP API: `/register` endpoint (RegisterUserController)
- Application use case: RegisterUser
- Domain events: UserRegistered

## Trust Boundaries
- Network boundary: HTTP requests from external clients
- Authentication boundary: User registration flow
- Data boundary: Password hashing (plaintext → hash)

## Threats (STRIDE)

### Spoofing
- **Threat:** Fake user registration with stolen email
- **Risk:** High
- **Mitigation:** Email verification (future), rate limiting, CAPTCHA
- **Owner:** Security team

### Tampering
- **Threat:** Password hash manipulation, email injection
- **Risk:** High
- **Mitigation:** 
  - Password hashing with bcrypt (cost 12)
  - Input validation (email format, password strength)
  - Parameterized queries (when using DB)
- **Owner:** Development team

### Repudiation
- **Threat:** User denies registration
- **Risk:** Medium
- **Mitigation:** Audit logs with correlation IDs, timestamped events
- **Owner:** Operations team

### Information Disclosure
- **Threat:** Password hash exposure, email enumeration
- **Risk:** High
- **Mitigation:**
  - Passwords never logged or exposed
  - Secure password hashing (bcrypt)
  - Generic error messages (don't reveal if email exists)
- **Owner:** Security team

### Denial of Service
- **Threat:** Registration spam, resource exhaustion
- **Risk:** Medium
- **Mitigation:** Rate limiting, input size limits, connection pooling
- **Owner:** Operations team

### Elevation of Privilege
- **Threat:** Unauthorized access to user accounts
- **Risk:** High
- **Mitigation:**
  - Strong password requirements
  - Secure password hashing
  - Authorization checks (future)
- **Owner:** Security team

## OWASP Top 10 Mapping
- **A02:2021 – Cryptographic Failures:** Mitigated via bcrypt password hashing
- **A03:2021 – Injection:** Mitigated via input validation, parameterized queries
- **A07:2021 – Identification and Authentication Failures:** Mitigated via strong password hashing

## Security Controls
- Password hashing: bcrypt (cost 12)
- Input validation: Email format, password strength
- Error handling: Generic error messages (no information leakage)
- Logging: Structured logs with correlation IDs (no secrets)

## Monitoring & Alerting
- Failed registration attempts
- Unusual registration patterns
- Password hash failures

