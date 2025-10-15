import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import Icon from 'modern-ember-example/components/icon';

// Import test icon
import HouseIcon from '~icons/lucide/house';

module('Integration | Component | icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Icon @icon={{HouseIcon}} /></template>);

    assert.dom('svg').exists('renders an SVG element');
  });
});
