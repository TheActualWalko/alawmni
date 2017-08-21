import * as iplocation from 'iplocation';

import * as queries from './queries';

const sendJSON = (res) => (result) => res.send(JSON.stringify(result, null, 2));
const sendError = (res) => (error) => res.status(500).send(error);

export default (app, db) => {
  app.get('/subject/:subjectID/students', (req, res)=>{
    queries
      .getStudentsForSubject(req.clientDomain, req.params.subjectID)(db)
      .then(sendJSON(res));
  });

  app.get('/subjects', (req, res)=>{
    queries
      .getSubjectsWithStudents(req.clientDomain)(db)
      .then(sendJSON(res))
      .catch(sendError(res));
  });

  app.get('/subjects/all', (req, res)=>{
    queries
      .getAllSubjects()(db)
      .then(sendJSON(res))
      .catch(sendError(res));
  });

  app.get('/client', (req, res)=>{
    queries
      .getClient(req.clientDomain)(db)
      .then(sendJSON(res))
      .catch(sendError(res));
  });

  app.post('/register', (req, res)=>{
    const domain = req.clientDomain;
    const name = `${req.body.firstName} ${req.body.lastName}`;
    const email = req.body.email;
    const subject = req.body.subject;
    queries
      .register(domain, name, email, subject)(db)
      .then(() => res.send('success'))
      .catch(sendError(res));
  });

  app.post('/track', (req, res)=>{
    const {action, data} = req.body;
    iplocation(req.ip, (err, ipLocationResponse) => {
      if (err) {
        throw err;
      } else {
        const {lat, lon} = ipLocationResponse;
        queries
          .track(req.clientDomain, req.ip, lat, lon, action, data)(db)
          .then(() => res.send('success'));
      }
    });
  });
}