import Component from '@glimmer/component';
import { service } from '@ember/service';
import tw from '../../helpers/tw';
import type Notifications from '../../services/notifications';
import NotificationItem from './item';

export interface NotificationsContainerSignature {
  Args: Record<string, never>;
  Element: null;
}

/**
 * Notifications Container Component
 *
 * Displays all active notifications using DaisyUI toast positioning.
 * Automatically tracks the notifications service and renders notifications
 * in the configured position. Since this container is rendered at the root
 * level, Portal is not needed - fixed positioning handles z-index properly.
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
    const positionClasses: Record<typeof position, string> = {
      'top-start': 'toast-top toast-start',
      'top-center': 'toast-top toast-center',
      'top-end': 'toast-top toast-end',
      'bottom-start': 'toast-bottom toast-start',
      'bottom-center': 'toast-bottom toast-center',
      'bottom-end': 'toast-bottom toast-end',
    };

    return tw('toast fixed z-40 p-4', positionClasses[position]);
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
