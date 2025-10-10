import { withDefaults } from '@warp-drive/legacy/model/migration-support';

export const UserSchema = withDefaults({
  type: 'user',
  fields: [
    {
      name: 'name',
      kind: 'attribute',
      type: 'string',
    },
    {
      name: 'createdAt',
      kind: 'attribute',
      type: 'date',
      sourceKey: 'created-at',
    },
    {
      name: 'updatedAt',
      kind: 'attribute',
      type: 'date',
      sourceKey: 'updated-at',
    },
  ],
});
