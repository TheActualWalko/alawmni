import {getClientDomainFromSlug} from './queries';

export default (db) => (req, res, next) => {
  const host = req.headers['host'] ? req.headers['host'].split(':')[0] : false;
  if (!host || host === 'localhost' || host === 'alumnidb.io' || host === 'www.alumnidb.io') {
    const cookie = req.cookies['domain'];
    if (cookie) {
      req.clientDomain = cookie;
    } else {
      req.clientDomain = 'test';
    }
    next();
  } else if (host.includes('alumnidb.io') || host.includes('localhost')) {
    const slug = host.split('.')[0].toUpperCase();
    getClientDomainFromSlug(slug)(db)
      .then(({domain}) => req.clientDomain = domain)
      .then(()=>next());
  } else {
    req.clientDomain = host;
    next();
  }
}
