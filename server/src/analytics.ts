import * as mysql from 'mysql';
import * as fs from 'fs';
import * as moment from 'moment';

import {getLastFortnightActivity, getLastFortnightActivityForClient} from './queries';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',

  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

const {
  MYSQL_HOST, 
  MYSQL_USERNAME, 
  MYSQL_PASSWORD, 
  MYSQL_DB
} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const clientFilter = process.argv[2];

const query = clientFilter
  ? getLastFortnightActivityForClient(clientFilter) 
  : getLastFortnightActivity();

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
    query(db)
      .then((results: any[]) => {
        let currentSessionStartTime;
        const sessions = [];
        let currentSession = [];
        console.log(
          results
            .reduce((acc, cur, idx, arr) => {
              const isFirstOfSession = (idx === 0 || cur.ip !== arr[idx-1].ip);
              if (isFirstOfSession) {
                sessions.push(currentSession);
                currentSession = [];
                currentSessionStartTime = new Date(cur.timestamp).getTime();
              }
              currentSession.push(cur);
              let heading = isFirstOfSession
                ? `\nSession ${moment(cur.timestamp).format('dddd, MMMM Do, YYYY, hh:mmA')} at location ${colors.fgCyan}google.com/maps/@${cur.lat},${cur.lon},10z${colors.reset}\n`
                : '';
              let deltaTime = moment(
                isFirstOfSession
                  ? 0
                  : (new Date(arr[idx-1].timestamp).getTime() - currentSessionStartTime)
              ).format('m\\ms\\s')
              while (deltaTime.length < 6) {
                deltaTime = ' ' + deltaTime;
              }
              let action = cur.action;
              const actionColor = {
                'typing': colors.dim,
                'selectSubject': colors.fgGreen,
                'clickStudent': colors.fgBlue,
                'load': colors.fgWhite,
                'register': colors.fgMagenta
              }[action] || colors.reset;

              while (action.length < 15) {
                action = ' ' + action;
              }
              action = `${actionColor}${action}`; 
              let data = cur.data;
              return acc + `${heading}[${deltaTime}]${action}: ${data}${colors.reset}\n`;
            }, '')
        );
        sessions.push(currentSession);
        const sessionCounts = {};
        const registerCounts = {};
        const clickStudentCounts = {};
        sessions.forEach((s) => {
          if (!s.length) {
            return;
          }
          const client = s[0].client_slug;
          if (!sessionCounts[client]) {
            sessionCounts[client] = 0;
            registerCounts[client] = 0;
            clickStudentCounts[client] = 0;
          }
          sessionCounts[client] ++;
          s.forEach((activity) => {
            if (activity.action === 'register') {
              registerCounts[client] ++;
            } else if (activity.action === 'clickStudent') {
              clickStudentCounts[client] ++;
            }
          })
        });

        const logTotals = (totals) => {
          Object.keys(totals).forEach((client_slug) => {
            let count = totals[client_slug] + '';
            while (count.length < 6) {
              count = ' ' + count;
            }
            client_slug += ':';
            while (client_slug.length < 8) {
              client_slug += ' ';
            }
            console.log(`${client_slug} ${count}`);
          });
        }
        
        console.log('Sessions per client:');
        logTotals(sessionCounts);

        console.log('\nRegistrations per client:');
        logTotals(registerCounts);
        
        console.log('\nStudent clicks per client:');
        logTotals(clickStudentCounts);
        
        db.destroy();
      });
  }
});