import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import Icon from 'modern-ember-example/components/icon';
import ThemeSelector from 'modern-ember-example/components/theme-selector';

// Import icons
import ArrowLeftIcon from '~icons/lucide/arrow-left';

export interface HeaderSignature {
  Args: {
    /**
     * Title to display in the header center
     */
    title?: string;
    /**
     * Whether to show a back button to the home page
     */
    showBackButton?: boolean;
    /**
     * Route to navigate back to (defaults to 'index')
     */
    backRoute?: string;
    /**
     * Whether the header should be sticky
     */
    sticky?: boolean;
  };
  Element: HTMLElement;
}

/**
 * Shared Header Component
 *
 * Provides consistent navigation header across the application.
 * Shows app branding, optional back navigation, and theme selector.
 */
export default class Header extends Component<HeaderSignature> {
  get backRoute() {
    return this.args.backRoute || 'index';
  }

  get showBackButton() {
    return this.args.showBackButton ?? false;
  }

  get title() {
    return this.args.title || 'Modern Ember Example';
  }

  get sticky() {
    return this.args.sticky ?? true;
  }

  <template>
    <div
      class="navbar bg-base-100
        {{if this.sticky 'sticky top-0 z-10 shadow-lg' 'shadow-sm'}}"
    >
      <div class="navbar-start">
        {{#if this.showBackButton}}
          <LinkTo @route={{this.backRoute}} class="btn btn-ghost btn-sm">
            <Icon @icon={{ArrowLeftIcon}} class="h-4 w-4" />
            Back
          </LinkTo>
        {{else}}
          <div class="text-xl font-bold">{{this.title}}</div>
        {{/if}}
      </div>

      {{#if this.showBackButton}}
        <div class="navbar-center">
          <h1 class="text-xl font-bold">{{this.title}}</h1>
        </div>
      {{/if}}

      <div class="navbar-end">
        {{#if this.showBackButton}}
          <div class="badge badge-primary">Modern Ember Example</div>
        {{/if}}
        <ThemeSelector />
      </div>
    </div>
  </template>
}
