import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import LucideIcon from 'modern-ember-example/components/lucide-icon';

module('Integration | Component | lucide-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><LucideIcon @name="House" /></template>);

    assert.dom('svg').exists('renders an SVG element');
  });
});
