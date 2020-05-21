const yargs = require('yargs').argv;

module.exports = [
  {
    "browserName": yargs.browser || "chrome",
    shardTestFiles: yargs.instances > 1,
    maxInstances: yargs.instances || 1,
  },
  {
    "browserName": "MicrosoftEdge",
    shardTestFiles: yargs.instances > 1,
    maxInstances: yargs.instances || 1,
  }
]