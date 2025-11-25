// ❌ BAD: Payment processor that requires modification for new payment types

class PaymentProcessor {
  processPayment(type: string, amount: number): void {
    if (type === 'credit') {
      // Credit card processing logic
      console.log(`Processing credit card payment: $${amount}`);
      // ... credit card specific logic
    } else if (type === 'paypal') {
      // PayPal processing logic
      console.log(`Processing PayPal payment: $${amount}`);
      // ... PayPal specific logic
    } else if (type === 'bank_transfer') {
      // Bank transfer processing logic
      console.log(`Processing bank transfer: $${amount}`);
      // ... bank transfer specific logic
    } else {
      throw new Error(`Unsupported payment type: ${type}`);
    }
  }
}

// Adding a new payment method (e.g., 'crypto') requires modifying this class
// This violates the Open/Closed Principle

// Usage
const processor = new PaymentProcessor();
processor.processPayment('credit', 100);
processor.processPayment('paypal', 50);

