import Service from 'ember-simple-auth/services/session';

type Data = {
  authenticated: {
    // Any data your authenticators return
    accessToken: string;
  };
};

export default class Session extends Service<Data> {}

declare module '@ember/service' {
  interface Registry {
    session: Session;
  }
}
