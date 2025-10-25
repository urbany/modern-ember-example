import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type SessionService from '../services/session';
import type ThemeService from '../services/theme';

export default class ApplicationRoute extends Route {
  @service declare session: SessionService;
  @service declare theme: ThemeService;

  async beforeModel() {
    // Initialize theme service early to load saved theme
    void this.theme;
    await this.session.setup();
  }
}
