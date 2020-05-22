const yargs = require('yargs').argv;
const testSuitSets = require('../../configs/constants/suites_paths');

const finalSuite = [];
if (yargs.set) yargs.set.split(' ').forEach((curr) => finalSuite.push(testSuitSets[curr]));

module.exports = finalSuite;