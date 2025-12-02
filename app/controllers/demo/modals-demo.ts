import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import type Modals from '../../services/modals';

export default class ModalsDemoController extends Controller {
  @service declare modals: Modals;

  @action
  async showAlert(): Promise<void> {
    await this.modals.alert('This is an alert modal!');
  }

  @action
  async showConfirm(): Promise<void> {
    const result = await this.modals.confirm(
      'Are you sure you want to proceed?'
    );
    console.log('Confirm result:', result);
  }

  @action
  async showCustomConfirm(): Promise<void> {
    const result = await this.modals.confirm({
      title: 'Delete Item',
      message:
        'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      intent: 'error',
    });
    console.log('Custom confirm result:', result);
  }

  @action
  async showCustomComponent(): Promise<void> {
    // For now, since component args are not implemented, just show a simple alert
    await this.modals.alert(
      'Custom component modals will be implemented next.'
    );
  }
}
