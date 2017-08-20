import {getClient, getSubjectsWithStudents, getAllSubjects} from './queries';
import * as fs from 'fs';
import * as path from 'path';
import * as reactDomServer from 'react-dom/server';
import * as React from 'react';
import app from '../../public/src/root';
import createMemoryHistory from 'history/createMemoryHistory';

const css = fs.readFileSync(path.resolve('../public/css/screen.css'), 'utf-8');

export default (IS_DEV, db) => (req, res) => {
  Promise.all([
    getClient(req.clientDomain)(db),
    getSubjectsWithStudents(req.clientDomain)(db),
    getAllSubjects()(db)
  ]).then((results: [any, any, any]) => {
    const client: any = results[0];
    const subjectsWithStudents: any = results[1].map(({name}) => name);
    const allSubjects: any = results[2].map(({name}) => name);
    const statics = {
      ...client,
      subjectsWithStudents,
      allSubjects
    };

    const appRender = reactDomServer.renderToString(
      React.createElement(
        app, 
        {
          statics, 
          history: createMemoryHistory({
            initialEntries: [req.route.path]
          })
        }
      )
    );

    res.send(
`<!DOCTYPE html>
<html lang='en-UK'>
  <head>
    <title>${client.appDisplayName}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${css}
    </style>
    <style>
      .main-header h1 span,
      .autocomplete-input ul li:hover,
      .autocomplete-input ul li.active,
      .autocomplete-input ul li.rw-state-focus {
        background-color: ${client.primaryColor};
      }

      .input input,
      .results .student strong {
        color: ${client.primaryColor};
      }

      .submit,
      .results .loading,
      .results .student {
        background-color: ${client.secondaryColor};
      }

      .autocomplete-input ul {
        color: ${client.secondaryColor};
      }
    </style>
  </head>
  <body>
    <div id="react-container">${appRender}</div>
    <div class="background"></div>
    <script>
      const statics = ${JSON.stringify(statics)};
    </script>
    <script src="dist/vendor.bundle.js"></script>
    <script src="dist/bundle.js"></script>
  </body>
</html>`
    );
  });
};