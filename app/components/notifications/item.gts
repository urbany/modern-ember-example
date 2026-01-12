import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import tw from '../../helpers/tw';
import type { Notification } from '../../types/notification';
import Icon from '../icon';
import XIcon from '~icons/lucide/x';
import CheckCircleIcon from '~icons/lucide/check-circle';
import XCircleIcon from '~icons/lucide/x-circle';
import AlertTriangleIcon from '~icons/lucide/alert-triangle';
import InfoIcon from '~icons/lucide/info';

export interface NotificationItemSignature {
  Args: {
    notification: Notification;
    onDismiss: (id: string) => void;
  };
  Element: HTMLDivElement;
}

/**
 * Notification Item Component
 *
 * Displays a single notification with DaisyUI alert styling
 */
export default class NotificationItem extends Component<NotificationItemSignature> {
  /**
   * Get the alert class based on notification type
   */
  get alertClass(): string {
    const typeClasses: Record<Notification['type'], string> = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    };

    return tw('alert shadow-lg', typeClasses[this.args.notification.type]);
  }

  /**
   * Get the icon name based on notification type
   */
  get iconComponent() {
    const icons = {
      success: CheckCircleIcon,
      error: XCircleIcon,
      warning: AlertTriangleIcon,
      info: InfoIcon,
    };
    return icons[this.args.notification.type];
  }

  /**
   * Handle dismiss action
   */
  handleDismiss = (): void => {
    this.args.onDismiss(this.args.notification.id);
  };

  <template>
    <div
      class={{this.alertClass}}
      role="alert"
      data-notification-id={{@notification.id}}
      ...attributes
    >
      <Icon @icon={{this.iconComponent}} class="h-6 w-6 shrink-0" />

      <div class="flex-1">
        <div class="font-semibold">{{@notification.message}}</div>
        {{#if @notification.description}}
          <div class="text-sm opacity-90">{{@notification.description}}</div>
        {{/if}}
      </div>

      {{#if @notification.dismissible}}
        <button
          type="button"
          class="btn btn-sm btn-ghost btn-circle"
          {{on "click" this.handleDismiss}}
          aria-label="Fechar notificação"
        >
          <Icon @icon={{XIcon}} class="h-4 w-4" />
        </button>
      {{/if}}
    </div>
  </template>
}
