const server = require("./src/server");
const worker = require("./modules/worker/worker.module");
const cli = require("./modules/cli/cli.module");

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
