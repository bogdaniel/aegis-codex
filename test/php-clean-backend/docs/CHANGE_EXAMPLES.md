# Change Examples

This document demonstrates how to make changes to this backend following Aegis Codex rules and change discipline.

## Change Classification

Per `.cursor/rules/23-change-control.mdc`, changes are classified as:

- **S (Safe):** No contract/data shape change; local blast radius; trivial rollback
- **M (Moderate):** Touches data/IO/contracts; requires compatibility plan (dual-read/write)
- **H (High/Regulated):** Auth/crypto/PII/funds/model changes; needs threat model + staged rollout + approval
- **U (Unknown/Triage):** Insufficient context; ask targeted questions

## Example 1: Adding a New Use Case (Tier S)

**Change:** Add `ChangePassword` use case to IdentityContext.

**Classification:** S (Safe) - New feature, no breaking changes.

**Steps:**

1. **Domain Layer:** No changes needed (reuse existing `User`, `PasswordHasher` port)

2. **Application Layer:** Add use case
   ```php
   // src/IdentityContext/Application/UseCase/ChangePassword/ChangePasswordCommand.php
   final class ChangePasswordCommand
   {
       public function __construct(
           public readonly UserId $userId,
           public readonly string $currentPassword,
           public readonly string $newPassword
       ) {}
   }

   // src/IdentityContext/Application/UseCase/ChangePassword/ChangePasswordHandler.php
   final class ChangePasswordHandler
   {
       public function __construct(
           private readonly UserRepository $userRepository,
           private readonly PasswordHasher $passwordHasher
       ) {}

       public function handle(ChangePasswordCommand $command): void
       {
           $user = $this->userRepository->findById($command->userId);
           if ($user === null) {
               throw new DomainException("User not found");
           }

           if (!$this->passwordHasher->verify($command->currentPassword, $user->passwordHash())) {
               throw new DomainException("Invalid current password");
           }

           $newHash = $this->passwordHasher->hash($command->newPassword);
           // Update user with new password hash
           // (In real implementation, would need User::changePassword() method)
       }
   }
   ```

3. **Interface Layer:** Add CLI adapter
   ```php
   // src/IdentityContext/Interface/Cli/ChangePasswordCommandCli.php
   final class ChangePasswordCommandCli
   {
       public function __construct(
           private readonly ChangePasswordHandler $handler
       ) {}

       public function execute(string $userId, string $currentPassword, string $newPassword): void
       {
           $command = new ChangePasswordCommand(
               UserId::fromString($userId),
               $currentPassword,
               $newPassword
           );
           $this->handler->handle($command);
           echo "Password changed successfully\n";
       }
   }
   ```

4. **Tests:** Add test
   ```php
   // tests/IdentityContext/Application/UseCase/ChangePasswordHandlerTest.php
   final class ChangePasswordHandlerTest extends TestCase
   {
       public function testChangePasswordSuccessfully(): void
       {
           // Arrange: Register user
           // Act: Change password
           // Assert: New password works, old password doesn't
       }
   }
   ```

5. **Bootstrap:** Wire up dependencies
   ```php
   // src/bootstrap.php
   public function changePasswordCli(): ChangePasswordCommandCli
   {
       $handler = new ChangePasswordHandler(
           $this->userRepository,
           $this->passwordHasher
       );
       return new ChangePasswordCommandCli($handler);
   }
   ```

**Verification:**
- ✅ No breaking changes to existing contracts
- ✅ Tests pass
- ✅ Follows architecture (Domain → Application → Interface)
- ✅ Framework-free Domain/Application layers

## Example 2: Adding Order Cancellation (Tier S)

**Change:** Add `CancelOrder` use case to OrdersContext.

**Classification:** S (Safe) - New feature, uses existing domain methods.

**Steps:**

1. **Domain Layer:** Already has `Order::cancel()` method ✅

2. **Application Layer:** Add use case
   ```php
   // src/OrdersContext/Application/UseCase/CancelOrder/CancelOrderCommand.php
   final class CancelOrderCommand
   {
       public function __construct(
           public readonly OrderId $orderId
       ) {}
   }

   // src/OrdersContext/Application/UseCase/CancelOrder/CancelOrderHandler.php
   final class CancelOrderHandler
   {
       public function __construct(
           private readonly OrderRepository $orderRepository
       ) {}

       public function handle(CancelOrderCommand $command): void
       {
           $order = $this->orderRepository->findById($command->orderId);
           if ($order === null) {
               throw new DomainException("Order not found");
           }

           $order->cancel();
           $this->orderRepository->save($order);
       }
   }
   ```

3. **Tests:** Add test
   ```php
   // tests/OrdersContext/Application/UseCase/CancelOrderHandlerTest.php
   final class CancelOrderHandlerTest extends TestCase
   {
       public function testCancelPendingOrder(): void
       {
           // Arrange: Create order
           // Act: Cancel order
           // Assert: Order status is CANCELLED
       }

       public function testCancelCompletedOrderThrowsException(): void
       {
           // Arrange: Create and complete order
           // Act/Assert: Cancellation throws exception
       }
   }
   ```

**Verification:**
- ✅ Uses existing domain method (`Order::cancel()`)
- ✅ No breaking changes
- ✅ Tests cover happy path and edge cases

## Example 3: Changing Password Hashing Algorithm (Tier H)

**Change:** Migrate from bcrypt to Argon2id for password hashing.

**Classification:** H (High/Regulated) - Security-critical change.

**Steps:**

1. **Threat Model:** Document security implications
   - Why: Argon2id is more secure than bcrypt
   - Risk: Existing passwords need rehashing on next login
   - Mitigation: Dual-hash support during migration

2. **Infrastructure Layer:** Update adapter
   ```php
   // src/IdentityContext/Infrastructure/Security/Argon2PasswordHasher.php
   final class Argon2PasswordHasher implements PasswordHasher
   {
       public function hash(string $password): string
       {
           return password_hash($password, PASSWORD_ARGON2ID);
       }

       public function verify(string $password, string $hash): bool
       {
           // Support both bcrypt and Argon2id during migration
           if (password_verify($password, $hash)) {
               // If old hash, rehash with new algorithm
               if (password_needs_rehash($hash, PASSWORD_ARGON2ID)) {
                   // Trigger rehash (would need UserRepository update)
               }
               return true;
           }
           return false;
       }
   }
   ```

3. **Migration Strategy:**
   - Dual-hash support: Verify both bcrypt and Argon2id
   - Rehash on next login: Upgrade old hashes to Argon2id
   - Feature flag: `USE_ARGON2_PASSWORD_HASHER`
   - Staged rollout: Enable for new users first, then migrate existing

4. **Tests:** Add migration tests
   ```php
   final class Argon2PasswordHasherTest extends TestCase
   {
       public function testHashUsesArgon2id(): void
       {
           // Verify hash algorithm is Argon2id
       }

       public function testVerifySupportsBcryptLegacy(): void
       {
           // Verify old bcrypt hashes still work
       }

       public function testRehashOnLogin(): void
       {
           // Verify old hashes are upgraded to Argon2id
       }
   }
   ```

**Verification:**
- ✅ Threat model documented
- ✅ Migration strategy defined
- ✅ Feature flag for staged rollout
- ✅ Tests cover migration scenarios
- ✅ Rollback plan (revert to bcrypt if issues)

## Example 4: Breaking Change - Changing Order Status Enum (Tier M)

**Change:** Add `REFUNDED` status to `OrderStatus` enum.

**Classification:** M (Moderate) - Contract change, requires compatibility plan.

**Steps:**

1. **Domain Layer:** Add new enum value
   ```php
   // src/OrdersContext/Domain/ValueObject/OrderStatus.php
   enum OrderStatus: string
   {
       case PENDING = 'pending';
       case CONFIRMED = 'confirmed';
       case CANCELLED = 'cancelled';
       case COMPLETED = 'completed';
       case REFUNDED = 'refunded';  // NEW
   }
   ```

2. **Compatibility Plan:**
   - **Backward Compatible:** Adding enum value is non-breaking for serialization
   - **Forward Compatible:** Consumers must handle unknown status gracefully
   - **Migration:** No migration needed (enum addition is backward compatible)

3. **Tests:** Add tests for new status
   ```php
   public function testOrderCanBeRefunded(): void
   {
       // Test refund flow
   }
   ```

4. **Documentation:** Update `BOUNDED_CONTEXTS.md` with new status

**Verification:**
- ✅ Backward compatible (existing code still works)
- ✅ Tests cover new status
- ✅ Documentation updated

## Example 5: Refactoring - Extract Value Object (Tier S)

**Change:** Extract `OrderTotal` value object from `Order` entity.

**Classification:** S (Safe) - Internal refactoring, no behavior change.

**Steps:**

1. **Domain Layer:** Create value object
   ```php
   // src/OrdersContext/Domain/ValueObject/OrderTotal.php
   final class OrderTotal
   {
       private function __construct(
           private readonly Money $amount,
           private readonly Money $tax,
           private readonly Money $shipping
       ) {}

       public static function create(Money $amount, Money $tax, Money $shipping): self
       {
           return new self($amount, $tax, $shipping);
       }

       public function total(): Money
       {
           // Calculate total: amount + tax + shipping
       }
   }
   ```

2. **Update Order Entity:**
   ```php
   // src/OrdersContext/Domain/Entity/Order.php
   final class Order
   {
       private function __construct(
           private readonly OrderId $id,
           private readonly UserId $userId,
           private readonly OrderTotal $total,  // Changed from Money
           private OrderStatus $status
       ) {}
   }
   ```

3. **Update Use Cases:** Update `PlaceOrderHandler` to create `OrderTotal`

4. **Tests:** Update tests to use `OrderTotal`

**Verification:**
- ✅ Behavior unchanged (tests still pass)
- ✅ Better domain modeling (OrderTotal encapsulates calculation)
- ✅ No breaking changes to public API

## Change Discipline Checklist

Per `.cursor/rules/23-change-control.mdc`, `.cursor/rules/45-bugfix-protocol.mdc`, `.cursor/rules/46-regression-discipline.mdc`:

### Before Making Changes

- [ ] Classify change (S/M/H/U)
- [ ] Identify blast radius
- [ ] Check for breaking changes
- [ ] Plan rollback strategy

### During Implementation

- [ ] Follow architecture rules (Domain → Application → Infrastructure → Interface)
- [ ] Keep Domain/Application framework-free
- [ ] Write tests first (TDD) or alongside implementation
- [ ] Update documentation if contracts change

### After Implementation

- [ ] All tests pass
- [ ] No architecture violations
- [ ] Documentation updated (if needed)
- [ ] Code review (if applicable)

### For High-Risk Changes (Tier H)

- [ ] Threat model documented
- [ ] Migration strategy defined
- [ ] Feature flag for staged rollout
- [ ] Rollback plan tested
- [ ] Approval obtained (if required)

## Common Anti-Patterns to Avoid

### ❌ Business Logic in Interface Layer

```php
// ❌ BAD: Validation in CLI adapter
final class RegisterUserCommandCli
{
    public function execute(string $email, string $password): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email");
        }
        // ...
    }
}
```

**Fix:** Move validation to Domain (UserEmail value object) or Application use case.

### ❌ Framework Dependencies in Domain

```php
// ❌ BAD: Domain entity with framework dependency
use Illuminate\Database\Eloquent\Model;
class User extends Model {}
```

**Fix:** Use plain PHP class, define repository port in Domain.

### ❌ Direct Cross-Context Domain Imports

```php
// ❌ BAD: OrdersContext importing IdentityContext Domain directly
use AegisCodex\IdentityContext\Domain\Entity\User;
```

**Fix:** Use ACL pattern (define port in consuming context, adapter in Infrastructure).

### ❌ Missing Tests for Behavior Changes

```php
// ❌ BAD: Changed behavior without test
public function handle(PlaceOrderCommand $command): OrderId
{
    // Changed: Now requires user to have at least 1 existing order
    // But no test for this new requirement
}
```

**Fix:** Write test first (TDD) or alongside implementation.

## Summary

- **Safe changes (S):** Add features, refactor internals, fix bugs
- **Moderate changes (M):** Contract changes, data migrations, API updates
- **High-risk changes (H):** Security, crypto, PII, funds, model changes
- **Always:** Follow architecture rules, write tests, update docs

This backend serves as a reference for making changes that comply with Aegis Codex rules.

