import * as express from 'express';
import * as mysql from 'mysql';
import * as fs from 'fs';
import * as url from 'url';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

import getClientDomain from './get-client-domain';
import bindApiCalls from './bind-api-calls';
import sendIndex from './send-index';
import {getClientSlug} from './queries';

const {
  MYSQL_HOST, 
  MYSQL_USERNAME, 
  MYSQL_PASSWORD, 
  MYSQL_DB, 
  PORT,
  STATIC_DIR
} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const staticDir = path.resolve(STATIC_DIR);

const app = express();
const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
});

app.use(compression());
app.use(cookieParser());
app.use(getClientDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bindApiCalls(app, db);

app.get('/img/logo.png', (req, res) => {
  getClientSlug(req['clientDomain'])(db)
    .then((slug) => res.sendFile(`${staticDir}/${slug}/logo.png`));
});

app.get('/img/background.jpg', (req, res) => {
  getClientSlug(req['clientDomain'])(db)
    .then((slug) => res.sendFile(`${staticDir}/${slug}/background.jpg`));
});

app.get('/', sendIndex(db));
app.get('/register', sendIndex(db));
app.use(express.static('public'))

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err) 
      } else {
        console.log(`Listening on ${PORT}`);
      }
    });
  }
});