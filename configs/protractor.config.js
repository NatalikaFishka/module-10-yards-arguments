const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const HtmlReporter = require('protractor-beautiful-reporter');

const yargs = require('yargs').argv;
const capabilities = require('./constants/browsers_set');
const finalSuite = require('../utils/parse_cli/parse_cli');

exports.config = {
  framework: 'jasmine2',
  specs: yargs.set ? finalSuite : ['../specs/*.spec.js'],
  baseUrl: 'localhost',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: yargs.multi ? capabilities : [capabilities[0]],

  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      displayFailuresSummary: true,
      displayFailuredSpec: true,
      displaySuiteNumber: false,
      displaySpecDuration: true
    }));
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: `report`,
      screenshotsSubfolder: 'images'
    }).getJasmine2Reporter());
  }
}