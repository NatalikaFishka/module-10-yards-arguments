const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const yargs = require('yargs').argv;
const capabilities = require('./constants/browsers_set');
const finalSuite = require('../utils/parse_cli/parse_cli');

exports.config = {
  framework: 'jasmine',
  specs: yargs.set ? finalSuite : ['../specs/*.spec.js'],
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