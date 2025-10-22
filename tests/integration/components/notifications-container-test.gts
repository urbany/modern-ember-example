import { module, test } from 'qunit';
import { setupRenderingTest } from 'modern-ember-example/tests/helpers';
import { render } from '@ember/test-helpers';
import NotificationsContainer from 'modern-ember-example/components/notifications-container';

module('Integration | Component | notifications-container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders without notifications', async function (assert) {
    await render(<template><NotificationsContainer /></template>);

    // Component renders nothing when there are no notifications
    assert.dom('[data-test-notifications-container]').doesNotExist();
  });

  test('it renders with notifications', async function (assert) {
    const notificationsService = this.owner.lookup('service:notifications');

    // Add a notification
    notificationsService.success('Test notification');

    await render(<template><NotificationsContainer /></template>);

    // Component renders container when there are notifications
    assert.dom('[data-test-notifications-container]').exists();
    assert
      .dom('[data-notification-id]')
      .exists('Notification item is rendered');
  });
});
