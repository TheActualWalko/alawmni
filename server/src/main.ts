import * as express from 'express';
import * as mysql from 'mysql';
import * as fs from 'fs';
import * as url from 'url';
import * as cookieParser from 'cookie-parser';

const {MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const app = express();
const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
});

const getDomain = (req)=>{
  if (req.headers['host'].includes('localhost') || req.headers['host'].includes('51.255.193.170')) {
    return req.cookies['domain'];
  } else {
    return req.headers['host'].split(':')[0];
  }
};

const dbResponder = (res, handler, firstOnly = false) => {
  return (err, results, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const result = firstOnly ? handler(results[0]) : handler(results);
      if (typeof result === 'string') {
        res.send(result);
      }
    }
  }
}

const dbResponderOne = (res, handler) => dbResponder(res, handler, true);

app.use(cookieParser());

app.get('/company/:companyID/students', (req, res)=>{
  db.query(
    `
      SELECT name, email 
      FROM students 
      WHERE id IN (
        SELECT student_id 
        FROM student_companies 
        WHERE company_id = ?
      )
      AND client_id IN (
        SELECT id 
        FROM clients 
        WHERE domain = ?
      );
    `, 
    [req.params.companyID, getDomain(req)],
    dbResponder(res, (r) => JSON.stringify(r, null, 2))
  );
});

app.get('/companies', (req, res)=>{
  db.query(
    `SELECT name, id FROM companies;`,
    dbResponder(res, (r) => JSON.stringify(r, null, 2))
  );
});

app.get('/client', (req, res)=>{
  db.query(
    `SELECT id, app_display_name, contact_email, client_website FROM clients WHERE domain = ?;`,
    [getDomain(req)],
    dbResponderOne(res, (r) => JSON.stringify(r, null, 2))
  );
});

app.post('/register', (req, res)=>{
  const domain = getDomain(req);
  const name = req.params.name;
  const email = req.params.email;
  const companyName = req.params.companyName;
  db.query(
    `
      INSERT INTO students (
        name, 
        email, 
        client_id
      ) VALUES (
        ?, 
        ?, 
        (SELECT id FROM clients WHERE domain = ?)
      ) ON DUPLICATE KEY UPDATE
        name = ?,
        email = ?,
        client_id = (SELECT id FROM clients WHERE domain = ?);
    `,
    [name, email, domain, name, email, domain],
    dbResponder(res, (r) => {
      db.query(
        `
          INSERT INTO companies (
            name
          ) VALUES (
            ?
          ) ON DUPLICATE KEY UPDATE name = ?;
        `,
        [companyName, companyName],
        dbResponder(res, (r) => {
          db.query(
            `
              INSERT INTO student_companies (
                student_id, 
                company_id
              ) VALUES (
                (SELECT id FROM students WHERE email = ?),
                (SELECT id FROM companies WHERE name = ?)
              );
            `,
            [email, companyName],
            dbResponder(res, (r) => 'success')
          );
        })
      );
    })
  );
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('db connected');
    app.listen(1337, (err) => {
      if (err) {
        console.error(err) 
      } else {
        console.log('listening on 1337');
      }
    });
  }
});