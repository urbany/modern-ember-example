import { module, test } from 'qunit';
import camelCaseKeys from 'modern-ember-example/utils/camel-case-keys';

// Note: We use `any` assertions because the type system doesn't track key transformations
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

module('Unit | Utility | camel-case-keys', function () {
  module('Object transformation', function () {
    test('it transforms snake_case keys to camelCase', function (assert) {
      const input = {
        user_name: 'John',
        user_age: 30,
        is_active: true,
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          userName: 'John',
          userAge: 30,
          isActive: true,
        },
        'transforms snake_case keys to camelCase'
      );
    });

    test('it transforms kebab-case keys to camelCase', function (assert) {
      const input = {
        'user-name': 'Jane',
        'user-age': 25,
        'is-active': false,
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          userName: 'Jane',
          userAge: 25,
          isActive: false,
        },
        'transforms kebab-case keys to camelCase'
      );
    });

    test('it handles already camelCase keys', function (assert) {
      const input = {
        userName: 'Bob',
        userAge: 40,
      };

      const result = camelCaseKeys(input);

      assert.deepEqual(result, input, 'leaves camelCase keys unchanged');
    });

    test('it handles nested objects', function (assert) {
      const input = {
        user_info: {
          first_name: 'Alice',
          last_name: 'Smith',
          contact_details: {
            email_address: 'alice@example.com',
            phone_number: '555-1234',
          },
        },
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          userInfo: {
            firstName: 'Alice',
            lastName: 'Smith',
            contactDetails: {
              emailAddress: 'alice@example.com',
              phoneNumber: '555-1234',
            },
          },
        } as any,
        'recursively transforms nested objects'
      );
    });

    test('it handles empty objects', function (assert) {
      const input = {};

      const result = camelCaseKeys(input);

      assert.deepEqual(result, {}, 'handles empty objects');
    });
  });

  module('Array transformation', function () {
    test('it transforms arrays of objects', function (assert) {
      const input = [
        { user_name: 'John', user_age: 30 },
        { user_name: 'Jane', user_age: 25 },
      ];

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        [
          { userName: 'John', userAge: 30 },
          { userName: 'Jane', userAge: 25 },
        ] as any,
        'transforms each object in array'
      );
    });

    test('it handles nested arrays', function (assert) {
      const input = {
        users: [
          { first_name: 'Alice', last_name: 'Smith' },
          { first_name: 'Bob', last_name: 'Jones' },
        ],
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          users: [
            { firstName: 'Alice', lastName: 'Smith' },
            { firstName: 'Bob', lastName: 'Jones' },
          ],
        } as any,
        'transforms nested arrays'
      );
    });

    test('it handles empty arrays', function (assert) {
      const input: unknown[] = [];

      const result = camelCaseKeys(input);

      assert.deepEqual(result, [], 'handles empty arrays');
    });

    test('it handles arrays of primitives', function (assert) {
      const input = [1, 2, 3, 'a', 'b', 'c'];

      const result = camelCaseKeys(input);

      assert.deepEqual(result, input, 'leaves primitive arrays unchanged');
    });
  });

  module('Primitive values', function () {
    test('it returns strings unchanged', function (assert) {
      const input = 'test_string';

      const result = camelCaseKeys(input);

      assert.strictEqual(result, input, 'strings are unchanged');
    });

    test('it returns numbers unchanged', function (assert) {
      const input = 42;

      const result = camelCaseKeys(input);

      assert.strictEqual(result, input, 'numbers are unchanged');
    });

    test('it returns booleans unchanged', function (assert) {
      const inputTrue = true;
      const inputFalse = false;

      const resultTrue = camelCaseKeys(inputTrue);
      const resultFalse = camelCaseKeys(inputFalse);

      assert.strictEqual(resultTrue, inputTrue, 'true is unchanged');
      assert.strictEqual(resultFalse, inputFalse, 'false is unchanged');
    });

    test('it returns null unchanged', function (assert) {
      const input = null;

      const result = camelCaseKeys(input);

      assert.strictEqual(result, null, 'null is unchanged');
    });

    test('it returns undefined unchanged', function (assert) {
      const input = undefined;

      const result = camelCaseKeys(input);

      assert.strictEqual(result, undefined, 'undefined is unchanged');
    });
  });

  module('Special object types', function () {
    test('it returns Date objects unchanged', function (assert) {
      const input = new Date('2025-10-25');

      const result = camelCaseKeys(input);

      assert.strictEqual(result, input, 'Date objects are unchanged');
      assert.ok(result instanceof Date, 'returns a Date instance');
    });

    test('it returns Map objects unchanged', function (assert) {
      const input = new Map([
        ['key_one', 'value1'],
        ['key_two', 'value2'],
      ]);

      const result = camelCaseKeys(input);

      assert.strictEqual(result, input, 'Map objects are unchanged');
      assert.ok(result instanceof Map, 'returns a Map instance');
    });

    test('it returns Set objects unchanged', function (assert) {
      const input = new Set(['value_one', 'value_two']);

      const result = camelCaseKeys(input);

      assert.strictEqual(result, input, 'Set objects are unchanged');
      assert.ok(result instanceof Set, 'returns a Set instance');
    });

    test('it handles objects containing Date values', function (assert) {
      const date = new Date('2025-10-25');
      const input = {
        created_at: date,
        user_name: 'John',
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          createdAt: date,
          userName: 'John',
        } as any,
        'transforms keys but preserves Date values'
      );
      assert.ok(result.createdAt instanceof Date, 'Date value is preserved');
    });
  });

  module('Complex scenarios', function () {
    test('it handles mixed nested structures', function (assert) {
      const input = {
        user_data: {
          personal_info: {
            first_name: 'Alice',
            addresses: [
              { street_name: 'Main St', zip_code: '12345' },
              { street_name: '2nd Ave', zip_code: '67890' },
            ],
          },
          preferences: {
            theme_mode: 'dark',
            notification_settings: ['email_alerts', 'push_notifications'],
          },
        },
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          userData: {
            personalInfo: {
              firstName: 'Alice',
              addresses: [
                { streetName: 'Main St', zipCode: '12345' },
                { streetName: '2nd Ave', zipCode: '67890' },
              ],
            },
            preferences: {
              themeMode: 'dark',
              notificationSettings: ['email_alerts', 'push_notifications'],
            },
          },
        } as any,
        'handles complex nested structures'
      );
    });

    test('it handles objects with null and undefined values', function (assert) {
      const input = {
        user_name: 'John',
        middle_name: null,
        nickname: undefined,
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          userName: 'John',
          middleName: null,
          nickname: undefined,
        } as any,
        'preserves null and undefined values'
      );
    });

    test('it handles objects with mixed value types', function (assert) {
      const input = {
        string_value: 'test',
        number_value: 42,
        boolean_value: true,
        null_value: null,
        array_value: [1, 2, 3],
        object_value: { nested_key: 'value' },
      };

      const result = camelCaseKeys(input) as any;

      assert.deepEqual(
        result,
        {
          stringValue: 'test',
          numberValue: 42,
          booleanValue: true,
          nullValue: null,
          arrayValue: [1, 2, 3],
          objectValue: { nestedKey: 'value' },
        } as any,
        'handles mixed value types correctly'
      );
    });
  });
});
