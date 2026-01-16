/**
 * Mock Notification Provider
 * 
 * Development/testing implementation of NotificationProvider.
 * Logs notifications to console instead of actually sending them.
 */

import type { NotificationProvider } from './types'

export class MockNotificationProvider implements NotificationProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    console.log(`[MockNotification] Email to ${to}: ${subject}`)
    console.log(`  Body: ${body.substring(0, 100)}...`)
  }

  async sendPush(userId: string, title: string, body: string): Promise<void> {
    console.log(`[MockNotification] Push to ${userId}: ${title}`)
    console.log(`  Body: ${body}`)
  }

  async sendBroadcast(groupId: string, message: string): Promise<void> {
    console.log(`[MockNotification] Broadcast to group ${groupId}:`)
    console.log(`  Message: ${message}`)
  }
}
