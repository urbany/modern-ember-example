import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type SessionService from '../services/session';

export default class ApplicationRoute extends Route {
  @service declare session: SessionService;

  async beforeModel() {
    await this.session.setup();
  }
}
