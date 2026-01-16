/**
 * Payment Provider Interface
 * 
 * Abstraction layer for payment processing.
 * Implementations: StripeProvider (production), MockProvider (development/testing)
 */

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodEnd: Date
}

export interface PaymentProvider {
  /**
   * Create a new subscription for a user.
   */
  createSubscription(userId: string, planId: string): Promise<Subscription>

  /**
   * Cancel an active subscription.
   */
  cancelSubscription(subscriptionId: string): Promise<void>

  /**
   * Get a billing portal URL for the user to manage their subscription.
   */
  getBillingPortalUrl(userId: string): Promise<string>

  /**
   * Get the current subscription for a user.
   */
  getSubscription(userId: string): Promise<Subscription | null>
}
