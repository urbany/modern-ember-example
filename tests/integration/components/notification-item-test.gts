import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render, click } from '@ember/test-helpers';
import NotificationItem from 'modern-ember-example/components/notifications/item';
import type { Notification } from 'modern-ember-example/types/notification';

module('Integration | Component | notification-item', function (hooks) {
  setupRenderingTest(hooks);

  test('renders success notification', async function (assert) {
    const notification: Notification = {
      id: 'test-1',
      type: 'success',
      message: 'Success message',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    const onDismiss = () => {
      // Dismiss callback - not tested in this render test
    };

    await render(
      <template>
        <NotificationItem
          @notification={{notification}}
          @onDismiss={{onDismiss}}
        />
      </template>
    );

    assert.dom('[role="alert"]').exists('Alert is rendered');
    assert.dom('.alert-success').exists('Has success class');
    assert
      .dom('.font-semibold')
      .hasText('Success message', 'Message is displayed');
    assert.dom('button').exists('Dismiss button is rendered');
  });

  test('renders error notification', async function (assert) {
    const notification: Notification = {
      id: 'test-2',
      type: 'error',
      message: 'Error message',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    const noop = () => {};

    await render(
      <template>
        <NotificationItem @notification={{notification}} @onDismiss={{noop}} />
      </template>
    );

    assert.dom('.alert-error').exists('Has error class');
  });

  test('renders warning notification', async function (assert) {
    const notification: Notification = {
      id: 'test-3',
      type: 'warning',
      message: 'Warning message',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    const noop = () => {};

    await render(
      <template>
        <NotificationItem @notification={{notification}} @onDismiss={{noop}} />
      </template>
    );

    assert.dom('.alert-warning').exists('Has warning class');
  });

  test('renders info notification', async function (assert) {
    const notification: Notification = {
      id: 'test-4',
      type: 'info',
      message: 'Info message',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    const noop = () => {};

    await render(
      <template>
        <NotificationItem @notification={{notification}} @onDismiss={{noop}} />
      </template>
    );

    assert.dom('.alert-info').exists('Has info class');
  });

  test('renders notification with description', async function (assert) {
    const notification: Notification = {
      id: 'test-5',
      type: 'info',
      message: 'Title',
      description: 'Detailed description',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    const noop = () => {};

    await render(
      <template>
        <NotificationItem @notification={{notification}} @onDismiss={{noop}} />
      </template>
    );

    assert.dom('.font-semibold').hasText('Title', 'Title is displayed');
    assert
      .dom('.text-sm')
      .hasText('Detailed description', 'Description is displayed');
  });

  test('does not render dismiss button when not dismissible', async function (assert) {
    const notification: Notification = {
      id: 'test-6',
      type: 'info',
      message: 'Non-dismissible',
      duration: 0,
      dismissible: false,
      createdAt: Date.now(),
    };

    const noop = () => {};

    await render(
      <template>
        <NotificationItem @notification={{notification}} @onDismiss={{noop}} />
      </template>
    );

    assert.dom('button').doesNotExist('Dismiss button is not rendered');
  });

  test('calls onDismiss when dismiss button is clicked', async function (assert) {
    const notification: Notification = {
      id: 'test-7',
      type: 'info',
      message: 'Dismissible',
      duration: 5000,
      dismissible: true,
      createdAt: Date.now(),
    };

    let dismissedId: string | null = null;
    const onDismiss = (id: string) => {
      dismissedId = id;
    };

    await render(
      <template>
        <NotificationItem
          @notification={{notification}}
          @onDismiss={{onDismiss}}
        />
      </template>
    );

    await click('button');
    assert.strictEqual(
      dismissedId,
      'test-7',
      'onDismiss was called with correct ID'
    );
  });
});
