import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import type NotificationsService from '../../services/notifications';

export default class NotificationsDemoController extends Controller {
  @service declare notifications: NotificationsService;

  @action
  showSuccess(): void {
    this.notifications.success('Operação realizada com sucesso!');
  }

  @action
  showSuccessWithDescription(): void {
    this.notifications.success('Dados salvos', {
      description: 'Suas alterações foram salvas com sucesso no sistema.',
    });
  }

  @action
  showError(): void {
    this.notifications.error('Erro ao processar requisição');
  }

  @action
  showErrorWithDescription(): void {
    this.notifications.error('Falha na conexão', {
      description:
        'Não foi possível conectar ao servidor. Verifique sua conexão.',
    });
  }

  @action
  showWarning(): void {
    this.notifications.warning('Atenção: ação irreversível');
  }

  @action
  showWarningWithDescription(): void {
    this.notifications.warning('Dados não salvos', {
      description: 'Você tem alterações não salvas. Salve antes de sair.',
      duration: 8000,
    });
  }

  @action
  showInfo(): void {
    this.notifications.info('Nova atualização disponível');
  }

  @action
  showInfoWithDescription(): void {
    this.notifications.info('Manutenção programada', {
      description: 'O sistema estará em manutenção amanhã das 2h às 4h.',
    });
  }

  @action
  showPersistent(): void {
    this.notifications.info('Notificação persistente', {
      description: 'Esta notificação não desaparece automaticamente',
      duration: 0, // Won't auto-dismiss
    });
  }

  @action
  showNonDismissible(): void {
    this.notifications.warning('Não pode ser fechada manualmente', {
      dismissible: false,
      duration: 3000,
    });
  }

  @action
  showMultiple(): void {
    this.notifications.success('Primeira notificação');
    setTimeout(() => {
      this.notifications.info('Segunda notificação');
    }, 500);
    setTimeout(() => {
      this.notifications.warning('Terceira notificação');
    }, 1000);
  }

  @action
  clearAll(): void {
    this.notifications.clear();
  }

  @action
  changePosition(position: string): void {
    this.notifications.configure({
      position: position as
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end',
    });
  }
}
