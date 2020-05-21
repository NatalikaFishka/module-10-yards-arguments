const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const yargs = require('yargs').argv;
const testSuitSets = require('./constants/suites_paths');
const capabilities = require('./constants/browsers_set');

exports.config = {
  framework: 'jasmine',
  specs: testSuitSets[yargs.set] || ['../specs/*.spec.js'],
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
  multiCapabilities: yargs.multi ? capabilities : [capabilities[0]]
}