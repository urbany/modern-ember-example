import { service } from '@ember/service';
import type { RequestContext } from '@warp-drive/core/types/request';
import type { NextFn, Handler } from '@warp-drive/core/request';
import type Session from '../services/session';

export default class AuthHandler implements Handler {
  @service declare session: Session;

  request<T>(context: RequestContext, next: NextFn<T>) {
    const headers = new Headers(context.request.headers);
    if (this.session.isAuthenticated) {
      headers.append(
        'Authorization',
        `Bearer ${this.session.data.authenticated.accessToken}`
      );
    }

    return next(Object.assign({}, context.request, { headers }));
  }
}
