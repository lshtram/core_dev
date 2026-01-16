/**
 * Mock Payment Provider
 * 
 * Development/testing implementation of PaymentProvider.
 */

import type { PaymentProvider, Subscription } from './types'

export class MockPaymentProvider implements PaymentProvider {
  private subscriptions: Map<string, Subscription> = new Map()

  async createSubscription(userId: string, planId: string): Promise<Subscription> {
    const subscription: Subscription = {
      id: `sub_${Date.now()}`,
      userId,
      planId,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }
    this.subscriptions.set(userId, subscription)
    return subscription
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    for (const [userId, sub] of this.subscriptions) {
      if (sub.id === subscriptionId) {
        sub.status = 'canceled'
        this.subscriptions.set(userId, sub)
        return
      }
    }
  }

  async getBillingPortalUrl(userId: string): Promise<string> {
    return `https://mock-billing.example.com/portal/${userId}`
  }

  async getSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptions.get(userId) || null
  }
}
