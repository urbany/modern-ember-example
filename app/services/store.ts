import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';
import { getOwner, setOwner } from '@ember/owner';
import AuthHandler from '../handlers/auth-handler';
import { UserSchema } from '../schemas/user';
import type Owner from '@ember/owner';

export default {
  create(args: unknown[]) {
    const owner = getOwner(args) as Owner;
    const authHandler = new AuthHandler();
    setOwner(authHandler, owner);

    const Store = useLegacyStore({
      linksMode: true,
      legacyRequests: false,
      cache: JSONAPICache,
      schemas: [UserSchema],
      handlers: [authHandler],
    });

    const storeService = new Store(args);

    return storeService;
  },
};
