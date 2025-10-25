import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import type { Modal } from '../types/modal';
import type ModalsService from '../services/modals';

export interface ModalItemSignature {
  Args: {
    modal: Modal;
  };
  Element: HTMLDivElement;
}

/**
 * Modal Item Component
 *
 * Renders a single modal with DaisyUI modal styling and controls.
 */
export default class ModalItem extends Component<ModalItemSignature> {
  @service declare modals: ModalsService;

  /**
   * Get the modal box class based on modal size
   */
  get modalBoxClass(): string {
    const baseClasses = 'modal-box';
    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    };

    return `${baseClasses} ${sizeClasses[this.args.modal.size]}`;
  }

  /**
   * Handle confirm action
   */
  handleConfirm = (): void => {
    this.modals.resolve(this.args.modal.id);
  };

  /**
   * Handle cancel action
   */
  handleCancel = (): void => {
    this.modals.dismiss(this.args.modal.id);
  };

  /**
   * Handle dismiss action (backdrop click)
   */
  handleDismiss = (): void => {
    if (this.args.modal.dismissible) {
      this.modals.dismiss(this.args.modal.id);
    }
  };

  <template>
    <div class="modal modal-open" data-test-modal-overlay>
      <div class={{this.modalBoxClass}} data-test-modal-box>
        {{#if @modal.title}}
          <h3 class="text-lg font-bold">{{@modal.title}}</h3>
        {{/if}}

        {{#if @modal.message}}
          <p class="py-4">{{@modal.message}}</p>
        {{/if}}

        {{#if @modal.component}}
          <div class="py-4">
            {{component @modal.component}}
          </div>
        {{/if}}

        <div class="modal-action">
          {{#if @modal.cancelText}}
            <button
              type="button"
              class="btn"
              {{on "click" this.handleCancel}}
              data-test-modal-cancel
            >
              {{@modal.cancelText}}
            </button>
          {{/if}}

          {{#if @modal.confirmText}}
            <button
              type="button"
              class="btn btn-primary"
              {{on "click" this.handleConfirm}}
              data-test-modal-confirm
            >
              {{@modal.confirmText}}
            </button>
          {{/if}}
        </div>
      </div>

      {{#if @modal.dismissible}}
        <label
          class="modal-backdrop"
          {{on "click" this.handleDismiss}}
          data-test-modal-backdrop
        ></label>
      {{/if}}
    </div>
  </template>
}
