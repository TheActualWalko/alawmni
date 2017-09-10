import * as mysql from 'mysql';
import * as fs from 'fs';
import * as moment from 'moment';

import {getLastFortnightActivity} from './queries';

const {
  MYSQL_HOST, 
  MYSQL_USERNAME, 
  MYSQL_PASSWORD, 
  MYSQL_DB
} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    getLastFortnightActivity()(db)
      .then((results: any[]) => {
        let currentSessionStartTime;
        console.log(
          results
            .reduce((acc, cur, idx, arr) => {
              const isFirstOfSession = (idx === 0 || cur.ip !== arr[idx-1].ip);
              if (isFirstOfSession) {
                currentSessionStartTime = new Date(cur.timestamp).getTime();
              }
              let heading = isFirstOfSession
                ? `\nSession ${moment(cur.timestamp).format('dddd, MMMM Do, YYYY')} from [${cur.lat}, ${cur.lon}]\n`
                : '';
              let deltaTime = isFirstOfSession
                ? '0'
                : moment((new Date(arr[idx-1].timestamp).getTime() - currentSessionStartTime)).format('m\\ms\\s')
              while (deltaTime.length < 6) {
                deltaTime = ' ' + deltaTime;
              }
              let action = cur.action;
              while (action.length < 15) {
                action = ' ' + action;
              }
              let data = cur.data;
              return acc + `${heading}[${deltaTime}]${action}: ${data}\n`;
            }, '')
        );
        db.destroy();
      });
  }
});
