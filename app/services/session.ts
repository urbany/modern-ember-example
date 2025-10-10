import Service from 'ember-simple-auth/services/session';

type Data = {
  authenticated: {
    // Any data your authenticators return
    id: string;
  };
};

export default class SessionService extends Service<Data> {}

declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}
