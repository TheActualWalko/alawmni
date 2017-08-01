import {getClient, getCompanies} from './queries';
import * as fs from 'fs';
import * as path from 'path';

const css = fs.readFileSync(path.resolve('public/css/screen.css'), 'utf-8');

export default (db) => (req, res) => {
  Promise.all([
    getClient(req.clientDomain)(db),
    getCompanies()(db)
  ]).then((results) => {
    const client: any = results[0];
    const companies: any = results[1];
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
      .autocomplete-input ul li.active {
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
    <div id="react-container"></div>
    <div class="background"></div>
    <script>
      const statics = ${JSON.stringify(client)};
      const firms = ${JSON.stringify(companies)};
    </script>
    <script src="dist/bundle.js"></script>
    <script>
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
      analytics.load("PO9SjXmJU7ZIsB4ygIuzYI1oiQ8VRmaC");
      analytics.page();
      }}();
    </script>
  </body>
</html>`
    );
  });
};