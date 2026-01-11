import Component from '@glimmer/component';
import { service } from '@ember/service';
import type Notifications from '../services/notifications';
import NotificationItem from './notification-item';

export interface NotificationsContainerSignature {
  Args: Record<string, never>;
  Element: null;
}

/**
 * Notifications Container Component
 *
 * Displays all active notifications using DaisyUI toast positioning.
 * Automatically tracks the notifications service and renders notifications
 * in the configured position.
 *
 * @example
 * ```hbs
 * {{! Add to application.gts }}
 * <NotificationsContainer />
 * ```
 */
export default class NotificationsContainer extends Component<NotificationsContainerSignature> {
  @service declare notifications: Notifications;

  /**
   * Get the toast positioning class based on service configuration
   */
  get toastClass(): string {
    const position = this.notifications.position;
    const positionClasses = {
      'top-start': 'toast-top toast-start',
      'top-center': 'toast-top toast-center',
      'top-end': 'toast-top toast-end',
      'bottom-start': 'toast-bottom toast-start',
      'bottom-center': 'toast-bottom toast-center',
      'bottom-end': 'toast-bottom toast-end',
    };

    return `toast fixed ${positionClasses[position]} z-40 p-4`;
  }

  /**
   * Handle notification dismissal
   */
  handleDismiss = (id: string): void => {
    this.notifications.remove(id);
  };

  <template>
    {{#if this.notifications.notifications.length}}
      <div class={{this.toastClass}} data-test-notifications-container>
        {{#each this.notifications.notifications as |notification|}}
          <NotificationItem
            @notification={{notification}}
            @onDismiss={{this.handleDismiss}}
            class="mb-2 w-full max-w-md"
          />
        {{/each}}
      </div>
    {{/if}}
  </template>
}
