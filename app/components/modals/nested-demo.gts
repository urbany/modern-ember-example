import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import type Modals from '../../services/modals';

export interface NestedDemoSignature {
  Args: {
    onComplete?: () => void;
  };
  Element: null;
}

/**
 * Nested Modal Demo Component
 *
 * Custom component for demonstrating nested modals.
 * Opens a second modal on top without closing the first one.
 */
export default class NestedDemo extends Component<NestedDemoSignature> {
  @service declare modals: Modals;

  openNestedModal = async (): Promise<void> => {
    const secondResult = await this.modals.confirm({
      title: 'Nested Modal',
      message:
        'This modal is rendered on top of the first one! This demonstrates PortalTargets working correctly.',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    });

    if (secondResult) {
      await this.modals.alert({
        title: 'Success!',
        message:
          'You confirmed both modals. The nested modal architecture works perfectly!',
      });

      // Call the completion callback to close the first modal
      this.args.onComplete?.();
    }
  };

  <template>
    <div class="space-y-4">
      <p>
        This is the first modal. Click "Open Nested" to see a modal on top of
        this one without closing this modal.
      </p>

      <button
        type="button"
        class="btn btn-primary w-full"
        {{on "click" this.openNestedModal}}
      >
        Open Nested Modal
      </button>
    </div>
  </template>
}
