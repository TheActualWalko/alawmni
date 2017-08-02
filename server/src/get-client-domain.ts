export default (req, res, next) => {
  if (req.headers['host'].includes('localhost') || req.headers['host'].includes('51.255.193.170')) {
    const cookie = req.cookies['domain'];;
    if (cookie) {
      req.clientDomain = cookie;
    } else {
      req.clientDomain = 'test';
    }
  } else {
    req.clientDomain = req.headers['host'].split(':')[0];
  }
  next();
}