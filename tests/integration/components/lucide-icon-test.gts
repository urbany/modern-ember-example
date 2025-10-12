import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import LucideIcon from 'modern-ember-example/components/lucide-icon';

module('Integration | Component | lucide-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Updating values is achieved using autotracking, just like in app code. For example:
    // class State { @tracked myProperty = 0; }; const state = new State();
    // and update using state.myProperty = 1; await rerender();
    // Handle any actions with function myAction(val) { ... };

    await render(<template><LucideIcon /></template>);

    assert.dom().hasText('');

    // Template block usage:
    await render(
      <template>
        <LucideIcon>
          template block text
        </LucideIcon>
      </template>
    );

    assert.dom().hasText('template block text');
  });
});
