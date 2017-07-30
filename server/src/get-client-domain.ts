export default (req, res, next) => {
  if (req.headers['host'].includes('localhost') || req.headers['host'].includes('51.255.193.170')) {
    req.clientDomain = req.cookies['domain'];
  } else {
    req.clientDomain = req.headers['host'].split(':')[0];
  }
  next();
}