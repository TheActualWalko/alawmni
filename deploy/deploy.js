const readCli = require('cli-interact').question;

// Our config
const sitesRoot = `/etc/apache2/sites-available`;
const documentRoot = '/var/www/public';
const logRoot = '/var/log';
const errorFile = 'error.log';
const requestsFile = 'requests.log';

// Client-specific config
const clientWebName = readCli('host: ') || 'imaginaryclient';
const clientUrl     = readCli('url:  ') || 'alumni.imaginaryclient.com';

const logDir = `${logRoot}/${clientWebName}`
const errorLogPath = `${logDir}/${errorFile}`;
const customLogPath = `${logDir}/${requestsFile}`;
const siteSpecAvailablePath = `${sitesRoot}/${clientWebName}.conf`

const siteSpecContent = `
<VirtualHost *:80>
\tServerName ${clientUrl}
\tDocumentRoot ${documentRoot}
\tErrorLog ${errorLogPath}
\tCustomLog ${customLogPath}
</VirtualHost>
`;

console.log(
  siteSpecContent, '\n',
  'write to ', siteSpecAvailablePath, '\n',
  'mkdir ', logDir, '\n',
  'touch ', errorLogPath, '\n',
  'touch ', customLogPath, '\n',
  `a2ensite ${siteSpecAvailablePath}`
);
