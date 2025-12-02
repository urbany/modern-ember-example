import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Session from '../services/session';
import type Theme from '../services/theme';

export default class ApplicationRoute extends Route {
  @service declare session: Session;
  @service declare theme: Theme;

  async beforeModel() {
    // Initialize theme service early to load saved theme
    void this.theme;
    await this.session.setup();
  }
}
