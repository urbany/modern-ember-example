import Controller from '@ember/controller';
import { service } from '@ember/service';
import type ModalsService from '../../services/modals';

export default class ModalsDemoController extends Controller {
  @service declare modals: Modals;

  showAlert = async (): Promise<void> => {
    await this.modals.alert('This is an alert modal!');
  };

  showConfirm = async (): Promise<void> => {
    const result = await this.modals.confirm(
      'Are you sure you want to proceed?'
    );
    console.log('Confirm result:', result);
  };

  showCustomConfirm = async (): Promise<void> => {
    const result = await this.modals.confirm({
      title: 'Delete Item',
      message:
        'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      intent: 'error',
    });
    console.log('Custom confirm result:', result);
  };

  showCustomComponent = async (): Promise<void> => {
    // For now, since component args are not implemented, just show a simple alert
    await this.modals.alert(
      'Custom component modals will be implemented next.'
    );
  };
}
