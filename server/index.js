const server = require("./src/server");
const worker = require("./src/modules/worker/worker.module");
const cli = require("./src/modules/cli/cli.module");

function app(callback) {
  server();
  worker();

  setTimeout(() => {
    cli();
    callback;
  }, 50);
}

if (require.main === module) {
  app(function () {});
}

module.exports = app;
