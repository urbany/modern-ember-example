import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import type Owner from '@ember/owner';
import type {
  Notification,
  NotificationOptions,
  NotificationsConfig,
  NotificationPosition,
} from '../types/notification';

/**
 * Notifications Service
 *
 * Manages application-wide toast notifications.
 *
 * @example
 * ```typescript
 * // In a component or route
 * import { service } from '@ember/service';
 * import type NotificationsService from 'modern-ember-example/services/notifications';
 *
 * @service declare notifications: NotificationsService;
 *
 * // Show notifications
 * this.notifications.success('Operação realizada com sucesso!');
 * this.notifications.error('Erro ao processar requisição');
 * this.notifications.warning('Atenção: dados não salvos', {
 *   description: 'Salve suas alterações antes de sair',
 *   duration: 8000
 * });
 * this.notifications.info('Nova atualização disponível');
 *
 * // Custom notification
 * this.notifications.add('Mensagem customizada', {
 *   type: 'success',
 *   duration: 0, // Won't auto-dismiss
 *   dismissible: true
 * });
 * ```
 */
export default class NotificationsService extends Service {
  /** Active notifications */
  @tracked notifications = new TrackedArray<Notification>([]);

  /** Service configuration */
  @tracked config: NotificationsConfig = {
    maxNotifications: 5,
    defaultDuration: 5000,
    position: 'top-end',
  };

  /** Counter for generating unique IDs */
  private idCounter = 0;

  /** Map of auto-dismiss timers */
  private timers = new Map<string, number>();

  constructor(owner: Owner) {
    super(owner);
  }

  /**
   * Configure the notifications service
   */
  configure(config: Partial<NotificationsConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get the current position setting
   */
  get position(): NotificationPosition {
    return this.config.position;
  }

  /**
   * Add a generic notification
   */
  add(message: string, options: NotificationOptions = {}): Notification {
    const notification: Notification = {
      id: this.generateId(),
      type: options.type ?? 'info',
      message,
      description: options.description,
      duration: options.duration ?? this.config.defaultDuration,
      dismissible: options.dismissible ?? true,
      createdAt: Date.now(),
    };

    // Remove oldest if at max capacity
    if (this.notifications.length >= this.config.maxNotifications) {
      const oldest = this.notifications[0];
      if (oldest) {
        this.remove(oldest.id);
      }
    }

    this.notifications.push(notification);

    // Set auto-dismiss timer
    if (notification.duration > 0) {
      this.setAutoDismiss(notification.id, notification.duration);
    }

    return notification;
  }

  /**
   * Show a success notification
   */
  success(
    message: string,
    options: Omit<NotificationOptions, 'type'> = {}
  ): Notification {
    return this.add(message, { ...options, type: 'success' });
  }

  /**
   * Show an error notification
   */
  error(
    message: string,
    options: Omit<NotificationOptions, 'type'> = {}
  ): Notification {
    return this.add(message, { ...options, type: 'error' });
  }

  /**
   * Show a warning notification
   */
  warning(
    message: string,
    options: Omit<NotificationOptions, 'type'> = {}
  ): Notification {
    return this.add(message, { ...options, type: 'warning' });
  }

  /**
   * Show an info notification
   */
  info(
    message: string,
    options: Omit<NotificationOptions, 'type'> = {}
  ): Notification {
    return this.add(message, { ...options, type: 'info' });
  }

  /**
   * Remove a notification by ID
   */
  remove(id: string): void {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }

    // Clear any associated timer
    const timerId = this.timers.get(id);
    if (timerId !== undefined) {
      clearTimeout(timerId);
      this.timers.delete(id);
    }
  }

  /**
   * Clear all notifications
   */
  clear(): void {
    // Clear all timers
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();

    // Clear notifications array
    this.notifications.splice(0, this.notifications.length);
  }

  /**
   * Generate a unique notification ID
   */
  private generateId(): string {
    return `notification-${++this.idCounter}-${Date.now()}`;
  }

  /**
   * Set auto-dismiss timer for a notification
   */
  private setAutoDismiss(id: string, duration: number): void {
    const timerId = setTimeout(() => {
      this.remove(id);
    }, duration) as unknown as number;

    this.timers.set(id, timerId);
  }

  /**
   * Cleanup on service destruction
   */
  willDestroy(): void {
    super.willDestroy();
    this.clear();
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:notifications')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('notifications') declare altName: NotificationsService;`.
declare module '@ember/service' {
  interface Registry {
    notifications: NotificationsService;
  }
}
