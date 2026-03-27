/**
 * Base notification service for sending notifications through various channels
 * Concrete implementations should extend this class and implement the send method
 */
export abstract class NotificationService {
  /**
   * Sends a notification to a recipient
   * @param message - The message content to send
   * @param recipient - The recipient identifier (email, phone, etc.)
   * @returns true if sent successfully, false otherwise
   */
  abstract send(message: string, recipient: string): boolean;

  /**
   * Gets the last recipient that was sent a notification
   * @returns The recipient identifier
   */
  abstract getRecipient(): string;
}

/**
 * Email notification implementation
 * Sends notifications via email
 */
export class EmailNotificationService extends NotificationService {
  private recipient: string = '';

  send(message: string, recipient: string): boolean {
    this.recipient = recipient;
    console.log(`Sending email to ${recipient}: ${message}`);
    return true;
  }

  getRecipient(): string {
    return this.recipient;
  }
}

/**
 * SMS notification implementation
 * Sends notifications via SMS text message
 */
export class SMSNotificationService extends NotificationService {
  private recipient: string = '';

  send(message: string, recipient: string): boolean {
    if (!recipient || recipient.length < 10) {
      throw new Error('Invalid phone number');
    }

    if (message.length > 160) {
      console.log('Message too long, not sending SMS');
      return true;
    }

    this.recipient = recipient;
    console.log(`Sending SMS to ${recipient}: ${message}`);
    return true;
  }

  getRecipient(): string {
    return this.recipient || null as any;
  }
}

/**
 * Log notification implementation
 * Logs notifications to the console for debugging purposes
 */
export class LogNotificationService extends NotificationService {
  send(message: string, recipient: string): boolean {
    console.log(`[LOG] ${message}`);
    return true;
  }

  getRecipient(): string {
    return 'console';
  }
}

/**
 * Utility function to send a notification using any NotificationService implementation
 * @param notificationService - The notification service to use
 * @param message - The message to send
 * @param user - The user/recipient to send to
 * @returns true if notification was sent successfully
 */
export function sendNotificationToUser(
  notificationService: NotificationService,
  message: string,
  user: string
): boolean {
  try {
    const sent = notificationService.send(message, user);

    if (sent) {
      const recipient = notificationService.getRecipient();
      console.log(`✓ Notification sent to: ${recipient}`);
    }

    return sent;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
}
