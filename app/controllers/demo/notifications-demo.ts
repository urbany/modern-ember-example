import Controller from '@ember/controller';
import { service } from '@ember/service';
import type NotificationsService from '../../services/notifications';

export default class NotificationsDemoController extends Controller {
  @service declare notifications: Notifications;

  showSuccess = (): void => {
    this.notifications.success('Operação realizada com sucesso!');
  };

  showSuccessWithDescription = (): void => {
    this.notifications.success('Dados salvos', {
      description: 'Suas alterações foram salvas com sucesso no sistema.',
    });
  };

  showError = (): void => {
    this.notifications.error('Erro ao processar requisição');
  };

  showErrorWithDescription = (): void => {
    this.notifications.error('Falha na conexão', {
      description:
        'Não foi possível conectar ao servidor. Verifique sua conexão.',
    });
  };

  showWarning = (): void => {
    this.notifications.warning('Atenção: ação irreversível');
  };

  showWarningWithDescription = (): void => {
    this.notifications.warning('Dados não salvos', {
      description: 'Você tem alterações não salvas. Salve antes de sair.',
      duration: 8000,
    });
  };

  showInfo = (): void => {
    this.notifications.info('Nova atualização disponível');
  };

  showInfoWithDescription = (): void => {
    this.notifications.info('Manutenção programada', {
      description: 'O sistema estará em manutenção amanhã das 2h às 4h.',
    });
  };

  showPersistent = (): void => {
    this.notifications.info('Notificação persistente', {
      description: 'Esta notificação não desaparece automaticamente',
      duration: 0, // Won't auto-dismiss
    });
  };

  showNonDismissible = (): void => {
    this.notifications.warning('Não pode ser fechada manualmente', {
      dismissible: false,
      duration: 3000,
    });
  };

  showMultiple = (): void => {
    this.notifications.success('Primeira notificação');
    setTimeout(() => {
      this.notifications.info('Segunda notificação');
    }, 500);
    setTimeout(() => {
      this.notifications.warning('Terceira notificação');
    }, 1000);
  };

  clearAll = (): void => {
    this.notifications.clear();
  };

  changePosition = (position: string): void => {
    this.notifications.configure({
      position: position as
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end',
    });
  };
}
