import type { TOC } from '@ember/component/template-only';

export interface GettingStartedCodeSignature {
  // The arguments accepted by the component
  Args: null;
  // Any blocks yielded by the component
  Blocks: null;
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

const URL = 'https://github.com/urbany/modern-ember-example.git';

<template>
  <div class="mockup-code">
    <pre data-prefix="$"><code>git clone {{URL}}</code></pre>
    <pre data-prefix="$"><code>cd modern-ember-example</code></pre>
    <pre data-prefix="$"><code>pnpm install</code></pre>
    <pre data-prefix="$"><code>pnpm start</code></pre>
  </div>
</template> satisfies TOC<GettingStartedCodeSignature>;
