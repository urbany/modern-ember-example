import Component from '@glimmer/component';
import { service } from '@ember/service';
import { fn } from '@ember/helper';
import { Modal, PortalTargets } from 'ember-primitives';
import tw from '../../helpers/tw';
import type { Modal as ModalType } from '../../types/modal';
import type Modals from '../../services/modals';

export interface ModalItemSignature {
  Args: {
    modal: ModalType;
  };
  Element: null;
}

/**
 * Modal Item Component
 *
 * Renders a single modal using ember-primitives Modal with native <dialog> element.
 */
export default class ModalItem extends Component<ModalItemSignature> {
  @service declare modals: Modals;

  /**
   * Get the modal dialog class based on modal size
   */
  get modalDialogClass(): string {
    const sizeClasses: Record<ModalType['size'], string> = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    };

    return tw(
      'modal-box bg-base-100 w-full rounded-lg p-6 shadow-xl',
      sizeClasses[this.args.modal.size]
    );
  }

  /**
   * Check if modal has any action buttons
   */
  get hasActions(): boolean {
    return !!(this.args.modal.confirmText || this.args.modal.cancelText);
  }

  /**
   * Handle modal close with return value
   */
  handleClose = (returnValue?: string): void => {
    if (returnValue === 'confirm') {
      this.modals.resolve(this.args.modal.id);
    } else {
      // Handle cancel, reset, or ESC key
      if (this.args.modal.dismissible || returnValue === 'cancel') {
        this.modals.dismiss(this.args.modal.id);
      } else if (returnValue === undefined && !this.args.modal.dismissible) {
        // ESC was pressed but modal is not dismissible, do nothing
        return;
      } else {
        this.modals.dismiss(this.args.modal.id);
      }
    }
  };

  <template>
    <Modal @open={{true}} @onClose={{this.handleClose}} as |m|>
      <m.Dialog data-test-modal-dialog>
        <div class="modal modal-open">
          <div class={{this.modalDialogClass}}>
            <form method="dialog">
              {{#if @modal.title}}
                <header class="mb-4">
                  <h2 class="text-lg font-bold">{{@modal.title}}</h2>
                </header>
              {{/if}}

              <main>
                {{#if @modal.message}}
                  <p class="py-4">{{@modal.message}}</p>
                {{/if}}

                {{#if @modal.component}}
                  <div class="py-4">
                    {{component
                      @modal.component
                      onComplete=(fn this.handleClose "confirm")
                    }}
                  </div>
                {{/if}}
              </main>

              {{#if this.hasActions}}
                <footer class="modal-action mt-6 flex justify-end gap-2">
                  {{#if @modal.cancelText}}
                    <button
                      type="submit"
                      value="cancel"
                      class="btn"
                      data-test-modal-cancel
                    >
                      {{@modal.cancelText}}
                    </button>
                  {{/if}}

                  {{#if @modal.confirmText}}
                    <button
                      type="submit"
                      value="confirm"
                      class="btn btn-primary"
                      data-test-modal-confirm
                    >
                      {{@modal.confirmText}}
                    </button>
                  {{/if}}
                </footer>
              {{/if}}

              {{! Portal targets for tooltips/popovers inside modal }}
              <PortalTargets />
            </form>
          </div>

          {{#if @modal.dismissible}}
            <label class="modal-backdrop"></label>
          {{/if}}
        </div>
      </m.Dialog>
    </Modal>
  </template>
}
