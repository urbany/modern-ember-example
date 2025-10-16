import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import tw from 'modern-ember-example/helpers/tw';

module('Integration | Helper | tw', function (hooks) {
  setupRenderingTest(hooks);

  test('it merges conflicting Tailwind classes', async function (assert) {
    await render(
      <template>
        <div class={{tw "px-2 py-1 px-4"}}></div>
      </template>
    );

    assert.dom('div').hasClass('px-4');
    assert.dom('div').hasClass('py-1');
    assert.dom('div').doesNotHaveClass('px-2');
  });

  test('it handles multiple class arguments', async function (assert) {
    await render(
      <template>
        <div class={{tw "bg-red-500 text-white bg-blue-500"}}></div>
      </template>
    );

    assert.dom('div').hasClass('bg-blue-500');
    assert.dom('div').hasClass('text-white');
    assert.dom('div').doesNotHaveClass('bg-red-500');
  });

  test('it merges conflicting background classes', async function (assert) {
    await render(
      <template>
        <div class={{tw "bg-gray-100 bg-blue-500"}}></div>
      </template>
    );

    assert.dom('div').hasClass('bg-blue-500');
    assert.dom('div').doesNotHaveClass('bg-gray-100');
  });

  test('it handles conditional classes when not active', async function (assert) {
    await render(
      <template>
        <div class={{tw "bg-gray-100"}}></div>
      </template>
    );

    assert.dom('div').hasClass('bg-gray-100');
    assert.dom('div').doesNotHaveClass('bg-blue-500');
    assert.dom('div').doesNotHaveClass('opacity-50');
  });
});
