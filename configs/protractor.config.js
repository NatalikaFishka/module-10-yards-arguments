let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  specs: ['../specs/*spec.js'],
  baseUrl: 'localhost',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      displayFailuresSummary: true,
      displayFailuredSpec: true,
      displaySuiteNumber: false,
      displaySpecDuration: true
    }));
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    "browserName": "chrome",
    "goog:chromeOptions": {
      "w3c": false
    }
  }
}