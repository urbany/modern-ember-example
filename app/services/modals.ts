import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import type Owner from '@ember/owner';
import type {
  AlertModalOptions,
  ConfirmModalOptions,
  CustomModalOptions,
  Modal,
  ModalsConfig,
  ModalOptions,
} from '../types/modal';

type ResolverEntry<T> = {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
  confirmValue?: T;
  cancelValue?: T;
};

/**
 * Modals Service
 *
 * Provides promise-based APIs for DaisyUI-powered modals. Inspired by
 * the notifications service, but focused on modal dialogs that can be
 * confirmed, dismissed, or rendered with custom components.
 */
export default class ModalsService extends Service {
  /** Active modal stack */
  @tracked modals = new TrackedArray<Modal>([]);

  /** Service-level configuration */
  @tracked config: ModalsConfig = {
    defaultSize: 'md',
    defaultIntent: 'neutral',
    defaultDismissible: true,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    overlayClass: 'modal modal-open',
    modalClass: 'modal',
    modalBoxClass: 'modal-box',
    actionClass: 'modal-action',
  };

  private idCounter = 0;

  private resolvers = new Map<string, ResolverEntry<unknown>>();

  constructor(owner: Owner) {
    super(owner);
  }

  /**
   * Update service configuration
   */
  configure(config: Partial<ModalsConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Returns the modal currently in focus (top of the stack)
   */
  get current(): Modal | undefined {
    return this.modals.at(-1);
  }

  /**
   * Open a general-purpose alert modal
   */
  alert(messageOrOptions: string | AlertModalOptions): Promise<void> {
    const options: AlertModalOptions =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions }
        : messageOrOptions;

    return this.open<void>('alert', {
      ...options,
      confirmText: options.confirmText ?? this.config.confirmText,
      cancelText: undefined,
    });
  }

  /**
   * Open a confirmation modal
   */
  confirm(messageOrOptions: string | ConfirmModalOptions): Promise<boolean> {
    const options: ConfirmModalOptions =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions }
        : messageOrOptions;
    const confirmValue = options.confirmValue ?? true;
    const cancelValue = options.cancelValue ?? false;

    return this.open<boolean>(
      'confirm',
      {
        ...options,
        confirmText: options.confirmText ?? this.config.confirmText,
        cancelText: options.cancelText ?? this.config.cancelText,
      },
      { confirmValue, cancelValue }
    );
  }

  /**
   * Open a custom component modal
   */
  openComponent<T>(options: CustomModalOptions<T>): Promise<T> {
    return this.open<T>('custom', options);
  }

  /**
   * Resolve a modal with an optional value
   */
  resolve<T>(id: string, value?: T): void {
    const resolver = this.resolvers.get(id) as ResolverEntry<T> | undefined;
    if (!resolver) {
      return;
    }

    const resolvedValue = value ?? resolver.confirmValue;
    resolver.resolve(resolvedValue as T);
    this.cleanup(id);
  }

  /**
   * Dismiss a modal, returning the configured cancel value
   */
  dismiss<T>(id: string, value?: T): void {
    const resolver = this.resolvers.get(id) as ResolverEntry<T> | undefined;
    if (!resolver) {
      return;
    }

    const cancelValue = value ?? resolver.cancelValue;
    resolver.resolve(cancelValue as T);
    this.cleanup(id);
  }

  /**
   * Reject a modal promise with an error
   */
  reject(id: string, reason?: unknown): void {
    const resolver = this.resolvers.get(id);
    if (!resolver) {
      return;
    }

    resolver.reject(reason);
    this.cleanup(id);
  }

  /**
   * Remove all active modals
   */
  clear(): void {
    [...this.modals].forEach((modal) => this.reject(modal.id));
  }

  /**
   * Ember lifecycle hook to ensure promises do not hang
   */
  willDestroy(): void {
    super.willDestroy();
    this.clear();
  }

  private open<T>(
    kind: Modal['kind'],
    options: ModalOptions<T>,
    overrides: Partial<
      Pick<ResolverEntry<T>, 'confirmValue' | 'cancelValue'>
    > = {}
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const id = this.generateId();

      const modal: Modal = {
        id,
        kind,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText ?? this.config.confirmText,
        cancelText: options.cancelText,
        dismissible: options.dismissible ?? this.config.defaultDismissible,
        size: options.size ?? this.config.defaultSize,
        intent: options.intent ?? this.config.defaultIntent,
        component: options.component,
        componentArgs: options.componentArgs,
        metadata: options.metadata,
        createdAt: Date.now(),
      };

      this.modals.push(modal);
      this.resolvers.set(id, {
        resolve,
        reject,
        confirmValue: overrides.confirmValue,
        cancelValue: overrides.cancelValue ?? options.cancelValue,
      } as ResolverEntry<unknown>);
    });
  }

  private cleanup(id: string): void {
    this.removeModal(id);
    this.resolvers.delete(id);
  }

  private removeModal(id: string): void {
    const index = this.modals.findIndex((modal) => modal.id === id);
    if (index !== -1) {
      this.modals.splice(index, 1);
    }
  }

  private generateId(): string {
    return `modal-${++this.idCounter}-${Date.now()}`;
  }
}

declare module '@ember/service' {
  interface Registry {
    modals: ModalsService;
  }
}
