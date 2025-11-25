// ✅ GOOD: Payment processor that extends via interfaces (no modification needed)

// Define interface in Domain/Application layer
interface PaymentMethod {
  process(amount: number): Promise<void>;
}

// Concrete implementations (can be in Infrastructure or Domain)
class CreditCardPayment implements PaymentMethod {
  async process(amount: number): Promise<void> {
    console.log(`Processing credit card payment: $${amount}`);
    // ... credit card specific logic
  }
}

class PayPalPayment implements PaymentMethod {
  async process(amount: number): Promise<void> {
    console.log(`Processing PayPal payment: $${amount}`);
    // ... PayPal specific logic
  }
}

class BankTransferPayment implements PaymentMethod {
  async process(amount: number): Promise<void> {
    console.log(`Processing bank transfer: $${amount}`);
    // ... bank transfer specific logic
  }
}

// Payment processor depends on interface, not concrete implementations
class PaymentProcessor {
  constructor(private readonly paymentMethod: PaymentMethod) {}

  async processPayment(amount: number): Promise<void> {
    await this.paymentMethod.process(amount);
  }
}

// Adding a new payment method: just create a new implementation
// No modification to PaymentProcessor needed!
class CryptoPayment implements PaymentMethod {
  async process(amount: number): Promise<void> {
    console.log(`Processing crypto payment: $${amount}`);
    // ... crypto specific logic
  }
}

// Usage
const creditProcessor = new PaymentProcessor(new CreditCardPayment());
await creditProcessor.processPayment(100);

const paypalProcessor = new PaymentProcessor(new PayPalPayment());
await paypalProcessor.processPayment(50);

const cryptoProcessor = new PaymentProcessor(new CryptoPayment());
await cryptoProcessor.processPayment(200);

// ✅ Open for extension (new PaymentMethod implementations)
// ✅ Closed for modification (PaymentProcessor doesn't change)

