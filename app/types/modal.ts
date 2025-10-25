/**
 * Modal size options based on DaisyUI conventions
 */
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Modal intent for styling variants
 */
export type ModalIntent = 'neutral' | 'success' | 'warning' | 'error' | 'info';

/**
 * Core modal record tracked by the service
 */
export interface Modal {
  /** Unique identifier */
  id: string;
  /** Modal kind determines default controls */
  kind: 'alert' | 'confirm' | 'custom';
  /** Optional heading */
  title?: string;
  /** Optional message copy */
  message?: string;
  /** Label for primary action */
  confirmText?: string;
  /** Label for secondary action */
  cancelText?: string;
  /** Whether the modal can be dismissed without explicit action */
  dismissible: boolean;
  /** DaisyUI size token */
  size: ModalSize;
  /** Styling intent */
  intent: ModalIntent;
  /** Custom body component */
  component?: import('@glint/template').ComponentLike<unknown>;
  /** Named args passed to the custom component */
  componentArgs?: Record<string, unknown>;
  /** Additional metadata for callers */
  metadata?: Record<string, unknown>;
  /** Timestamp when modal was created */
  createdAt: number;
}

/**
 * Base options for opening a modal
 */
export interface ModalOptions<T = unknown> {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  dismissible?: boolean;
  size?: ModalSize;
  intent?: ModalIntent;
  component?: import('@glint/template').ComponentLike<unknown>;
  componentArgs?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  /** Value returned when dismissing the modal */
  cancelValue?: T;
}

/**
 * Options for confirm modals
 */
export interface ConfirmModalOptions extends ModalOptions<boolean> {
  /** Whether confirm should resolve to true on close (default: true) */
  confirmValue?: boolean;
}

/**
 * Options for alert modals
 */
export type AlertModalOptions = ModalOptions<void>;

/**
 * Options for custom component modals
 */
export type CustomModalOptions<T = unknown> = ModalOptions<T> & {
  component: import('@glint/template').ComponentLike<unknown>;
};

/**
 * Configuration for the modals service
 */
export interface ModalsConfig {
  defaultSize: ModalSize;
  defaultIntent: ModalIntent;
  defaultDismissible: boolean;
  confirmText: string;
  cancelText: string;
  overlayClass: string;
  modalClass: string;
  modalBoxClass: string;
  actionClass: string;
}
