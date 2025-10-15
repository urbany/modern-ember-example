import type { TOC } from '@ember/component/template-only';
import { htmlSafe } from '@ember/template';

export interface IconSignature {
  Element: HTMLSpanElement;
  Args: {
    /**
     * A string containing a `<svg>` element.
     * Import icons using unplugin-icons syntax: import IconSvg from '~icons/lucide/icon-name'
     */
    icon: string;
  };
}

const Icon: TOC<IconSignature> = <template>
  <span class="icon" ...attributes>
    {{htmlSafe @icon}}
  </span>
</template>;

export default Icon;
