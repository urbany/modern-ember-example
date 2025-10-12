import Component from '@glimmer/component';
import { icons, createElement } from 'lucide';

interface LucideIconSignature {
  Args: {
    name: keyof typeof icons;
    class?: string;
  };
  Element: HTMLElement;
}

export default class Icon extends Component<LucideIconSignature> {
  // Computed property to validate icon exists
  get isValidIcon(): boolean {
    return this.args.name in icons;
  }

  // Computed property to get icon component
  get iconComponent() {
    const svg = createElement(icons[this.args.name]);
    svg.setAttribute('class', this.args.class ?? '');
    return svg;
  }

  <template>
    {{#if this.isValidIcon}}
      {{! template-lint-disable no-triple-curlies }}
      {{{this.iconComponent}}}
    {{else}}
      <span class="icon-error">Invalid icon: {{@name}}</span>
    {{/if}}
  </template>
}
