import { module, test } from 'qunit';
import { setupTest } from 'modern-ember-example/tests/helpers';

module('Unit | Service | notifications', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:notifications');
    assert.ok(service);
  });

  test('adds a notification with default options', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.add('Test message');

    assert.strictEqual(
      service.notifications.length,
      1,
      'One notification added'
    );
    assert.strictEqual(
      notification.message,
      'Test message',
      'Message is correct'
    );
    assert.strictEqual(notification.type, 'info', 'Default type is info');
    assert.strictEqual(
      notification.duration,
      5000,
      'Default duration is 5000ms'
    );
    assert.true(notification.dismissible, 'Default dismissible is true');
  });

  test('adds a success notification', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.success('Success message');

    assert.strictEqual(notification.type, 'success', 'Type is success');
    assert.strictEqual(
      notification.message,
      'Success message',
      'Message is correct'
    );
  });

  test('adds an error notification', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.error('Error message');

    assert.strictEqual(notification.type, 'error', 'Type is error');
    assert.strictEqual(
      notification.message,
      'Error message',
      'Message is correct'
    );
  });

  test('adds a warning notification', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.warning('Warning message');

    assert.strictEqual(notification.type, 'warning', 'Type is warning');
    assert.strictEqual(
      notification.message,
      'Warning message',
      'Message is correct'
    );
  });

  test('adds an info notification', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.info('Info message');

    assert.strictEqual(notification.type, 'info', 'Type is info');
    assert.strictEqual(
      notification.message,
      'Info message',
      'Message is correct'
    );
  });

  test('adds notification with description', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.add('Title', {
      description: 'Detailed description',
    });

    assert.strictEqual(
      notification.description,
      'Detailed description',
      'Description is set'
    );
  });

  test('adds notification with custom duration', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.add('Message', { duration: 10000 });

    assert.strictEqual(notification.duration, 10000, 'Custom duration is set');
  });

  test('adds notification with dismissible false', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.add('Message', { dismissible: false });

    assert.false(notification.dismissible, 'Dismissible is false');
  });

  test('removes a notification by ID', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const notification = service.add('Test');
    assert.strictEqual(service.notifications.length, 1, 'Notification added');

    service.remove(notification.id);
    assert.strictEqual(service.notifications.length, 0, 'Notification removed');
  });

  test('clears all notifications', function (assert) {
    const service = this.owner.lookup('service:notifications');

    service.add('First');
    service.add('Second');
    service.add('Third');
    assert.strictEqual(
      service.notifications.length,
      3,
      'Three notifications added'
    );

    service.clear();
    assert.strictEqual(
      service.notifications.length,
      0,
      'All notifications cleared'
    );
  });

  test('respects maxNotifications limit', function (assert) {
    const service = this.owner.lookup('service:notifications');
    service.configure({ maxNotifications: 3 });

    service.add('First');
    service.add('Second');
    service.add('Third');
    service.add('Fourth'); // Should remove first

    assert.strictEqual(
      service.notifications.length,
      3,
      'Only 3 notifications present'
    );
    assert.strictEqual(
      service.notifications[0]?.message,
      'Second',
      'Oldest notification was removed'
    );
  });

  test('configures service settings', function (assert) {
    const service = this.owner.lookup('service:notifications');

    service.configure({
      maxNotifications: 10,
      defaultDuration: 3000,
      position: 'bottom-center',
    });

    assert.strictEqual(
      service.config.maxNotifications,
      10,
      'Max notifications configured'
    );
    assert.strictEqual(
      service.config.defaultDuration,
      3000,
      'Default duration configured'
    );
    assert.strictEqual(
      service.config.position,
      'bottom-center',
      'Position configured'
    );
  });

  test('generates unique IDs for notifications', function (assert) {
    const service = this.owner.lookup('service:notifications');

    const first = service.add('First');
    const second = service.add('Second');

    assert.notStrictEqual(first.id, second.id, 'IDs are unique');
  });

  test('position getter returns configured position', function (assert) {
    const service = this.owner.lookup('service:notifications');

    service.configure({ position: 'top-start' });
    assert.strictEqual(service.position, 'top-start', 'Position getter works');
  });
});
