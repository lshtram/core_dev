# ADR 0003: Payment Abstraction Layer

## Status

Accepted

## Context

Most boilerplates hardcode Stripe logic directly into controllers/components. This creates "Vendor Lock-in" and makes it difficult to switch to local providers or other gateways requested by B2B clients.

## Decision

We will implement a **Strict Abstraction Layer** for payments.

- All payment logic must reside behind a `PaymentProvider` interface.
- Application code calls `payment.createSubscription()`, NEVER `stripe.subscriptions.create()`.

## Consequences

**Positive**:

- **Flexibility**: Can swap Stripe for LemonSqueezy or a Mock Provider in 4 hours.
- **Testing**: Easier to unit test logic using a `MockPaymentProvider`.

**Negative**:

- **Initial Velocity**: Takes slightly longer to build the initial wrapper than just pasting Stripe snippets.
