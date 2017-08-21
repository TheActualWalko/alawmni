import * as queries from './queries';

export default {
  ping() {
    return Promise.resolve('pong');
  },
  sessions() {
    return queries.getSessions();
  }
};