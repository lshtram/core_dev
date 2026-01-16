/**
 * Notification Provider Interface
 * 
 * Abstraction layer for sending notifications (email, push, in-app).
 * Implementations: ResendProvider, MockProvider
 */

export interface NotificationProvider {
  /**
   * Send an email notification.
   */
  sendEmail(to: string, subject: string, body: string): Promise<void>

  /**
   * Send a push notification to a specific user.
   */
  sendPush(userId: string, title: string, body: string): Promise<void>

  /**
   * Send a broadcast notification to a group (e.g., all students).
   */
  sendBroadcast(groupId: string, message: string): Promise<void>
}
