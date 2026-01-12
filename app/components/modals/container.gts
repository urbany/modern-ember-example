import Component from '@glimmer/component';
import { service } from '@ember/service';
import type Modals from '../../services/modals';
import ModalItem from './item';

export interface ModalsContainerSignature {
  Args: Record<string, never>;
  Element: null;
}

/**
 * Modals Container Component
 *
 * Renders all active modals using ember-primitives Modal with native <dialog>.
 * Automatically tracks the modals service and renders modals
 * in a stack.
 *
 * @example
 * ```hbs
 * {{! Add to application.gts }}
 * <ModalsContainer />
 * ```
 */
export default class ModalsContainer extends Component<ModalsContainerSignature> {
  @service declare modals: Modals;

  <template>
    {{#each this.modals.modals as |modal|}}
      <ModalItem @modal={{modal}} />
    {{/each}}
  </template>
}
