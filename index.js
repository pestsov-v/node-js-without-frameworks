const server = require("./src/server");
const worker = require("./src/worker/worker.module");
const cli = require("./src/cli/cli");

function app(callback) {
  server();
  worker();

  setTimeout(() => {
    cli.init();
    callback;
  }, 50);
}

if (require.main === module) {
  app(function () {});
}

module.exports = app;
