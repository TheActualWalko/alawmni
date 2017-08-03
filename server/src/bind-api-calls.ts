import * as queries from './queries';

const sendJSON = (res) => (result) => res.send(JSON.stringify(result, null, 2));
const sendError = (res) => (error) => res.status(500).send(error);

export default (app, db) => {
  app.get('/company/:companyID/students', (req, res)=>{
    queries
      .getStudentsForCompany(req.clientDomain, req.params.companyID)(db)
      .then(sendJSON(res));
  });

  app.get('/companies', (req, res)=>{
    queries
      .getCompanies()(db)
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
    const company = req.body.company;
    queries
      .register(domain, name, email, company)(db)
      .then(() => res.send('success'))
      .catch(sendError(res));
  });
}