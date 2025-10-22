/**
 * Notification type determines the visual style and icon
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification position on screen
 */
export type NotificationPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

/**
 * Core notification interface
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** Notification type for styling */
  type: NotificationType;
  /** Main notification message */
  message: string;
  /** Optional detailed description */
  description?: string;
  /** Duration in milliseconds (0 = no auto-dismiss) */
  duration: number;
  /** Whether notification can be manually dismissed */
  dismissible: boolean;
  /** Timestamp when notification was created */
  createdAt: number;
}

/**
 * Options for creating a notification
 */
export interface NotificationOptions {
  /** Notification type (default: 'info') */
  type?: NotificationType;
  /** Optional detailed description */
  description?: string;
  /** Duration in ms (default: 5000, 0 = no auto-dismiss) */
  duration?: number;
  /** Whether notification can be dismissed (default: true) */
  dismissible?: boolean;
}

/**
 * Configuration for the notifications service
 */
export interface NotificationsConfig {
  /** Maximum number of notifications to show at once */
  maxNotifications: number;
  /** Default duration for auto-dismiss (ms) */
  defaultDuration: number;
  /** Position of notification container */
  position: NotificationPosition;
}
