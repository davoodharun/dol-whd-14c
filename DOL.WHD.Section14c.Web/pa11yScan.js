#!/usr/bin/env node

// example command:
// ./pa11yScan.js \
// -e 'somebody@gmail.com' \
// -p 'password123' \
// -u 'https://dol-whd-section14c-stg.azurewebsites.net/#/section/work-sites'

const pa11y = require('pa11y');
const program = require('commander');

program
  .description('Run an accessibility test against a 14(c) app URL')
  .option('-e, --email <email>', 'Add user email')
  .option('-p, --password <password>', 'Add user password')
  .option('-u, --url <url>', 'Add URL to scan')
  .parse(process.argv);

const errMsg = `
  Uh-oh! Make sure you specify the proper params.
  For help, run: ./pa11yScan.js --help
`;

if (!program.email || !program.password || !program.url) {
  console.error(errMsg);
  process.exit(1);
}

const PARAMS = {
  userVal: program.email,
  pwVal: program.password,
  url: program.url
};

const runner = pa11y({
  log: {
    debug: console.log.bind(console),
    error: console.error.bind(console),
    info: console.log.bind(console)
  },

  beforeScript: function(page, options, next) {
    // show console messages from web page
    page.onConsoleMessage = msg => console.log(msg);

    // check for some condition on web page before continuing
    function waitUntil(condition, retries, waitOver) {
      page.evaluate(condition, PARAMS, (error, result) => {
        if (result || retries < 1) waitOver();
        else {
          retries -= 1;
          setTimeout(() => waitUntil(condition, retries, waitOver), 200);
        }
      });
    }

    // redirect to proper (authenticated) page, then start pa11y
    function pageRedirect() {
      console.log('Redirecting to proper url...');

      page.evaluate(
        function(args) {
          document.location = args.url;
          document.location.reload();
        },
        PARAMS,
        function() {
          waitUntil(
            function(args) {
              return window.location.href === args.url; // current = target
            },
            10,
            function() {
              setTimeout(next, 1000);
            }
          );
        }
      );
    }

    // user input shouldn't be on page if login successful
    function authCheck() {
      return document.querySelector('#userName') === null;
    }

    function postAuth() {
      waitUntil(authCheck, 10, pageRedirect);
    }

    function doAuth(args) {
      console.log('args:', JSON.stringify(args));
      console.log('Filling in login form...');

      var user = document.querySelector('#userName');
      var password = document.querySelector('#password');
      var submit = document.querySelector('.loginbtn button');

      var userEl = angular.element(user);
      var pwEl = angular.element(password);

      userEl.val(args.userVal);
      userEl.triggerHandler('input');

      pwEl.val(args.pwVal);
      pwEl.triggerHandler('input');

      console.log('Submitting login form...');
      submit.click();
    }

    // 1. log in
    // 2. check that auth was successful
    // 3. do post auth stuff
    page.evaluate(doAuth, PARAMS, postAuth);
  }
});

runner.run(PARAMS.url, (error, results) => {
  if (error) return console.error(error.message);

  console.log(results);
  console.log();
  console.log(`number of pa11y results: ${results.length}`);
});