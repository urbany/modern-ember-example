import { module, test } from 'qunit';
import {
  LocalStorageManager,
  jsonSerializer,
  createStringStorage,
  createJsonStorage,
} from 'modern-ember-example/utils/local-storage';

module('Unit | Utility | local-storage', function (hooks) {
  hooks.beforeEach(function () {
    localStorage.clear();
  });

  hooks.afterEach(function () {
    localStorage.clear();
  });

  module('LocalStorageManager - String', function () {
    test('it can set and get string values', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      storage.set('test-value');
      const result = storage.get();

      assert.strictEqual(
        result,
        'test-value',
        'retrieved value matches set value'
      );
    });

    test('it returns null for non-existent keys', function (assert) {
      const storage = new LocalStorageManager<string>('non-existent');

      const result = storage.get();

      assert.strictEqual(result, null, 'returns null for missing key');
    });

    test('it can remove values', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      storage.set('test-value');
      storage.remove();
      const result = storage.get();

      assert.strictEqual(result, null, 'value is removed');
    });

    test('it can check if key exists', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      assert.false(storage.has(), 'returns false before setting value');

      storage.set('test-value');

      assert.true(storage.has(), 'returns true after setting value');
    });

    test('it can clear values using clear method', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      storage.set('test-value');
      storage.clear();

      assert.strictEqual(storage.get(), null, 'value is cleared');
    });

    test('getOrDefault returns default when key does not exist', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      const result = storage.getOrDefault('default-value');

      assert.strictEqual(result, 'default-value', 'returns default value');
    });

    test('getOrDefault returns stored value when key exists', function (assert) {
      const storage = new LocalStorageManager<string>('test-key');

      storage.set('stored-value');
      const result = storage.getOrDefault('default-value');

      assert.strictEqual(result, 'stored-value', 'returns stored value');
    });
  });

  module('LocalStorageManager - JSON', function () {
    test('it can set and get objects', function (assert) {
      interface User {
        name: string;
        age: number;
      }

      const storage = new LocalStorageManager<User>(
        'test-user',
        jsonSerializer<User>()
      );

      const user: User = { name: 'John', age: 30 };
      storage.set(user);
      const result = storage.get();

      assert.deepEqual(result, user, 'retrieved object matches set object');
    });

    test('it can set and get arrays', function (assert) {
      const storage = new LocalStorageManager<string[]>(
        'test-array',
        jsonSerializer<string[]>()
      );

      const items = ['a', 'b', 'c'];
      storage.set(items);
      const result = storage.get();

      assert.deepEqual(result, items, 'retrieved array matches set array');
    });

    test('it handles nested objects', function (assert) {
      interface ComplexObject {
        user: { name: string; address: { city: string } };
        tags: string[];
      }

      const storage = new LocalStorageManager<ComplexObject>(
        'test-complex',
        jsonSerializer<ComplexObject>()
      );

      const obj: ComplexObject = {
        user: { name: 'Jane', address: { city: 'NYC' } },
        tags: ['tag1', 'tag2'],
      };

      storage.set(obj);
      const result = storage.get();

      assert.deepEqual(result, obj, 'retrieved complex object matches');
    });

    test('it returns null for invalid JSON', function (assert) {
      const storage = new LocalStorageManager<{ name: string }>(
        'test-invalid',
        jsonSerializer<{ name: string }>()
      );

      // Manually set invalid JSON
      localStorage.setItem('test-invalid', '{invalid json}');

      const result = storage.get();

      assert.strictEqual(result, null, 'returns null for invalid JSON');
    });
  });

  module('Factory functions', function () {
    test('createStringStorage creates a string storage manager', function (assert) {
      const storage = createStringStorage('test-string');

      storage.set('value');
      const result = storage.get();

      assert.strictEqual(result, 'value', 'works as string storage');
    });

    test('createJsonStorage creates a JSON storage manager', function (assert) {
      interface TestData {
        id: number;
        name: string;
      }

      const storage = createJsonStorage<TestData>('test-json');

      const data: TestData = { id: 1, name: 'Test' };
      storage.set(data);
      const result = storage.get();

      assert.deepEqual(result, data, 'works as JSON storage');
    });
  });

  module('Static methods', function () {
    test('clearAll removes all localStorage items', function (assert) {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');

      assert.strictEqual(localStorage.length, 2, 'has 2 items before clear');

      LocalStorageManager.clearAll();

      assert.strictEqual(localStorage.length, 0, 'has 0 items after clear');
    });
  });

  module('Error handling', function () {
    test('it handles storage quota exceeded gracefully', function (assert) {
      const storage = new LocalStorageManager<string>('test-quota');

      // Mock localStorage.setItem to throw quota exceeded error
      const originalSetItem = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function () {
        throw new Error('QuotaExceededError');
      };

      // Should not throw
      storage.set('value');

      assert.ok(true, 'handles quota exceeded error without throwing');

      // Restore original
      localStorage.setItem = originalSetItem;
    });

    test('it handles localStorage.getItem errors gracefully', function (assert) {
      const storage = new LocalStorageManager<string>('test-error');

      // Mock localStorage.getItem to throw error
      const originalGetItem = localStorage.getItem.bind(localStorage);
      localStorage.getItem = function () {
        throw new Error('Storage access denied');
      };

      const result = storage.get();

      assert.strictEqual(result, null, 'returns null on error');

      // Restore original
      localStorage.getItem = originalGetItem;
    });
  });
});
