# Expected Output

## @architect Output

1. **Architecture Design:**
   - PaymentContext identified as bounded context
   - Trust tier assigned (Tier M - Medium/Business Core)
   - Clean Architecture layers: Domain, Application, Infrastructure, Interface
   - Ports defined: PaymentRepository, EventPublisher, IdentityPort (ACL)
   - Adapters in Infrastructure: JpaPaymentRepository, RabbitMqEventPublisher
   - Integration with IdentityContext via ACL (IdentityValidationPort)

2. **Context Block:**
   - Grounding Block: Goal (payment processing), constraints (must integrate with IdentityContext), assumptions, metrics, tier (M)
   - Plan: Architecture design complete; next: API design and security review
   - Artifacts: Architecture design document, bounded context definition, trust tier assignment
   - Next Steps: "After design, delegate to @api-designer for API design and @security-auditor for security review"

3. **Delegation Statement:**
   - Explicit: "After design, delegate to @api-designer for API design and @security-auditor for security review"
   - Context formatted as Context Block for easy handoff

## @api-designer Output (After Receiving Context)

1. **API Design:**
   - OpenAPI spec using architecture context
   - Endpoints: POST /payments, GET /payments/:id, GET /payments (paginated)
   - Schemas: PaymentRequest, PaymentResponse, PaymentListResponse
   - Validation: Request validation rules
   - Error model: Consistent error envelope with code/message/details/traceId
   - Auth: Bearer token required
   - Pagination: Cursor-based with limit

2. **Context Usage:**
   - Uses PaymentContext architecture from Context Block
   - Aligns API with bounded context boundaries
   - Respects trust tier (Tier M)

## @security-auditor Output (After Receiving Context)

1. **Security Review:**
   - OWASP Top 10 mapping
   - Architecture security review (Tier M context)
   - Security fixes if issues found
   - Risk rating

2. **Context Usage:**
   - Uses PaymentContext architecture from Context Block
   - Reviews security boundaries
   - Validates ACL usage for IdentityContext integration


